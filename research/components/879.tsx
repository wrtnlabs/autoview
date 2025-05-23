import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Code Frequency Stat
     *
     * @title Code Frequency Stat
    */
    export type code_frequency_stat = (number & tags.Type<"int32">)[];
}
export type AutoViewInput = AutoViewInputSubTypes.code_frequency_stat[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Handle empty data state
  if (!value || value.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto py-8 flex flex-col items-center text-gray-400">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <span className="text-lg">No code frequency data available.</span>
      </div>
    );
  }

  // 1. Data aggregation and transformation
  const totalAdditions = value.reduce((sum, stat) => sum + (stat[1] ?? 0), 0);
  const totalDeletions = value.reduce((sum, stat) => sum + (stat[2] ?? 0), 0);
  const netTotal = totalAdditions - totalDeletions;
  const recentStats = value.slice(-8);

  const formatDate = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Code Frequency Stats
      </h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col items-center">
          <LucideReact.PlusCircle size={20} className="text-green-500" />
          <span className="mt-1 text-sm font-medium text-gray-700">
            Additions
          </span>
          <span className="text-lg font-semibold text-green-600">
            {totalAdditions.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.MinusCircle size={20} className="text-red-500" />
          <span className="mt-1 text-sm font-medium text-gray-700">
            Deletions
          </span>
          <span className="text-lg font-semibold text-red-600">
            {totalDeletions.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <LucideReact.TrendingUp
            size={20}
            className={netTotal >= 0 ? "text-green-500" : "text-red-500"}
          />
          <span className="mt-1 text-sm font-medium text-gray-700">Net</span>
          <span
            className={`text-lg font-semibold ${
              netTotal >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {netTotal.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="flex mb-2 px-2">
          <span className="w-1/4 text-xs font-medium text-gray-500">
            Week
          </span>
          <span className="w-1/4 text-xs font-medium text-gray-500">Add</span>
          <span className="w-1/4 text-xs font-medium text-gray-500">Del</span>
          <span className="w-1/4 text-xs font-medium text-gray-500">Net</span>
        </div>
        {recentStats.map((stat, idx) => {
          const [weekTs, adds, dels] = stat;
          const net = adds - dels;
          return (
            <div
              key={idx}
              className="flex justify-between items-center py-2 px-2 border-b border-gray-100"
            >
              <div className="w-1/4 flex items-center">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span className="ml-1 text-sm text-gray-700">
                  {formatDate(weekTs)}
                </span>
              </div>
              <div className="w-1/4 flex items-center">
                <LucideReact.Plus size={16} className="text-green-500" />
                <span className="ml-1 text-sm text-green-600">
                  {adds.toLocaleString()}
                </span>
              </div>
              <div className="w-1/4 flex items-center">
                <LucideReact.Minus size={16} className="text-red-500" />
                <span className="ml-1 text-sm text-red-600">
                  {dels.toLocaleString()}
                </span>
              </div>
              <div className="w-1/4 flex items-center">
                <LucideReact.TrendingUp
                  size={16}
                  className={net >= 0 ? "text-green-500" : "text-red-500"}
                />
                <span
                  className={`ml-1 text-sm font-medium ${
                    net >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {net.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
