import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Docs from "./docs/Docs";
import CodeEditor from "./code/CodeEditor";
import Code from "./code/Code";
import Notes from "./pages/Notes";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/docs" element={<Docs/>} />
      <Route path="/codeEditor" element={<CodeEditor/>} />
      <Route path="/code" element={<Code/>} />
      <Route path="/notes" element={<Notes/>} />
    </Routes>
    // <Notes/>
  )
}

export default App
