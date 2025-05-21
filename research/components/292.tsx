import React from "react";
export namespace AutoViewInputSubTypes {
    export type SELECT_MORE_THAN_ONE_IMAGE = any;
    export type ResponseForm_lt_Array_lt_string_gt__gt_ = any;
}
export type AutoViewInput = any | any;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Utility: detect ISO date strings
  const isIsoDate = (str: string): boolean =>
    typeof str === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.*Z$/.test(str);

  // Format a date string into a human-readable form
  const formatDate = (str: string): string =>
    new Date(str).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  // Format numbers with locale separators
  const formatNumber = (num: number): string =>
    new Intl.NumberFormat().format(num);

  // Recursively render any value
  const renderVal = (val: any): React.ReactNode => {
    if (val === null || val === undefined) {
      return <span className="text-gray-400">—</span>;
    }
    if (typeof val === "boolean") {
      return (
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
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
        return <time dateTime={val}>{formatDate(val)}</time>;
      }
      return (
        <span className="text-gray-900 block line-clamp-2 break-words">
          {val}
        </span>
      );
    }
    if (Array.isArray(val)) {
      // primitives?
      const primitives = val.every(
        (item) =>
          typeof item === "string" ||
          typeof item === "number" ||
          typeof item === "boolean"
      );
      if (primitives) {
        return (
          <div className="flex flex-wrap">
            {val.slice(0, 10).map((item, idx) => (
              <span
                key={idx}
                className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mr-1 mb-1"
              >
                {String(item)}
              </span>
            ))}
            {val.length > 10 && (
              <span className="text-gray-500 text-xs">+{val.length - 10} more</span>
            )}
          </div>
        );
      }
      // array of objects or mixed: show count and first item summary
      return (
        <div>
          <span className="text-gray-700">{val.length} items</span>
          {val.length > 0 && typeof val[0] === "object" && (
            <div className="mt-2 pl-2 border-l border-gray-200">
              {renderVal(val[0])}
              {val.length > 1 && (
                <p className="text-gray-500 text-xs mt-1">
                  +{val.length - 1} more...
                </p>
              )}
            </div>
          )}
        </div>
      );
    }
    if (typeof val === "object") {
      const entries = Object.entries(val)
        .filter(
          ([key]) =>
            !/^_/.test(key) &&
            !/(internal|meta|metadata)/i.test(key) &&
            !/(?:^|[^a-z])(id)$/i.test(key)
        )
        .slice(0, 20);
      if (entries.length === 0) {
        return <span className="text-gray-500">No details</span>;
      }
      return (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          {entries.map(([k, v]) => (
            <React.Fragment key={k}>
              <dt className="text-xs font-semibold text-gray-500 capitalize">
                {k.replace(/([A-Z])/g, " $1")}
              </dt>
              <dd className="text-sm text-gray-900">{renderVal(v)}</dd>
            </React.Fragment>
          ))}
        </dl>
      );
    }
    // fallback
    return <span>{String(val)}</span>;
  };

  // Render the root value
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full overflow-auto">
      {renderVal(value)}
    </div>
  );
}
