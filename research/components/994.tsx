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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const maskKeyId = (id: string): string =>
    id.length > 8 ? `${id.slice(0, 4)}…${id.slice(-4)}` : id;

  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" aria-label="No data" />
        <span>No GPG keys available.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((key) => (
        <div key={key.id} className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <LucideReact.Key size={20} className="text-gray-600" aria-hidden />
              <span className="font-medium text-gray-800">
                {key.name ?? maskKeyId(key.key_id)}
              </span>
            </div>
            {key.revoked ? (
              <LucideReact.AlertTriangle
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

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <LucideReact.Clock size={16} className="text-gray-400" aria-hidden />
              <span>Created:</span>
              <span>{formatDate(key.created_at)}</span>
            </div>
            {key.expires_at && (
              <div className="flex items-center space-x-1">
                <LucideReact.Calendar size={16} className="text-gray-400" aria-hidden />
                <span>Expires:</span>
                <span>{formatDate(key.expires_at)}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <LucideReact.Mail size={16} className="text-gray-400" aria-hidden />
              <span>Emails:</span>
              <span>{key.emails.length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <LucideReact.Key size={16} className="text-gray-400" aria-hidden />
              <span>Subkeys:</span>
              <span>{key.subkeys.length}</span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {key.can_sign && (
              <span className="flex items-center space-x-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                <LucideReact.Pen size={12} className="text-blue-500" aria-hidden />
                <span>Sign</span>
              </span>
            )}
            {key.can_encrypt_comms && (
              <span className="flex items-center space-x-1 px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full">
                <LucideReact.Lock size={12} className="text-purple-500" aria-hidden />
                <span>Encrypt Comms</span>
              </span>
            )}
            {key.can_encrypt_storage && (
              <span className="flex items-center space-x-1 px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                <LucideReact.Database size={12} className="text-indigo-500" aria-hidden />
                <span>Encrypt Storage</span>
              </span>
            )}
            {key.can_certify && (
              <span className="flex items-center space-x-1 px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                <LucideReact.BadgeCheck size={12} className="text-green-500" aria-hidden />
                <span>Certify</span>
              </span>
            )}
          </div>

          {key.emails.length > 0 && (
            <div className="mt-3 space-y-1">
              <span className="block text-sm font-medium text-gray-700">
                Email Addresses
              </span>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {key.emails.map((e, idx) => (
                  <li key={idx} className="flex items-center space-x-1">
                    <LucideReact.Mail size={14} className="text-gray-400" aria-hidden />
                    <span className="truncate">{e.email ?? '—'}</span>
                    {e.verified && (
                      <LucideReact.CheckCircle
                        size={14}
                        className="text-green-500"
                        aria-label="Verified"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
