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
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const displayName =
    value.name?.trim() ||
    value.emails[0]?.email ||
    value.key_id ||
    "Unnamed Key";

  const createdAt = formatDate(value.created_at);
  const expiresAt = value.expires_at ? formatDate(value.expires_at) : "Never";

  const shortKeyId = value.key_id.slice(-8).toUpperCase();

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

  const capabilities = [
    { label: "Signing", enabled: value.can_sign },
    { label: "Encrypt Comms", enabled: value.can_encrypt_comms },
    { label: "Encrypt Storage", enabled: value.can_encrypt_storage },
    { label: "Certification", enabled: value.can_certify },
  ];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <LucideReact.User className="text-gray-500" size={20} />
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {displayName}
            </h2>
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            {statusIcon}
            <span className="ml-1">{value.revoked ? "Revoked" : "Active"}</span>
          </div>
        </div>
        <div className="ml-4 text-gray-500">
          <LucideReact.Key size={20} />
        </div>
      </div>

      {/* Key Metadata */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Hash className="text-gray-400 mr-1" size={16} />
          Key ID: <span className="ml-1 font-mono">{shortKeyId}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-400 mr-1" size={16} />
          Created: {createdAt}
        </div>
        <div className="flex items-center col-span-2 md:col-span-1">
          <LucideReact.Calendar className="text-gray-400 mr-1" size={16} />
          Expires: {expiresAt}
        </div>
        <div className="flex items-center col-span-2 md:col-span-1">
          <LucideReact.Layers className="text-gray-400 mr-1" size={16} />
          Subkeys: {value.subkeys.length}
        </div>
      </div>

      {/* Capabilities */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Capabilities</h3>
        <div className="flex flex-wrap gap-3">
          {capabilities.map(({ label, enabled }) => (
            <div key={label} className="flex items-center text-sm">
              {enabled ? (
                <LucideReact.CheckCircle className="text-green-500" size={16} />
              ) : (
                <LucideReact.XCircle className="text-red-500" size={16} />
              )}
              <span className="ml-1 text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emails */}
      {value.emails.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Emails</h3>
          <ul className="space-y-1">
            {value.emails.map((emailObj, idx) => (
              <li
                key={idx}
                className="flex items-center text-sm text-gray-600 truncate"
              >
                <LucideReact.Mail className="text-gray-400 mr-1" size={16} />
                <span className="truncate">{emailObj.email || "—"}</span>
                {emailObj.verified && (
                  <LucideReact.CheckCircle
                    className="text-blue-500 ml-2"
                    size={16}
                    aria-label="Verified"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
