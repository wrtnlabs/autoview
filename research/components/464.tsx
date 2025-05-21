import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * API Insights usage time stats for an organization
     *
     * @title Time Stats
    */
    export type api_insights_time_stats = {
        timestamp?: string;
        total_request_count?: number & tags.Type<"int32">;
        rate_limited_request_count?: number & tags.Type<"int32">;
    }[];
}
export type AutoViewInput = AutoViewInputSubTypes.api_insights_time_stats;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const data = Array.isArray(value) ? value : [];
  const validEntries = data.filter(
    (e): e is NonNullable<typeof e> => !!e.timestamp
  );
  const sortedEntries = [...validEntries].sort(
    (a, b) =>
      new Date(a.timestamp!).getTime() - new Date(b.timestamp!).getTime()
  );
  const totalRequests = sortedEntries.reduce(
    (sum, e) => sum + (e.total_request_count ?? 0),
    0
  );
  const totalRateLimited = sortedEntries.reduce(
    (sum, e) => sum + (e.rate_limited_request_count ?? 0),
    0
  );
  const overallRatePercent =
    totalRequests > 0 ? (totalRateLimited / totalRequests) * 100 : 0;

  function formatNumber(num: number): string {
    return num.toLocaleString(undefined);
  }

  function formatDate(iso?: string): string {
    if (!iso) return "-";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        API Insights Time Stats
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div>
          <div className="text-sm text-gray-500">Period</div>
          <div className="text-base font-medium text-gray-900">
            {sortedEntries.length > 0
              ? `${formatDate(sortedEntries[0].timestamp)} – ${formatDate(
                  sortedEntries[sortedEntries.length - 1].timestamp
                )}`
              : "-"}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Total Requests</div>
          <div className="text-base font-medium text-gray-900">
            {formatNumber(totalRequests)}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Rate-Limited</div>
          <div className="text-base font-medium text-gray-900">
            {formatNumber(totalRateLimited)}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Rate-Limited %</div>
          <div className="text-base font-medium text-gray-900">
            {overallRatePercent.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Timestamp
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Rate-Limited
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                % Rate
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {sortedEntries.map((e, idx) => {
              const total = e.total_request_count ?? 0;
              const rateLimited = e.rate_limited_request_count ?? 0;
              const percent = total > 0 ? (rateLimited / total) * 100 : 0;
              return (
                <tr key={idx}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {formatDate(e.timestamp)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 text-right">
                    {formatNumber(total)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 text-right">
                    {formatNumber(rateLimited)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 text-right">
                    {percent.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
