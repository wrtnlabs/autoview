import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Projects are a way to organize columns and cards of work.
     *
     * @title Project
    */
    export type project = {
        owner_url: string & tags.Format<"uri">;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        columns_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * Name of the project
        */
        name: string;
        /**
         * Body of the project
        */
        body: string | null;
        number: number & tags.Type<"int32">;
        /**
         * State of the project; either 'open' or 'closed'
        */
        state: string;
        creator: Schema.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The baseline permission that all organization members have on this project. Only present if owner is an organization.
        */
        organization_permission?: "read" | "write" | "admin" | "none";
        /**
         * Whether or not this project can be seen by everyone. Only present if owner is an organization.
        */
        "private"?: boolean;
    };
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
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
    } | null;
}
type IAutoViewTransformerInputType = Schema.project[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms an array of GitHub project schemas into a visual data list
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no projects, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No GitHub projects available."
    };
  }

  // Map each project to a DataListItem with avatar, name, state chip, markdown description, and a button
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map(project => {
    // Avatar for the project creator (or fallback to owner URL)
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: project.creator?.avatar_url || project.owner_url,
      name: project.creator?.login || project.name,
      size: 32,
      variant: "primary"
    };

    // Text component for the project name
    const nameText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: project.name,
      variant: "h4"
    };

    // Chip to show open/closed state
    const stateChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: project.state,
      variant: "filled",
      size: "small",
      color: project.state === "open" ? "success" : "error"
    };

    // Format creation/update dates
    const created = new Date(project.created_at).toLocaleDateString();
    const updated = new Date(project.updated_at).toLocaleDateString();

    // Build markdown description combining body, created and updated dates
    const descriptionLines = [
      project.body ?? "",
      `**Created:** ${created}`,
      `**Updated:** ${updated}`
    ].filter(line => line.trim().length > 0);
    const mdContent = descriptionLines.join("\n\n");
    const markdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: mdContent
    };

    // Button to open the project in a new tab
    const openButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: "View",
      variant: "text",
      size: "small",
      href: project.html_url
    };

    // Compose the DataListItem: label column is avatar + name; value column is state, description, and button
    return {
      type: "DataListItem",
      label: [avatar, nameText],
      value: [stateChip, markdown, openButton]
    };
  });

  // Return the DataList containing all project items
  return {
    type: "DataList",
    childrenProps: items
  };
}
