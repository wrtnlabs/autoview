import React from "react";
export namespace AutoViewInputSubTypes {
    export type CANNOT_FINDONE_ARTICLE = any;
    export namespace ResponseForm_lt_ArticleType {
        export type DetailArticle_gt_ = any;
    }
}
export type AutoViewInput = any | any;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isObject = (v: any): v is Record<string, any> =>
    v !== null && typeof v === "object" && !Array.isArray(v);
  const isDateString = (str: string): boolean =>
    typeof str === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str);
  const formatDate = (str: string): string => {
    try {
      const dt = new Date(str);
      return dt.toLocaleString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    } catch {
      return str;
    }
  };
  const formatKey = (key: string): string =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/[_\-]+/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
      .trim();
  const truncate = (str: string, max = 100): string =>
    str.length > max ? `${str.slice(0, max)}…` : str;

  // Filter and prepare entries to display
  const entries: [string, any][] = isObject(value)
    ? Object.entries(value).filter(([k, v]) => {
        const lk = k.toLowerCase();
        if (v === null || v === undefined) return false;
        if (k.startsWith("_")) return false;
        if (lk.includes("internal")) return false;
        if (k.endsWith("Id")) return false;
        return true;
      })
    : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  if (!isObject(value) || entries.length === 0) {
    // Fallback for non-object or empty
    return (
      <pre className="p-4 bg-gray-50 text-sm text-gray-700 rounded-md overflow-auto">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {entries.map(([key, val]) => {
          let content: React.ReactNode;
          if (typeof val === "string") {
            if (isDateString(val)) {
              content = <span>{formatDate(val)}</span>;
            } else {
              content = <span>{truncate(val, 120)}</span>;
            }
          } else if (typeof val === "number") {
            content = (
              <span>{val.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            );
          } else if (typeof val === "boolean") {
            content = (
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  val
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {val ? "Yes" : "No"}
              </span>
            );
          } else if (Array.isArray(val)) {
            if (val.every((el) => typeof el === "string" || typeof el === "number")) {
              const items = val.slice(0, 5);
              content = (
                <div className="flex flex-wrap gap-1">
                  {items.map((el, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded"
                    >
                      {String(el)}
                    </span>
                  ))}
                  {val.length > 5 && (
                    <span className="px-2 py-0.5 text-gray-500 text-xs">+{val.length - 5}</span>
                  )}
                </div>
              );
            } else {
              content = <span>{val.length} item{val.length !== 1 ? "s" : ""}</span>;
            }
          } else if (isObject(val)) {
            const subEntries = Object.entries(val).slice(0, 3);
            content = (
              <div className="space-y-1 text-sm text-gray-700">
                {subEntries.map(([k2, v2]) => (
                  <div key={k2} className="flex">
                    <span className="font-medium text-gray-600 mr-1">
                      {formatKey(k2)}:
                    </span>
                    <span>
                      {typeof v2 === "string"
                        ? truncate(v2, 60)
                        : typeof v2 === "number"
                        ? v2.toLocaleString()
                        : typeof v2 === "boolean"
                        ? v2
                          ? "Yes"
                          : "No"
                        : Array.isArray(v2)
                        ? `${v2.length} items`
                        : "..."}
                    </span>
                  </div>
                ))}
                {Object.keys(val).length > 3 && (
                  <span className="text-gray-500 text-xs">
                    +{Object.keys(val).length - 3} more
                  </span>
                )}
              </div>
            );
          } else {
            content = <span>{String(val)}</span>;
          }

          return (
            <div key={key} className="flex flex-col">
              <dt className="text-gray-600 font-medium">{formatKey(key)}</dt>
              <dd className="text-gray-800 mt-1">{content}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
