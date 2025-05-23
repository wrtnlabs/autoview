import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Check Annotation
     *
     * @title Check Annotation
    */
    export interface check_annotation {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.check_annotation[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Map annotation_level to icon and color
  const getStatusIcon = (level: string | null) => {
    if (level === 'warning') {
      return <LucideReact.AlertCircle className="text-amber-500" size={16} />;
    } else if (level === 'failure' || level === 'error') {
      return <LucideReact.AlertTriangle className="text-red-500" size={16} />;
    } else {
      return <LucideReact.Info className="text-blue-500" size={16} />;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500 space-y-2">
        <LucideReact.AlertCircle size={48} />
        <span className="text-sm">No annotations available.</span>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="space-y-4">
      {value.map((annotation, idx) => {
        const {
          path,
          start_line,
          end_line,
          start_column,
          end_column,
          annotation_level,
          title,
          message,
          raw_details,
        } = annotation;

        // Derive a concise location label
        const locStart = `${start_line}${start_column !== null ? ':' + start_column : ''}`;
        const locEnd = `${end_line}${end_column !== null ? ':' + end_column : ''}`;
        const locationLabel =
          start_line === end_line
            ? `Line ${locStart}`
            : `Lines ${locStart} - ${locEnd}`;

        // Title fallback logic
        const displayTitle =
          title ||
          (annotation_level
            ? annotation_level.charAt(0).toUpperCase() + annotation_level.slice(1)
            : 'Annotation');

        // Message or details, truncated for performance and layout
        const displayMessage = message || raw_details || '';
        const truncatedMessage =
          displayMessage.length > 200
            ? displayMessage.slice(0, 200) + '...'
            : displayMessage;

        return (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getStatusIcon(annotation_level)}
                <span className="font-medium text-gray-800 truncate">
                  {displayTitle}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-gray-500 text-sm">
                <LucideReact.FileText size={16} />
                <span className="truncate">{path}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-gray-500 text-sm mb-2">
              <div className="flex items-center space-x-1">
                <LucideReact.Hash size={16} />
                <span>{locationLabel}</span>
              </div>
            </div>
            {truncatedMessage && (
              <p className="text-gray-700 text-sm line-clamp-3">
                {truncatedMessage}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
