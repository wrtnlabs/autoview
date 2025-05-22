import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Color-coded labels help you categorize and filter your issues (just like labels in Gmail).
     *
     * @title Label
    */
    export type label = {
        /**
         * Unique identifier for the label.
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * URL for the label
        */
        url: string;
        /**
         * The name of the label.
        */
        name: string;
        /**
         * Optional description of the label, such as its purpose.
        */
        description: string | null;
        /**
         * 6-character hex code, without the leading #, identifying the color
        */
        color: string;
        /**
         * Whether this label comes by default in a new repository.
        */
        "default": boolean;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.label;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants.
  const bgColor = `#${value.color}`;
  const getTextColorClass = (hexColor: string): string => {
    const c = hexColor.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16) / 255;
    const g = parseInt(c.substring(2, 4), 16) / 255;
    const b = parseInt(c.substring(4, 6), 16) / 255;
    const [R, G, B] = [r, g, b].map((channel) =>
      channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4)
    );
    const L = 0.2126 * R + 0.7152 * G + 0.0722 * B;
    return L > 0.5 ? 'text-gray-900' : 'text-white';
  };
  const textColorClass = getTextColorClass(bgColor);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center">
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${textColorClass}`}
          style={{ backgroundColor: bgColor }}
        >
          {value.name}
        </span>
        {value.default && (
          <span className="ml-2 px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
            Default
          </span>
        )}
      </div>
      {value.description && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {value.description}
        </p>
      )}
    </div>
  );
}
