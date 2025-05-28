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
  // Derive statistics from the code frequency data
  const stats = Array.isArray(value) ? value : [];
  const totalWeeks = stats.length;

  // Helper functions for formatting
  const formatNumber = (n: number) => new Intl.NumberFormat().format(n);
  const formatDate = (ts: number) =>
    new Date(ts * 1000).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  // If there's no data, show an empty state
  if (totalWeeks === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-3 text-sm">No code frequency data available.</span>
      </div>
    );
  }

  // Compute totals and averages
  let totalAdditions = 0;
  let totalDeletions = 0;
  stats.forEach((weekStat) => {
    const [_, adds = 0, dels = 0] = weekStat;
    totalAdditions += adds;
    totalDeletions += Math.abs(dels);
  });
  const avgAdditions = Math.round(totalAdditions / totalWeeks);
  const avgDeletions = Math.round(totalDeletions / totalWeeks);

  // Last week's data for spotlight
  const lastWeek = stats[stats.length - 1];
  const [lastTs = 0, lastAdds = 0, lastDels = 0] = lastWeek;
  const lastDate = formatDate(lastTs);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <LucideReact.Activity size={20} className="text-indigo-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Code Frequency</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <LucideReact.Plus size={20} className="text-green-500 mr-2" />
          <div>
            <div className="text-sm text-gray-500">Total Additions</div>
            <div className="text-lg font-semibold text-gray-900">{formatNumber(totalAdditions)}</div>
          </div>
        </div>
        <div className="flex items-center">
          <LucideReact.Minus size={20} className="text-red-500 mr-2" />
          <div>
            <div className="text-sm text-gray-500">Total Deletions</div>
            <div className="text-lg font-semibold text-gray-900">{formatNumber(totalDeletions)}</div>
          </div>
        </div>
        <div className="flex items-center">
          <LucideReact.Clock size={20} className="text-blue-500 mr-2" />
          <div>
            <div className="text-sm text-gray-500">Avg Additions/Week</div>
            <div className="text-lg font-semibold text-gray-900">{formatNumber(avgAdditions)}</div>
          </div>
        </div>
        <div className="flex items-center">
          <LucideReact.Clock size={20} className="text-blue-500 mr-2" />
          <div>
            <div className="text-sm text-gray-500">Avg Deletions/Week</div>
            <div className="text-lg font-semibold text-gray-900">{formatNumber(avgDeletions)}</div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm text-gray-500">Last Week ({lastDate})</div>
        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center text-green-600">
            <LucideReact.Plus size={16} className="mr-1" />
            <span className="font-medium">{formatNumber(lastAdds)}</span>
          </div>
          <div className="flex items-center text-red-600">
            <LucideReact.Minus size={16} className="mr-1" />
            <span className="font-medium">{formatNumber(Math.abs(lastDels))}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
