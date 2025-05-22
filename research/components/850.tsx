import React from "react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { name, body } = value;
  const maxPreviewLength = 200;
  const previewBody =
    body.length > maxPreviewLength
      ? body.slice(0, maxPreviewLength).trimEnd() + '...'
      : body;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate">
        {name}
      </h2>
      <p className="text-sm text-gray-700 whitespace-pre-wrap overflow-hidden max-h-32">
        {previewBody}
      </p>
    </div>
  );
}
