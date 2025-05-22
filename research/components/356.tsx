import LucideReact from "lucide-react";
import React, { JSX } from "react";

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
  const fileName = value.name.endsWith(".gitignore")
    ? value.name
    : `${value.name}.gitignore`;
  const lineCount = value.source.split("\n").length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LucideReact.FileText size={20} className="text-indigo-500" />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {fileName}
          </span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {lineCount} {lineCount === 1 ? "line" : "lines"}
        </div>
      </div>
      <pre className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4 rounded-md overflow-x-auto text-sm font-mono whitespace-pre">
        {value.source}
      </pre>
    </div>
  );
}
