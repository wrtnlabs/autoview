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
  // Derived constants
  const labelColor = `#${value.color}`;
  const displayUrl =
    value.url.length > 30 ? `${value.url.slice(0, 30)}…` : value.url;
  const hasDescription = Boolean(value.description);

  // Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 max-w-full sm:max-w-sm">
      {/* Header with color swatch, name, and default indicator */}
      <div className="flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: labelColor }}
          aria-label={`Label color ${labelColor}`}
        />
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        {value.default && (
          <span className="inline-flex items-center text-green-600 text-sm font-medium ml-2">
            Default
            <LucideReact.CheckCircle
              className="ml-1"
              size={16}
              aria-label="Default label"
            />
          </span>
        )}
      </div>

      {/* Description or placeholder */}
      <p
        className={`mt-2 text-gray-600 text-sm ${
          hasDescription ? "line-clamp-3" : "italic"
        }`}
      >
        {hasDescription ? value.description : "No description provided."}
      </p>

      {/* URL display */}
      <div className="flex items-center gap-1 mt-3 text-sm text-gray-500">
        <LucideReact.Link
          className="shrink-0"
          size={16}
          aria-label="Label URL"
        />
        <span className="truncate">{displayUrl}</span>
      </div>
    </div>
  );
}
