import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * API Insights usage route stats for an actor
     *
     * @title Route Stats
    */
    export type api_insights_route_stats = {
        /**
         * The HTTP method
        */
        http_method?: string;
        /**
         * The API path's route template
        */
        api_route?: string;
        /**
         * The total number of requests within the queried time period
        */
        total_request_count?: number & tags.Type<"int32">;
        /**
         * The total number of requests that were rate limited within the queried time period
        */
        rate_limited_request_count?: number & tags.Type<"int32">;
        last_rate_limited_timestamp?: string | null;
        last_request_timestamp?: string;
    }[];
}
export type AutoViewInput = AutoViewInputSubTypes.api_insights_route_stats;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const totalRequests: number = value.reduce(
    (acc, item) => acc + (item.total_request_count ?? 0),
    0,
  );
  const totalRateLimited: number = value.reduce(
    (acc, item) => acc + (item.rate_limited_request_count ?? 0),
    0,
  );
  const rateLimitPercent: number =
    totalRequests > 0 ? (totalRateLimited / totalRequests) * 100 : 0;

  const formatDate = (isoString?: string | null): string => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? '-' : date.toLocaleString();
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">API Route Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center p-3 bg-gray-50 rounded-md">
          <LucideReact.Server size={24} className="text-blue-500 mr-3" />
          <div>
            <div className="text-sm text-gray-500">Total Requests</div>
            <div className="text-xl font-bold">
              {totalRequests.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded-md">
          <LucideReact.AlertTriangle size={24} className="text-red-500 mr-3" />
          <div>
            <div className="text-sm text-gray-500">Rate Limited</div>
            <div className="text-xl font-bold">
              {totalRateLimited.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded-md">
          <LucideReact.Percent size={24} className="text-green-500 mr-3" />
          <div>
            <div className="text-sm text-gray-500">Rate Limit %</div>
            <div className="text-xl font-bold">
              {rateLimitPercent.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {value.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-gray-500">
          <LucideReact.AlertCircle size={32} />
          <span className="mt-2">No API route data available</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Method
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Route
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase"
                >
                  Rate Limited
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase"
                >
                  Last Request
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase"
                >
                  Last Rate Limited
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {value.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 uppercase text-xs font-medium bg-gray-100 text-gray-800 rounded">
                      {item.http_method ?? '-'}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-blue-600 text-sm truncate block max-w-xs">
                      {item.api_route ?? '-'}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right text-sm text-gray-700">
                    {(item.total_request_count ?? 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right text-sm text-gray-700">
                    {(item.rate_limited_request_count ?? 0).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right text-sm text-gray-700">
                    <div className="flex justify-end items-center gap-1">
                      <LucideReact.Calendar
                        size={16}
                        className="text-gray-400"
                      />
                      <span>{formatDate(item.last_request_timestamp)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right text-sm text-gray-700">
                    <div className="flex justify-end items-center gap-1">
                      <LucideReact.Calendar
                        size={16}
                        className="text-gray-400"
                      />
                      <span>{formatDate(item.last_rate_limited_timestamp)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
