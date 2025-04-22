import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The Relationship a User has with a role.
     *
     * @title A Role Assignment for a User
    */
    export type user_role_assignment = {
        /**
         * Determines if the user has a direct, indirect, or mixed relationship to a role
        */
        assignment?: "direct" | "indirect" | "mixed";
        /**
         * Team the user has gotten the role through
        */
        inherited_from?: Schema.team_simple[];
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
    };
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team Simple
    */
    export type team_simple = {
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
    };
}
type IAutoViewTransformerInputType = Schema.user_role_assignment[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Handle empty or missing input gracefully
  if (!Array.isArray(input) || input.length === 0) {
    return {
      type: "Markdown",
      // Inform the user that there's no data to display
      content: "### No role assignments found"
    };
  }

  // Map assignment types to chip colors for quick visual recognition
  const assignmentColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    direct: "success",
    indirect: "warning",
    mixed: "info",
    // Default color for unknown or missing assignment
    unknown: "gray"
  };

  // Build a list of ListItem components, one per user-role assignment
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((user) => {
    const assignmentType = user.assignment ?? "unknown";
    const chipColor = assignmentColorMap[assignmentType] || assignmentColorMap.unknown;

    // Compose the display name: prefer name, fallback to login
    const displayName = user.name ?? user.login;

    // Description: show email if available
    const description = user.email
      ? `${user.email}`
      : "";

    return {
      type: "ListItem",
      title: displayName,
      description,
      // Clicking the item navigates to the user's GitHub profile
      href: user.html_url,
      // Left element: user avatar for quick visual identification
      startElement: {
        type: "Avatar",
        src: user.avatar_url,
        name: displayName,
        size: 40
      },
      // Right element: chip indicating assignment type
      endElement: {
        type: "Chip",
        label: assignmentType,
        color: chipColor,
        size: "small",
        variant: "filled"
      }
    };
  });

  // Optional: add a sticky subheader showing total count
  const subheader: IAutoView.IAutoViewListSubheaderProps = {
    type: "ListSubheader",
    stickToTop: true,
    childrenProps: [
      {
        type: "Text",
        content: `**Total Users:** ${listItems.length}`,
        variant: "subtitle1",
        color: "primary"
      }
    ]
  };

  // Return a List component containing the subheader and all items
  return {
    type: "List",
    childrenProps: [subheader, ...listItems]
  };
}
