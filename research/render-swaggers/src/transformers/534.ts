import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Full Team
    */
    export type team_full = {
        /**
         * Unique identifier of the team
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * URL for the team
        */
        url: string;
        html_url: string & tags.Format<"uri">;
        /**
         * Name of the team
        */
        name: string;
        slug: string;
        description: string | null;
        /**
         * The level of privacy this team should have
        */
        privacy?: "closed" | "secret";
        /**
         * The notification setting the team has set
        */
        notification_setting?: "notifications_enabled" | "notifications_disabled";
        /**
         * Permission that the team will have for its repositories
        */
        permission: string;
        members_url: string;
        repositories_url: string & tags.Format<"uri">;
        parent?: Schema.nullable_team_simple;
        members_count: number & tags.Type<"int32">;
        repos_count: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        organization: Schema.team_organization;
        /**
         * Distinguished Name (DN) that team maps to within LDAP environment
        */
        ldap_dn?: string;
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
    /**
     * Team Organization
     *
     * @title Team Organization
    */
    export type team_organization = {
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string & tags.Format<"uri">;
        hooks_url: string;
        issues_url: string;
        members_url: string;
        public_members_url: string;
        avatar_url: string;
        description: string | null;
        name?: string;
        company?: string;
        blog?: string & tags.Format<"uri">;
        location?: string;
        email?: string & tags.Format<"email">;
        twitter_username?: string | null;
        is_verified?: boolean;
        has_organization_projects: boolean;
        has_repository_projects: boolean;
        public_repos: number & tags.Type<"int32">;
        public_gists: number & tags.Type<"int32">;
        followers: number & tags.Type<"int32">;
        following: number & tags.Type<"int32">;
        html_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        type: string;
        total_private_repos?: number & tags.Type<"int32">;
        owned_private_repos?: number & tags.Type<"int32">;
        private_gists?: (number & tags.Type<"int32">) | null;
        disk_usage?: (number & tags.Type<"int32">) | null;
        collaborators?: (number & tags.Type<"int32">) | null;
        billing_email?: (string & tags.Format<"email">) | null;
        plan?: {
            name: string;
            space: number & tags.Type<"int32">;
            private_repos: number & tags.Type<"int32">;
            filled_seats?: number & tags.Type<"int32">;
            seats?: number & tags.Type<"int32">;
        };
        default_repository_permission?: string | null;
        members_can_create_repositories?: boolean | null;
        two_factor_requirement_enabled?: boolean | null;
        members_allowed_repository_creation_type?: string;
        members_can_create_public_repositories?: boolean;
        members_can_create_private_repositories?: boolean;
        members_can_create_internal_repositories?: boolean;
        members_can_create_pages?: boolean;
        members_can_create_public_pages?: boolean;
        members_can_create_private_pages?: boolean;
        members_can_fork_private_repositories?: boolean | null;
        web_commit_signoff_required?: boolean;
        updated_at: string & tags.Format<"date-time">;
        archived_at: (string & tags.Format<"date-time">) | null;
    };
}
type IAutoViewTransformerInputType = Schema.team_full;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to format date-times into a readable local string
  const formatDate = (iso?: string): string =>
    iso ? new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A';

  // Build a list of key/value pairs to display in the details section
  const detailsItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: 'DataListItem',
      label: [
        { type: 'Text', content: 'Team ID', variant: 'subtitle2' }
      ],
      value: [
        { type: 'Text', content: String(input.id), variant: 'body1' }
      ]
    },
    {
      type: 'DataListItem',
      label: [
        { type: 'Text', content: 'Members', variant: 'subtitle2' }
      ],
      value: [
        { type: 'Text', content: String(input.members_count), variant: 'body1' }
      ]
    },
    {
      type: 'DataListItem',
      label: [
        { type: 'Text', content: 'Repositories', variant: 'subtitle2' }
      ],
      value: [
        { type: 'Text', content: String(input.repos_count), variant: 'body1' }
      ]
    },
    {
      type: 'DataListItem',
      label: [
        { type: 'Text', content: 'Created', variant: 'subtitle2' }
      ],
      value: [
        { type: 'Text', content: formatDate(input.created_at), variant: 'body1' }
      ]
    },
    {
      type: 'DataListItem',
      label: [
        { type: 'Text', content: 'Updated', variant: 'subtitle2' }
      ],
      value: [
        { type: 'Text', content: formatDate(input.updated_at), variant: 'body1' }
      ]
    }
  ];

  // If privacy is specified, add it to the details
  if (input.privacy) {
    detailsItems.push({
      type: 'DataListItem',
      label: [{ type: 'Text', content: 'Privacy', variant: 'subtitle2' }],
      value: [{ type: 'Text', content: input.privacy, variant: 'body1' }]
    });
  }

  // Compose the final layout as a vertical card with header, content, and footer
  return {
    type: 'VerticalCard',
    childrenProps: [
      {
        // Card header with team name, description, avatar and permission chip
        type: 'CardHeader',
        title: input.name,
        description: input.description ?? undefined,
        startElement: {
          type: 'Avatar',
          src: input.organization.avatar_url,
          name: input.organization.login,
          size: 40,
          variant: 'primary'
        },
        endElement: {
          // Show the team's permission as a chip for quick visual reference
          type: 'Chip',
          label: input.permission,
          variant: 'outlined',
          color: 'info',
          size: 'small'
        }
      },
      {
        // Card content embeds a data list of details
        type: 'CardContent',
        childrenProps: {
          type: 'DataList',
          childrenProps: detailsItems
        }
      },
      {
        // Card footer with an action button linking to the team's page
        type: 'CardFooter',
        childrenProps: {
          type: 'Button',
          label: 'View on GitHub',
          href: input.html_url,
          variant: 'contained',
          color: 'primary',
          size: 'medium',
          startElement: {
            type: 'Icon',
            id: 'github',
            size: 20,
            color: 'gray'
          }
        }
      }
    ]
  };
}
