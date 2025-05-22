import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export type CallLog = {
    channelId?: string;
    missedReason?: string;
    direction?: string;
    state?: string;
    from?: string;
    to?: string;
    createdAt?: number;
    updatedAt?: number;
    engagedAt?: number;
    closedAt?: number;
    userChatId?: string;
    managerIds?: string[];
  };
}
export type AutoViewInput = AutoViewInputSubTypes.CallLog[];

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Data aggregation and formatting helpers
  const logs: AutoViewInputSubTypes.CallLog[] = value;
  const totalCalls = logs.length;
  const missedCalls = logs.filter((log) => log.missedReason != null).length;
  const answeredCalls = totalCalls - missedCalls;

  const formatDate = (ts?: number) =>
    ts ? new Date(ts).toLocaleString() : "—";

  const formatDuration = (start?: number, end?: number) => {
    if (start && end && end > start) {
      const totalSec = Math.floor((end - start) / 1000);
      const mins = Math.floor(totalSec / 60);
      const secs = totalSec % 60;
      return `${mins}m ${secs}s`;
    }
    return "—";
  };

  // Empty state
  if (totalCalls === 0) {
    return (
      <div className="flex flex-col items-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-sm">No call logs available</span>
      </div>
    );
  }

  // Main render
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Call Summary</h2>
        <div className="mt-2 flex space-x-6 text-sm text-gray-600">
          <div className="flex items-center">
            <LucideReact.Phone size={16} className="text-gray-500 mr-1" />
            Total: {totalCalls}
          </div>
          <div className="flex items-center">
            <LucideReact.AlertTriangle
              size={16}
              className="text-red-500 mr-1"
            />
            Missed: {missedCalls}
          </div>
          <div className="flex items-center">
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500 mr-1"
            />
            Answered: {answeredCalls}
          </div>
        </div>
      </div>

      {/* Call list */}
      <div className="space-y-2">
        {logs.map((log, idx) => {
          const isMissed = Boolean(log.missedReason);
          const dir = log.direction?.toLowerCase();
          const DirectionIcon =
            dir === "outgoing" || dir === "dial"
              ? LucideReact.PhoneOutgoing
              : LucideReact.PhoneIncoming;
          const iconColor = dir === "outgoing" ? "#7C3AED" : "#10B981";

          return (
            <div
              key={idx}
              className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              {/* Direction icon */}
              <div className="mr-3">
                <DirectionIcon
                  size={20}
                  color={iconColor}
                  aria-label={dir ?? "call"}
                />
              </div>

              {/* Call details */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center text-gray-800 truncate">
                  <span className="font-medium truncate">
                    {log.from ?? "Unknown"}
                  </span>
                  <span className="mx-1">→</span>
                  <span className="font-medium truncate">
                    {log.to ?? "Unknown"}
                  </span>
                </div>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <LucideReact.Calendar size={14} className="mr-1" />
                  <span className="truncate">{formatDate(log.createdAt)}</span>
                </div>
                {isMissed && (
                  <div className="mt-1 flex items-center text-xs text-red-500">
                    <LucideReact.XCircle size={14} className="mr-1" />
                    <span className="truncate">{log.missedReason}</span>
                  </div>
                )}
              </div>

              {/* Duration & state */}
              <div className="ml-4 flex flex-col items-end text-xs text-gray-600">
                <div className="flex items-center">
                  <LucideReact.Clock size={14} className="mr-1" />
                  {formatDuration(log.engagedAt, log.closedAt)}
                </div>
                {log.state && (
                  <span className="mt-1 px-2 py-0.5 bg-gray-200 rounded-full capitalize text-[10px]">
                    {log.state}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
