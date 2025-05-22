import React from "react";
export namespace AutoViewInputSubTypes {
    export type CANNOT_FINDONE_ARTICLE = any;
    export type ARLEADY_REPORTED_ARTICLE = any;
    export type ResponseForm_lt_true_gt_ = any;
}
export type AutoViewInput = any | any | any;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Extract top‐level simple properties for display.
  const entries = React.useMemo(() => {
    if (typeof value !== 'object' || value === null) return [];
    return Object.entries(value as Record<string, any>).filter(
      ([, v]) => ['string', 'number', 'boolean'].includes(typeof v)
    );
  }, [value]);

  // Format a camelCase or snake_case key into Start Case.
  const formatKey = (key: string) =>
    key
      .replace(/[_-]/g, ' ')
      .replace(/([a-z])([A-Z])/g, (_, a, b) => `${a} ${b}`)
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  // Format basic values: booleans as Yes/No, numbers as-is, strings as-is.
  const formatVal = (v: string | number | boolean) => {
    if (typeof v === 'boolean') return v ? 'Yes' : 'No';
    return String(v);
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      {entries.length > 0 ? (
        <dl className="grid grid-cols-1 gap-y-2">
          {entries.map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <dt className="text-sm font-medium text-gray-700 truncate">
                {formatKey(k)}
              </dt>
              <dd className="text-sm text-gray-900">{formatVal(v as any)}</dd>
            </div>
          ))}
        </dl>
      ) : (
        // Fallback: pretty-print JSON, truncated to 4 lines for performance.
        <pre className="text-sm text-gray-800 whitespace-pre-wrap line-clamp-4">
          {JSON.stringify(value, null, 2)}
        </pre>
      )}
    </div>
  );
}
