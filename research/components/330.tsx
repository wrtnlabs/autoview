import LucideReact from "lucide-react";
import React, { JSX } from "react";

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
  // 1. Transform raw key-value pairs into display-friendly entries
  const entries = Object.entries(value);
  const formattedEntries = entries
    .filter(([, emoji]) => Boolean(emoji))
    .map(([key, emoji]) => {
      const displayName = key
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      return { key, emoji, displayName };
    });

  // 2. Handle empty state
  if (formattedEntries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.Smile className="text-gray-400 mb-2" size={48} />
        <p className="text-sm">No emojis available</p>
      </div>
    );
  }

  // 3. Render a responsive emoji grid
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Emojis ({formattedEntries.length})
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {formattedEntries.map(({ key, emoji, displayName }) => (
          <div
            key={key}
            className="flex flex-col items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition"
          >
            <span
              role="img"
              aria-label={displayName}
              className="text-3xl mb-2 select-none"
            >
              {emoji}
            </span>
            <span className="text-sm text-gray-600 truncate">
              {displayName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
