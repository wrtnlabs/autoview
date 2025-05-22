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
export type AutoViewInput = AutoViewInputSubTypes.gpg_key;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const expiresDate = value.expires_at
    ? new Date(value.expires_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Never";
  const statusLabel = value.revoked ? "Revoked" : "Active";
  const statusClasses = value.revoked
    ? "bg-red-100 text-red-800"
    : "bg-green-100 text-green-800";
  const shortKeyId =
    value.key_id.length > 16
      ? value.key_id.slice(-16)
      : value.key_id;
  const capabilities = [
    value.can_sign && "Sign",
    value.can_encrypt_comms && "Encrypt Comms",
    value.can_encrypt_storage && "Encrypt Storage",
    value.can_certify && "Certify",
  ].filter(Boolean) as string[];
  const subkeyCount = value.subkeys?.length ?? 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 truncate">
            {value.name || "GPG Key"}
          </h2>
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${statusClasses}`}
          >
            {statusLabel}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-600">
          Key ID:&nbsp;
          <span className="font-mono">{shortKeyId}</span>
        </p>
      </div>
      <div className="px-6 py-4 space-y-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Created</h3>
            <p className="text-sm text-gray-600">{createdDate}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-700">Expires</h3>
            <p className="text-sm text-gray-600">{expiresDate}</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Emails</h3>
          <ul className="mt-1 list-disc list-inside text-sm text-gray-600 space-y-1 max-h-24 overflow-auto">
            {value.emails.map((e, idx) => (
              <li key={idx} className="flex items-center">
                <span className="truncate">{e.email || "—"}</span>
                {e.verified ? (
                  <span className="ml-2 text-green-500">✔</span>
                ) : (
                  <span className="ml-2 text-yellow-500">•</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        {capabilities.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700">
              Capabilities
            </h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {capabilities.map((cap, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>
        )}
        {subkeyCount > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700">Subkeys</h3>
            <p className="text-sm text-gray-600">
              {subkeyCount} subkey{subkeyCount > 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
