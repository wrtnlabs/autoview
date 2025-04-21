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
  // Helper: format ISO date to local date string
  function formatDate(iso: string): string {
    try {
      const dt = new Date(iso);
      if (isNaN(dt.getTime())) return iso;
      return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return iso;
    }
  }

  // Helper: truncate long descriptions
  function truncate(text: string, maxLength: number = 100): string {
    return text.length > maxLength ? text.slice(0, maxLength - 1) + "…" : text;
  }

  // If no projects, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "**No projects available.**",
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Map project state to chip color
  const stateColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    open: "success",
    closed: "error",
  };

  // Build list items for each project
  const items: IAutoView.IAutoViewListItemProps[] = input.map((proj) => {
    // Build a concise description with truncated body and creation date
    const bodyText = proj.body ? truncate(proj.body, 80) : "No description";
    const created = formatDate(proj.created_at);
    const desc = `${bodyText} • Created ${created}`;

    // Avatar of project creator
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: proj.creator.avatar_url,
      name: proj.creator.login,
      variant: "primary",
      size: 32,
    };

    // Chip showing project state
    const stateChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: proj.state.toUpperCase(),
      color: stateColorMap[proj.state] || "primary",
      variant: "outlined",
      size: "small",
    };

    // Button to view project on GitHub
    const viewButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      variant: "text",
      size: "small",
      label: "View",
      href: proj.html_url,
      startElement: {
        type: "Icon",
        id: "arrow-right",
        size: 16,
        color: "gray",
      },
    };

    return {
      type: "ListItem",
      title: proj.name,
      description: desc,
      startElement: avatar,
      // Show state chip and view button on the right
      endElement: [stateChip, viewButton],
    };
  });

  // Optional subheader for the list
  const subheader: IAutoView.IAutoViewListSubheaderProps = {
    type: "ListSubheader",
    stickToTop: true,
    childrenProps: {
      type: "Text",
      content: "Projects",
      variant: "h5",
    },
  };

  // Return the list of projects
  return {
    type: "List",
    childrenProps: [subheader, ...items],
  } as IAutoView.IAutoViewListProps;
}
