import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Color-coded labels help you categorize and filter your issues (just like labels in Gmail).
     *
     * @title Label
    */
    export interface label {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.label;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Derive a full hex color and choose text color (black/white) based on luminance for contrast.
  const backgroundHex = `#${value.color}`;
  const isLight = (() => {
    const r = parseInt(value.color.slice(0, 2), 16);
    const g = parseInt(value.color.slice(2, 4), 16);
    const b = parseInt(value.color.slice(4, 6), 16);
    // Standard luminance formula; threshold tuned for readability
    return (r * 299 + g * 587 + b * 114) / 1000 > 186;
  })();
  const textColorClass = isLight ? "text-black" : "text-white";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      {/* Label pill with dynamic background and text color */}
      <div className="flex items-center justify-between">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${textColorClass}`}
          style={{ backgroundColor: backgroundHex }}
        >
          {value.name}
        </span>
        {/* Default indicator */}
        {value.default && (
          <div className="flex items-center text-green-600 text-sm">
            <LucideReact.CheckCircle className="mr-1" size={16} />
            <span>Default</span>
          </div>
        )}
      </div>

      {/* Optional description, truncated to two lines */}
      {value.description && (
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
          {value.description}
        </p>
      )}

      {/* URL display with link icon and truncation */}
      <div className="mt-3 flex items-center text-gray-500 text-sm space-x-1">
        <LucideReact.Link size={16} />
        <span className="truncate">{value.url}</span>
      </div>
    </div>
  );
}
