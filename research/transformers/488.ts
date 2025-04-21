import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The Relationship a Team has with a role.
     *
     * @title A Role Assignment for a Team
    */
    export type team_role_assignment = {
        /**
         * Determines if the team has a direct, indirect, or mixed relationship to a role
        */
        assignment?: "direct" | "indirect" | "mixed";
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
type IAutoViewTransformerInputType = Schema.team_role_assignment[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no data, show a friendly markdown message.
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "**No role assignments available**",
    };
  }

  /**
   * Map a permission object to a representative icon.
   * Priority: admin > maintain > push > triage > pull.
   */
  function selectPermissionIcon(permissions: NonNullable<Schema.team_role_assignment["permissions"]>): string {
    if (permissions.admin) return "shield-alt";
    if (permissions.maintain) return "wrench";
    if (permissions.push) return "arrow-up";
    if (permissions.triage) return "tasks";
    if (permissions.pull) return "download";
    return "user";
  }

  /**
   * Map assignment type to a chip color.
   */
  function assignmentColor(type?: Schema.team_role_assignment["assignment"]): IAutoView.IAutoViewChipProps["color"] {
    switch (type) {
      case "direct":
        return "green";
      case "indirect":
        return "blue";
      case "mixed":
        return "violet";
      default:
        return "gray";
    }
  }

  // Build list items for each team-role assignment.
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((record) => {
    const assignmentType = record.assignment ?? "unknown";
    const chip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: assignmentType,
      color: assignmentColor(record.assignment),
      size: "small",
      variant: "filled",
    };

    // Fallback for missing description.
    const descriptionText = record.description ?? record.permission;

    // Pick an icon based on the detailed permissions.
    const permIconId =
      record.permissions !== undefined
        ? selectPermissionIcon(record.permissions)
        : "user";

    const permIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: permIconId,
      color: "teal",
      size: 24,
    };

    // A link button to view the team assignment in GitHub.
    const viewButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      variant: "text",
      color: "primary",
      size: "small",
      href: record.html_url,
      startElement: {
        type: "Icon",
        id: "external-link-alt",
        size: 12,
      },
      label: ["View"],
    };

    return {
      type: "ListItem",
      // Display the team name prominently.
      title: record.name,
      description: descriptionText,
      // Use a colored chip for direct/indirect/mixed assignment.
      startElement: chip,
      // Show the key permission icon and a button to navigate to GitHub.
      endElement: [permIcon, viewButton],
    };
  });

  // Return a responsive list UI.
  return {
    type: "List",
    childrenProps: listItems,
  };
}
