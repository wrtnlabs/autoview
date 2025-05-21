import { tags } from "typia";
import React from "react";
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
  const totalErrors = errors.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {totalErrors} CODEOWNERS {totalErrors === 1 ? 'Error' : 'Errors'}
      </h2>
      <ul className="space-y-4">
        {errors.map((err, idx) => (
          <li key={idx} className="p-4 border border-red-200 rounded-lg bg-red-50">
            <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
              <span className="text-sm font-medium text-red-700 truncate">{err.path}</span>
              <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                Line {err.line}, Col {err.column}
              </span>
            </div>
            <span className="inline-block text-xs font-semibold bg-red-500 text-white px-2 py-0.5 rounded mb-2">
              {err.kind}
            </span>
            <pre className="font-mono text-sm text-gray-800 bg-gray-100 p-2 rounded overflow-auto max-h-32">
              {err.message}
            </pre>
            {err.suggestion != null && (
              <p className="mt-2 text-sm text-blue-700">
                Suggestion: <span className="font-medium">{err.suggestion}</span>
              </p>
            )}
            {err.source && (
              <p className="mt-1 text-xs text-gray-600">
                <span className="font-medium">Source:</span> {err.source}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
