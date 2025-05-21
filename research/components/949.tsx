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
  // 1. Data aggregation/transformation
  const formatDate = (iso: string): string =>
    new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso));

  const items = value.map((key) => {
    const displayName = key.name?.trim() ? key.name! : key.key_id;
    const truncatedKeyId =
      key.key_id.length > 16
        ? `${key.key_id.slice(0, 8)}…${key.key_id.slice(-8)}`
        : key.key_id;
    const emails = key.emails.map((e) => e.email).filter(Boolean).join(", ");
    const created = formatDate(key.created_at);
    const expires = key.expires_at ? formatDate(key.expires_at) : "Never expires";

    const capabilities = [
      { label: "Sign", enabled: key.can_sign },
      { label: "Encrypt Comm", enabled: key.can_encrypt_comms },
      { label: "Encrypt Storage", enabled: key.can_encrypt_storage },
      { label: "Certify", enabled: key.can_certify },
    ];

    return (
      <div key={key.id} className="p-4 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {displayName}
          </h2>
          {key.revoked && (
            <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
              Revoked
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">Key ID: {truncatedKeyId}</p>
        {emails && (
          <p className="text-sm text-gray-500">User IDs: {emails}</p>
        )}
        <div className="mt-2 text-sm text-gray-500 space-x-4">
          <span>Created: {created}</span>
          <span>Expires: {expires}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {capabilities
            .filter((c) => c.enabled)
            .map((c) => (
              <span
                key={c.label}
                className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full"
              >
                {c.label}
              </span>
            ))}
          {key.subkeys.length > 0 && (
            <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              {key.subkeys.length} Subkeys
            </span>
          )}
        </div>
      </div>
    );
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return <div className="space-y-4">{items}</div>;
}
