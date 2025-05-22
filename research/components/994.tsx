import * as LucideReact from "lucide-react";
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
export type AutoViewInput = AutoViewInputSubTypes.gpg_key[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const keys = Array.isArray(value) ? value : [];

  const formatDate = (dateStr?: string | null): string => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (keys.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span>No GPG keys available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {keys.map((key) => {
        const isExpired =
          key.expires_at !== null && new Date(key.expires_at) < new Date();
        const statusLabel = key.revoked
          ? "Revoked"
          : isExpired
            ? "Expired"
            : "Valid";
        const statusIcon = key.revoked ? (
          <LucideReact.XCircle size={16} className="text-red-500" />
        ) : isExpired ? (
          <LucideReact.Clock size={16} className="text-amber-500" />
        ) : (
          <LucideReact.CheckCircle size={16} className="text-green-500" />
        );

        return (
          <div
            key={key.id}
            className="p-4 bg-white rounded-lg shadow flex flex-col space-y-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {key.name ?? key.key_id}
              </h3>
              <div className="flex items-center space-x-1">
                {statusIcon}
                <span className="text-sm font-medium text-gray-600">
                  {statusLabel}
                </span>
              </div>
            </div>

            {/* Main details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left column: identifiers & dates */}
              <div className="space-y-2">
                <div className="flex items-center text-gray-600 text-sm">
                  <LucideReact.Key size={16} className="mr-1" />
                  <span className="font-medium">Key ID:</span>
                  <span className="ml-1 font-mono truncate">{key.key_id}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <LucideReact.Calendar size={16} className="mr-1" />
                  <span className="font-medium">Created:</span>
                  <span className="ml-1">{formatDate(key.created_at)}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <LucideReact.Calendar size={16} className="mr-1" />
                  <span className="font-medium">Expires:</span>
                  <span className="ml-1">
                    {key.expires_at ? formatDate(key.expires_at) : "Never"}
                  </span>
                </div>
              </div>

              {/* Right column: emails & subkeys */}
              <div className="space-y-2">
                <div className="text-gray-600 text-sm font-medium">Emails:</div>
                <div className="flex flex-wrap gap-2">
                  {key.emails.map((e, idx) => (
                    <div
                      key={idx}
                      className="flex items-center bg-gray-100 px-2 py-1 rounded"
                    >
                      <LucideReact.Mail
                        size={14}
                        className="text-gray-500 mr-1"
                      />
                      <span className="text-gray-700 text-sm truncate">
                        {e.email ?? "—"}
                      </span>
                      {e.verified && (
                        <LucideReact.CheckCircle
                          size={14}
                          className="text-green-500 ml-1"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {key.subkeys.length > 0 && (
                  <div className="flex items-center text-gray-600 text-sm">
                    <LucideReact.Layers size={16} className="mr-1" />
                    <span>
                      {key.subkeys.length} subkey
                      {key.subkeys.length > 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Capabilities */}
            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-200">
              {key.can_sign && (
                <div className="flex items-center text-sm text-gray-600">
                  <LucideReact.Pen size={16} className="mr-1" />
                  <span>Sign</span>
                </div>
              )}
              {(key.can_encrypt_comms || key.can_encrypt_storage) && (
                <div className="flex items-center text-sm text-gray-600">
                  <LucideReact.Lock size={16} className="mr-1" />
                  <span>Encrypt</span>
                </div>
              )}
              {key.can_certify && (
                <div className="flex items-center text-sm text-gray-600">
                  <LucideReact.Star size={16} className="mr-1" />
                  <span>Certify</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
