import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposInteractionLimits {
        export type GetResponse = any | {};
    }
    export type interaction_limit_response = any;
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposInteractionLimits.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Humanize keys: camelCase or snake_case to Title Case
  const humanizeKey = (key: string): string =>
    key
      .replace(/([A-Z])/g, ' $1')
      .replace(/[_\-]+/g, ' ')
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
      .trim();

  // Abbreviate large numbers (e.g., 1500 -> 1.5K)
  const abbreviateNumber = (num: number): string => {
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toString();
  };

  // Format values based on key and type
  const formatValue = (key: string, raw: any): string => {
    if (raw === null || raw === undefined) {
      return '—';
    }
    // Dates or timestamps
    const lowerKey = key.toLowerCase();
    if (
      (lowerKey.includes('date') ||
        lowerKey.includes('time') ||
        lowerKey.includes('reset')) &&
      (typeof raw === 'number' || /^\d+$/.test(String(raw)))
    ) {
      // GitHub often returns seconds since epoch
      const n = Number(raw);
      const ms = n < 1e12 ? n * 1000 : n;
      const d = new Date(ms);
      return d.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    if (typeof raw === 'number') {
      return abbreviateNumber(raw);
    }
    if (typeof raw === 'boolean') {
      return raw ? 'Yes' : 'No';
    }
    if (Array.isArray(raw)) {
      if (raw.length === 0) return '—';
      return raw.join(', ');
    }
    // Fallback to string
    return String(raw);
  };

  // Prepare entries for display
  const entries: [string, any][] =
    typeof value === 'object' && value !== null
      ? Object.entries(value)
          // filter out deeply nested empty objects or functions
          .filter(
            ([, v]) =>
              v !== null &&
              v !== undefined &&
              typeof v !== 'function' &&
              // skip empty objects
              !(typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0)
          )
      : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (entries.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Interaction Limits Overview
      </h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {entries.map(([key, val]) => (
          <div key={key} className="flex">
            <dt className="w-1/2 font-medium text-gray-700 truncate">
              {humanizeKey(key)}
            </dt>
            <dd className="w-1/2 text-gray-900 truncate">
              {formatValue(key, val)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
