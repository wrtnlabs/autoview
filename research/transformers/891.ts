import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
        parent: Schema.nullable_team_simple;
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
type IAutoViewTransformerInputType = Schema.team[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map GitHub team permission levels to UI Chip colors
  const permissionColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    admin: "error",
    maintain: "secondary",
    push: "warning",
    triage: "info",
    pull: "gray",
  };

  // If there are no teams, render a friendly markdown notice
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No Teams Found\nThere are no teams to display at this time.",
    };
  }

  // Transform each team into a ListItem component
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((team) => {
    // Ensure we have a description fallback
    const description = team.description ?? "No description";

    // Choose a chip color based on the team's permission level, defaulting to gray
    const chipColor = permissionColorMap[team.permission] ?? "gray";

    // Build the chip to display the team's permission
    const permissionChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: team.permission,
      color: chipColor,
      size: "small",
      variant: "outlined",
    };

    // Build an icon to represent a team (using FontAwesome 'users' icon)
    const teamIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "users",
      color: "blue",
      size: 20,
    };

    // Compose the ListItem for this team
    const item: IAutoView.IAutoViewListItemProps = {
      type: "ListItem",
      title: team.name,
      description,
      startElement: teamIcon,
      // Show the permission chip on the right; wrapping in array in case more end elements are added later
      endElement: [permissionChip],
      // Make the entire item clickable, linking to the team's HTML URL
      href: team.html_url,
    };

    return item;
  });

  // Wrap all items into a responsive List component
  const list: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: listItems,
  };

  return list;
}
