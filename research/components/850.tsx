import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * Generated name and body describing a release
   *
   * @title Generated Release Notes Content
   */
  export type release_notes_content = {
    /**
     * The generated name of the release
     */
    name: string;
    /**
     * The generated body describing the contents of the release supporting markdown formatting
     */
    body: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.release_notes_content;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data extraction and presence check
  const { name, body } = value;
  const hasContent = Boolean(body && body.trim());

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Title Section */}
      <div className="flex items-center gap-2 mb-3">
        <LucideReact.FileText size={20} className="text-indigo-500" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
      </div>

      {/* Body Section */}
      {hasContent ? (
        <div className="max-h-48 overflow-y-auto text-sm text-gray-700 whitespace-pre-line break-words px-1">
          {body}
        </div>
      ) : (
        <div className="flex items-center text-gray-400 text-sm">
          <LucideReact.AlertCircle size={16} className="mr-1" />
          <span>No release notes content available.</span>
        </div>
      )}
    </div>
  );
}
