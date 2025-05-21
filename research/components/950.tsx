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
  const createdDate = new Date(value.created_at);
  const formattedCreated = createdDate.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const expiresDate = value.expires_at ? new Date(value.expires_at) : null;
  const formattedExpires = expiresDate
    ? expiresDate.toLocaleString(undefined, { year: "numeric", month: "long", day: "numeric" })
    : "Never";
  const now = new Date();
  const isExpired = expiresDate ? expiresDate < now : false;
  const statusLabel = value.revoked ? "Revoked" : isExpired ? "Expired" : "Active";
  const statusColor = value.revoked || isExpired
    ? "bg-red-100 text-red-800"
    : "bg-green-100 text-green-800";
  const keyIdShort = value.key_id.slice(-16).toUpperCase();
  const capabilities = [
    { name: "Sign", enabled: value.can_sign },
    { name: "Encrypt Comm", enabled: value.can_encrypt_comms },
    { name: "Encrypt Storage", enabled: value.can_encrypt_storage },
    { name: "Certify", enabled: value.can_certify },
  ];
  const subkeyCount = value.subkeys?.length ?? 0;
  const emailList = value.emails.filter((e) => typeof e.email === "string");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {value.name || "GPG Key"}
          </h2>
          <p className="text-sm text-gray-500">
            Key ID: <span className="font-mono text-gray-700">{keyIdShort}</span>
          </p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded ${statusColor}`}>
          {statusLabel}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <p className="text-xs text-gray-500">Created</p>
          <p className="text-sm text-gray-700">{formattedCreated}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Expires</p>
          <p className="text-sm text-gray-700">{formattedExpires}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Subkeys</p>
          <p className="text-sm text-gray-700">{subkeyCount}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-600 font-medium mb-2">Capabilities</p>
        <div className="flex flex-wrap gap-2">
          {capabilities.map((cap) => (
            <span
              key={cap.name}
              className={`px-2 py-1 text-xs font-medium rounded ${
                cap.enabled ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-500"
              }`}
            >
              {cap.name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-600 font-medium mb-2">Emails</p>
        <ul className="space-y-1">
          {emailList.map((e, i) => (
            <li key={i} className="flex items-center text-sm text-gray-700">
              <span className="truncate">{e.email}</span>
              {e.verified ? (
                <svg
                  className="w-4 h-4 ml-2 text-green-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.78 3.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 8.59a.75.75 0 111.06-1.06L6 10.25l6.72-6.72a.75.75 0 011.06 0z" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 ml-2 text-red-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
