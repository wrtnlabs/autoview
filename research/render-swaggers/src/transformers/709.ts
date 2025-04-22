import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The status of a commit.
     *
     * @title Status
    */
    export type status = {
        url: string;
        avatar_url: string | null;
        id: number & tags.Type<"int32">;
        node_id: string;
        state: string;
        description: string | null;
        target_url: string | null;
        context: string;
        created_at: string;
        updated_at: string;
        creator: Schema.nullable_simple_user;
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
type IAutoViewTransformerInputType = Schema.status[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no status entries, show a friendly markdown message
  if (!Array.isArray(input) || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No statuses available\n\nThere are currently no status updates to display."
    };
  }

  // Helper to map a status.state to an icon
  const mapStateToIcon = (state: string): IAutoView.IAutoViewIconProps => {
    const s = state.toLowerCase();
    switch (s) {
      case "success":
        return { type: "Icon", id: "check", color: "green", size: 16 };
      case "failure":
      case "error":
        return { type: "Icon", id: "times-circle", color: "red", size: 16 };
      case "pending":
      case "in_progress":
      case "running":
        return { type: "Icon", id: "hourglass-half", color: "blue", size: 16 };
      default:
        return { type: "Icon", id: "question-circle", color: "gray", size: 16 };
    }
  };

  // Build a DataListItem for each status
  const childrenProps: IAutoView.IAutoViewDataListItemProps[] = input.map((status) => {
    // Avatar: show the creator's avatar or initials
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: status.avatar_url ?? undefined,
      name: status.creator?.login ?? undefined,
      size: 32,
      variant: "secondary"
    };

    // Icon representing the state
    const stateIcon = mapStateToIcon(status.state);

    // A short text label of the state (for accessibility/clarity)
    const stateText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: status.state,
      variant: "body2",
      color: stateIcon.color
    };

    // Compose a markdown block for description, link, and timestamps
    const createdAt = new Date(status.created_at).toLocaleString();
    const updatedAt = new Date(status.updated_at).toLocaleString();
    const description = status.description?.trim() || "_No description provided._";
    const detailsLink = status.target_url
      ? `- [View details](${status.target_url})`
      : "";

    const markdownContent = `
**${status.context}**  
${description}

${detailsLink}

_Created:_ ${createdAt}  
_Updated:_ ${updatedAt}
`.trim();

    const detailMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: markdownContent
    };

    return {
      type: "DataListItem",
      // label: avatar + state icon + state text laid out horizontally
      label: [avatar, stateIcon, stateText],
      // value: markdown with rich info
      value: detailMarkdown
    };
  });

  // Return a data list with all statuses
  const list: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps
  };
  return list;
}
