import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Clone Traffic
     *
     * @title Clone Traffic
    */
    export interface clone_traffic {
        count: number & tags.Type<"int32">;
        uniques: number & tags.Type<"int32">;
        clones: AutoViewInputSubTypes.traffic[];
    }
    /**
     * @title Traffic
    */
    export interface traffic {
        timestamp: string & tags.Format<"date-time">;
        uniques: number & tags.Type<"int32">;
        count: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.clone_traffic;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalClones = value.count;
  const totalUniques = value.uniques;
  const sortedClones = React.useMemo(
    () =>
      [...value.clones].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      ),
    [value.clones],
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Clone Traffic Overview</h2>
      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 mb-6">
        <div className="flex items-center space-x-3">
          <LucideReact.Copy className="text-blue-500" size={20} />
          <div>
            <div className="text-sm text-gray-500">Total Clones</div>
            <div className="text-xl font-bold text-gray-900">{totalClones}</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <LucideReact.Users className="text-green-500" size={20} />
          <div>
            <div className="text-sm text-gray-500">Unique Cloners</div>
            <div className="text-xl font-bold text-gray-900">{totalUniques}</div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <span>Date</span>
                </div>
              </th>
              <th className="px-4 py-2">Clones</th>
              <th className="px-4 py-2">Uniques</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sortedClones.map((item, idx) => {
              const date = new Date(item.timestamp);
              const formattedDate =
                date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) +
                ", " +
                date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
              return (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{formattedDate}</td>
                  <td className="px-4 py-2">{item.count}</td>
                  <td className="px-4 py-2">{item.uniques}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
