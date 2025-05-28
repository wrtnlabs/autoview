import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Tag protection
     *
     * @title Tag protection
    */
    export interface tag_protection {
        id?: number & tags.Type<"int32">;
        created_at?: string;
        updated_at?: string;
        enabled?: boolean;
        pattern: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.tag_protection[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Here we sort the rules by creation date (newest first).
  const sortedRules = [...value].sort((a, b) => {
    const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return timeB - timeA;
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 space-y-4">
      {sortedRules.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400">
          <LucideReact.AlertCircle size={24} className="text-gray-400" />
          <span className="mt-2">No tag protection rules available.</span>
        </div>
      ) : (
        sortedRules.map((rule, idx) => {
          const isEnabled = rule.enabled ?? false;
          const created = rule.created_at
            ? new Date(rule.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            : 'N/A';
          const updated = rule.updated_at
            ? new Date(rule.updated_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            : 'N/A';

          return (
            <div
              key={rule.id ?? idx}
              className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1">
                <div className="font-mono text-md break-all">{rule.pattern}</div>
                <div className="mt-1 text-sm text-gray-500 flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <LucideReact.Calendar size={16} className="text-gray-400" />
                    <span className="ml-1">Created: {created}</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Calendar size={16} className="text-gray-400" />
                    <span className="ml-1">Updated: {updated}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center text-sm">
                {isEnabled ? (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500"
                    aria-label="Enabled"
                  />
                ) : (
                  <LucideReact.XCircle
                    size={16}
                    className="text-red-500"
                    aria-label="Disabled"
                  />
                )}
                <span
                  className={
                    isEnabled ? 'ml-1 text-green-600' : 'ml-1 text-red-600'
                  }
                >
                  {isEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
