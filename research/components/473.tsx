import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Groups of organization members that gives permissions on specified repositories.
   *
   * @title Team
   */
  export type team = {
    id: number & tags.Type<"int32">;
    node_id: string;
    name: string;
    slug: string;
    description: string | null;
    privacy?: string;
    notification_setting?: string;
    permission: string;
    permissions?: {
      pull: boolean;
      triage: boolean;
      push: boolean;
      maintain: boolean;
      admin: boolean;
    };
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    members_url: string;
    repositories_url: string & tags.Format<"uri">;
    parent: AutoViewInputSubTypes.nullable_team_simple;
  };
  /**
   * Groups of organization members that gives permissions on specified repositories.
   *
   * @title Team Simple
   */
  export type nullable_team_simple = {
    /**
     * Unique identifier of the team
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * URL for the team
     */
    url: string;
    members_url: string;
    /**
     * Name of the team
     */
    name: string;
    /**
     * Description of the team
     */
    description: string | null;
    /**
     * Permission that the team will have for its repositories
     */
    permission: string;
    /**
     * The level of privacy this team should have
     */
    privacy?: string;
    /**
     * The notification setting the team has set
     */
    notification_setting?: string;
    html_url: string & tags.Format<"uri">;
    repositories_url: string & tags.Format<"uri">;
    slug: string;
    /**
     * Distinguished Name (DN) that team maps to within LDAP environment
     */
    ldap_dn?: string;
  } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.team[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const renderDescription = (desc: string | null) =>
    desc ? (
      <p className="mt-1 text-gray-600 text-sm line-clamp-2">{desc}</p>
    ) : (
      <p className="mt-1 text-gray-600 text-sm italic">No description.</p>
    );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={32} />
        <span className="mt-2 text-sm">No teams available.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {value.map((team) => (
        <div
          key={team.id}
          className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-2">
            <LucideReact.Users size={20} className="text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {team.name}
            </h3>
          </div>

          {renderDescription(team.description)}

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded">
              {team.permission}
            </span>
            {team.privacy && (
              <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded">
                {team.privacy}
              </span>
            )}
            {team.notification_setting && (
              <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded">
                {team.notification_setting}
              </span>
            )}
          </div>

          <div className="mt-3 flex space-x-4 text-gray-500">
            <a
              href={team.html_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 hover:text-indigo-600 truncate"
            >
              <LucideReact.Link size={16} />
              <span className="text-sm">View</span>
            </a>
            <a
              href={team.repositories_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 hover:text-indigo-600 truncate"
            >
              <LucideReact.BookOpen size={16} />
              <span className="text-sm">Repos</span>
            </a>
          </div>

          {team.parent && (
            <div className="mt-3 text-sm text-gray-600">
              Parent:{" "}
              <span className="font-medium truncate">{team.parent.name}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
