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
  const bgColor = `#${value.color}`;
  const name = value.name.trim();
  const description = value.description?.trim();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-xs p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <span
          className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-full truncate"
          style={{ backgroundColor: bgColor }}
        >
          {name}
        </span>
        {value.default ? (
          <div
            className="flex items-center text-green-500"
            title="Default label"
            aria-label="Default label"
          >
            <LucideReact.CheckCircle size={16} strokeWidth={2} />
          </div>
        ) : (
          <div
            className="flex items-center text-gray-400"
            title="Custom label"
            aria-label="Custom label"
          >
            <LucideReact.Tag size={16} strokeWidth={2} />
          </div>
        )}
      </div>
      {description && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
      )}
    </div>
  );
}
