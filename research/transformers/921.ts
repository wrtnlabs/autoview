import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A team's access to a project.
     *
     * @title Team Project
    */
    export type team_project = {
        owner_url: string;
        url: string;
        html_url: string;
        columns_url: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        body: string | null;
        number: number & tags.Type<"int32">;
        state: string;
        creator: Schema.simple_user;
        created_at: string;
        updated_at: string;
        /**
         * The organization permission for this project. Only present when owner is an organization.
        */
        organization_permission?: string;
        /**
         * Whether the project is private or not. Only present when owner is an organization.
        */
        "private"?: boolean;
        permissions: {
            read: boolean;
            write: boolean;
            admin: boolean;
        };
    };
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type simple_user = {
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
}
type IAutoViewTransformerInputType = Schema.team_project[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Sort projects by their number for consistent ordering
  const sortedProjects = [...input].sort((a, b) => a.number - b.number);

  // Helper to map project state to chip color
  const stateColor = (state: string): IAutoView.IAutoViewChipProps["color"] => {
    switch (state.toLowerCase()) {
      case "open":
        return "green";
      case "closed":
        return "red";
      default:
        return "gray";
    }
  };

  // Build a list item for each project
  const listItems: IAutoView.IAutoViewListItemProps[] = sortedProjects.map((project) => {
    // Avatar representing the creator
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: project.creator.avatar_url,
      name: project.creator.login,
      size: 32,
      variant: "blue",
    };

    // Chip showing the project state (open/closed/other)
    const stateChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: project.state,
      variant: "outlined",
      size: "small",
      color: stateColor(project.state),
    };

    // Button linking to the HTML URL of the project
    const viewButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: "View",
      href: project.html_url,
      variant: "outlined",
      size: "small",
      // Add a small external link icon before the label
      startElement: {
        type: "Icon",
        id: "external-link",
        size: 12,
        color: "blue",
      },
    };

    // Compose a human‑readable permission summary
    const perm = project.permissions;
    const permDesc = `Perm: R:${perm.read ? "✔" : "✖"} W:${perm.write ? "✔" : "✖"} A:${perm.admin ? "✔" : "✖"}`;

    return {
      type: "ListItem",
      // Project title
      title: project.name,
      // Show project number and permission summary
      description: `#${project.number} · ${permDesc}`,
      // Creator avatar on the left
      startElement: avatar,
      // On the right, show state chip and "View" button
      endElement: [stateChip, viewButton],
    };
  });

  // Return as a responsive list; mobile will collapse it gracefully
  return {
    type: "List",
    childrenProps: listItems,
  };
}
