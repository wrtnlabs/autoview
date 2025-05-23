import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team
    */
    export interface team {
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
    }
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
  // Map through each team and prepare display badges for granted permissions
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {value.map((team) => {
        const {
          id,
          name,
          description,
          permission,
          privacy,
          html_url,
          url,
          permissions,
          parent,
        } = team;

        // Derive a list of permission keys that are true
        const granted: string[] = permissions
          ? Object.entries(permissions)
              .filter(([, grantedFlag]) => grantedFlag)
              .map(([permKey]) => permKey)
          : [];

        return (
          <div
            key={id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
              {privacy && (
                <span className="px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded">
                  {privacy}
                </span>
              )}
            </div>

            {description && (
              <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                {description}
              </p>
            )}

            <div className="flex items-center gap-2 mb-2">
              <LucideReact.Key size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600 capitalize">{permission}</span>
            </div>

            {granted.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {granted.map((perm) => (
                  <span
                    key={perm}
                    className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs rounded"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            )}

            {parent && (
              <div className="flex items-center gap-1 mb-2">
                <LucideReact.ChevronRight size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600 truncate">{parent.name}</span>
              </div>
            )}

            <div className="flex items-center gap-4">
              <a
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:underline text-sm"
              >
                <LucideReact.Link size={16} className="mr-1" />
                Repo
              </a>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-500 hover:text-gray-700 text-sm"
              >
                <LucideReact.Globe size={16} className="mr-1" />
                API
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
