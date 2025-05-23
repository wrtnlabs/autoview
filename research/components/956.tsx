import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Key
     *
     * @title Key
    */
    export interface key {
        key: string;
        id: number & tags.Type<"int32">;
        url: string;
        title: string;
        created_at: string & tags.Format<"date-time">;
        verified: boolean;
        read_only: boolean;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.key[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived helper to mask API keys for security
  const maskKey = (fullKey: string): string =>
    fullKey.length > 8 ? `${fullKey.slice(0, 4)}…${fullKey.slice(-4)}` : fullKey;

  return (
    <div>
      {value.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-gray-500">
          <LucideReact.AlertCircle
            size={48}
            className="text-gray-400"
            aria-label="No Data"
          />
          <span className="mt-2 text-lg">No API Keys Available</span>
        </div>
      ) : (
        <div className="space-y-4">
          {value.map((item) => {
            const formattedDate = new Date(item.created_at).toLocaleDateString(
              undefined,
              { year: "numeric", month: "short", day: "numeric" }
            );

            return (
              <div key={item.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.title || "Untitled Key"}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {item.verified ? (
                      <LucideReact.CheckCircle
                        size={16}
                        className="text-green-500"
                        aria-label="Verified"
                      />
                    ) : (
                      <LucideReact.XCircle
                        size={16}
                        className="text-red-500"
                        aria-label="Not Verified"
                      />
                    )}
                    {item.read_only && (
                      <LucideReact.Lock
                        size={16}
                        className="text-gray-400"
                        aria-label="Read Only"
                      />
                    )}
                  </div>
                </div>

                <div className="mt-2">
                  <span className="font-mono text-sm text-gray-700 break-all">
                    {maskKey(item.key)}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <LucideReact.Calendar
                      size={14}
                      className="text-gray-400"
                      aria-label="Created On"
                    />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1 break-all">
                    <LucideReact.Link
                      size={14}
                      className="text-gray-400"
                      aria-label="URL"
                    />
                    <a
                      href={item.url}
                      className="truncate text-blue-500 hover:underline"
                    >
                      {item.url}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
