import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Org Membership
     *
     * @title Org Membership
    */
    export type org_membership = {
        url: string & tags.Format<"uri">;
        /**
         * The state of the member in the organization. The `pending` state indicates the user has not yet accepted an invitation.
        */
        state: "active" | "pending";
        /**
         * The user's membership type in the organization.
        */
        role: "admin" | "member" | "billing_manager";
        organization_url: string & tags.Format<"uri">;
        organization: Schema.organization_simple;
        user: Schema.nullable_simple_user;
        permissions?: {
            can_create_repository: boolean;
        };
    };
    /**
     * A GitHub organization.
     *
     * @title Organization Simple
    */
    export type organization_simple = {
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
}
type IAutoViewTransformerInputType = Schema.org_membership[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Transform each organization membership into a ListItem with visual elements:
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((membership) => {
    const { user, organization, role, state, url } = membership;

    // Determine avatar or fallback icon for the user
    const startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = user
      ? {
          type: "Avatar",
          src: user.avatar_url,        // show user's avatar
          name: user.name || user.login, // tooltip on hover
          size: 32,
        }
      : {
          // If user data is missing, show a generic user icon
          type: "Icon",
          id: "user",
          color: "gray",
          size: 32,
        };

    // Role chip: use color coding for different roles
    const roleChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: role.toUpperCase(),
      size: "small",
      variant: "filled",
      // assign a theme color per role
      color:
        role === "admin"
          ? "error"
          : role === "billing_manager"
          ? "warning"
          : "primary",
    };

    // State chip: active vs pending
    const stateChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: state.charAt(0).toUpperCase() + state.slice(1),
      size: "small",
      variant: "outlined",
      color: state === "active" ? "success" : "info",
    };

    return {
      type: "ListItem",
      // Display user's login or a placeholder
      title: user ? user.login : "Unknown User",
      // Show the organization login as description
      description: organization.login,
      startElement,
      // Place the role and state chips as end elements
      endElement: [roleChip, stateChip],
      // Link to the membership URL on click
      href: url,
    };
  });

  // Compose the List component with all list items
  return {
    type: "List",
    childrenProps: listItems,
  };
}
