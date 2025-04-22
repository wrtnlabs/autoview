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
type IAutoViewTransformerInputType = Schema.page_build;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map build status to a color for the status chip
  const statusColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    success: "success",
    failure: "error",
    error: "error",
    pending: "warning",
    canceled: "gray",
  };
  const statusKey = input.status.toLowerCase();
  const chipColor = statusColorMap[statusKey] || "primary";

  // Shorten commit hash for display
  const shortCommit = input.commit.slice(0, 7);

  // Format timestamps for human readability
  const createdAt = new Date(input.created_at).toLocaleString();
  const updatedAt = new Date(input.updated_at).toLocaleString();

  // Prepare list items for the details section
  const details: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Commit",
      },
      value: {
        type: "Text",
        content: shortCommit,
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Duration",
      },
      value: {
        type: "Text",
        content: `${input.duration} ms`,
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Created At",
      },
      value: {
        type: "Text",
        content: createdAt,
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Updated At",
      },
      value: {
        type: "Text",
        content: updatedAt,
      },
    },
  ];

  // If there is an error message, include it in the details
  if (input.error?.message) {
    details.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Error",
      },
      // Use a markdown component to allow multiline stack traces or formatting
      value: {
        type: "Markdown",
        content: input.error.message,
      },
    });
  }

  // Determine the avatar or icon for the pusher
  const pusherElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = input.pusher
    ? {
        type: "Avatar",
        src: input.pusher.avatar_url,
        name: input.pusher.login,
        variant: "info",
        size: 32,
      }
    : {
        type: "Icon",
        id: "user",
        color: "gray",
        size: 32,
      };

  // Compose the vertical card view
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      // Header with pusher avatar, build status chip, and repository URL
      {
        type: "CardHeader",
        startElement: pusherElement,
        title: input.pusher ? input.pusher.login : "Unknown Pusher",
        description: input.url,
        endElement: {
          type: "Chip",
          label: input.status,
          color: chipColor,
          variant: "filled",
          size: "small",
        },
      },
      // Content: a data list of build details
      {
        type: "CardContent",
        childrenProps: {
          type: "DataList",
          childrenProps: details,
        },
      },
      // Footer: a button to view the build URL
      {
        type: "CardFooter",
        childrenProps: {
          type: "Button",
          label: "View Build",
          variant: "contained",
          color: "primary",
          href: input.url,
          startElement: {
            type: "Icon",
            id: "link",
            color: "blue",
            size: 16,
          },
        },
      },
    ],
  };

  return card;
}
