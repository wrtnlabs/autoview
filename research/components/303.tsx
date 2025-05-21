import React from "react";
export namespace AutoViewInputSubTypes {
    export type ResponseForm_lt_true_gt_ = any;
    export type STILL_UNFOLLOW_USER = any;
    export type CANNOT_FIND_ONE_DESIGNER_TO_UNFOLLOW = any;
}
export type AutoViewInput = any | any | any;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derive key/value entries from the input object
  const entries: [string, any][] = React.useMemo(
    () => (value && typeof value === "object" ? Object.entries(value) : []),
    [value]
  );

  // 2. Helper to format different value types for display
  function formatValue(val: any): React.ReactNode {
    if (val === null || val === undefined) {
      return <span className="text-gray-400">—</span>;
    }
    if (typeof val === "boolean") {
      return (
        <span className={val ? "text-green-600" : "text-red-600"}>
          {val ? "Yes" : "No"}
        </span>
      );
    }
    if (typeof val === "number") {
      // Format large numbers with locale grouping
      return val.toLocaleString();
    }
    if (typeof val === "string") {
      // Detect ISO date strings
      const asDate = new Date(val);
      const isoPattern = /^\d{4}-\d{2}-\d{2}/;
      if (!isNaN(asDate.getTime()) && isoPattern.test(val)) {
        return asDate.toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      // Truncate very long strings
      if (val.length > 100) {
        return (
          <p className="text-gray-900 line-clamp-2 break-words">
            {val}
          </p>
        );
      }
      return <span className="text-gray-900">{val}</span>;
    }
    if (Array.isArray(val)) {
      if (val.length === 0) {
        return <span className="text-gray-500">None</span>;
      }
      // If array of strings, show as badges (up to 5)
      if (val.every((item) => typeof item === "string")) {
        return (
          <div className="flex flex-wrap gap-1">
            {val.slice(0, 5).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
            {val.length > 5 && (
              <span className="text-xs text-gray-500">+{val.length - 5}</span>
            )}
          </div>
        );
      }
      // Generic array summary
      return <span className="text-gray-900">{val.length} items</span>;
    }
    if (typeof val === "object") {
      const json = JSON.stringify(val);
      if (json.length > 100) {
        return (
          <p className="text-gray-900 line-clamp-2 break-words">
            {json}
          </p>
        );
      }
      return (
        <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded">
          {json}
        </code>
      );
    }
    // Fallback to string conversion
    return <span className="text-gray-900">{String(val)}</span>;
  }

  // 3. Return the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <dl className="grid grid-cols-1 gap-y-3">
        {entries.map(([key, val]) => (
          <div
            key={key}
            className="flex justify-between items-start"
          >
            <dt className="font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </dt>
            <dd className="ml-4 flex-1">{formatValue(val)}</dd>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="text-gray-500 italic">No data to display</p>
        )}
      </dl>
    </div>
  );
}
