import React from "react";
export namespace AutoViewInputSubTypes {
    export type CANNOT_FIND_ONE_COMMENT = any;
    export type ResponseForm_lt_boolean_gt_ = any;
}
export type AutoViewInput = any | any;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Utility to detect ISO date strings
  const isIsoDate = (str: string): boolean => {
    const d = Date.parse(str);
    return !isNaN(d) && /^\d{4}-\d{2}-\d{2}T/.test(str);
  };

  // Format functions
  const formatDate = (str: string): string =>
    new Date(str).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatNumber = (num: number): string =>
    new Intl.NumberFormat(undefined).format(num);

  // Render any value according to its type
  const renderValue = (val: any): React.ReactNode => {
    if (val == null) {
      return <span className="text-gray-500">N/A</span>;
    }
    if (typeof val === "boolean") {
      return (
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            val ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {val ? "Yes" : "No"}
        </span>
      );
    }
    if (typeof val === "number") {
      return <span>{formatNumber(val)}</span>;
    }
    if (typeof val === "string") {
      if (isIsoDate(val)) {
        return (
          <time dateTime={val} className="text-gray-700">
            {formatDate(val)}
          </time>
        );
      }
      if (val.length > 120) {
        return <p className="line-clamp-3 text-gray-800">{val}</p>;
      }
      return <span className="text-gray-800">{val}</span>;
    }
    if (Array.isArray(val)) {
      // Array of strings as badges
      if (val.every((v) => typeof v === "string")) {
        return (
          <div className="flex flex-wrap gap-1">
            {(val as string[]).map((item, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded"
              >
                {item}
              </span>
            ))}
          </div>
        );
      }
      // Fallback: JSON-pretty
      return (
        <pre className="whitespace-pre-wrap text-sm text-gray-800 max-h-40 overflow-auto">
          {JSON.stringify(val, null, 2)}
        </pre>
      );
    }
    if (typeof val === "object") {
      // Nested object: render recursively
      return <div className="pl-4 border-l border-gray-200">{renderFields(val)}</div>;
    }
    // Fallback for other types
    return <span className="text-gray-800">{String(val)}</span>;
  };

  // Render object fields as key/value list
  const renderFields = (obj: Record<string, any>): React.ReactNode[] => {
    return Object.entries(obj)
      .filter(([key]) => {
        // Filter out common internal or non-informative keys
        const lower = key.toLowerCase();
        return (
          !key.startsWith("_") &&
          !lower.endsWith("id") &&
          !["internaladminnotes", "rawtext", "processedhtml", "fulldetails"].includes(
            lower
          )
        );
      })
      .map(([key, val]) => {
        // Humanize the key: camelCase to Title Case
        const label = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        return (
          <div
            key={key}
            className="flex justify-between items-start py-2 border-b last:border-b-0"
          >
            <span className="font-medium text-gray-700">{label}</span>
            <div className="text-right">{renderValue(val)}</div>
          </div>
        );
      });
  };

  // Main wrapper
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-full">
      {value && typeof value === "object" ? (
        renderFields(value as Record<string, any>)
      ) : (
        <div className="text-gray-800">{String(value)}</div>
      )}
    </div>
  );
}
