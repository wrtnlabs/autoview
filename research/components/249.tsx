import React from "react";
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



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helper to capitalize strings
  const capitalize = (s: string = ''): string =>
    s.charAt(0).toUpperCase() + s.slice(1);

  // Format timestamp to "Mon DD, YYYY HH:MM AM/PM"
  const formatDateTime = (timestamp?: number): string => {
    if (!timestamp) return 'Unknown';
    const d = new Date(timestamp);
    const date = d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const time = d.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });
    return `${date} ${time}`;
  };

  // Convert total seconds into "Hh Mm Ss"
  const formatDuration = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const segments: string[] = [];
    if (hours) segments.push(`${hours}h`);
    if (minutes) segments.push(`${minutes}m`);
    segments.push(`${seconds}s`);
    return segments.join(' ');
  };

  // Aggregate summary statistics
  const totalCalls = value.length;
  const missedCalls = value.filter(
    (c) => c.state?.toLowerCase() === 'missed' || !!c.missedReason
  ).length;
  const answeredCalls = totalCalls - missedCalls;
  const callDurations = value
    .map((c) =>
      c.engagedAt && c.closedAt
        ? Math.floor((c.closedAt - c.engagedAt) / 1000)
        : 0
    )
    .filter((sec) => sec > 0);
  const averageDurationSec = callDurations.length
    ? Math.floor(
        callDurations.reduce((sum, s) => sum + s, 0) / callDurations.length
      )
    : 0;
  const averageDurationLabel = averageDurationSec
    ? formatDuration(averageDurationSec)
    : 'N/A';

  // Render
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary Section */}
      <h2 className="text-xl font-semibold mb-4">Call Logs Summary</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-100 p-3 rounded flex flex-col items-center">
          <span className="text-2xl font-bold">{totalCalls}</span>
          <span className="text-gray-600 text-sm">Total Calls</span>
        </div>
        <div className="bg-gray-100 p-3 rounded flex flex-col items-center">
          <span className="text-2xl font-bold">{answeredCalls}</span>
          <span className="text-gray-600 text-sm">Answered</span>
        </div>
        <div className="bg-gray-100 p-3 rounded flex flex-col items-center">
          <span className="text-2xl font-bold">{missedCalls}</span>
          <span className="text-gray-600 text-sm">Missed</span>
        </div>
        <div className="bg-gray-100 p-3 rounded flex flex-col items-center">
          <span className="text-2xl font-bold">{averageDurationLabel}</span>
          <span className="text-gray-600 text-sm">Avg Duration</span>
        </div>
      </div>

      {/* Detailed Call List */}
      <div className="space-y-4">
        {value.map((call, idx) => {
          const dateLabel = formatDateTime(call.createdAt);
          const dirLabel = capitalize(call.direction || 'Unknown');
          const stateKey = call.state?.toLowerCase() || 'unknown';
          const stateLabel = capitalize(stateKey);
          const badgeStyle =
            stateKey === 'missed'
              ? 'bg-red-100 text-red-800'
              : stateKey === 'closed'
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800';
          const durSec =
            call.engagedAt && call.closedAt
              ? Math.floor((call.closedAt - call.engagedAt) / 1000)
              : 0;
          const durLabel = durSec > 0 ? formatDuration(durSec) : null;

          return (
            <div
              key={idx}
              className="p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">{dateLabel}</span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${badgeStyle}`}
                >
                  {stateLabel}
                </span>
              </div>
              <div className="text-lg font-medium mb-1">
                {dirLabel} Call
              </div>
              <div className="text-sm text-gray-700">
                From:{' '}
                <span className="font-medium">
                  {call.from || 'Unknown'}
                </span>{' '}
                To:{' '}
                <span className="font-medium">
                  {call.to || 'Unknown'}
                </span>
              </div>
              {durLabel && (
                <div className="text-sm text-gray-700 mt-1">
                  Duration:{' '}
                  <span className="font-medium">{durLabel}</span>
                </div>
              )}
              {stateKey === 'missed' && call.missedReason && (
                <div className="text-sm text-red-600 mt-1">
                  Reason:{' '}
                  <span className="font-medium">
                    {call.missedReason}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
