import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Base Gist
     *
     * @title Base Gist
    */
    export type base_gist = {
        url: string & tags.Format<"uri">;
        forks_url: string & tags.Format<"uri">;
        commits_url: string & tags.Format<"uri">;
        id: string;
        node_id: string;
        git_pull_url: string & tags.Format<"uri">;
        git_push_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        files: {
            [key: string]: {
                filename?: string;
                type?: string;
                language?: string;
                raw_url?: string;
                size?: number & tags.Type<"int32">;
                /**
                 * The encoding used for `content`. Currently, `"utf-8"` and `"base64"` are supported.
                */
                encoding?: string & tags.Default<"utf-8">;
            };
        };
        "public": boolean;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        description: string | null;
        comments: number & tags.Type<"int32">;
        comments_enabled?: boolean;
        user: Schema.nullable_simple_user;
        comments_url: string & tags.Format<"uri">;
        owner?: Schema.simple_user;
        truncated?: boolean;
        forks?: any[];
        history?: any[];
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
type IAutoViewTransformerInputType = Schema.base_gist;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Determine the gist owner (prefer `owner`, fallback to `user`)
  const owner = input.owner ?? input.user ?? null;

  // Build an avatar component if owner info is available
  const avatarElement: IAutoView.IAutoViewAvatarProps | undefined = owner
    ? {
        type: "Avatar",
        src: owner.avatar_url,
        name: owner.login,
        variant: "primary",
        size: 40,
      }
    : undefined;

  // Badge to show number of comments, with a comment icon
  const commentBadge: IAutoView.IAutoViewBadgeProps = {
    type: "Badge",
    count: input.comments,
    showZero: false,
    childrenProps: {
      type: "Icon",
      id: "comment",
      color: "gray",
      size: 16,
    },
  };

  // Build a list of files in the gist
  const fileNames = Object.keys(input.files);
  const fileItems: IAutoView.IAutoViewDataListItemProps[] = fileNames.map((filename) => {
    const file = input.files[filename];
    // Label: filename
    const label: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: filename,
    };
    // Value: language chip (fallback to "Unknown")
    const value: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: file.language ?? "Unknown",
      variant: "outlined",
      size: "small",
    };
    return {
      type: "DataListItem",
      label,
      value,
    };
  });

  const fileList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: fileItems,
  };

  // Compose the card header
  const headerTitle = input.description ?? `Gist ${input.id}`;
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: headerTitle,
    // show comment count on the right
    endElement: commentBadge,
  };
  if (avatarElement) {
    cardHeader.startElement = avatarElement;
  }
  if (input.description) {
    cardHeader.description = input.description;
  }

  // Compose the card content: show file count and file list
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [
      {
        type: "Text",
        variant: "h4",
        content: `Files (${fileNames.length})`,
      },
      fileList,
    ],
  };

  // Footer with a button linking to the gist on GitHub
  const viewButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    label: "Open on GitHub",
    variant: "contained",
    color: "primary",
    href: input.html_url,
  };
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: viewButton,
  };

  // Return a responsive vertical card composing all parts
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter],
  };
}
