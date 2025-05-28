import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The public key used for setting Codespaces secrets.
     *
     * @title CodespacesPublicKey
    */
    export interface codespaces_public_key {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.codespaces_public_key;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { key_id, key, url, title, created_at } = value;
  const displayTitle = title?.trim() ? title : "Codespaces Public Key";
  const formattedDate = created_at ? new Date(created_at).toLocaleString() : null;
  const truncatedId =
    key_id.length > 12 ? `${key_id.slice(0, 6)}…${key_id.slice(-6)}` : key_id;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
        <LucideReact.Key size={20} className="text-gray-600 mr-2" />
        {displayTitle}
      </h2>

      <div className="space-y-3 text-gray-600 mb-4">
        <div className="flex items-center text-sm">
          <LucideReact.Hash size={16} className="text-gray-500 mr-1" />
          <span className="font-mono">{truncatedId}</span>
        </div>
        {formattedDate && (
          <div className="flex items-center text-sm">
            <LucideReact.Calendar size={16} className="text-gray-500 mr-1" />
            <span>{formattedDate}</span>
          </div>
        )}
        {url && (
          <div className="flex items-center text-sm">
            <LucideReact.Link size={16} className="text-gray-500 mr-1" />
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate"
            >
              {url}
            </a>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-3 rounded font-mono text-sm text-gray-800 overflow-auto">
        <code className="whitespace-pre-wrap break-all">{key}</code>
      </div>
    </div>
  );
}
