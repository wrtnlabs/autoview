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
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No keys available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((key) => (
        <div
          key={key.id}
          className="flex flex-col sm:flex-row sm:justify-between p-4 bg-white rounded-lg shadow"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {key.name ?? key.key_id}
              </h3>
              {key.revoked ? (
                <LucideReact.XCircle
                  className="ml-2 text-red-500"
                  size={16}
                  aria-label="Revoked"
                />
              ) : (
                <LucideReact.CheckCircle
                  className="ml-2 text-green-500"
                  size={16}
                  aria-label="Active"
                />
              )}
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Key ID: <span className="font-mono">{key.key_id}</span>
            </p>
            <p className="mt-1 text-sm text-gray-600 flex items-center">
              <LucideReact.Calendar size={14} className="text-gray-400" />
              <span className="ml-1">
                Created: {formatDate(key.created_at)}
              </span>
            </p>
            {key.expires_at && (
              <p className="mt-1 text-sm text-gray-600 flex items-center">
                <LucideReact.Calendar size={14} className="text-gray-400" />
                <span className="ml-1">
                  Expires: {formatDate(key.expires_at)}
                </span>
              </p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {key.can_sign && (
                <span className="flex items-center text-sm text-blue-600">
                  <LucideReact.Edit2 size={14} />
                  <span className="ml-1">Sign</span>
                </span>
              )}
              {key.can_encrypt_comms && (
                <span className="flex items-center text-sm text-blue-600">
                  <LucideReact.Mail size={14} />
                  <span className="ml-1">Encrypt Comms</span>
                </span>
              )}
              {key.can_encrypt_storage && (
                <span className="flex items-center text-sm text-blue-600">
                  <LucideReact.Lock size={14} />
                  <span className="ml-1">Encrypt Storage</span>
                </span>
              )}
              {key.can_certify && (
                <span className="flex items-center text-sm text-blue-600">
                  <LucideReact.BadgeCheck size={14} />
                  <span className="ml-1">Certify</span>
                </span>
              )}
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
            <p className="text-sm font-medium text-gray-700">
              Emails ({key.emails.length})
            </p>
            <ul className="mt-1 space-y-1 max-w-xs">
              {key.emails.map((e, i) => (
                <li
                  key={i}
                  className="flex items-center text-sm text-gray-600 truncate"
                >
                  <LucideReact.Mail size={14} className="text-gray-400" />
                  <span className="ml-1 truncate">{e.email ?? "-"}</span>
                  {e.verified && (
                    <LucideReact.Check
                      className="ml-2 text-green-500"
                      size={12}
                      aria-label="Verified"
                    />
                  )}
                </li>
              ))}
            </ul>
            {key.subkeys.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                Subkeys: {key.subkeys.length}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
  // 3. Return the React element.
}
