import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A list of errors found in a repo's CODEOWNERS file
     *
     * @title CODEOWNERS errors
    */
    export interface codeowners_errors {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.codeowners_errors;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const errors = value.errors ?? [];
  const totalErrors = errors.length;
  const kindCounts = errors.reduce((acc: Record<string, number>, err) => {
    acc[err.kind] = (acc[err.kind] || 0) + 1;
    return acc;
  }, {});

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.AlertCircle
          size={20}
          className={totalErrors > 0 ? "text-red-500" : "text-green-500"}
        />
        <h2 className="ml-2 text-lg font-semibold">
          CODEOWNERS {totalErrors > 0 ? "Errors" : "No Errors"}{" "}
          {totalErrors > 0 && `(${totalErrors})`}
        </h2>
      </div>

      {totalErrors === 0 ? (
        <div className="flex items-center text-green-600">
          <LucideReact.CheckCircle size={16} className="mr-1" />
          <span>Great job! No CODEOWNERS errors detected.</span>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(kindCounts).map(([kind, count]) => (
              <span
                key={kind}
                className="inline-flex items-center text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded"
              >
                {kind}: {count}
              </span>
            ))}
          </div>
          <ul className="space-y-4">
            {errors.map((err, index) => (
              <li
                key={index}
                className="border border-gray-200 rounded p-3 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center text-sm text-gray-600">
                    <LucideReact.FileText size={16} className="mr-1" />
                    <span className="font-medium truncate">{err.path}</span>
                    <span className="ml-2 text-xs">
                      :{err.line}:{err.column}
                    </span>
                  </div>
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-0.5 rounded">
                    {err.kind}
                  </span>
                </div>
                <pre className="font-mono bg-white text-gray-800 p-2 rounded text-sm overflow-x-auto whitespace-pre-wrap">
                  {err.message}
                </pre>
                {err.suggestion && (
                  <div className="mt-2 flex items-start text-blue-700 bg-blue-50 p-2 rounded text-sm">
                    <LucideReact.Lightbulb
                      size={16}
                      className="flex-shrink-0 mr-1"
                    />
                    <span>{err.suggestion}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
