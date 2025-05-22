import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiEmojis {
        export type GetResponse = {
            [key: string]: string;
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiEmojis.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Here we transform the emoji map into a sorted array of entries.
  const emojiEntries: [string, string][] = Object.entries(value).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    We display a responsive grid of emoji images with their corresponding names.
  if (emojiEntries.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No emojis available.
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {emojiEntries.map(([name, url]) => (
          <div
            key={name}
            className="flex flex-col items-center space-y-2 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={url}
              alt={name}
              className="w-10 h-10 object-contain"
              loading="lazy"
            />
            <span className="mt-1 text-xs font-medium text-gray-700 truncate">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
