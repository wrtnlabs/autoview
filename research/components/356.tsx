import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Gitignore Template
     *
     * @title Gitignore Template
    */
    export type gitignore_template = {
        name: string;
        source: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.gitignore_template;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    For a gitignore template, we simply destructure its name and source content.
  const { name, source } = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    We render the template name as a heading and the source in a scrollable code block.
  //    Use semantic HTML (<h2>, <pre>, <code>) and Tailwind for styling.
  //    The code block is limited in height and scrollable to handle large templates gracefully.
  
  // 3. Return the React element.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-3 truncate">
        {name}
      </h2>
      <div className="border border-gray-200 rounded bg-gray-50">
        <pre
          className="p-3 font-mono text-sm text-gray-800 max-h-60 overflow-auto whitespace-pre-wrap"
        >
          {source}
        </pre>
      </div>
    </div>
  );
}
