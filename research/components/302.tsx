import React from "react";
export namespace AutoViewInputSubTypes {
    export type ResponseForm_lt_true_gt_ = any;
    export type ALREADY_FOLLOW_USER = any;
    export type CANNOT_FIND_ONE_DESIGNER_TO_FOLLOW = any;
    export type CANNOT_FOLLOW_MYSELF = any;
}
export type AutoViewInput = any | any | any | any;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const val = value as any;
  type StatusType = 'success' | 'alreadyFollowing' | 'notFound' | 'selfFollow' | 'unknown';
  let statusType: StatusType = 'unknown';

  if (val && typeof val === 'object') {
    // Success detection: ResponseForm<true> often has a data field === true
    if (val.data === true) {
      statusType = 'success';
    }
    // Error code discriminators
    if (val === 'ALREADY_FOLLOW_USER' || val.code === 'ALREADY_FOLLOW_USER') {
      statusType = 'alreadyFollowing';
    }
    if (
      val === 'CANNOT_FIND_ONE_DESIGNER_TO_FOLLOW' ||
      val.code === 'CANNOT_FIND_ONE_DESIGNER_TO_FOLLOW'
    ) {
      statusType = 'notFound';
    }
    if (val === 'CANNOT_FOLLOW_MYSELF' || val.code === 'CANNOT_FOLLOW_MYSELF') {
      statusType = 'selfFollow';
    }
  }

  // 2. Prepare message and styling maps
  const messageMap: Record<StatusType, string> = {
    success: 'Successfully followed the user.',
    alreadyFollowing: 'You are already following this user.',
    notFound: 'Unable to find a designer to follow.',
    selfFollow: 'You cannot follow yourself.',
    unknown: 'Received an unexpected response.',
  };
  const colorMap: Record<StatusType, string> = {
    success: 'bg-green-50 text-green-700',
    alreadyFollowing: 'bg-blue-50 text-blue-700',
    notFound: 'bg-yellow-50 text-yellow-700',
    selfFollow: 'bg-red-50 text-red-700',
    unknown: 'bg-gray-50 text-gray-700',
  };

  const message = messageMap[statusType];
  const colorClasses = colorMap[statusType];

  // 3. Fallback JSON preview for unknown cases (truncated)
  const rawJson = JSON.stringify(val, null, 2);
  const details =
    statusType === 'unknown'
      ? rawJson.length > 200
        ? rawJson.slice(0, 200) + '...'
        : rawJson
      : null;

  // 4. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div
      className={
        'max-w-sm mx-auto p-4 rounded-lg shadow-md ' +
        colorClasses +
        ' flex flex-col'
      }
    >
      <div className="flex items-center">
        <span className="flex-shrink-0">
          {statusType === 'success' && (
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 01.083 1.32l-.083.094L8 15l-4.707-4.707a1 1 0 011.32-1.497l.094.083L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {statusType === 'alreadyFollowing' && (
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a6 6 0 016 6v1h1a1 1 0 010 2h-1v1a6 6 0 01-6 6 6 6 0 01-6-6v-1H3a1 1 0 010-2h1V8a6 6 0 016-6z" />
            </svg>
          )}
          {(statusType === 'notFound' || statusType === 'selfFollow') && (
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V5a1 1 0 10-2 0v2a1 1 0 002 0zm0 2a1 1 0 10-2 0v4a1 1 0 002 0V9z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {statusType === 'unknown' && (
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8-3a1 1 0 00-1 1v1a1 1 0 002 0V8a1 1 0 00-1-1zm1 5a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          )}
        </span>
        <p className="ml-2 text-sm md:text-base font-medium">{message}</p>
      </div>
      {details && (
        <pre className="mt-3 p-2 bg-white rounded text-xs text-gray-700 overflow-x-auto line-clamp-6">
          {details}
        </pre>
      )}
    </div>
  );
}
