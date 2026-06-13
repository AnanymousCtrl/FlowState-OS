import DocsEditor from "./DocsEditor"


const Docs = () => {
  return (
    <>
    <div className="text-center mb-10 mt-6 max-w-4xl mx-auto">
      {/* Main Heading Container */}
      <div className="p-8 md:p-12 bg-gray-900 text-white rounded-t-xl shadow-2xl border-b-4 border-indigo-500">
        
        {/* Subtitle / Callout */}
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400 mb-2">
          FlowStateOS Platform
        </p>
        
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-300 to-indigo-500">
            Documentation Studio
          </span>
        </h1>
        
        {/* Description / Context */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Craft articles and documentation using our editor below.
        </p>

      </div>
      
      {/* Separator / Visual Break (Optional, but looks clean) */}
      <div className="h-2 bg-indigo-600 rounded-b-xl max-w-3xl mx-auto"></div>
    </div>
    <div className="card">
        <DocsEditor/>
    </div>
    </>
  )
}

export default Docs