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
  const isExpired =
    value.expires_at !== null && new Date(value.expires_at) < new Date();
  const statusIcon = value.revoked
    ? <LucideReact.XCircle className="text-red-500" size={20} aria-label="Revoked" />
    : isExpired
    ? <LucideReact.AlertTriangle className="text-amber-500" size={20} aria-label="Expired" />
    : <LucideReact.CheckCircle className="text-green-500" size={20} aria-label="Active" />;
  const capabilityLabels: string[] = [];
  if (value.can_sign) capabilityLabels.push("Sign");
  if (value.can_encrypt_comms) capabilityLabels.push("Encrypt Comms");
  if (value.can_encrypt_storage) capabilityLabels.push("Encrypt Storage");
  if (value.can_certify) capabilityLabels.push("Certify");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LucideReact.Key className="text-gray-700" size={20} />
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {value.name ?? value.key_id}
          </h2>
        </div>
        {statusIcon}
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Hash size={16} />
          <span className="font-medium">Key ID:</span>
          <code className="font-mono truncate">{value.key_id}</code>
        </div>
        {value.primary_key_id !== null && (
          <div className="flex items-center space-x-1">
            <LucideReact.Layers size={16} />
            <span className="font-medium">Primary ID:</span>
            <span>{value.primary_key_id}</span>
          </div>
        )}
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span className="font-medium">Created:</span>
          <time dateTime={value.created_at}>{createdDate}</time>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span className="font-medium">Expires:</span>
          <time dateTime={value.expires_at ?? undefined}>{expiresDate}</time>
        </div>
        <div className="flex items-center space-x-1 col-span-full">
          <LucideReact.Layers size={16} />
          <span className="font-medium">Subkeys:</span>
          <span>{value.subkeys.length}</span>
        </div>
      </div>

      {/* Capabilities */}
      {capabilityLabels.length > 0 && (
        <div>
          <span className="text-sm font-medium text-gray-700">Capabilities:</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {capabilityLabels.map((label) => (
              <span
                key={label}
                className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Emails */}
      {value.emails.length > 0 && (
        <div>
          <span className="text-sm font-medium text-gray-700">Emails:</span>
          <ul className="mt-2 space-y-1 text-gray-600">
            {value.emails.map((emailObj, idx) => (
              <li key={idx} className="flex items-center space-x-1">
                <LucideReact.Mail size={16} />
                <span className="truncate">{emailObj.email ?? "—"}</span>
                {emailObj.verified && (
                  <LucideReact.CheckCircle
                    className="text-blue-500 ml-1"
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
