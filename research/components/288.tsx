import React from "react";
export namespace AutoViewInputSubTypes {
    export type CANNOT_FINDONE_ARTICLE = any;
    export type ResponseForm_lt_boolean_gt_ = any;
    export type IS_NOT_WRITER_OF_THIS_ARTICLE = any;
}
export type AutoViewInput = any | any | any;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Generic formatter for various types, with recursion up to one level deep.
  const formatValue = (v: any, depth: number = 0): React.ReactNode => {
    if (v === null || v === undefined) {
      return <span className="text-gray-500">N/A</span>;
    }
    if (typeof v === "string") {
      // ISO date detection
      const isoMatch = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(v);
      if (isoMatch && !isNaN(Date.parse(v))) {
        return (
          <time dateTime={v} className="text-gray-700">
            {new Date(v).toLocaleString()}
          </time>
        );
      }
      // Truncate long strings
      const truncated = v.length > 80 ? v.slice(0, 80) + "…" : v;
      return <span className="text-gray-700">{truncated}</span>;
    }
    if (typeof v === "number") {
      return (
        <span className="text-gray-700">
          {v.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </span>
      );
    }
    if (typeof v === "boolean") {
      return (
        <span
          className={
            "px-2 py-1 text-xs font-semibold rounded " +
            (v
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800")
          }
        >
          {v ? "True" : "False"}
        </span>
      );
    }
    if (Array.isArray(v)) {
      const preview = v.slice(0, 5);
      return (
        <div className="flex flex-wrap gap-1">
          {preview.map((item, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs"
            >
              {typeof item === "object" ? JSON.stringify(item) : String(item)}
            </span>
          ))}
          {v.length > preview.length && (
            <span className="text-gray-500 text-xs">
              +{v.length - preview.length} more
            </span>
          )}
        </div>
      );
    }
    if (typeof v === "object" && depth < 1) {
      return (
        <div className="border border-gray-100 rounded p-2 bg-gray-50 space-y-1">
          {Object.entries(v).map(([k, val]) => (
            <div
              key={k}
              className="flex justify-between text-sm"
            >
              <span className="text-gray-600">{k}</span>
              <span>{formatValue(val, depth + 1)}</span>
            </div>
          ))}
        </div>
      );
    }
    // Fallback for other cases
    return <span className="text-gray-700">{String(v)}</span>;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (value == null || typeof value !== "object") {
    return (
      <div className="p-4 bg-white rounded-lg shadow text-gray-700">
        {String(value)}
      </div>
    );
  }

  const entries = Object.entries(value);
  if (entries.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow text-gray-500">
        No data available.
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Data Overview
      </h2>
      <div className="divide-y divide-gray-200">
        {entries.map(([key, val]) => (
          <div
            key={key}
            className="py-2 flex justify-between items-start"
          >
            <span className="text-gray-600">{key}</span>
            <div className="ml-4 flex-1 text-right">
              {formatValue(val)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
