import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Custom property name and associated value
     *
     * @title Custom Property Value
    */
    export type custom_property_value = {
        /**
         * The name of the property
        */
        property_name: string;
        /**
         * The value assigned to the property
        */
        value: string | string[] | null;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.custom_property_value[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatPropertyName = (key: string): string =>
    key
      .replace(/[_-]/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());

  const truncateText = (text: string, maxLen = 100): string =>
    text.length > maxLen ? `${text.slice(0, maxLen)}…` : text;

  // Prepare an array of JSX elements for each property
  const items = value.map((item, idx) => {
    const label = formatPropertyName(item.property_name);
    let content: React.ReactNode;

    if (item.value === null) {
      content = <span className="text-gray-400 italic">—</span>;
    } else if (Array.isArray(item.value)) {
      if (item.value.length === 0) {
        content = <span className="text-gray-400 italic">None</span>;
      } else {
        content = (
          <div className="flex flex-wrap gap-2">
            {item.value.map((v, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
              >
                {truncateText(v, 30)}
              </span>
            ))}
          </div>
        );
      }
    } else {
      const text = item.value;
      content = (
        <span className="text-gray-900">
          {truncateText(text, 100)}
        </span>
      );
    }

    return (
      <div key={idx} className="flex flex-col">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm">{content}</dd>
      </div>
    );
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <dl className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
        {items}
      </dl>
    </div>
  );
}
