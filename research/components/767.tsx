import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Porter Author
   *
   * @title Porter Author
   */
  export type porter_author = {
    id: number & tags.Type<"int32">;
    remote_id: string;
    remote_name: string;
    email: string;
    name: string;
    url: string & tags.Format<"uri">;
    import_url: string & tags.Format<"uri">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.porter_author;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayName = value.name;
  const remoteName = value.remote_name;
  const remoteId = value.remote_id;
  const email = value.email;
  const profileUrl = value.url;
  // Generate a placeholder avatar based on the author's name
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff`;

  // Fallback placeholder if avatar fails to load
  const fallbackAvatar = `https://placehold.co/100x100/e2e8f0/1e293b?text=${encodeURIComponent(
    displayName,
  )}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden p-4 flex flex-col items-center md:flex-row md:items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.src = fallbackAvatar;
            }}
          />
        </div>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {displayName}
        </h2>
        <p className="mt-2 flex items-center text-gray-600 text-sm">
          <LucideReact.User
            size={16}
            className="mr-1 text-gray-400"
            aria-label="Remote username"
          />
          {remoteName}
        </p>
        <p className="mt-1 flex items-center text-gray-600 text-sm">
          <LucideReact.Hash
            size={16}
            className="mr-1 text-gray-400"
            aria-label="Remote ID"
          />
          {remoteId}
        </p>
        <p className="mt-1 flex items-center text-gray-600 text-sm break-all">
          <LucideReact.Mail
            size={16}
            className="mr-1 text-gray-400"
            aria-label="Email address"
          />
          {email}
        </p>
        <p className="mt-1 flex items-center text-blue-600 text-sm break-all">
          <LucideReact.Link
            size={16}
            className="mr-1"
            aria-label="Profile URL"
          />
          <span className="underline truncate">{profileUrl}</span>
        </p>
      </div>
    </div>
  );
}
