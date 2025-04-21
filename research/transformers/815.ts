import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Page Build
     *
     * @title Page Build
    */
    export type page_build = {
        url: string & tags.Format<"uri">;
        status: string;
        error: {
            message: string | null;
        };
        pusher: Schema.nullable_simple_user;
        commit: string;
        duration: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
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
type IAutoViewTransformerInputType = Schema.page_build[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Sort builds by newest first for better UX
  const sortedBuilds = [...input].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Map each build record to a ListItem component
  const items: IAutoView.IAutoViewListItemProps[] = sortedBuilds.map(
    (build) => {
      // Prepare an avatar for the pusher if available
      const avatarProps: IAutoView.IAutoViewAvatarProps | undefined = build.pusher
        ? {
            type: "Avatar",
            src: build.pusher.avatar_url,
            name: build.pusher.login,
            size: 32,        // compact size for list
            variant: "primary",
          }
        : undefined;

      // Derive a chip color from the status string
      const status = build.status.toLowerCase();
      let chipColor: IAutoView.IAutoViewChipProps["color"] = "secondary";
      switch (status) {
        case "success":
          chipColor = "success";
          break;
        case "failure":
        case "error":
          chipColor = "error";
          break;
        case "cancelled":
          chipColor = "warning";
          break;
      }

      // Chip showing build status
      const statusChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: build.status,
        color: chipColor,
        variant: "outlined",
        size: "small",
      };

      // Human-readable timestamp
      const timestamp = new Date(build.created_at).toLocaleString();
      const dateText: IAutoView.IAutoViewTextProps = {
        type: "Text",
        content: timestamp,
        variant: "caption",
        color: "gray",
      };

      // Button to open the build URL in a new tab
      const openButton: IAutoView.IAutoViewButtonProps = {
        type: "Button",
        label: "Open",
        href: build.url,
        variant: "text",
        size: "small",
      };

      // Compose the list item
      return {
        type: "ListItem",
        href: build.url,
        startElement: avatarProps,
        title: build.commit.slice(0, 7), // short SHA for brevity
        description: build.error.message
          ? `Error: ${build.error.message}`
          : `Duration: ${build.duration}s`,
        endElement: [statusChip, dateText, openButton],
      };
    }
  );

  // Return the complete List component
  return {
    type: "List",
    childrenProps: items,
  };
}
