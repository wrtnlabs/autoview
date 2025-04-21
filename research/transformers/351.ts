import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Gist Commit
     *
     * @title Gist Commit
    */
    export type gist_commit = {
        url: string & tags.Format<"uri">;
        version: string;
        user: Schema.nullable_simple_user;
        change_status: {
            total?: number & tags.Type<"int32">;
            additions?: number & tags.Type<"int32">;
            deletions?: number & tags.Type<"int32">;
        };
        committed_at: string & tags.Format<"date-time">;
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
type IAutoViewTransformerInputType = Schema.gist_commit[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms an array of gist_commit records into a responsive list UI
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no commits, render a simple markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No commits available"
    };
  }

  // Build a list item for each commit
  const items: IAutoView.IAutoViewListItemProps[] = input.map(commit => {
    const user = commit.user;
    // Prepare avatar; fall back to a placeholder name if user is null
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: user?.avatar_url,
      name: user?.name ?? user?.login ?? "Unknown",
      variant: "gray",
      size: 32
    };

    // Format the commit timestamp for display
    const dateLabel = new Date(commit.committed_at).toLocaleString();

    // Safely extract additions and deletions (default to 0)
    const additions = commit.change_status.additions ?? 0;
    const deletions = commit.change_status.deletions ?? 0;

    // Prepare up/down arrow icons to decorate the change counts
    const addIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "arrow-up",
      color: "green",
      size: 16
    };
    const delIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "arrow-down",
      color: "red",
      size: 16
    };

    // Use compact chips to show additions/deletions
    const addChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: additions.toString(),
      startElement: addIcon,
      color: "success",
      size: "small",
      variant: "filled"
    };
    const delChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: deletions.toString(),
      startElement: delIcon,
      color: "error",
      size: "small",
      variant: "filled"
    };

    // Assemble the list item; clicking the item navigates to the commit URL
    return {
      type: "ListItem",
      title: commit.version,
      description: dateLabel,
      href: commit.url,
      startElement: avatar,
      endElement: [addChip, delChip]
    };
  });

  // Wrap all items in a responsive list component
  return {
    type: "List",
    childrenProps: items
  };
}
