import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * The public key used for setting Actions Secrets.
   *
   * @title ActionsPublicKey
   */
  export type actions_public_key = {
    /**
     * The identifier for the key.
     */
    key_id: string;
    /**
     * The Base64 encoded public key.
     */
    key: string;
    id?: number & tags.Type<"int32">;
    url?: string;
    title?: string;
    created_at?: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.actions_public_key;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedDate = value.created_at
    ? new Date(value.created_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";

  const maskedKey =
    value.key.length > 8
      ? `${value.key.slice(0, 4)}...${value.key.slice(-4)}`
      : value.key;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="flex items-center mb-3">
        <LucideReact.Key size={20} className="text-gray-600" />
        <h3 className="ml-2 text-lg font-semibold text-gray-800">
          {value.title || "Actions Public Key"}
        </h3>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <LucideReact.Hash size={16} className="text-gray-400" />
          <span>Key ID: {value.key_id}</span>
        </div>

        {value.url && (
          <div className="flex items-start gap-1">
            <LucideReact.Link size={16} className="text-gray-400 mt-[1px]" />
            <span className="break-all">URL: {value.url}</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Created: {formattedDate}</span>
        </div>
      </div>

      <div className="mt-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Public Key (masked)
        </label>
        <div className="p-2 bg-gray-50 border border-gray-200 rounded font-mono text-sm break-all">
          {maskedKey}
        </div>
      </div>
    </div>
  );
}
