import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Check Annotation
   *
   * @title Check Annotation
   */
  export type check_annotation = {
    path: string;
    start_line: number & tags.Type<"int32">;
    end_line: number & tags.Type<"int32">;
    start_column: (number & tags.Type<"int32">) | null;
    end_column: (number & tags.Type<"int32">) | null;
    annotation_level: string | null;
    title: string | null;
    message: string | null;
    raw_details: string | null;
    blob_href: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.check_annotation[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation helpers

  // Map annotation levels to icons and labels
  const getLevelMeta = (level: string | null) => {
    const lvl = level?.toLowerCase();
    switch (lvl) {
      case "failure":
      case "error":
        return {
          icon: <LucideReact.XCircle size={16} className="text-red-500" />,
          label: "Error",
        };
      case "warning":
        return {
          icon: (
            <LucideReact.AlertTriangle size={16} className="text-amber-500" />
          ),
          label: "Warning",
        };
      case "notice":
      case "info":
        return {
          icon: <LucideReact.Info size={16} className="text-blue-500" />,
          label: "Notice",
        };
      default:
        return {
          icon: <LucideReact.Bell size={16} className="text-gray-500" />,
          label: "Annotation",
        };
    }
  };

  // Format line and column information
  const formatRange = (ann: AutoViewInputSubTypes.check_annotation) => {
    const { start_line, end_line, start_column, end_column } = ann;
    const linePart =
      start_line === end_line
        ? `Line ${start_line}`
        : `Lines ${start_line}-${end_line}`;
    if (start_column != null && end_column != null && start_line === end_line) {
      return `${linePart} (Cols ${start_column}-${end_column})`;
    }
    return linePart;
  };

  // 2. Render when no annotations
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2 text-sm">No annotations available</p>
      </div>
    );
  }

  // 3. Compose the visual structure
  return (
    <div className="space-y-4">
      {value.map((ann, idx) => {
        const { icon, label } = getLevelMeta(ann.annotation_level);
        const rangeText = formatRange(ann);

        return (
          <div
            key={`${ann.path}-${ann.start_line}-${idx}`}
            className="p-4 bg-white rounded-lg shadow-sm"
          >
            {/* Header: file path and level */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LucideReact.FileText size={16} className="text-gray-500" />
                <span className="font-medium text-gray-800 truncate">
                  {ann.path}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {icon}
                <span className="text-sm font-medium text-gray-600">
                  {label}
                </span>
              </div>
            </div>

            {/* Range information */}
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <LucideReact.Hash size={16} className="mr-1 text-gray-500" />
              <span>{rangeText}</span>
            </div>

            {/* Title and message */}
            {ann.title && (
              <p className="mt-2 font-semibold text-gray-800 truncate">
                {ann.title}
              </p>
            )}
            {ann.message && (
              <p className="mt-1 text-gray-700 text-sm line-clamp-2">
                {ann.message}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
