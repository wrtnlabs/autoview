import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * @title Participation Stats
    */
    export interface participation_stats {
        all: (number & tags.Type<"int32">)[];
        owner: (number & tags.Type<"int32">)[];
    }
}
export type AutoViewInput = AutoViewInputSubTypes.participation_stats;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const allData = value.all ?? [];
  const ownerData = value.owner ?? [];
  const totalAll = allData.reduce((acc, num) => acc + num, 0);
  const totalOwner = ownerData.reduce((acc, num) => acc + num, 0);
  const avgAll = allData.length > 0 ? totalAll / allData.length : 0;
  const avgOwner = ownerData.length > 0 ? totalOwner / ownerData.length : 0;
  const latestAll = allData.length > 0 ? allData[allData.length - 1] : 0;
  const latestOwner = ownerData.length > 0 ? ownerData[ownerData.length - 1] : 0;
  const participationRatio = totalAll > 0 ? (totalOwner / totalAll) * 100 : 0;
  const formatNumber = (num: number) => num.toLocaleString();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (allData.length === 0 && ownerData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-3" />
        <span>No participation data available</span>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
        <LucideReact.BarChart2 className="mr-2 text-blue-500" size={20} />
        Participation Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center text-gray-700 mb-2">
            <LucideReact.Users className="mr-2 text-gray-500" size={16} />
            <span className="font-medium">All Participants</span>
          </div>
          <ul className="space-y-1 text-gray-600">
            <li>
              Total: <span className="font-semibold">{formatNumber(totalAll)}</span>
            </li>
            <li>
              Average: <span className="font-semibold">{avgAll.toFixed(2)}</span>
            </li>
            <li>
              Latest: <span className="font-semibold">{formatNumber(latestAll)}</span>
            </li>
          </ul>
        </div>
        <div>
          <div className="flex items-center text-gray-700 mb-2">
            <LucideReact.User className="mr-2 text-gray-500" size={16} />
            <span className="font-medium">Owner Participation</span>
          </div>
          <ul className="space-y-1 text-gray-600">
            <li>
              Total: <span className="font-semibold">{formatNumber(totalOwner)}</span>
            </li>
            <li>
              Average: <span className="font-semibold">{avgOwner.toFixed(2)}</span>
            </li>
            <li>
              Latest: <span className="font-semibold">{formatNumber(latestOwner)}</span>
            </li>
            <li>
              Ratio: <span className="font-semibold">{participationRatio.toFixed(2)}%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
