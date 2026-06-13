import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";
import { CircleLoader } from "react-spinners";

const Code = () => {
  // ... (options array remains the same)
  const options = [
    { value: "cpp", label: "C++" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "typescript", label: "TypeScript" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "dart", label: "Dart" },
    { value: "scala", label: "Scala" },
    { value: "haskell", label: "Haskell" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [fixedCode, setFixedCode] = useState("");

  // Custom styles for react-select (updated for a darker theme)
  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#1f2937", // Slate-800 for control background
      borderColor: state.isFocused ? "#6366f1" : "#374151", // Indigo-500 focus, Slate-700 normal
      color: "#e5e7eb", // Light gray text
      padding: "4px",
      borderRadius: "0.5rem", // Rounded corners
      boxShadow: state.isFocused ? "0 0 0 1px #6366f1" : "none",
      "&:hover": {
        borderColor: "#6366f1",
      },
      minWidth: "180px", // Adjusted width for better fit
      width: "auto",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#1f2937", // Slate-800 for menu background
      color: "#e5e7eb",
      borderRadius: "0.5rem",
      overflow: "hidden",
      zIndex: 50, // Higher z-index to ensure dropdown is on top
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#374151" : "#1f2937", // Slate-700 on hover
      color: "#e5e7eb",
      cursor: "pointer",
      padding: "8px 12px",
      "&:active": {
        backgroundColor: "#4f46e5", // Indigo-600 on active click
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#e5e7eb",
    }),
    input: (base) => ({
      ...base,
      color: "#e5e7eb",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
    }),
  };

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyBV1MJU2_8qDaGbzRU02fURAtsiOf0E5pc",
  });

  // ... (runJSInSandbox, reviewCode, fixCode, runCode, applyFixedCode remain the same)

  async function runJSInSandbox(srcCode, timeoutMs = 4000) {
    return new Promise((resolve) => {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("sandbox", "allow-scripts");
      iframe.style.display = "none";

      // Wrap user code in a script that posts messages to parent
      const wrapped = `
        <script>
          (function(){
            const safeLog = (...args) => {
              try { parent.postMessage({ type: 'runnable-log', payload: args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ') }, '*'); } catch(e){}
            };
            console.log = safeLog;
            console.error = function(){ safeLog('ERROR:', ...arguments) };
            console.warn = function(){ safeLog('WARN:', ...arguments) };
            window.onerror = function(msg, src, line, col, err) {
              parent.postMessage({ type: 'runnable-error', payload: (err && err.stack) ? String(err.stack) : String(msg) }, '*');
            };
            (async function(){
              try {
                const fn = new Function(\`
                  "use strict";
                  ${srcCode}
                \`);
                const maybe = fn();
                if (maybe && typeof maybe.then === 'function') {
                  const awaited = await maybe;
                  parent.postMessage({ type: 'runnable-result', payload: String(awaited) }, '*');
                } else {
                  parent.postMessage({ type: 'runnable-result', payload: String(maybe === undefined ? '' : maybe) }, '*');
                }
              } catch (err) {
                parent.postMessage({ type: 'runnable-error', payload: (err && err.stack) ? String(err.stack) : String(err) }, '*');
              } finally {
                parent.postMessage({ type: 'runnable-done' }, '*');
              }
            })();
          })();
        <\/script>
      `;
      iframe.srcdoc = wrapped;

      let logs = [];
      let gotResult = null;
      let gotError = null;
      let finished = false;
      let timedOut = false;

      function onMessage(e) {
        const data = e.data || {};
        if (data.type === "runnable-log") {
          logs.push(String(data.payload));
        } else if (data.type === "runnable-result") {
          gotResult = String(data.payload);
        } else if (data.type === "runnable-error") {
          gotError = String(data.payload);
        } else if (data.type === "runnable-done") {
          finished = true;
          cleanup();
          resolve({ success: !gotError, logs, result: gotResult, error: gotError, timedOut });
        }
      }

      function cleanup() {
        window.removeEventListener("message", onMessage);
        try { document.body.removeChild(iframe); } catch (e) {}
        clearTimeout(killTimer);
      }

      window.addEventListener("message", onMessage);
      document.body.appendChild(iframe);

      const killTimer = setTimeout(() => {
        timedOut = true;
        try { cleanup(); } catch (e) {}
        resolve({ success: false, logs, result: gotResult, error: "Execution timed out", timedOut: true });
      }, timeoutMs);
    });
  }

  async function reviewCode() {
    if (!code) return alert("Please enter code first");
    setResponse("");
    setLoading(true);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert software developer. Review the following ${selectedOption.value} code and provide:

1️⃣ Quality Rating 
2️⃣ Suggestions for Improvement 
3️⃣ Step-by-Step Explanation 
4️⃣ Bugs or Logical Errors 
5️⃣ Syntax or Runtime Errors 
6️⃣ Solutions and Recommendations

Code: ${code}`,
    });

    setResponse(response.text);
    setLoading(false);
  }

  async function fixCode() {
    if (!code) return alert("Please enter code first");
    setResponse("");
    setLoading(true);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert ${selectedOption.value} developer. 
The following code may contain syntax errors, logical mistakes, or inefficiencies. 
Perform the following:

1. Provide a **fixed version** of the code with proper formatting (Prettier/PEP8/Google Java Style). 
2. Provide **2–3 alternative optimized versions** (for performance, readability, or advanced techniques). 
3. Explain **why each change was made**, like a mentor reviewing a PR. 
4. Generate **unit tests or example inputs/outputs**. 
5. Analyze **time & space complexity**. 
6. Highlight all **improvements in Markdown**.

Original Code:
${code}`,
    });

    setResponse(response.text);

    // Extract first code block for apply fixed code
    const codeMatch = response.text.match(/```(?:\w*\n)?([\s\S]*?)```/);
    if (codeMatch) {
      setFixedCode(codeMatch[1]);
    } else {
      setFixedCode("");
    }

    setLoading(false);
  }

  // ---- NEW: runCode ----
  async function runCode() {
    if (!code) return alert("Please enter code first");
    setResponse("");
    setLoading(true);

    try {
      // 1) Ask Gemini to simulate/produce output
      const runPrompt = `You are an expert developer. For the following ${selectedOption.value} code, determine the exact program output (including console prints) when executed with no external inputs. If the code requires input, state a minimal representative input and the resulting output. If the code cannot be executed as-is (missing libs, environment-specific), explain why and describe the expected behavior.

Code:
\`\`\`
${code}
\`\`\`

Please return a short "Execution" section with output in a fenced code block.`;
      const aiResp = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: runPrompt,
      });
      const aiText = aiResp?.text ?? String(aiResp || "");

      // 2) If JS, also run it locally in a sandboxed iframe and show real execution
      let execSummary = "";
      if (selectedOption.value === "javascript") {
        try {
          const exec = await runJSInSandbox(code, 5000); // 5s timeout
          if (exec.timedOut) {
            execSummary = "\n\n**Sandbox Execution:** timed out after 5s.";
          } else if (exec.error) {
            execSummary = `\n\n**Sandbox Execution Error:**\n\`\`\`\n${exec.error}\n\`\`\`\nConsole logs:\n\`\`\`\n${exec.logs.join("\n") || "(no logs)"}\n\`\`\``;
          } else {
            execSummary = `\n\n**Sandbox Execution Result:**\n\`\`\`\n${exec.result || "(no returned value)"}\n\`\`\`\nConsole logs:\n\`\`\`\n${exec.logs.join("\n") || "(no logs)"}\n\`\`\``;
          }
        } catch (err) {
          execSummary = `\n\n**Sandbox Execution Failed:** ${String(err)}`;
        }
      } else {
        execSummary = `\n\n**Note:** Browser cannot execute ${selectedOption.value} locally. Displaying model-predicted output above.`;
      }

      // 3) Combine AI prediction + sandbox output (if any)
      setResponse(aiText + "\n\n---\n" + execSummary);
    } catch (err) {
      console.error("Run error:", err);
      setResponse("Failed to run: " + String(err));
    } finally {
      setLoading(false);
    }
  }

  const applyFixedCode = () => {
    if (fixedCode) {
      setCode(fixedCode);
      alert("✅ Fixed code applied to the editor!");
    } else {
      alert("⚠️ No fixed code available. Please click 'Fix Code' first.");
    }
  };


  // ---- NEW: define a beforeMount handler to create a VSCode-like black theme ----
  const handleEditorWillMount = (monaco) => {
    try {
      monaco.editor.defineTheme("flow-vs-black", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "", foreground: "D4D4D4", background: "000000" },
          { token: "comment", foreground: "6A9955", fontStyle: "italic" },
          { token: "keyword", foreground: "569CD6" },
          { token: "operator", foreground: "D4D4D4" },
          { token: "string", foreground: "CE9178" },
          { token: "number", foreground: "B5CEA8" },
          { token: "type", foreground: "4EC9B0" },
          { token: "function", foreground: "DCDCAA" },
          { token: "variable", foreground: "9CDCFE" },
          { token: "delimiter", foreground: "D4D4D4" },
        ],
        colors: {
          "editor.background": "#1e1e1e", // Darker background (VS Code dark)
          "editor.foreground": "#D4D4D4",
          "editorCursor.foreground": "#AEAFAD",
          "editor.lineHighlightBackground": "#1f1f1f44",
          "editor.selectionBackground": "#264F7840",
          "editor.inactiveSelectionBackground": "#3A3D4199",
          "editorGutter.background": "#1e1e1e",
          "editorLineNumber.foreground": "#6a6a6a", // Darker line numbers
        },
      });
    } catch (e) {
      // ignore if theme already defined or monaco not ready
      // console.warn("Theme define failed", e);
    }
  };


  return (
    // Updated main wrapper for a deep dark background
    <div className="bg-gray-950 text-gray-100 p-6 min-h-screen">
      <div className="main flex space-x-6" style={{ height: "calc(100vh - 48px)" }}> {/* Adjusted height calc */}
        
        {/* Left Panel: Code Editor and Controls */}
        <div className="left flex-1 flex flex-col">
          <h2 className="font-sans text-2xl font-bold mb-4 text-gray-400">FlowStateOS Code Editor</h2>
          
          {/* Controls Bar */}
          <div className="tabs mb-4 w-full flex items-center space-x-3 bg-gray-800 p-3 rounded-xl shadow-lg border border-gray-700">
            <div className="w-56">
              <Select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e)}
                options={options}
                styles={customStyles}
                isSearchable={true}
              />
            </div>

            {/* General Buttons */}
            <button
              onClick={fixCode}
              className="px-4 py-2 bg-gray-700 text-indigo-200 rounded-lg hover:bg-gray-600 transition duration-200 border border-gray-600 shadow-md"
            >
              Fix Code 
            </button>

            <button
              onClick={reviewCode}
              className="px-4 py-2 bg-gray-700 text-indigo-200 rounded-lg hover:bg-gray-600 transition duration-200 border border-gray-600 shadow-md"
            >
              Review 
            </button>

            {/* Primary Action Button */}
            <button
              onClick={runCode}
              className="ml-auto px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500 transition duration-200 shadow-xl shadow-indigo-500/30"
            >
              Run Code 
            </button>
          </div>

          {/* Editor Wrapper */}
          <div className="editor-wrapper flex-1 min-h-0 rounded-xl overflow-hidden shadow-2xl border border-indigo-700/50">
            <Editor
              height="100%"
              beforeMount={handleEditorWillMount}
              theme="flow-vs-black" // Use the custom dark theme
              defaultLanguage={selectedOption.value}
              language={selectedOption.value}
              value={code}
              onChange={(e) => setCode(e)}
              options={{
                fontSize: 16,
                fontFamily: "Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, 'Courier New', monospace",
                fontLigatures: true,
                automaticLayout: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineDecorationsWidth: 8,
                lineNumbers: "on",
                // Disable editor background setting here and let the theme handle it
              }}
            />
          </div>
        </div>

        {/* Right Panel: AI Response */}
        <div className="right w-1/2 flex flex-col bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
          
          {/* Response Header */}
          <div className="topTab flex items-center justify-between h-16 px-6 border-b border-gray-700 bg-gray-900 rounded-t-xl">
            <p className="font-serif font-extrabold text-xl text-gray-200">Output </p>
            {fixedCode && (
              <button
                onClick={applyFixedCode}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-500 transition duration-200 shadow-lg"
              >
                Apply Fixed Code 
              </button>
            )}
          </div>

          {/* Response Content Area */}
          <div className="flex-1 overflow-y-auto p-6 relative">
            
            {/* Loading Overlay */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                {/* Darker, subtle background for the overlay */}
                <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" /> 
                <div className="z-30 flex flex-col items-center gap-4 p-8 bg-gray-700 rounded-xl shadow-2xl border border-indigo-500">
                  <CircleLoader color="#6366f1" size={80} /> {/* Indigo Loader */}
                  <div className="text-lg text-indigo-200 font-medium">Running & analyzing — please wait...</div>
                </div>
              </div>
            )}

            {/* Markdown Output */}
            {!loading && (
              // Enhanced prose styling for better Markdown readability on a dark background
              <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                <Markdown
                  components={{
                    // Custom style for code blocks inside markdown
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto border border-indigo-700/50 shadow-inner">
                          <code className={`!text-sm !text-gray-200 ${className}`} {...props}>
                            {children}
                          </code>
                        </pre>
                      ) : (
                        <code className="bg-gray-700 text-indigo-300 px-1 py-0.5 rounded-md text-sm font-mono" {...props}>
                          {children}
                        </code>
                      )
                    },
                    // Custom style for headings to match theme
                    h1: ({ children }) => <h1 className="text-indigo-400 border-b border-gray-700 pb-2 mb-4 mt-6 text-2xl font-extrabold">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-indigo-400 border-b border-gray-700 pb-1 mb-3 mt-5 text-xl font-bold">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-indigo-300 mt-4 text-lg font-semibold">{children}</h3>,
                    li: ({ children }) => <li className="text-gray-300 my-2">{children}</li>,
                    p: ({ children }) => <p className="text-gray-300 my-3 leading-relaxed">{children}</p>,
                    a: ({ children, ...props }) => <a className="text-indigo-400 hover:text-indigo-300" {...props}>{children}</a>
                  }}
                >
                  {response}
                </Markdown>
                {response === "" && (
                  <div className="text-center text-gray-500 pt-20">
                    <p className="text-3xl mb-4">Start by writing code ✍️</p>
                    <p className="text-lg">Then select an option above to **Fix**, **Review**, or **Run** your code.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Code;