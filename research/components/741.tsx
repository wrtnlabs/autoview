import { tags } from "typia";
import React from "react";
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
  //    Mask the public key for concise display.
  const rawKey = value.key ?? "";
  const maskedKey =
    rawKey.length > 12
      ? `${rawKey.slice(0, 6)}…${rawKey.slice(-6)}`
      : rawKey;
  //    Format the creation timestamp into a human-readable form.
  const formattedDate = value.created_at
    ? new Date(value.created_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      {value.title && (
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.title}
        </h2>
      )}
      <div className="mt-3 space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-medium">Key ID:</span> {value.key_id}
        </p>
        <p>
          <span className="font-medium">Public Key:</span>{" "}
          <span className="font-mono break-all">{maskedKey}</span>
        </p>
        {value.created_at && (
          <p className="text-gray-500">
            <span className="font-medium">Created At:</span> {formattedDate}
          </p>
        )}
      </div>
    </div>
  );
}
