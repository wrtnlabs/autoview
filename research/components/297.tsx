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

  // Humanize object keys: camelCase or snake_case to Title Case
  const formatKey = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/[_\-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^./, str => str.toUpperCase());
  };

  // Format dates, numbers, booleans, arrays, and fallback for objects/strings
  const formatValue = (key: string, val: any): React.ReactNode => {
    if (val === null || val === undefined) {
      return <span className="text-gray-400">–</span>;
    }
    // Boolean
    if (typeof val === 'boolean') {
      return (
        <span
          className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
            val ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {val ? 'Yes' : 'No'}
        </span>
      );
    }
    // Number
    if (typeof val === 'number') {
      return new Intl.NumberFormat('en-US').format(val);
    }
    // ISO date string detection
    if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(val)) {
      const date = new Date(val);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      }
    }
    // Array of primitives
    if (Array.isArray(val) && val.every(item => ['string', 'number'].includes(typeof item))) {
      return (
        <div className="flex flex-wrap gap-1">
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
    // Array of objects or mixed
    if (Array.isArray(val)) {
      return (
        <span className="text-sm text-gray-700">
          {val.length} item{val.length !== 1 ? 's' : ''}
        </span>
      );
    }
    // Object
    if (typeof val === 'object') {
      // Inline JSON preview truncated
      const preview = JSON.stringify(val);
      return (
        <pre className="text-xs text-gray-700 truncate max-w-full whitespace-pre-wrap">
          {preview}
        </pre>
      );
    }
    // Fallback for strings (truncate long text)
    if (typeof val === 'string') {
      const isLong = val.length > 100;
      return (
        <p className={`${isLong ? 'line-clamp-2' : ''} text-gray-900`}>
          {val}
        </p>
      );
    }
    // Fallback
    return <span className="text-gray-900">{String(val)}</span>;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Filter out internal or identifier fields.
  const entries = value && typeof value === 'object'
    ? Object.entries(value as Record<string, any>).filter(
        ([key]) =>
          !/^_/.test(key) &&
          !/internal/i.test(key) &&
          !/id$/i.test(key)
      )
    : [];

  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {entries.length > 0 ? (
        <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
          {entries.map(([key, val]) => (
            <React.Fragment key={key}>
              <dt className="text-sm font-medium text-gray-500 capitalize">
                {formatKey(key)}
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatValue(key, val)}
              </dd>
            </React.Fragment>
          ))}
        </dl>
      ) : (
        <p className="text-gray-500 text-sm">No displayable data.</p>
      )}
    </div>
  );
}
