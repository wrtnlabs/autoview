import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * @title Participation Stats
   */
  export type participation_stats = {
    all: (number & tags.Type<"int32">)[];
    owner: (number & tags.Type<"int32">)[];
  };
}
export type AutoViewInput = AutoViewInputSubTypes.participation_stats;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sumAll = value.all.reduce((acc, n) => acc + n, 0);
  const sumOwner = value.owner.reduce((acc, n) => acc + n, 0);
  const ownershipRate = sumAll > 0 ? Math.round((sumOwner / sumAll) * 100) : 0;
  const maxAll = Math.max(...value.all, 1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="flex items-center mb-4 text-gray-700">
        <LucideReact.BarChart2 size={20} className="mr-2 text-gray-500" />
        <h2 className="text-lg font-semibold">Participation Stats</h2>
      </div>
      <div className="flex justify-between mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">{sumAll}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{sumOwner}</div>
          <div className="text-sm text-gray-500">Owner</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {ownershipRate}%
          </div>
          <div className="text-sm text-gray-500">Ownership Rate</div>
        </div>
      </div>
      <div
        className="flex items-end h-24 space-x-1"
        role="img"
        aria-label="Bar chart of owner participation versus total"
      >
        {value.all.map((totalCount, idx) => {
          const ownerCount = value.owner[idx] ?? 0;
          // Height relative to maxAll for total, then owner relative to total
          const totalHeight = (totalCount / maxAll) * 100;
          const ownerHeight = totalCount > 0 ? (ownerCount / maxAll) * 100 : 0;
          return (
            <div key={idx} className="flex-1 flex flex-col justify-end">
              <div
                className="w-full bg-gray-200 rounded-t"
                style={{ height: `${totalHeight}%` }}
              >
                <div
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${ownerHeight}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
