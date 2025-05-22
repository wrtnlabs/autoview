import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export namespace IApiProjectsColumnsCardsMoves {
    export type PostResponse = {};
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiProjectsColumnsCardsMoves.PostResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const entries =
    value && typeof value === "object"
      ? Object.entries(value).filter(([, v]) => v !== undefined && v !== null)
      : [];

  const formatKey = (key: string) => {
    // Split camelCase or snake_case into words and capitalize
    const words = key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[_-]/g, " ")
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1));
    return words.join(" ");
  };

  const formatValue = (val: any): React.ReactNode => {
    if (typeof val === "boolean") {
      return val ? (
        <LucideReact.CheckCircle
          className="text-green-500"
          size={16}
          aria-label="True"
        />
      ) : (
        <LucideReact.XCircle
          className="text-red-500"
          size={16}
          aria-label="False"
        />
      );
    }
    if (typeof val === "number") {
      return val.toLocaleString();
    }
    if (typeof val === "string") {
      // Check for ISO date
      const date = Date.parse(val);
      if (!isNaN(date) && /^\d{4}-\d{2}-\d{2}T/.test(val)) {
        return new Date(val).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      return <span className="break-all">{val}</span>;
    }
    if (Array.isArray(val)) {
      return (
        <div className="flex flex-wrap gap-2">
          {val.map((item, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded"
            >
              {String(item)}
            </span>
          ))}
        </div>
      );
    }
    if (typeof val === "object" && val !== null) {
      // Fallback for nested objects
      try {
        return (
          <pre className="whitespace-pre-wrap text-sm text-gray-700">
            {JSON.stringify(val, null, 2)}
          </pre>
        );
      } catch {
        return <span>{String(val)}</span>;
      }
    }
    return <span>{String(val)}</span>;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (entries.length === 0) {
    // Empty state placeholder
    return (
      <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-3" />
        <span className="text-lg font-medium">No data available</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-auto">
      <dl className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2">
        {entries.map(([key, val]) => (
          <div key={key} className="flex items-start">
            <dt className="w-1/3 font-medium text-gray-700">
              {formatKey(key)}:
            </dt>
            <dd className="w-2/3 text-gray-900">{formatValue(val)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
