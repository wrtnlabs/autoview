import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const createdAt = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const expiresAt = value.expires_at
    ? new Date(value.expires_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Never Expires";
  const statusLabel = value.revoked ? "Revoked" : "Active";
  const statusIcon = value.revoked ? (
    <LucideReact.AlertTriangle
      className="text-red-500"
      size={16}
      aria-label="Revoked"
    />
  ) : (
    <LucideReact.CheckCircle
      className="text-green-500"
      size={16}
      aria-label="Active"
    />
  );
  const keyName = value.name || value.key_id;
  const subkeyCount = value.subkeys.length;

  const capabilities = [
    {
      label: "Sign",
      enabled: value.can_sign,
      icon: <LucideReact.Edit3 size={16} className="mr-1" />,
    },
    {
      label: "Encrypt (Comms)",
      enabled: value.can_encrypt_comms,
      icon: <LucideReact.Lock size={16} className="mr-1" />,
    },
    {
      label: "Encrypt (Storage)",
      enabled: value.can_encrypt_storage,
      icon: <LucideReact.Database size={16} className="mr-1" />,
    },
    {
      label: "Certify",
      enabled: value.can_certify,
      icon: <LucideReact.BadgeCheck size={16} className="mr-1" />,
    },
  ].filter((cap) => cap.enabled);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto space-y-4">
      {/* Header: Key Name and Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {keyName}
        </h2>
        <div className="flex items-center gap-1">{statusIcon}</div>
      </div>

      {/* Key ID */}
      <div className="flex items-center text-gray-600">
        <LucideReact.Hash className="mr-1" size={16} />
        <code className="bg-gray-100 px-1 rounded text-sm">{value.key_id}</code>
      </div>

      {/* Emails */}
      {value.emails.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Emails:</h3>
          <ul className="space-y-1">
            {value.emails.map((e, i) => (
              <li key={i} className="flex items-center text-gray-600">
                <LucideReact.Mail size={16} className="mr-1" />
                <span className="truncate">{e.email || "Unknown"}</span>
                {e.verified ? (
                  <LucideReact.CheckCircle
                    className="text-blue-500 ml-2"
                    size={14}
                    aria-label="Verified"
                  />
                ) : (
                  <LucideReact.XCircle
                    className="text-gray-400 ml-2"
                    size={14}
                    aria-label="Not verified"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Capabilities */}
      {capabilities.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            Capabilities:
          </h3>
          <div className="flex flex-wrap gap-2">
            {capabilities.map((cap) => (
              <span
                key={cap.label}
                className="flex items-center bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded"
              >
                {cap.icon}
                {cap.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Subkeys */}
      <div className="flex items-center text-gray-600">
        <LucideReact.Key size={16} className="mr-1" />
        <span>
          {subkeyCount} Subkey{subkeyCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm">
        <div className="flex items-center">
          <LucideReact.Calendar className="mr-1" size={16} />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar className="mr-1" size={16} />
          <span>Expires: {expiresAt}</span>
        </div>
      </div>
    </div>
  );
}
