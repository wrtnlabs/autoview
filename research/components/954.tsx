import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiUserInteractionLimits {
        export type GetResponse = any | {};
    }
    export type interaction_limit_response = any;
}
export type AutoViewInput = AutoViewInputSubTypes.IApiUserInteractionLimits.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const entries = React.useMemo(
    () =>
      value && typeof value === 'object' && !Array.isArray(value)
        ? Object.entries(value as Record<string, any>)
        : [],
    [value]
  );

  const formatKey = (key: string): string =>
    key
      .replace(/([A-Z])/g, ' $1')
      .replace(/[_-]/g, ' ')
      .replace(/^./, str => str.toUpperCase());

  const isIsoDate = (str: string): boolean =>
    typeof str === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/.test(str);

  const formatDate = (str: string): string =>
    new Date(str).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  const truncate = (str: string, length: number = 60): string =>
    str.length > length ? str.slice(0, length) + '…' : str;

  const renderValue = (val: any): React.ReactNode => {
    if (val == null) {
      return <span className="text-gray-400">—</span>;
    }
    if (typeof val === 'string') {
      if (isIsoDate(val)) {
        return <span>{formatDate(val)}</span>;
      }
      return (
        <span title={val} className="block truncate">
          {truncate(val)}
        </span>
      );
    }
    if (typeof val === 'number') {
      return <span>{val.toLocaleString()}</span>;
    }
    if (typeof val === 'boolean') {
      return val ? (
        <span className="text-green-600 font-semibold">True</span>
      ) : (
        <span className="text-red-600 font-semibold">False</span>
      );
    }
    if (Array.isArray(val)) {
      return (
        <span>
          {val.length} item{val.length !== 1 ? 's' : ''}
        </span>
      );
    }
    if (typeof val === 'object') {
      const keys = Object.keys(val);
      return (
        <span>
          {keys.length} key{keys.length !== 1 ? 's' : ''}
        </span>
      );
    }
    return <span>{String(val)}</span>;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  if (!entries.length) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <p className="text-center text-gray-500">No data available</p>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Details</h2>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {entries.map(([key, val]) => (
          <React.Fragment key={key}>
            <dt className="text-sm font-medium text-gray-500">{formatKey(key)}</dt>
            <dd className="text-sm text-gray-900">{renderValue(val)}</dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
}
