import React from "react";
export namespace AutoViewInputSubTypes {
    export type SELECT_MORE_THAN_ONE_IMAGE = any;
    export type ResponseForm_lt_Array_lt_string_gt__gt_ = any;
}
export type AutoViewInput = any | any;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Filter out internal or non-primitive properties for display.
  const entries = React.useMemo(() => {
    if (typeof value !== 'object' || value === null) return [];
    return Object.entries(value as Record<string, any>).filter(([key, val]) => {
      // Exclude internal keys and empty/null values
      if (
        key.startsWith('_') ||
        key.startsWith('internal') ||
        key.endsWith('Id') ||
        val == null
      ) {
        return false;
      }
      // Only show primitives or arrays
      if (typeof val === 'object' && !Array.isArray(val)) {
        return false;
      }
      return true;
    });
  }, [value]);

  // Format a camelCase or PascalCase key into a human-readable label
  const formatKey = (key: string) =>
    key
      .replace(/([A-Z])/g, ' $1')      // insert space before capitals
      .replace(/^./, str => str.toUpperCase()); // capitalize first letter

  // Format values based on type: dates, booleans, numbers, strings, arrays
  const formatValue = (val: any): React.ReactNode => {
    if (typeof val === 'boolean') {
      return (
        <span
          className={
            'px-2 py-0.5 rounded-full text-xs font-semibold ' +
            (val ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')
          }
        >
          {val ? 'Yes' : 'No'}
        </span>
      );
    }
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    if (typeof val === 'string') {
      // Detect ISO date strings
      const date = new Date(val);
      if (!isNaN(date.getTime()) && /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(val)) {
        return date.toLocaleString();
      }
      return <span className="truncate">{val}</span>;
    }
    if (Array.isArray(val)) {
      return (
        <div className="flex flex-wrap">
          {val.map((item, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mr-1 mb-1"
            >
              {String(item)}
            </span>
          ))}
        </div>
      );
    }
    return null;
  };

  // 3. Return the React element.
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-full overflow-hidden">
      {entries.length === 0 ? (
        <div className="text-gray-500 text-sm">No data available</div>
      ) : (
        <dl className="space-y-2">
          {entries.map(([key, val]) => (
            <div key={key} className="flex justify-between items-start">
              <dt className="text-gray-500 text-xs font-medium">{formatKey(key)}</dt>
              <dd className="ml-2 text-gray-900 text-sm">{formatValue(val)}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
