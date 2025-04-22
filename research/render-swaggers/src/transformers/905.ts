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
  // Prepare list items for key metrics
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Privacy level, if provided
  if (input.privacy) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Privacy", variant: "body2" },
      value: {
        type: "Chip",
        label: input.privacy,
        variant: "filled",
        color: "secondary",
        size: "small",
      },
    });
  }

  // Team permission
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Permission", variant: "body2" },
    value: {
      type: "Chip",
      label: input.permission,
      variant: "outlined",
      color: "primary",
      size: "small",
    },
  });

  // Member count with an icon wrapped in a badge
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Members", variant: "body2" },
    value: {
      type: "Badge",
      count: input.members_count,
      // wrap a user icon inside the badge
      childrenProps: {
        type: "Icon",
        id: "users",
        size: 16,
        color: "blue",
      },
    },
  });

  // Repository count
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Repositories", variant: "body2" },
    value: {
      type: "Text",
      content: String(input.repos_count),
      variant: "body2",
    },
  });

  // Creation date
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Created", variant: "body2" },
    value: {
      type: "Text",
      content: new Date(input.created_at).toLocaleDateString(),
      variant: "body2",
    },
  });

  // Last updated date
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Updated", variant: "body2" },
    value: {
      type: "Text",
      content: new Date(input.updated_at).toLocaleDateString(),
      variant: "body2",
    },
  });

  // Compose the card header with organization avatar and team name
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: input.slug,
    startElement: {
      type: "Avatar",
      src: input.organization.avatar_url,
      name: input.organization.login,
    },
    // Show the team permission as a chip on the header
    endElement: {
      type: "Chip",
      label: input.permission,
      variant: "outlined",
      color: "primary",
      size: "medium",
    },
  };

  // Compose the main content: optional description + data list
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  if (input.description) {
    contentChildren.push({
      type: "Markdown",
      content: input.description,
    });
  }

  contentChildren.push({
    type: "DataList",
    childrenProps: dataListItems,
  });

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Footer with a button linking to GitHub
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      variant: "outlined",
      color: "primary",
      size: "small",
      label: "View on GitHub",
      startElement: {
        type: "Icon",
        id: "github",
        size: 16,
        color: "gray",
      },
      href: input.html_url,
    },
  };

  // Wrap everything in a vertical card for a responsive layout
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter],
  };
}
