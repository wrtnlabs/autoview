import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Key
   *
   * @title Key
   */
  export type key = {
    key: string;
    id: number & tags.Type<"int32">;
    url: string;
    title: string;
    created_at: string & tags.Format<"date-time">;
    verified: boolean;
    read_only: boolean;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.key[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const items = value;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString("default", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const maskKey = (k: string): string =>
    k.length > 8 ? `${k.slice(0, 4)}…${k.slice(-4)}` : k;

  const truncate = (str: string, n = 30): string =>
    str.length > n ? `${str.slice(0, n)}…` : str;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2 text-lg">No API keys available.</span>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow">
          {items.map((item) => {
            const created = formatDate(item.created_at);
            const hiddenKey = maskKey(item.key);
            const shortUrl = truncate(item.url, 40);
            return (
              <li
                key={item.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium text-gray-900">
                    {item.title}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <LucideReact.Key size={16} className="mr-1" />
                    <span>{hiddenKey}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <LucideReact.Calendar size={16} className="mr-1" />
                    <span>{created}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <LucideReact.Link size={16} className="mr-1" />
                    <span className="truncate max-w-xs">{shortUrl}</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 sm:mt-0">
                  {item.verified ? (
                    <div className="flex items-center text-green-600">
                      <LucideReact.CheckCircle size={16} className="mr-1" />
                      <span className="text-sm">Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <LucideReact.XCircle size={16} className="mr-1" />
                      <span className="text-sm">Unverified</span>
                    </div>
                  )}
                  {item.read_only ? (
                    <div className="flex items-center text-blue-600">
                      <LucideReact.Lock size={16} className="mr-1" />
                      <span className="text-sm">Read Only</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-600">
                      <LucideReact.Unlock size={16} className="mr-1" />
                      <span className="text-sm">Read/Write</span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
