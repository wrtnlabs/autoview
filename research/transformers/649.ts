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
      content: "### No teams available\nThere are currently no teams to display."
    };
  }

  // Map permission strings to chip colors for better visual distinction
  const permissionColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    admin: "error",
    maintain: "warning",
    push: "success",
    triage: "info",
    pull: "primary"
  };

  // Build a DataList where each team is one entry
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((team) => {
    const description = team.description ?? "No description provided";

    // Build markdown content summarizing team details
    // Use bullet lists and links to avoid plain text
    const mdLines: string[] = [
      `**Description:** ${description}`,
      `**Permission Level:** \`${team.permission}\``,
      `**Members URL:** [View members](${team.members_url})`,
      `**Repositories URL:** [View repos](${team.repositories_url})`
    ];
    if (team.parent) {
      mdLines.push(`**Parent Team:** ${team.parent.name} _(ID: ${team.parent.id})_`);
    }

    return {
      type: "DataListItem",
      // Label is a combination of text and a link icon
      label: [
        {
          type: "Text",
          variant: "body1",
          content: team.name
        },
        {
          type: "Icon",
          id: "link",
          color: "blue",
          size: 12
        }
      ],
      // Value is a markdown block showing the rest of the info
      value: {
        type: "Markdown",
        content: mdLines.join("\n\n")
      }
    };
  });

  // Return the DataList component props containing all teams
  return {
    type: "DataList",
    childrenProps: items
  };
}
