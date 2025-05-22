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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    We sort labels so that default labels appear first.
  const sortedLabels = React.useMemo(() => {
    return [...value].sort((a, b) => (b.default ? 1 : 0) - (a.default ? 1 : 0));
  }, [value]);

  //    Compute text color (black or white) based on background luminance for accessibility.
  function getTextColor(hex: string): string {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 186 ? "#000" : "#fff";
  }

  // 2. Handle empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No Labels</span>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Header with icon and count */}
      <div className="flex items-center mb-2 text-gray-700">
        <LucideReact.Tag size={16} className="mr-1" />
        <span className="text-sm font-medium">{value.length} Labels</span>
      </div>
      {/* Label badges */}
      <div className="flex flex-wrap gap-2">
        {sortedLabels.map((label) => (
          <span
            key={label.id}
            title={label.description || undefined}
            style={{
              backgroundColor: `#${label.color}`,
              color: getTextColor(label.color),
            }}
            className={`px-3 py-1 rounded-full text-sm font-medium max-w-[200px] truncate ${
              label.default ? "ring-1 ring-gray-400" : ""
            }`}
          >
            {label.name}
          </span>
        ))}
      </div>
    </div>
  );
}
