import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Gitignore Template
     *
     * @title Gitignore Template
    */
    export interface gitignore_template {
        name: string;
        source: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.gitignore_template;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data extraction
  const { name, source } = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <LucideReact.FileText className="text-indigo-500 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
      </div>
      <div className="relative bg-gray-50 rounded-md p-4 max-h-64 overflow-auto">
        <code className="block whitespace-pre-wrap font-mono text-sm text-gray-800">
          {source}
        </code>
        {/* Gradient fade at bottom to hint scroll */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50"></div>
      </div>
    </div>
  );
}
