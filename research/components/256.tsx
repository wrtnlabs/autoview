import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface RedirectionView {
        redirection?: AutoViewInputSubTypes.Redirection;
    }
    export interface Redirection {
        originalUrl?: string;
        expireAt?: number;
        shortUrl?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.RedirectionView;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data extraction and derived values
  const redirect = value.redirection;
  const hasDetails =
    redirect &&
    (redirect.originalUrl || redirect.shortUrl || redirect.expireAt !== undefined);

  // 2. Fallback for missing data
  if (!hasDetails) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
        <LucideReact.AlertCircle size={24} className="text-gray-400" aria-label="No data" />
        <p className="mt-2 text-sm text-gray-500">No redirection data available.</p>
      </div>
    );
  }

  // At this point `redirect` is defined
  const { originalUrl, shortUrl, expireAt } = redirect!;
  // Format expiration date if provided
  const expirationDate = expireAt
    ? new Date(expireAt).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  // 3. Compose visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full space-y-3">
      {originalUrl && (
        <div className="flex items-center gap-2">
          <LucideReact.Link size={16} className="text-gray-400" aria-label="Original URL" />
          <span className="text-sm text-gray-700 break-all truncate">{originalUrl}</span>
        </div>
      )}
      {shortUrl && (
        <div className="flex items-center gap-2">
          <LucideReact.Link size={16} className="text-gray-400" aria-label="Short URL" />
          <span className="text-sm text-gray-700 break-all truncate">{shortUrl}</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <LucideReact.Calendar size={16} className="text-gray-400" aria-label="Expiration Date" />
        <span className="text-sm text-gray-600">
          {expirationDate ?? 'No expiration'}
        </span>
      </div>
    </div>
  );
}
