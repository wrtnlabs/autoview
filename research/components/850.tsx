import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Generated name and body describing a release
     *
     * @title Generated Release Notes Content
    */
    export interface release_notes_content {
        /**
         * The generated name of the release
        */
        name: string;
        /**
         * The generated body describing the contents of the release supporting markdown formatting
        */
        body: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.release_notes_content;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived data: word count and estimated reading time (200 wpm)
  const words = value.body.trim().split(/\s+/);
  const wordCount = words.filter(Boolean).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="p-4 bg-white rounded-lg shadow-sm">
      <header className="flex items-center gap-2">
        <LucideReact.FileText size={20} className="text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-800">{value.name}</h2>
      </header>

      <div className="mt-2 text-gray-700 text-sm whitespace-pre-wrap break-words line-clamp-4">
        {value.body}
      </div>

      <footer className="mt-4 flex flex-wrap items-center gap-4 text-gray-500 text-xs">
        <div className="flex items-center gap-1">
          <LucideReact.FileText size={14} className="text-gray-400" />
          <span>{wordCount} words</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Clock size={14} className="text-gray-400" />
          <span>{readingTimeMinutes} min read</span>
        </div>
      </footer>
    </article>
  );
}
