import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A request for a specific ref(branch,sha,tag) to be deployed
     *
     * @title Deployment
    */
    export interface deployment {
        url: string & tags.Format<"uri">;
        /**
         * Unique identifier of the deployment
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        sha: string;
        /**
         * The ref to deploy. This can be a branch, tag, or sha.
        */
        ref: string;
        /**
         * Parameter to specify a task to execute
        */
        task: string;
        payload: {} | string;
        original_environment?: string;
        /**
         * Name for the target deployment environment.
        */
        environment: string;
        description: string | null;
        creator: AutoViewInputSubTypes.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        statuses_url: string & tags.Format<"uri">;
        repository_url: string & tags.Format<"uri">;
        /**
         * Specifies if the given environment is will no longer exist at some point in the future. Default: false.
        */
        transient_environment?: boolean;
        /**
         * Specifies if the given environment is one that end-users directly interact with. Default: false.
        */
        production_environment?: boolean;
        performed_via_github_app?: AutoViewInputSubTypes.nullable_integration;
    }
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
     * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
     *
     * @title GitHub app
    */
    export type nullable_integration = {
        /**
         * Unique identifier of the GitHub app
        */
        id: number & tags.Type<"int32">;
        /**
         * The slug name of the GitHub app
        */
        slug?: string;
        node_id: string;
        client_id?: string;
        owner: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.enterprise;
        /**
         * The name of the GitHub app
        */
        name: string;
        description: string | null;
        external_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The set of permissions for the GitHub app
        */
        permissions: {
            [key: string]: string;
        };
        /**
         * The list of events for the GitHub app
        */
        events: string[];
        /**
         * The number of installations associated with the GitHub app
        */
        installations_count?: number & tags.Type<"int32">;
        client_secret?: string;
        webhook_secret?: string | null;
        pem?: string;
    } | null;
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export interface simple_user {
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
    }
    /**
     * An enterprise on GitHub.
     *
     * @title Enterprise
    */
    export interface enterprise {
        /**
         * A short description of the enterprise.
        */
        description?: string | null;
        html_url: string & tags.Format<"uri">;
        /**
         * The enterprise's website URL.
        */
        website_url?: (string & tags.Format<"uri">) | null;
        /**
         * Unique identifier of the enterprise
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The name of the enterprise.
        */
        name: string;
        /**
         * The slug url identifier for the enterprise.
        */
        slug: string;
        created_at: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        avatar_url: string & tags.Format<"uri">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.deployment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const shortSha = value.sha.slice(0, 7);
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const description = value.description ?? "No description provided.";
  const isProduction = value.production_environment ?? false;
  const isTransient = value.transient_environment ?? false;
  const creatorLogin = value.creator?.login ?? "Unknown";
  const creatorAvatar = value.creator?.avatar_url ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(
    creatorLogin
  )}&background=random`;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      creatorLogin
    )}&background=random`;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm text-gray-800">
      {/* Header: Environment & Creator */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <LucideReact.Tag className="text-indigo-500" size={20} />
          <span className="text-lg font-semibold truncate">{value.environment}</span>
          {isProduction && (
            <LucideReact.CheckCircle
              className="ml-1 text-green-500"
              size={18}
              aria-label="Production"
            />
          )}
          {isTransient && (
            <LucideReact.AlertTriangle
              className="ml-1 text-yellow-500"
              size={18}
              aria-label="Transient"
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <img
            src={creatorAvatar}
            alt={creatorLogin}
            className="w-8 h-8 rounded-full object-cover"
            onError={handleImageError}
          />
          <span className="text-sm truncate">{creatorLogin}</span>
        </div>
      </div>

      {/* Timestamps */}
      <div className="text-sm text-gray-600 space-y-1 mb-4">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Updated: {updatedAt}</span>
        </div>
      </div>

      {/* Deployment Details */}
      <div className="text-sm text-gray-700 space-y-2 mb-4">
        <div className="flex items-center gap-1">
          <LucideReact.GitBranch size={16} />
          <span className="truncate">{value.ref}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Code size={16} />
          <span className="font-mono">{shortSha}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Wrench size={16} />
          <span className="truncate">{value.task}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 line-clamp-3 mb-4">{description}</p>

      {/* Performed via GitHub App */}
      {value.performed_via_github_app && (
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <LucideReact.Box size={16} />
          <span className="truncate">
            Via App: {value.performed_via_github_app.name}
          </span>
        </div>
      )}
    </div>
  );
}
