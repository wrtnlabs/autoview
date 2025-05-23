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
  const title = value.title ?? "Codespaces Public Key";
  const keyId = value.key_id;
  const formattedDate = value.created_at
    ? new Date(value.created_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
  const truncateKey = (raw: string): string => {
    const max = 20;
    if (raw.length <= max * 2 + 3) return raw;
    return `${raw.slice(0, max)}...${raw.slice(-max)}`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full mx-auto">
      <div className="flex flex-col space-y-1">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 truncate">ID: {keyId}</p>
      </div>

      <pre className="mt-4 bg-gray-100 p-2 rounded-md overflow-x-auto text-xs font-mono text-gray-800">
        {truncateKey(value.key)}
      </pre>

      {formattedDate && (
        <div className="mt-3 flex items-center text-sm text-gray-600">
          <LucideReact.Calendar
            size={16}
            className="mr-1 text-gray-500"
            aria-hidden="true"
          />
          <span>{formattedDate}</span>
        </div>
      )}
    </div>
  );
}
