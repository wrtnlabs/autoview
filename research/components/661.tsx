import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Check Annotation
     *
     * @title Check Annotation
    */
    export type check_annotation = {
        path: string;
        start_line: number & tags.Type<"int32">;
        end_line: number & tags.Type<"int32">;
        start_column: (number & tags.Type<"int32">) | null;
        end_column: (number & tags.Type<"int32">) | null;
        annotation_level: string | null;
        title: string | null;
        message: string | null;
        raw_details: string | null;
        blob_href: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.check_annotation[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const annotations = value;
  const total = annotations.length;

  // Count annotations by level
  const counts = annotations.reduce((acc, ann) => {
    const lvl = (ann.annotation_level ?? "note").toLowerCase();
    acc[lvl] = (acc[lvl] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Mapping of levels to badge colors
  const levelClasses: Record<string, string> = {
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    note: "bg-blue-100 text-blue-800",
    notice: "bg-blue-100 text-blue-800",
    info: "bg-blue-100 text-blue-800",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {total === 0 ? (
        <div className="py-6 text-center text-gray-500 italic">
          No annotations to display.
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">
              Total: {total} annotation{total > 1 ? "s" : ""}
            </span>
            {Object.entries(counts).map(([level, count]) => {
              const cls = levelClasses[level] || "bg-gray-100 text-gray-800";
              const label = level.charAt(0).toUpperCase() + level.slice(1);
              return (
                <span
                  key={level}
                  className={`px-2 py-1 text-xs font-semibold rounded ${cls}`}
                >
                  {count} {label}
                  {count > 1 ? "s" : ""}
                </span>
              );
            })}
          </div>

          {/* Annotation List */}
          <div className="space-y-4">
            {annotations.map((ann, idx) => {
              const lvl = (ann.annotation_level ?? "note").toLowerCase();
              const badgeCls = levelClasses[lvl] || "bg-gray-100 text-gray-800";
              const label = lvl.charAt(0).toUpperCase() + lvl.slice(1);

              // Derive location string
              let location =
                ann.start_line === ann.end_line
                  ? `Line ${ann.start_line}`
                  : `Lines ${ann.start_line}–${ann.end_line}`;
              if (
                ann.start_column != null &&
                ann.end_column != null
              ) {
                location += `, cols ${ann.start_column}–${ann.end_column}`;
              }

              return (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-lg shadow"
                >
                  <div className="flex items-center">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${badgeCls}`}
                    >
                      {label}
                    </span>
                    <span className="ml-2 text-sm font-medium text-gray-800 truncate">
                      {ann.path}
                    </span>
                    <span className="ml-auto text-xs text-gray-500 whitespace-nowrap">
                      {location}
                    </span>
                  </div>

                  {ann.title && (
                    <div className="mt-2 text-sm font-medium text-gray-900 truncate">
                      {ann.title}
                    </div>
                  )}
                  {ann.message && (
                    <div className="mt-1 text-sm text-gray-700 line-clamp-2">
                      {ann.message}
                    </div>
                  )}
                  {ann.raw_details && (
                    <div className="mt-1 text-xs text-gray-500 line-clamp-3">
                      {ann.raw_details}
                    </div>
                  )}

                  <div className="mt-2 text-xs font-mono text-blue-600 truncate">
                    {ann.blob_href}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
