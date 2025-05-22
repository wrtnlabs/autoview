import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    default: boolean;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.label[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Utility to decide text color (black or white) based on background hex color luminance
  function getTextColor(hex: string): "text-black" | "text-white" {
    const cleaned = hex.replace(/^#?/, "");
    const r = parseInt(cleaned.substring(0, 2), 16);
    const g = parseInt(cleaned.substring(2, 4), 16);
    const b = parseInt(cleaned.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "text-black" : "text-white";
  }

  // 1. Sort labels alphabetically by name for consistent display
  const sortedLabels = [...value].sort((a, b) => a.name.localeCompare(b.name));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Display a header and a responsive list of label badges.
  //    Omit non-essential fields like id, node_id, url, default flag.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800">
        Labels ({sortedLabels.length})
      </h2>
      {sortedLabels.length === 0 ? (
        <div className="mt-4 flex items-center text-gray-500">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span>No labels available</span>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-3">
          {sortedLabels.map((label) => {
            const textColor = getTextColor(label.color);
            return (
              <div key={label.id} className="flex flex-col max-w-xs">
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-md font-medium ${textColor}`}
                  style={{ backgroundColor: `#${label.color}` }}
                >
                  <LucideReact.Tag size={14} className="opacity-80" />
                  <span className="truncate">{label.name}</span>
                </div>
                {label.description && (
                  <p className="mt-1 text-gray-600 text-sm line-clamp-2">
                    {label.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
