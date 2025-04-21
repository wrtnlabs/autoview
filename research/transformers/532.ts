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
  // If there are no teams, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No teams found\n\nThere are no teams to display at this time."
    };
  }

  // Map GitHub permission levels to UI color variants
  const permissionColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    admin: "error",      // red
    maintain: "warning", // yellow
    push: "success",     // green
    triage: "info",      // cyan
    pull: "gray"         // gray
  };

  // Transform each team into a ListItem component
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map(team => {
    // Determine avatar variant by hashing team name to a stable color fallback
    const avatarVariant = permissionColorMap[team.permission] || "primary";

    // Create a chip to display the team's permission
    const permissionChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: team.permission,
      variant: "outlined",
      color: permissionColorMap[team.permission] || "primary",
      size: "small"
    };

    // Arrow icon to indicate navigation
    const arrowIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "arrow-right",
      size: 16,
      color: "gray"
    };

    return {
      type: "ListItem",
      title: team.name,
      // Fallback when description is null
      description: team.description ?? "No description provided",
      // Show team initial avatar for visual identity
      startElement: {
        type: "Avatar",
        name: team.name,
        variant: avatarVariant,
        size: 40
      },
      // On the right, show permission chip and a navigation icon
      endElement: [permissionChip, arrowIcon],
      // Clicking the item navigates to the team's GitHub page
      href: team.html_url
    };
  });

  // Return a responsive List component containing all teams
  return {
    type: "List",
    childrenProps: listItems
  };
}
