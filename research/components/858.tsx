import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A repository rule with ruleset details.
     *
     * @title Repository Rule
    */
    export type repository_rule_detailed = any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any;
}
export type AutoViewInput = AutoViewInputSubTypes.repository_rule_detailed[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Helper to format individual primitive values
  const formatValue = (v: string | number | boolean): string => {
    if (typeof v === "string") {
      // ISO date detection
      const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/;
      if (isoDateRegex.test(v)) {
        const d = new Date(v);
        return isNaN(d.getTime()) ? v : d.toLocaleString(undefined, {
          year: "numeric", month: "short", day: "numeric",
          hour: "2-digit", minute: "2-digit"
        });
      }
      // Truncate very long strings
      return v.length > 80 ? v.slice(0, 77) + "..." : v;
    }
    if (typeof v === "number") {
      return v.toLocaleString();
    }
    if (typeof v === "boolean") {
      return v ? "Yes" : "No";
    }
    return String(v);
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="text-gray-500 text-center p-4">
        No rules to display.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((rule: any, idx: number) => {
        // Extract primitive entries and filter out internal/meta fields
        const entries = Object.entries(rule)
          .filter(([key, val]) => {
            const isPrimitive =
              ["string", "number", "boolean"].includes(typeof val);
            const isInternal = /id$|^_+|internal|meta/i.test(key);
            return isPrimitive && !isInternal && val != null;
          });

        // Choose up to 5 entries for summary display
        const displayEntries = entries.slice(0, 5);

        // Determine a header label
        const header =
          typeof rule.name === "string"
            ? rule.name
            : typeof rule.title === "string"
            ? rule.title
            : `Rule ${idx + 1}`;

        return (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
              {header}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {displayEntries.map(([key, val]) => (
                <div key={key} className="flex">
                  <span className="font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>
                  <span className="ml-2 text-gray-900 truncate">
                    {formatValue(val as any)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
