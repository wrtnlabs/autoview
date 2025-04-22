import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.team_simple[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // When there is no data, show a simple Markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No teams available to display.",
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Map each team_simple record to a DataListItem
  const listItems: IAutoView.IAutoViewDataListItemProps[] = input.map(
    (team) => {
      // Avatar showing the first letter of the team name
      const avatar: IAutoView.IAutoViewAvatarProps = {
        type: "Avatar",
        name: team.name.charAt(0).toUpperCase(),
        variant: "blue",
        size: 24,
      };

      // Text for the team name
      const nameText: IAutoView.IAutoViewTextProps = {
        type: "Text",
        content: team.name,
        variant: "body1",
      };

      // Chip representing the permission level
      const permissionChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: team.permission,
        variant: "filled",
        color: "teal",
        size: "small",
      };

      // Button to view the team's HTML URL
      const viewButton: IAutoView.IAutoViewButtonProps = {
        type: "Button",
        variant: "text",
        color: "primary",
        size: "small",
        label: "View",
        href: team.html_url,
        startElement: {
          type: "Icon",
          id: "external-link",
          size: 12,
          color: "blue",
        },
      };

      // Button to view the team's repositories
      const repoButton: IAutoView.IAutoViewButtonProps = {
        type: "Button",
        variant: "text",
        color: "secondary",
        size: "small",
        label: "Repos",
        href: team.repositories_url,
        startElement: {
          type: "Icon",
          id: "code-branch",
          size: 12,
          color: "gray",
        },
      };

      return {
        type: "DataListItem",
        // Combine avatar and team name as the label
        label: [avatar, nameText],
        // Show permission chip and action buttons on the right
        value: [permissionChip, viewButton, repoButton],
      } as IAutoView.IAutoViewDataListItemProps;
    }
  );

  // Return the DataList containing all team items
  return {
    type: "DataList",
    childrenProps: listItems,
  } as IAutoView.IAutoViewDataListProps;
}
