import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * An SSH key granting access to a single repository.
     *
     * @title Deploy Key
    */
    export type deploy_key = {
        id: number & tags.Type<"int32">;
        key: string;
        url: string;
        title: string;
        verified: boolean;
        created_at: string;
        read_only: boolean;
        added_by?: string | null;
        last_used?: string | null;
        enabled?: boolean;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.deploy_key[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation and transformation
  const totalKeys = value.length;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  const maskKey = (key: string): string =>
    key.length > 10 ? `${key.slice(0, 4)}…${key.slice(-4)}` : key;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Deploy Keys ({totalKeys})
      </h2>
      <div className="space-y-4">
        {value.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h3 className="text-md font-medium text-gray-900 truncate">
                {item.title}
              </h3>
              <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
                {item.verified ? (
                  <span className="text-xs font-semibold bg-green-100 text-green-800 rounded-full px-2 py-0.5">
                    Verified
                  </span>
                ) : (
                  <span className="text-xs font-semibold bg-red-100 text-red-800 rounded-full px-2 py-0.5">
                    Unverified
                  </span>
                )}
                {item.enabled === false ? (
                  <span className="text-xs font-semibold bg-red-100 text-red-800 rounded-full px-2 py-0.5">
                    Disabled
                  </span>
                ) : (
                  <span className="text-xs font-semibold bg-green-100 text-green-800 rounded-full px-2 py-0.5">
                    Enabled
                  </span>
                )}
                {item.read_only && (
                  <span className="text-xs font-semibold bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                    Read-Only
                  </span>
                )}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
              <div>
                <span className="font-medium">Key:</span>{" "}
                <span className="font-mono">{maskKey(item.key)}</span>
              </div>
              <div>
                <span className="font-medium">Created:</span>{" "}
                {formatDate(item.created_at)}
              </div>
              {item.last_used && (
                <div>
                  <span className="font-medium">Last Used:</span>{" "}
                  {formatDate(item.last_used)}
                </div>
              )}
              {item.added_by && (
                <div>
                  <span className="font-medium">Added By:</span>{" "}
                  {item.added_by}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
