import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Base Gist
     *
     * @title Base Gist
    */
    export type base_gist = {
        url: string & tags.Format<"uri">;
        forks_url: string & tags.Format<"uri">;
        commits_url: string & tags.Format<"uri">;
        id: string;
        node_id: string;
        git_pull_url: string & tags.Format<"uri">;
        git_push_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        files: {
            [key: string]: {
                filename?: string;
                type?: string;
                language?: string;
                raw_url?: string;
                size?: number & tags.Type<"int32">;
                /**
                 * The encoding used for `content`. Currently, `"utf-8"` and `"base64"` are supported.
                */
                encoding?: string & tags.Default<"utf-8">;
            };
        };
        "public": boolean;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        description: string | null;
        comments: number & tags.Type<"int32">;
        comments_enabled?: boolean;
        user: AutoViewInputSubTypes.nullable_simple_user;
        comments_url: string & tags.Format<"uri">;
        owner?: AutoViewInputSubTypes.simple_user;
        truncated?: boolean;
        forks?: any[];
        history?: any[];
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
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type simple_user = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.base_gist;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const user = value.user ?? value.owner;
  const ownerName = user?.login ?? 'Anonymous';
  const avatarUrl = user?.avatar_url;
  
  const filesArray = Object.values(value.files);
  const filesCount = filesArray.length;
  
  const languagesSet = new Set<string>();
  filesArray.forEach(file => {
    if (file.language) languagesSet.add(file.language);
  });
  const languages = [...languagesSet];
  const displayLanguages = languages.slice(0, 3);
  const moreLangsCount = languages.length - displayLanguages.length;
  
  const description = value.description?.trim() || 'No description';
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const updatedDate = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const isPublic = value['public'];
  
  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
      {/* Header: Avatar, owner name, visibility */}
      <div className="flex items-center mb-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={ownerName}
            className="w-8 h-8 rounded-full mr-2"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 mr-2" />
        )}
        <span className="font-semibold text-gray-900">{ownerName}</span>
        <span
          className={
            'ml-auto px-2 py-0.5 text-xs font-medium rounded ' +
            (isPublic
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800')
          }
        >
          {isPublic ? 'Public' : 'Private'}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-800 text-sm mb-3 overflow-hidden line-clamp-2">
        {description}
      </p>

      {/* File & language badges */}
      <div className="flex flex-wrap items-center text-gray-500 text-xs space-x-2 mb-2">
        <span>
          {filesCount} file{filesCount !== 1 ? 's' : ''}
        </span>
        {displayLanguages.map((lang) => (
          <span
            key={lang}
            className="px-2 py-0.5 bg-gray-200 rounded"
          >
            {lang}
          </span>
        ))}
        {moreLangsCount > 0 && <span>+{moreLangsCount} more</span>}
      </div>

      {/* Dates */}
      <div className="flex items-center justify-between text-gray-500 text-xs">
        <span>Created: {createdDate}</span>
        <span>Updated: {updatedDate}</span>
      </div>

      {/* Comments */}
      <div className="mt-2 text-gray-500 text-xs">
        <span>
          {value.comments} comment{value.comments !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}
