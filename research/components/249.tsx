import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface CallLog {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.CallLog[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatTimestamp = (ts?: number): string =>
    ts ? new Date(ts).toLocaleString() : '-';

  const formatDuration = (start?: number, end?: number): string => {
    if (start && end && end > start) {
      const totalSec = Math.floor((end - start) / 1000);
      const mins = Math.floor(totalSec / 60);
      const secs = totalSec % 60;
      return `${mins}m ${secs}s`;
    }
    return '-';
  };

  const capitalize = (s?: string): string =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : '-';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4">No call logs available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((log, idx) => {
        const dir = log.direction?.toLowerCase();
        const isOutgoing = dir === 'outgoing';
        const DirectionIcon = isOutgoing
          ? LucideReact.ArrowUpRight
          : LucideReact.ArrowDownLeft;
        const directionColor = isOutgoing ? 'text-blue-500' : 'text-green-500';

        const state = log.state?.toLowerCase();
        let StateIcon = LucideReact.Clock;
        let stateColor = 'text-gray-500';
        if (state === 'closed') {
          StateIcon = LucideReact.CheckCircle;
          stateColor = 'text-green-500';
        } else if (state === 'missed') {
          StateIcon = LucideReact.AlertTriangle;
          stateColor = 'text-red-500';
        } else if (state === 'open') {
          StateIcon = LucideReact.Clock;
          stateColor = 'text-amber-500';
        }

        const managers = log.managerIds?.length ?? 0;

        return (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow flex flex-col md:flex-row md:justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <DirectionIcon className={directionColor} size={16} />
                <span className="font-medium capitalize">
                  {capitalize(log.direction)}
                </span>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <LucideReact.Phone size={16} className="text-gray-400" />
                  <span className="truncate">From: {log.from ?? '-'}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <LucideReact.Phone size={16} className="text-gray-400" />
                  <span className="truncate">To: {log.to ?? '-'}</span>
                </div>
                {log.missedReason && (
                  <div className="flex items-center space-x-2 text-sm text-red-500">
                    <LucideReact.AlertTriangle size={16} />
                    <span>{log.missedReason}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex-1 flex flex-col md:items-end items-start space-y-2">
              <div className="flex items-center text-sm text-gray-500 space-x-1">
                <LucideReact.Calendar size={16} />
                <span>Started: {formatTimestamp(log.createdAt)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 space-x-1">
                <LucideReact.Clock size={16} />
                <span>Answered: {formatTimestamp(log.engagedAt)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 space-x-1">
                <LucideReact.Calendar size={16} />
                <span>Ended: {formatTimestamp(log.closedAt)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 space-x-1">
                <LucideReact.Clock size={16} />
                <span>Duration: {formatDuration(log.engagedAt, log.closedAt)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 space-x-1">
                <LucideReact.Users size={16} />
                <span>Managers: {managers}</span>
              </div>
              <div className="flex items-center text-sm space-x-1">
                <StateIcon size={16} className={stateColor} />
                <span className={stateColor}>{capitalize(log.state)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
