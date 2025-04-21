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
  // Handle empty or missing input gracefully
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "**No teams available**",
    };
  }

  // Map each team to a ListItem component
  const childrenProps: IAutoView.IAutoViewListItemProps[] = input.map((team) => {
    // Prepare a human-friendly description
    const descriptionParts: string[] = [];
    if (team.description) {
      descriptionParts.push(team.description);
    } else {
      descriptionParts.push("No description");
    }
    if (team.privacy) {
      descriptionParts.push(`Privacy: ${team.privacy}`);
    }
    // The core permission for the team (e.g. "admin", "push", etc.)
    descriptionParts.push(`Permission: ${team.permission}`);

    return {
      // Discriminator
      type: "ListItem",
      // Main title of the list item
      title: team.name,
      // Combine description, privacy, and permission into one line
      description: descriptionParts.join(" • "),
      // Clicking the item navigates to the team's GitHub page
      href: team.html_url,
      // Avatar with team name initials, using a consistent color
      startElement: {
        type: "Avatar",
        name: team.name,
        variant: "blue",
        size: 32,
      },
      // Two icon buttons: one to view the team page, one to view repositories
      endElement: [
        {
          type: "IconButton",
          icon: "external-link-alt",     // FontAwesome external link icon
          variant: "outlined",
          color: "primary",
          size: "small",
        },
        {
          type: "IconButton",
          icon: "code-branch",           // FontAwesome branch (repos) icon
          variant: "outlined",
          color: "primary",
          size: "small",
        },
      ],
    };
  });

  // Return a responsive List component containing all teams
  return {
    type: "List",
    childrenProps,
  };
}
