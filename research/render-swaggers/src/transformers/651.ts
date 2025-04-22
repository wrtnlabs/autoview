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



// Transforms an array of `Schema.team` into an AutoView list of teams.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If the input is empty or missing, show a friendly markdown notification.
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No teams found\n\nThere are no teams available to display."
    };
  }

  // Map each team record to a ListItem component
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((team) => {
    // Use the team description if present, otherwise fall back to the slug
    const description = team.description ?? `Slug: ${team.slug}`;

    // Prepend a users icon to each list item
    const startElement: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "users",      // FontAwesome "users" icon
      size: 24,         // 24px icon for clarity on mobile & desktop
      color: "blue"     // Blue tint to draw attention
    };

    // Add a small "Visit" button linking to the team's page
    const endElement: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      variant: "text",
      size: "small",
      color: "primary",
      label: "Visit",
      href: team.html_url // Link out to the team's GitHub page
    };

    return {
      type: "ListItem",
      title: team.name,
      description,
      startElement,
      endElement
    };
  });

  // Compose the final List component containing all the team entries
  const listProps: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: listItems
  };

  return listProps;
}
