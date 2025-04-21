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
  // Destructure for convenience
  const { organization, members_count, repos_count, permission, privacy, created_at, updated_at, parent } = input;

  // Compose the card header with organization avatar and team name/slug
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    // Use slug as subtitle; description may be null so we omit if absent
    description: input.slug,
    startElement: {
      type: "Avatar",
      src: organization.avatar_url,
      name: organization.login,
    },
  };

  // Helper to build a simple Text component
  const makeText = (text: string): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content: text,
    variant: "body2",
  });

  // Build data list items for members, repositories, permission, privacy, dates, parent
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Members count with a chip and user icon
  listItems.push({
    type: "DataListItem",
    label: [makeText("Members")],
    value: {
      type: "Chip",
      label: String(members_count),
      startElement: { type: "Icon", id: "users" },
    },
  });

  // Repositories count
  listItems.push({
    type: "DataListItem",
    label: [makeText("Repositories")],
    value: {
      type: "Chip",
      label: String(repos_count),
      startElement: { type: "Icon", id: "book" },
    },
  });

  // Permission level
  listItems.push({
    type: "DataListItem",
    label: [makeText("Permission")],
    value: {
      type: "Chip",
      label: permission,
      variant: "outlined",
    },
  });

  // Privacy level, if provided
  if (privacy) {
    listItems.push({
      type: "DataListItem",
      label: [makeText("Privacy")],
      value: {
        type: "Chip",
        label: privacy,
        variant: "outlined",
      },
    });
  }

  // Parent team, if exists
  if (parent && typeof parent === "object") {
    listItems.push({
      type: "DataListItem",
      label: [makeText("Parent Team")],
      value: {
        type: "Text",
        content: parent.name,
        variant: "body2",
      },
    });
  }

  // Format dates using locale for readability
  const createdDate = new Date(created_at).toLocaleDateString();
  const updatedDate = new Date(updated_at).toLocaleDateString();

  listItems.push({
    type: "DataListItem",
    label: [makeText("Created")],
    value: makeText(createdDate),
  });
  listItems.push({
    type: "DataListItem",
    label: [makeText("Updated")],
    value: makeText(updatedDate),
  });

  // Wrap list items into a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  // Compose card content with the data list
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList],
  };

  // Footer with a link button to GitHub
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      href: input.html_url,
      label: "View on GitHub",
      startElement: { type: "Icon", id: "github" },
    },
  };

  // Return a vertical card that neatly organizes header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}
