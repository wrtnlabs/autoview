import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Referrer Traffic
     *
     * @title Referrer Traffic
    */
    export interface referrer_traffic {
        referrer: string;
        count: number & tags.Type<"int32">;
        uniques: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.referrer_traffic[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const data = value;
  const totalCount = data.reduce((sum, { count }) => sum + count, 0);
  const totalUniques = data.reduce((sum, { uniques }) => sum + uniques, 0);
  const formatter = new Intl.NumberFormat();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold flex items-center mb-4">
        <LucideReact.Link2 size={20} className="mr-2 text-gray-600" />
        Referrer Traffic
      </h2>

      {data.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <span>No referrer data available.</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-2 py-1">Referrer</th>
                <th className="px-2 py-1">Visits</th>
                <th className="px-2 py-1">Uniques</th>
                <th className="px-2 py-1">Percent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item) => {
                const percent =
                  totalCount > 0
                    ? ((item.count / totalCount) * 100).toFixed(1)
                    : "0.0";
                return (
                  <tr key={item.referrer} className="hover:bg-gray-50">
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-1">
                        <LucideReact.Link2
                          size={16}
                          className="text-gray-500"
                        />
                        <span className="truncate">{item.referrer}</span>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      {formatter.format(item.count)}
                    </td>
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-1">
                        <LucideReact.Users
                          size={16}
                          className="text-green-500"
                        />
                        <span>{formatter.format(item.uniques)}</span>
                      </div>
                    </td>
                    <td className="px-2 py-2">{percent}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-4 flex justify-end space-x-6 text-sm font-medium text-gray-700">
            <div>Total Visits: {formatter.format(totalCount)}</div>
            <div>Total Uniques: {formatter.format(totalUniques)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
