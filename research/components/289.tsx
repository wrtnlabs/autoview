import React from "react";
export namespace AutoViewInputSubTypes {
    export type CANNOT_FINDONE_ARTICLE = any;
    export type ResponseForm_lt_boolean_gt_ = any;
}
export type AutoViewInput = any | any;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helper: detect ISO date strings
  const isIsoDateString = (str: string): boolean =>
    /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str) && !isNaN(Date.parse(str));

  // Helper: format ISO date to a readable form
  const formatDate = (str: string): string =>
    new Date(str).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  // Helper: format any value to a React node
  const formatValue = (val: any): React.ReactNode => {
    if (typeof val === "number") {
      return val.toLocaleString();
    }
    if (typeof val === "boolean") {
      return (
        <span
          className={
            "px-2 py-0.5 rounded text-xs " +
            (val ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")
          }
        >
          {val ? "Yes" : "No"}
        </span>
      );
    }
    if (typeof val === "string") {
      if (isIsoDateString(val)) {
        return formatDate(val);
      }
      if (val.length > 100) {
        return <p className="text-sm line-clamp-2">{val}</p>;
      }
      return val;
    }
    if (Array.isArray(val)) {
      if (val.length === 0) {
        return <span className="text-sm text-gray-500">—</span>;
      }
      // Small array of primitives: render badges
      if (val.every((it) => ["string", "number"].includes(typeof it))) {
        const badges = val.slice(0, 5).map((it, i) => (
          <span
            key={i}
            className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded mr-1 mb-1"
          >
            {it}
          </span>
        ));
        if (val.length > 5) {
          badges.push(
            <span key="more" className="text-xs text-gray-500">
              +{val.length - 5} more
            </span>
          );
        }
        return <div className="flex flex-wrap">{badges}</div>;
      }
      // Array of objects or mixed: show count
      return (
        <span className="text-sm text-gray-500">
          {val.length} item{val.length !== 1 ? "s" : ""}
        </span>
      );
    }
    if (typeof val === "object" && val !== null) {
      return <span className="text-sm text-gray-500">Object</span>;
    }
    return <span className="text-sm text-gray-500">—</span>;
  };

  // If no data
  if (value === null || value === undefined) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-gray-500 text-center">
        No data available
      </div>
    );
  }

  // Only display first-level object entries if present
  const entries =
    typeof value === "object" && !Array.isArray(value)
      ? Object.entries(value).slice(0, 10)
      : [];

  // Primitive or array root: show raw/JSON
  if (!entries.length) {
    const fallback =
      typeof value === "string" || typeof value === "number"
        ? String(value)
        : JSON.stringify(value, null, 2);
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-gray-800 text-sm break-words line-clamp-4">
        {fallback}
      </div>
    );
  }

  // Render object entries
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-gray-800">
      {entries.map(([key, val]) => (
        <div
          key={key}
          className="flex justify-between items-start py-2 border-b last:border-b-0"
        >
          <span className="font-medium text-sm text-gray-600 capitalize">
            {key.replace(/([A-Z])/g, " $1")}
          </span>
          <span className="text-sm">{formatValue(val)}</span>
        </div>
      ))}
    </div>
  );
}
