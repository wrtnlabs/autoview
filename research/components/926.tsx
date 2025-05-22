import React from "react";
export namespace AutoViewInputSubTypes {
    export type private_user = any;
    export type public_user = any;
}
export type AutoViewInput = any | any;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const obj = (value || {}) as Record<string, any>;
  const omitKeys = ['id', 'userId', 'authorId', 'contentId', 'internalId', 'metadata', 'internalAdminNotes'];
  const entries: { key: string; label: string; value: React.ReactNode }[] = [];

  // Derived fullName if firstName & lastName are present
  if (typeof obj.firstName === 'string' && typeof obj.lastName === 'string') {
    entries.push({
      key: 'fullName',
      label: 'Name',
      value: `${obj.firstName} ${obj.lastName}`,
    });
  }

  // Process other displayable properties
  for (const [rawKey, rawVal] of Object.entries(obj)) {
    if (omitKeys.includes(rawKey)) continue;
    if ((rawKey === 'firstName' || rawKey === 'lastName') && entries.some(e => e.key === 'fullName')) continue;
    if (rawVal == null) continue;

    let displayVal: React.ReactNode = null;

    // Dates (ISO strings)
    if (typeof rawVal === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(rawVal)) {
      displayVal = new Date(rawVal).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
    // Booleans
    else if (typeof rawVal === 'boolean') {
      displayVal = (
        <span
          className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
            rawVal ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {rawVal ? 'Yes' : 'No'}
        </span>
      );
    }
    // Numbers
    else if (typeof rawVal === 'number') {
      displayVal = rawVal.toLocaleString();
    }
    // Arrays of primitives
    else if (Array.isArray(rawVal) && rawVal.every(item => ['string', 'number'].includes(typeof item))) {
      const arr = rawVal as (string | number)[];
      displayVal = arr.length > 5 ? `${arr.slice(0, 5).join(', ')}...` : arr.join(', ');
    }
    // Strings
    else if (typeof rawVal === 'string') {
      displayVal = rawVal.length > 100 ? `${rawVal.slice(0, 100)}...` : rawVal;
    } else {
      // Skip nested objects or unsupported types
      continue;
    }

    // Humanize key as label
    const label = rawKey
      .replace(/([A-Z])/g, ' $1')
      .replace(/[_-]/g, ' ')
      .replace(/^./, str => str.toUpperCase());

    entries.push({ key: rawKey, label, value: displayVal });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (entries.length === 0) {
    // Fallback for totally unknown shapes
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <pre className="text-sm text-gray-500 truncate">{JSON.stringify(obj)}</pre>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {entries.map(({ key, label, value: val }) => (
          <div key={key} className="flex flex-col">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 text-sm text-gray-900">{val}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
