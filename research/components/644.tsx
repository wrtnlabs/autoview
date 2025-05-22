import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Branch Restriction Policy
   *
   * @title Branch Restriction Policy
   */
  export type branch_restriction_policy = {
    url: string & tags.Format<"uri">;
    users_url: string & tags.Format<"uri">;
    teams_url: string & tags.Format<"uri">;
    apps_url: string & tags.Format<"uri">;
    users: {
      login?: string;
      id?: number & tags.Type<"int32">;
      node_id?: string;
      avatar_url?: string;
      gravatar_id?: string;
      url?: string;
      html_url?: string;
      followers_url?: string;
      following_url?: string;
      gists_url?: string;
      starred_url?: string;
      subscriptions_url?: string;
      organizations_url?: string;
      repos_url?: string;
      events_url?: string;
      received_events_url?: string;
      type?: string;
      site_admin?: boolean;
      user_view_type?: string;
    }[];
    teams: {
      id?: number & tags.Type<"int32">;
      node_id?: string;
      url?: string;
      html_url?: string;
      name?: string;
      slug?: string;
      description?: string | null;
      privacy?: string;
      notification_setting?: string;
      permission?: string;
      members_url?: string;
      repositories_url?: string;
      parent?: string | null;
    }[];
    apps: {
      id?: number & tags.Type<"int32">;
      slug?: string;
      node_id?: string;
      owner?: {
        login?: string;
        id?: number & tags.Type<"int32">;
        node_id?: string;
        url?: string;
        repos_url?: string;
        events_url?: string;
        hooks_url?: string;
        issues_url?: string;
        members_url?: string;
        public_members_url?: string;
        avatar_url?: string;
        description?: string;
        gravatar_id?: string;
        html_url?: string;
        followers_url?: string;
        following_url?: string;
        gists_url?: string;
        starred_url?: string;
        subscriptions_url?: string;
        organizations_url?: string;
        received_events_url?: string;
        type?: string;
        site_admin?: boolean;
        user_view_type?: string;
      };
      name?: string;
      client_id?: string;
      description?: string;
      external_url?: string;
      html_url?: string;
      created_at?: string;
      updated_at?: string;
      permissions?: {
        metadata?: string;
        contents?: string;
        issues?: string;
        single_file?: string;
      };
      events?: string[];
    }[];
  };
}
export type AutoViewInput = AutoViewInputSubTypes.branch_restriction_policy;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived values for display
  const userCount: number = value.users.length;
  const teamCount: number = value.teams.length;
  const appCount: number = value.apps.length;

  const urls: { label: string; url: string }[] = [
    { label: "Policy", url: value.url },
    { label: "Users", url: value.users_url },
    { label: "Teams", url: value.teams_url },
    { label: "Apps", url: value.apps_url },
  ];

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <LucideReact.ShieldCheck
          size={20}
          className="text-blue-500"
          aria-hidden
        />
        <h2 className="text-lg font-semibold text-gray-900">
          Branch Restriction Policy
        </h2>
      </div>

      {/* URL endpoints */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {urls.map((item) => (
          <div key={item.label} className="flex items-start space-x-2">
            <LucideReact.Link
              size={16}
              className="text-gray-400 mt-1"
              aria-hidden
            />
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-500">
                {item.label} URL
              </p>
              <p className="text-sm text-blue-600 truncate" title={item.url}>
                {item.url}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Counts summary */}
      <div className="flex flex-wrap items-center space-x-6 text-gray-700">
        <div className="flex items-center space-x-1">
          <LucideReact.User size={16} className="text-gray-500" aria-hidden />
          <span className="text-sm font-medium">{userCount} Users</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Users size={16} className="text-gray-500" aria-hidden />
          <span className="text-sm font-medium">{teamCount} Teams</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Package
            size={16}
            className="text-gray-500"
            aria-hidden
          />
          <span className="text-sm font-medium">{appCount} Apps</span>
        </div>
      </div>
    </div>
  );
}
