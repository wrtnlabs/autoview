import { tags } from "typia";
import React from "react";
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
        url: string & tags.Format<"uri">;
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
  //    Compute display-friendly labels and truncated description.
  const teams = value;
  
  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {teams.map((team) => {
        const descriptionText = team.description ?? "No description available";
        const truncatedDescription =
          descriptionText.length > 120
            ? descriptionText.slice(0, 117) + "..."
            : descriptionText;

        const permissionLabel =
          team.permission.charAt(0).toUpperCase() + team.permission.slice(1);

        const privacyLabel = team.privacy
          ? team.privacy.charAt(0).toUpperCase() + team.privacy.slice(1)
          : null;

        const parentName = team.parent?.name ?? null;

        return (
          <div
            key={team.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                {team.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">
                {team.slug}
              </p>
              <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm leading-snug line-clamp-2">
                {truncatedDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                  {permissionLabel}
                </span>
                {privacyLabel && (
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                    {privacyLabel}
                  </span>
                )}
              </div>
              {parentName && (
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  Parent Team:{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    {parentName}
                  </span>
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
