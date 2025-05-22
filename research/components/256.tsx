import React from "react";
export namespace AutoViewInputSubTypes {
    export type RedirectionView = {
        redirection?: AutoViewInputSubTypes.Redirection;
    };
    export type Redirection = {
        originalUrl?: string;
        expireAt?: number;
        shortUrl?: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.RedirectionView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const redirect = value.redirection;
  // Handle missing data
  if (!redirect) {
    return (
      <div className="p-4 text-center text-gray-500">
        No redirection data available
      </div>
    );
  }

  const { originalUrl, shortUrl, expireAt } = redirect;

  // Format expiration date if present
  const expireDate = expireAt ? new Date(expireAt) : null;
  const formattedExpire = expireDate
    ? expireDate.toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : null;

  // Compute relative time until expiration
  let expiresInLabel = '';
  if (expireDate) {
    const diffMs = expireDate.getTime() - Date.now();
    if (diffMs > 0) {
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (days >= 1) {
        expiresInLabel = `${days} day${days > 1 ? 's' : ''} left`;
      } else {
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        expiresInLabel = `${hours} hour${hours !== 1 ? 's' : ''} left`;
      }
    } else {
      expiresInLabel = 'Expired';
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        URL Redirection Details
      </h2>
      <dl className="space-y-3">
        <div>
          <dt className="text-sm font-medium text-gray-600">Original URL</dt>
          <dd className="mt-1 text-sm text-blue-600 break-all truncate">
            {originalUrl ?? '—'}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-600">Short URL</dt>
          <dd className="mt-1 text-sm text-blue-600 break-all truncate">
            {shortUrl ?? '—'}
          </dd>
        </div>
        {formattedExpire && (
          <div>
            <dt className="text-sm font-medium text-gray-600">Expires On</dt>
            <dd className="mt-1 text-sm text-gray-700 flex items-center">
              <span>{formattedExpire}</span>
              {expiresInLabel && (
                <span className="ml-2 text-xs text-gray-500">
                  ({expiresInLabel})
                </span>
              )}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
