import React from "react";
export namespace AutoViewInputSubTypes {
    export type CANNOT_FIND_DESIGNER_PROFILE = any;
    export namespace ResponseForm_lt_UserType {
        export type DetailProfile_gt_ = any;
    }
}
export type AutoViewInput = any | any;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // ISO 8601 detection
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

  // Format a single value based on its type
  function formatValue(val: any): React.ReactNode {
    if (val == null) {
      return <span className="text-gray-500 italic">—</span>;
    }
    // String: check date or truncate
    if (typeof val === "string") {
      if (isoDateRegex.test(val) && !isNaN(Date.parse(val))) {
        const dt = new Date(val);
        return (
          <time dateTime={val} className="text-gray-700">
            {dt.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            {dt.toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
        );
      }
      const trimmed = val.length > 100 ? val.slice(0, 100) + "…" : val;
      return (
        <span
          className="text-gray-800"
          title={val.length > 100 ? val : undefined}
        >
          {trimmed}
        </span>
      );
    }
    // Number: localized
    if (typeof val === "number") {
      return (
        <span className="text-gray-800">
          {val.toLocaleString(undefined)}
        </span>
      );
    }
    // Boolean: badge
    if (typeof val === "boolean") {
      return (
        <span
          className={
            "inline-block px-2 py-1 text-xs font-semibold rounded " +
            (val
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800")
          }
        >
          {val ? "Yes" : "No"}
        </span>
      );
    }
    // Array: badges or list
    if (Array.isArray(val)) {
      if (val.length === 0) {
        return <span className="text-gray-500 italic">None</span>;
      }
      return (
        <div className="flex flex-wrap gap-2">
          {val.map((item, idx) => {
            const primitive =
              item == null ||
              ["string", "number", "boolean"].includes(typeof item);
            const content = primitive
              ? String(item)
              : JSON.stringify(item);
            return (
              <span
                key={idx}
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                title={!primitive ? content : undefined}
              >
                {content.length > 20 ? content.slice(0, 20) + "…" : content}
              </span>
            );
          })}
        </div>
      );
    }
    // Object: nested JSON (truncated)
    if (typeof val === "object") {
      const json = JSON.stringify(val, null, 2);
      const short = json.length > 200 ? json.slice(0, 200) + "\n…" : json;
      return (
        <pre
          className="bg-gray-50 text-xs text-gray-800 p-2 rounded overflow-auto"
          title={json.length > 200 ? json : undefined}
        >
          {short}
        </pre>
      );
    }
    // Fallback
    return <span className="text-gray-800">{String(val)}</span>;
  }

  // Extract entries for object values, filtering out internal or private keys
  const entries: [string, any][] =
    value && typeof value === "object" && !Array.isArray(value)
      ? Object.entries(value).filter(
          ([key]) => !key.startsWith("_") && !/internal/i.test(key)
        )
      : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  if (value == null) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No data available.
      </div>
    );
  }

  // If the root is an array, display as list
  if (Array.isArray(value)) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          List ({value.length} items)
        </h2>
        <ul className="divide-y divide-gray-200">
          {value.map((item, idx) => (
            <li
              key={idx}
              className="py-2 flex items-start space-x-2 text-gray-800"
            >
              <span className="font-mono text-sm text-gray-500">
                {idx + 1}.
              </span>
              <div className="flex-1">{formatValue(item)}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // If the root is a primitive, just format it
  if (entries.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        {formatValue(value)}
      </div>
    );
  }

  // Otherwise, render a key-value list
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <dl className="space-y-3">
        {entries.map(([key, val]) => {
          // Convert camelCase or snake_case to Title Case
          const label = key
            .replace(/[_\-]/g, " ")
            .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
            .replace(/\b\w/g, (c) => c.toUpperCase());
          return (
            <div
              key={key}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-start"
            >
              <dt className="text-gray-600 font-medium">{label}</dt>
              <dd className="mt-1 sm:mt-0 sm:ml-4 flex-1">
                {formatValue(val)}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
