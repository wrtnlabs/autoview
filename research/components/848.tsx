import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Data related to a release.
     *
     * @title Release Asset
    */
    export type release_asset = {
        url: string & tags.Format<"uri">;
        browser_download_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The file name of the asset.
        */
        name: string;
        label: string | null;
        /**
         * State of the release asset.
        */
        state: "uploaded" | "open";
        content_type: string;
        size: number & tags.Type<"int32">;
        download_count: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        uploader: AutoViewInputSubTypes.nullable_simple_user;
    };
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
        name?: string | null;
        email?: string | null;
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        avatar_url: string & tags.Format<"uri">;
        gravatar_id: string | null;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        followers_url: string & tags.Format<"uri">;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string & tags.Format<"uri">;
        organizations_url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string;
        received_events_url: string & tags.Format<"uri">;
        type: string;
        site_admin: boolean;
        starred_at?: string;
        user_view_type?: string;
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.release_asset;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedSize = (() => {
    const bytes = value.size;
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(2)} MB`;
  })();

  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const stateLabel = value.state.charAt(0).toUpperCase() + value.state.slice(1);
  const stateClasses =
    value.state === 'uploaded'
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-100 text-blue-800';

  const uploaderLogin = value.uploader?.login ?? 'Unknown';
  const uploaderAvatar = value.uploader?.avatar_url ?? '';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {value.name}
          </h3>
          {value.label && (
            <p className="mt-1 text-sm text-gray-500 truncate">
              {value.label}
            </p>
          )}
        </div>
        <span
          className={`ml-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${stateClasses}`}
        >
          {stateLabel}
        </span>
      </div>

      <div className="mt-4 flex items-center">
        {uploaderAvatar && (
          <img
            src={uploaderAvatar}
            alt={uploaderLogin}
            className="h-8 w-8 rounded-full object-cover"
          />
        )}
        <p className="ml-2 text-sm text-gray-700">{uploaderLogin}</p>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        {value.content_type} · {formattedSize} · {value.download_count}{' '}
        downloads
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Uploaded on {createdDate}
      </p>
    </div>
  );
}
