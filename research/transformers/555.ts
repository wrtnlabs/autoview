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
  // Helper to map team permissions to chip colors
  const mapPermissionToColor = (perm: string): IAutoView.IAutoViewChipProps["color"] => {
    switch (perm.toLowerCase()) {
      case "admin":
        return "red";
      case "maintain":
        return "orange";
      case "push":
        return "green";
      case "triage":
        return "teal";
      case "pull":
        return "cyan";
      default:
        return "gray";
    }
  };

  // If there are no teams, show a friendly markdown message
  if (!Array.isArray(input) || input.length === 0) {
    return {
      type: "Markdown",
      content: "## No Teams Available\n\nThere are currently no teams to display.",
    };
  }

  // Transform each team into a ListItem component
  const items: IAutoView.IAutoViewListItemProps[] = input.map((team) => {
    // Fallback for missing description
    const description = team.description ?? "No description provided";

    // Primary icon for each team
    const avatarIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "users",      // FontAwesome "users" icon
      color: "blue",
      size: 24,
    };

    // Build chips for permissions and optional privacy
    const chips: IAutoView.IAutoViewChipProps[] = [
      {
        type: "Chip",
        label: team.permission,
        color: mapPermissionToColor(team.permission),
        size: "small",
        variant: "outlined",
      },
    ];

    if (team.privacy) {
      chips.push({
        type: "Chip",
        label: team.privacy,
        color: "violet",
        size: "small",
        variant: "outlined",
      });
    }

    return {
      type: "ListItem",
      title: team.name,
      description,
      startElement: avatarIcon,
      // Display permission/privacy as right-aligned chips
      endElement: chips,
    };
  });

  // Return a List container wrapping all team items
  return {
    type: "List",
    childrenProps: items,
  };
}
