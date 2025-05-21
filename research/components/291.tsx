import React from "react";
export namespace AutoViewInputSubTypes {
    export type CANNOT_FINDONE_ARTICLE = any;
    export namespace ResponseForm_lt_ArticleType {
        export type DetailArticle_gt_ = any;
    }
    export type IS_SAME_POSITION = any;
}
export type AutoViewInput = any | any | any;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    We build a generic, read-only overview for arbitrary JSON-like data.
  const isObject =
    value !== null && typeof value === "object" && !Array.isArray(value);
  const entries: [string, unknown][] = isObject
    ? Object.entries(value as Record<string, unknown>)
    : [];

  // Convert camelCase or snake_case keys to Title Case labels
  const formatKey = (key: string): string => {
    const withSpaces = key
      .replace(/([A-Z])/g, " $1")
      .replace(/[_\-]+/g, " ")
      .trim();
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  };

  // Format various value types into human-readable strings or previews
  const formatValue = (val: unknown): string => {
    if (val === null) return "null";
    if (val === undefined) return "undefined";
    if (typeof val === "boolean") return val ? "Yes" : "No";
    if (typeof val === "number") {
      return val.toLocaleString();
    }
    if (typeof val === "string") {
      // Date-like ISO string
      const isoDateMatch = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val);
      if (isoDateMatch) {
        const d = new Date(val);
        if (!isNaN(d.getTime())) {
          return d.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        }
      }
      // Truncate long strings
      const maxLen = 100;
      if (val.length > maxLen) {
        return val.slice(0, maxLen) + "…";
      }
      return val;
    }
    if (Array.isArray(val)) {
      return `${val.length} item${val.length === 1 ? "" : "s"}`;
    }
    if (typeof val === "object") {
      const keys = Object.keys(val as Record<string, unknown>);
      return `{…} ${keys.length} propert${keys.length === 1 ? "y" : "ies"}`;
    }
    return String(val);
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!isObject) {
    // Fallback for primitive or array inputs
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Value
        </h2>
        <pre className="overflow-x-auto text-sm font-mono text-gray-700 dark:text-gray-300">
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Data Overview
      </h2>
      <dl className="divide-y divide-gray-200 dark:divide-gray-700">
        {entries.map(([key, val]) => (
          <div
            key={key}
            className="py-2 grid grid-cols-3 gap-x-4"
          >
            <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {formatKey(key)}
            </dt>
            <dd className="col-span-2 text-sm text-gray-800 dark:text-gray-200 truncate">
              {formatValue(val)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
