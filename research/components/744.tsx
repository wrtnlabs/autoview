import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposEnvironmentsVariables {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            variables: AutoViewInputSubTypes.actions_variable[];
        }
    }
    /**
     * @title Actions Variable
    */
    export interface actions_variable {
        /**
         * The name of the variable.
        */
        name: string;
        /**
         * The value of the variable.
        */
        value: string;
        /**
         * The date and time at which the variable was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time at which the variable was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposEnvironmentsVariables.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, variables } = value;
  // Sort variables by creation date (most recent first)
  const sortedVars = [...variables].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  // Format ISO date strings into a readable medium date + short time
  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-screen-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Code className="text-gray-600" size={20} aria-hidden="true" />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Environment Variables ({total_count})
        </h2>
      </div>

      {total_count === 0 ? (
        <div className="flex flex-col items-center py-8 text-gray-500">
          <LucideReact.AlertCircle size={40} aria-hidden="true" />
          <p className="mt-2">No environment variables available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedVars.map((envVar) => (
            <div
              key={envVar.name}
              className="border border-gray-200 bg-gray-50 p-4 rounded-lg"
            >
              <div className="truncate font-medium text-gray-800 mb-2">{envVar.name}</div>
              <div
                className="bg-white font-mono text-gray-700 text-sm p-2 rounded-md truncate break-all"
                title={envVar.value}
              >
                {envVar.value}
              </div>
              <div className="mt-2 flex flex-wrap text-gray-500 text-xs space-x-4">
                <div className="flex items-center">
                  <LucideReact.Calendar className="text-gray-400" size={14} aria-hidden="true" />
                  <span className="ml-1">Created:</span>
                  <span className="ml-1">{formatDate(envVar.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Edit2 className="text-gray-400" size={14} aria-hidden="true" />
                  <span className="ml-1">Updated:</span>
                  <span className="ml-1">{formatDate(envVar.updated_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
