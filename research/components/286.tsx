import React from "react";
export namespace AutoViewInputSubTypes {
    export type CANNOT_FIND_ONE_REPLY_COMMENT = any;
    export type NOT_FOUND_ARTICLE_TO_COMMENT = any;
    export type TOO_MANY_REPORTED_ARTICLE = any;
    export type CANNOT_FIND_IMAGE_TO_LEFT_COMMENT = any;
    export namespace ResponseForm_lt_CommentType {
        export type CreateResponse_gt_ = any;
    }
}
export type AutoViewInput = any | any | any | any | any;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define helper functions for formatting and filtering
  const isDateString = (str: string): boolean => {
    const d = Date.parse(str);
    return !isNaN(d) && /\d{4}-\d{2}-\d{2}T/.test(str);
  };

  const humanizeKey = (key: string): string =>
    key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim();

  const formatValue = (val: any): React.ReactNode => {
    if (val === null || val === undefined) {
      return <span className="text-gray-400 italic">N/A</span>;
    }
    if (typeof val === 'string') {
      if (isDateString(val)) {
        const date = new Date(val);
        return (
          <time dateTime={val} className="text-gray-700">
            {date.toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </time>
        );
      }
      const truncated = val.length > 100 ? val.slice(0, 100) + '…' : val;
      return <span className="text-gray-800">{truncated}</span>;
    }
    if (typeof val === 'number') {
      return <span className="text-gray-800">{val}</span>;
    }
    if (typeof val === 'boolean') {
      return (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            val ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {val ? 'Yes' : 'No'}
        </span>
      );
    }
    if (Array.isArray(val)) {
      const length = val.length;
      if (length === 0) {
        return <span className="text-gray-500 italic">No items</span>;
      }
      // If array of primitives, join
      if (val.every((v) => ['string', 'number', 'boolean'].includes(typeof v))) {
        const items = (val as Array<string | number | boolean>)
          .slice(0, 5)
          .map((v) => String(v))
          .join(', ');
        return (
          <span className="text-gray-800">
            {items}
            {length > 5 ? `, +${length - 5} more` : ''}
          </span>
        );
      }
      // Otherwise show count
      return (
        <span className="text-gray-800">
          {length} item{length !== 1 ? 's' : ''}
        </span>
      );
    }
    if (typeof val === 'object') {
      // Show up to 3 keys of nested object
      const subEntries = Object.entries(val).slice(0, 3);
      return (
        <ul className="list-disc list-inside text-gray-800">
          {subEntries.map(([k, v]) => (
            <li key={k}>
              <span className="font-medium">{humanizeKey(k)}:</span>{' '}
              {formatValue(v)}
            </li>
          ))}
          {Object.keys(val).length > 3 && (
            <li className="text-gray-500 italic">
              +{Object.keys(val).length - 3} more fields
            </li>
          )}
        </ul>
      );
    }
    // Fallback
    return <span className="text-gray-800">{String(val)}</span>;
  };

  // 2. Filter and prepare entries for display
  if (value === null || value === undefined) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500 italic">
        No data to display
      </div>
    );
  }

  // If a primitive or array at root, just format it
  const rootType = typeof value;
  if (
    rootType === 'string' ||
    rootType === 'number' ||
    rootType === 'boolean' ||
    Array.isArray(value)
  ) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        {formatValue(value)}
      </div>
    );
  }

  // For objects, create entries
  const entries = Object.entries(value as Record<string, any>).filter(
    ([key, val]) =>
      key !== 'id' &&
      !key.toLowerCase().includes('internal') &&
      !key.toLowerCase().endsWith('id')
  );

  if (entries.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500 italic">
        No displayable fields
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {entries.map(([key, val]) => (
        <div key={key} className="flex flex-col sm:flex-row sm:items-start">
          <dt className="w-full sm:w-1/3 text-gray-500 font-medium">
            {humanizeKey(key)}
          </dt>
          <dd className="w-full sm:w-2/3 mt-1 sm:mt-0">{formatValue(val)}</dd>
        </div>
      ))}
    </div>
  );
}
