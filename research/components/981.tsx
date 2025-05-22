import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A public SSH key used to sign Git commits
     *
     * @title SSH Signing Key
    */
    export type ssh_signing_key = {
        key: string;
        id: number & tags.Type<"int32">;
        title: string;
        created_at: string & tags.Format<"date-time">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.ssh_signing_key;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const displayKey =
    value.key.length > 60
      ? `${value.key.slice(0, 30)}…${value.key.slice(-30)}`
      : value.key;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  const content = (
    <div className="max-w-md w-full bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 truncate">{value.title}</h2>
      <p className="mt-1 text-sm text-gray-500">Created on {formattedDate}</p>
      <div className="mt-4">
        <span className="block mb-1 text-xs font-medium text-gray-700">Public SSH Key</span>
        <div className="overflow-x-auto bg-gray-100 p-2 rounded text-xs font-mono text-gray-800">
          {displayKey}
        </div>
      </div>
    </div>
  );

  // 3. Return the React element.
  return content;
}
