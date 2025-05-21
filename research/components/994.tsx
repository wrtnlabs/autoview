import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A unique encryption key
     *
     * @title GPG Key
    */
    export type gpg_key = {
        id: number & tags.Type<"int32">;
        name?: string | null;
        primary_key_id: (number & tags.Type<"int32">) | null;
        key_id: string;
        public_key: string;
        emails: {
            email?: string;
            verified?: boolean;
        }[];
        subkeys: {
            id?: number & tags.Type<"int32">;
            primary_key_id?: number & tags.Type<"int32">;
            key_id?: string;
            public_key?: string;
            emails?: {
                email?: string;
                verified?: boolean;
            }[];
            subkeys?: any[];
            can_sign?: boolean;
            can_encrypt_comms?: boolean;
            can_encrypt_storage?: boolean;
            can_certify?: boolean;
            created_at?: string;
            expires_at?: string | null;
            raw_key?: string | null;
            revoked?: boolean;
        }[];
        can_sign: boolean;
        can_encrypt_comms: boolean;
        can_encrypt_storage: boolean;
        can_certify: boolean;
        created_at: string & tags.Format<"date-time">;
        expires_at: (string & tags.Format<"date-time">) | null;
        revoked: boolean;
        raw_key: string | null;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.gpg_key[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDateTime = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((key) => {
        const createdAt = formatDateTime(key.created_at);
        const expiresAt = key.expires_at
          ? formatDateTime(key.expires_at)
          : "Never";
        const statusText = key.revoked ? "Revoked" : "Active";

        return (
          <div
            key={key.key_id}
            className="p-4 bg-white rounded-lg shadow-sm flex flex-col md:flex-row"
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {key.name ?? "Unnamed Key"}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Key ID:{" "}
                <span className="font-mono text-gray-700">{key.key_id}</span>
              </p>
              {key.primary_key_id != null && (
                <p className="text-sm text-gray-600">
                  Primary Key ID: {key.primary_key_id}
                </p>
              )}
              <p className="text-sm text-gray-600">Created: {createdAt}</p>
              <p className="text-sm text-gray-600">Expires: {expiresAt}</p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={
                    key.revoked
                      ? "text-red-600 font-medium"
                      : "text-green-600 font-medium"
                  }
                >
                  {statusText}
                </span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {key.can_sign && (
                  <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded">
                    Sign
                  </span>
                )}
                {key.can_encrypt_comms && (
                  <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded">
                    Encrypt Comms
                  </span>
                )}
                {key.can_encrypt_storage && (
                  <span className="px-2 py-1 text-xs font-medium text-purple-800 bg-purple-100 rounded">
                    Encrypt Storage
                  </span>
                )}
                {key.can_certify && (
                  <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded">
                    Certify
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0 w-full md:w-auto">
              <p className="text-sm text-gray-600">
                Emails ({key.emails.length}):
              </p>
              {key.emails.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-gray-700 max-h-24 overflow-y-auto">
                  {key.emails.map((emailObj, idx) => (
                    <li key={idx} className="truncate">
                      {emailObj.email ?? "—"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">None</p>
              )}
              <p className="mt-2 text-sm text-gray-600">
                Subkeys: {key.subkeys.length}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
