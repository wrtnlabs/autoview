import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A unique encryption key
     *
     * @title GPG Key
    */
    export interface gpg_key {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.gpg_key[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const keys = value;
  const formatDate = (dateStr?: string | null): string => {
    if (!dateStr) return 'Never';
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (keys.length === 0) {
    return (
      <div className="w-full p-6 bg-gray-50 rounded-lg flex flex-col items-center text-gray-400">
        <LucideReact.AlertCircle size={48} className="mb-2" aria-label="No Data" />
        <span className="text-lg">No GPG Keys Available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {keys.map((key) => (
        <div
          key={key.id}
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          {/* Header: Name and Status */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {key.name || `Key ${key.id}`}
            </h3>
            {key.revoked ? (
              <LucideReact.XCircle
                size={20}
                className="text-red-500"
                aria-label="Revoked"
              />
            ) : (
              <LucideReact.CheckCircle
                size={20}
                className="text-green-500"
                aria-label="Active"
              />
            )}
          </div>

          {/* Key Identifier */}
          <div className="mt-2 text-sm text-gray-600 truncate">
            Key ID: {key.key_id}
          </div>

          {/* Creation and Expiry */}
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <LucideReact.Calendar size={16} className="mr-1" aria-hidden="true" />
              <span>Created: {formatDate(key.created_at)}</span>
            </div>
            <div className="flex items-center">
              <LucideReact.Calendar size={16} className="mr-1" aria-hidden="true" />
              <span>Expires: {formatDate(key.expires_at)}</span>
            </div>
          </div>

          {/* Capabilities */}
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {key.can_sign && (
              <div className="flex items-center text-gray-600">
                <LucideReact.Edit3 size={16} className="mr-1" aria-hidden="true" />
                <span>Sign</span>
              </div>
            )}
            {key.can_encrypt_comms && (
              <div className="flex items-center text-gray-600">
                <LucideReact.Lock size={16} className="mr-1" aria-hidden="true" />
                <span>Encrypt Comms</span>
              </div>
            )}
            {key.can_encrypt_storage && (
              <div className="flex items-center text-gray-600">
                <LucideReact.Database size={16} className="mr-1" aria-hidden="true" />
                <span>Encrypt Storage</span>
              </div>
            )}
            {key.can_certify && (
              <div className="flex items-center text-gray-600">
                <LucideReact.Award size={16} className="mr-1" aria-hidden="true" />
                <span>Certify</span>
              </div>
            )}
          </div>

          {/* Emails */}
          {key.emails.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium text-gray-700">Emails</div>
              <ul className="mt-2 space-y-1">
                {key.emails.map((e, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-sm text-gray-600 truncate"
                  >
                    <LucideReact.Mail size={16} className="mr-1" aria-hidden="true" />
                    <span className="truncate">{e.email || '—'}</span>
                    {e.verified && (
                      <LucideReact.BadgeCheck
                        size={14}
                        className="text-blue-500 ml-2"
                        aria-label="Verified"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Subkey Summary */}
          {key.subkeys.length > 0 && (
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <LucideReact.ChevronsRight size={16} className="mr-1" aria-hidden="true" />
              <span>
                {key.subkeys.length} Subkey
                {key.subkeys.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
  // 3. Return the React element.
}
