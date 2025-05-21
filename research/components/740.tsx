import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposEnvironmentsSecrets {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            secrets: AutoViewInputSubTypes.actions_secret[];
        };
    }
    /**
     * Set secrets for GitHub Actions.
     *
     * @title Actions Secret
    */
    export type actions_secret = {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposEnvironmentsSecrets.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation: format ISO date strings into human-readable form.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  // 2. Destructure input data
  const { total_count, secrets } = value;

  // 3. JSX visual structure using Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Environment Secrets</h2>
        <p className="text-sm text-gray-600">Total Secrets: {total_count}</p>
      </header>

      {secrets.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr>
                <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">Created</th>
                <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {secrets.map((secret) => (
                <tr key={secret.name} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-700 truncate">{secret.name}</td>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">
                    {formatDate(secret.created_at)}
                  </td>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">
                    {formatDate(secret.updated_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No secrets available.</p>
      )}
    </div>
  );
}
