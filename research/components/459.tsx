import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * API Insights usage subject stats for an organization
     *
     * @title Subject Stats
    */
    export type api_insights_subject_stats = {
        subject_type?: string;
        subject_name?: string;
        subject_id?: number & tags.Type<"int32">;
        total_request_count?: number & tags.Type<"int32">;
        rate_limited_request_count?: number & tags.Type<"int32">;
        last_rate_limited_timestamp?: string | null;
        last_request_timestamp?: string;
    }[];
}
export type AutoViewInput = AutoViewInputSubTypes.api_insights_subject_stats;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Map each record to a display-friendly format, compute rate-limited percentage, and sort by total requests.
  const stats = Array.isArray(value)
    ? [...value]
        .map((item) => ({
          subjectName: item.subject_name ?? 'Unknown',
          subjectType: item.subject_type,
          totalRequests: item.total_request_count ?? 0,
          rateLimited: item.rate_limited_request_count ?? 0,
          rateLimitedPercent: item.total_request_count
            ? ((item.rate_limited_request_count ?? 0) / item.total_request_count) * 100
            : 0,
          lastRequest: item.last_request_timestamp
            ? new Date(item.last_request_timestamp)
            : null,
        }))
        .sort((a, b) => b.totalRequests - a.totalRequests)
    : [];

  const formatDate = (d: Date | null): string => (d ? d.toLocaleString() : '—');
  const formatPercent = (p: number): string => `${p.toFixed(1)}%`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Render a responsive table of subject stats with clear headers and alternating row backgrounds.
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2 font-medium text-gray-700">Subject</th>
            <th className="px-4 py-2 font-medium text-gray-700">Total Requests</th>
            <th className="px-4 py-2 font-medium text-gray-700">Rate Limited</th>
            <th className="px-4 py-2 font-medium text-gray-700">% Rate Limited</th>
            <th className="px-4 py-2 font-medium text-gray-700">Last Request</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="px-4 py-3">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-800 truncate">{s.subjectName}</span>
                  {s.subjectType && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                      {s.subjectType}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-gray-700">{s.totalRequests.toLocaleString()}</td>
              <td className="px-4 py-3 text-gray-700">{s.rateLimited.toLocaleString()}</td>
              <td className="px-4 py-3 text-gray-700">{formatPercent(s.rateLimitedPercent)}</td>
              <td className="px-4 py-3 text-gray-700">{formatDate(s.lastRequest)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
