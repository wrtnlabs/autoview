import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Private User
     *
     * @title Private User
    */
    export type private_user = {
        login: string;
        id: number & tags.Type<"int32">;
        user_view_type?: string;
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
        name: string | null;
        company: string | null;
        blog: string | null;
        location: string | null;
        email: (string & tags.Format<"email">) | null;
        notification_email?: (string & tags.Format<"email">) | null;
        hireable: boolean | null;
        bio: string | null;
        twitter_username?: string | null;
        public_repos: number & tags.Type<"int32">;
        public_gists: number & tags.Type<"int32">;
        followers: number & tags.Type<"int32">;
        following: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        private_gists: number & tags.Type<"int32">;
        total_private_repos: number & tags.Type<"int32">;
        owned_private_repos: number & tags.Type<"int32">;
        disk_usage: number & tags.Type<"int32">;
        collaborators: number & tags.Type<"int32">;
        two_factor_authentication: boolean;
        plan?: {
            collaborators: number & tags.Type<"int32">;
            name: string;
            space: number & tags.Type<"int32">;
            private_repos: number & tags.Type<"int32">;
        };
        business_plus?: boolean;
        ldap_dn?: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.private_user;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const displayName: string = value.name ?? value.login;
  const joinDate: string = new Date(value.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <section className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      {/* Header: Avatar and Basic Info */}
      <div className="flex items-center space-x-4">
        <img
          src={value.avatar_url}
          alt={`${displayName} avatar`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {displayName}
          </h2>
          <p className="text-sm text-gray-500 truncate">@{value.login}</p>
        </div>
        {value.site_admin && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full whitespace-nowrap">
            Admin
          </span>
        )}
      </div>

      {/* Bio */}
      {value.bio && (
        <p className="mt-3 text-gray-700 text-sm line-clamp-2">
          {value.bio}
        </p>
      )}

      {/* Secondary Details */}
      <dl className="mt-4 space-y-2 text-sm text-gray-600">
        {value.company && (
          <div className="flex">
            <dt className="font-medium text-gray-800 w-20">Company:</dt>
            <dd className="truncate">{value.company}</dd>
          </div>
        )}
        {value.location && (
          <div className="flex">
            <dt className="font-medium text-gray-800 w-20">Location:</dt>
            <dd className="truncate">{value.location}</dd>
          </div>
        )}
        {value.blog && (
          <div className="flex">
            <dt className="font-medium text-gray-800 w-20">Blog:</dt>
            <dd className="truncate">{value.blog}</dd>
          </div>
        )}
        {value.email && (
          <div className="flex">
            <dt className="font-medium text-gray-800 w-20">Email:</dt>
            <dd className="truncate">{value.email}</dd>
          </div>
        )}
        {value.twitter_username && (
          <div className="flex">
            <dt className="font-medium text-gray-800 w-20">Twitter:</dt>
            <dd className="truncate">@{value.twitter_username}</dd>
          </div>
        )}
        <div className="flex">
          <dt className="font-medium text-gray-800 w-20">Joined:</dt>
          <dd>{joinDate}</dd>
        </div>
      </dl>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-center text-gray-700">
        <div>
          <p className="text-lg font-semibold text-gray-900">
            {value.public_repos}
          </p>
          <p className="text-xs">Repositories</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900">
            {value.followers}
          </p>
          <p className="text-xs">Followers</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900">
            {value.following}
          </p>
          <p className="text-xs">Following</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900">
            {value.public_gists}
          </p>
          <p className="text-xs">Gists</p>
        </div>
      </div>
    </section>
  );
  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted according to the guidelines.
}
