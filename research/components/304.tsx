import React from "react";
export namespace AutoViewInputSubTypes {
    export type CANNOT_FIND_DESIGNER_PROFILE = any;
    export namespace ResponseForm_lt_UserType {
        export type DetailProfileWithRelation_gt_ = any;
    }
}
export type AutoViewInput = any | any;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const excludeKeys = new Set([
    "__typename",
    "id",
    "internalId",
    "metadata",
    "password",
    "secret",
    "_id",
  ]);

  const isISODateString = (s: string): boolean =>
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(s);

  const formatDate = (s: string): string =>
    new Date(s).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatNumber = (n: number): string =>
    n.toLocaleString(undefined);

  function renderValue(val: any): React.ReactNode {
    if (val === null || val === undefined) {
      return <span className="text-gray-400">—</span>;
    }
    if (typeof val === "string") {
      if (isISODateString(val)) {
        return <time dateTime={val} className="text-gray-700">{formatDate(val)}</time>;
      }
      // truncate very long strings
      const short = val.length > 100 ? val.slice(0, 100) + "…" : val;
      return (
        <p className="text-gray-700 line-clamp-3 break-words">{short}</p>
      );
    }
    if (typeof val === "number") {
      return <span className="text-gray-700">{formatNumber(val)}</span>;
    }
    if (typeof val === "boolean") {
      return val ? (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          ✓ True
        </span>
      ) : (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          ✕ False
        </span>
      );
    }
    if (Array.isArray(val)) {
      if (val.length === 0) {
        return <span className="text-gray-400">Empty</span>;
      }
      // if small array, list items
      if (val.length <= 5 && val.every((v) => typeof v !== "object")) {
        return (
          <ul className="flex flex-wrap gap-2">
            {val.map((item, idx) => (
              <li
                key={idx}
                className="text-gray-700 bg-gray-100 px-2 py-1 rounded text-xs"
              >
                {String(item)}
              </li>
            ))}
          </ul>
        );
      }
      // otherwise summary
      return (
        <span className="text-gray-700">
          {val.length} item{val.length !== 1 ? "s" : ""}
        </span>
      );
    }
    if (typeof val === "object") {
      const entries = Object.entries(val).filter(
        ([k]) => !excludeKeys.has(k) && !k.startsWith("_") && k.toLowerCase().indexOf("internal") === -1
      );
      if (entries.length === 0) {
        return <span className="text-gray-400">—</span>;
      }
      return (
        <dl className="mt-2 space-y-2">
          {entries.map(([k, v]) => (
            <div key={k} className="flex flex-col sm:flex-row sm:justify-between">
              <dt className="font-medium text-gray-900 capitalize">{k.replace(/([A-Z])/g, " $1")}</dt>
              <dd className="mt-1 sm:mt-0 text-gray-700">{renderValue(v)}</dd>
            </div>
          ))}
        </dl>
      );
    }
    // fallback for other types
    return <span className="text-gray-700">{String(val)}</span>;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (value == null || typeof value !== "object") {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-gray-700">
        {renderValue(value)}
      </div>
    );
  }

  const entries = Object.entries(value).filter(
    ([k]) => !excludeKeys.has(k) && !k.startsWith("_") && k.toLowerCase().indexOf("internal") === -1
  );

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm text-gray-800">
      <dl className="divide-y divide-gray-200">
        {entries.map(([key, val]) => (
          <div
            key={key}
            className="py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <dt className="font-medium text-gray-900 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </dt>
            <dd className="mt-1 sm:mt-0 flex-1 sm:pl-4">
              {renderValue(val)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
