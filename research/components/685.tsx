import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A list of errors found in a repo's CODEOWNERS file
   *
   * @title CODEOWNERS errors
   */
  export type codeowners_errors = {
    errors: {
      /**
       * The line number where this errors occurs.
       */
      line: number & tags.Type<"int32">;
      /**
       * The column number where this errors occurs.
       */
      column: number & tags.Type<"int32">;
      /**
       * The contents of the line where the error occurs.
       */
      source?: string;
      /**
       * The type of error.
       */
      kind: string;
      /**
       * Suggested action to fix the error. This will usually be `null`, but is provided for some common errors.
       */
      suggestion?: string | null;
      /**
       * A human-readable description of the error, combining information from multiple fields, laid out for display in a monospaced typeface (for example, a command-line setting).
       */
      message: string;
      /**
       * The path of the file where the error occured.
       */
      path: string;
    }[];
  };
}
export type AutoViewInput = AutoViewInputSubTypes.codeowners_errors;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { errors } = value;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Render a header, a no-error state, or a list of error cards.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center mb-4">
        <LucideReact.AlertTriangle className="text-red-500 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">
          CODEOWNERS Errors
        </h2>
      </div>

      {errors.length === 0 ? (
        <div className="flex items-center text-gray-600">
          <LucideReact.CheckCircle className="text-green-500 mr-2" size={20} />
          <span>No errors found.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {errors.map((error, index) => {
            const location = `${error.path}:${error.line}:${error.column}`;
            return (
              <div key={index} className="p-4 bg-white rounded-lg shadow">
                <div className="flex items-center mb-2">
                  <LucideReact.AlertTriangle
                    className="text-red-500 mr-2"
                    size={16}
                  />
                  <span className="text-sm font-medium text-gray-800 truncate">
                    {error.kind}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mb-2 truncate">
                  {location}
                </div>
                <pre className="bg-gray-100 p-2 rounded text-sm font-mono overflow-x-auto whitespace-pre-wrap line-clamp-3">
                  {error.message}
                </pre>
                {error.suggestion && (
                  <div className="flex items-center mt-2 text-sm text-blue-600">
                    <LucideReact.Info className="mr-1" size={16} />
                    <span>{error.suggestion}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
