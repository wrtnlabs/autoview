import LucideReact from "lucide-react";
import React, { JSX } from "react";

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
  const redir = value.redirection;
  const hasData =
    !!redir &&
    (!!redir.shortUrl ||
      !!redir.originalUrl ||
      typeof redir.expireAt === "number");
  const formattedExpire =
    redir?.expireAt != null
      ? new Date(redir.expireAt).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-sm">No redirection data available</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <LucideReact.Link size={20} className="text-gray-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-700">URL Redirection</h2>
      </div>

      {redir?.shortUrl && (
        <div className="flex items-center text-indigo-600 truncate mb-1">
          <LucideReact.Link size={16} className="mr-1" />
          <span className="truncate">{redir.shortUrl}</span>
        </div>
      )}

      {redir?.originalUrl && (
        <div className="flex items-center text-gray-600 truncate mb-1">
          <LucideReact.Link size={16} className="mr-1" />
          <span className="truncate">{redir.originalUrl}</span>
        </div>
      )}

      {formattedExpire && (
        <div className="flex items-center text-gray-500">
          <LucideReact.Calendar size={16} className="mr-1" />
          <time dateTime={new Date(redir!.expireAt!).toISOString()}>
            Expires: {formattedExpire}
          </time>
        </div>
      )}
    </div>
  );
}
