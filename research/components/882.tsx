import { tags } from "typia";
import React from "react";
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
  const totalAll = value.all.reduce((sum, x) => sum + x, 0);
  const totalOwner = value.owner.reduce((sum, x) => sum + x, 0);
  const totalOthers = Math.max(totalAll - totalOwner, 0);
  const ownerPercentage = totalAll > 0 ? (totalOwner / totalAll) * 100 : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Participation Overview
      </h2>
      <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-blue-500 transition-width duration-300"
          style={{ width: `${ownerPercentage}%` }}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span className="flex items-center">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-1" />
          Owner: {totalOwner}
        </span>
        <span className="flex items-center">
          <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-1" />
          Others: {totalOthers}
        </span>
      </div>
      <div className="text-sm text-gray-700">
        Total Participants: <span className="font-medium">{totalAll}</span>
        <span className="ml-4">
          Owner Share: <span className="font-medium">{ownerPercentage.toFixed(1)}%</span>
        </span>
      </div>
    </div>
  );
}
