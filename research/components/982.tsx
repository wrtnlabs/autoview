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
  //    Format the creation date into a human-readable string.
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  //    Prepare the SSH key for display in a monospace code block with horizontal scroll.
  const sshKey = value.key;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 truncate">
        {value.title}
      </h2>
      {/* Created At */}
      <p className="mt-1 text-sm text-gray-500">Created: {formattedCreatedAt}</p>
      {/* SSH Key Display */}
      <div className="mt-4 bg-gray-100 p-3 rounded font-mono text-sm text-gray-700 overflow-x-auto whitespace-nowrap">
        {sshKey}
      </div>
    </div>
  );
}
