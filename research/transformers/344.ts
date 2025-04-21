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
type IAutoViewTransformerInputType = Schema.base_gist[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map each gist into a ListItem component
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((gist) => {
    // Owner avatar or fallback icon
    const startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = gist.owner
      ? {
          type: "Avatar",
          src: gist.owner.avatar_url,
          name: gist.owner.login,
          size: 32,
          variant: "gray",
        }
      : {
          type: "Icon",
          id: "user",
          color: "gray",
          size: 24,
        };

    // Count of files in this gist
    const fileCount = Object.keys(gist.files || {}).length;
    // Number of comments
    const commentsCount = gist.comments ?? 0;
    // Format creation date for display
    const createdDate = new Date(gist.created_at).toLocaleDateString();

    // Chips to summarize key metrics at the end of the list item
    const endElement: IAutoView.IAutoViewChipProps[] = [
      {
        type: "Chip",
        label: `${fileCount} file${fileCount !== 1 ? "s" : ""}`,
        color: "primary",
        size: "small",
        variant: "outlined",
      },
      {
        type: "Chip",
        label: `${commentsCount} comment${commentsCount !== 1 ? "s" : ""}`,
        color: "secondary",
        size: "small",
        variant: "outlined",
      },
      {
        type: "Chip",
        label: createdDate,
        startElement: {
          type: "Icon",
          id: "calendar",
          size: 12,
          color: "gray",
        },
        color: "gray",
        size: "small",
        variant: "outlined",
      },
    ];

    return {
      type: "ListItem",
      // Use gist ID as the title
      title: gist.id,
      // Provide a default message if description is absent
      description: gist.description ?? "No description",
      startElement,
      endElement,
    };
  });

  // Wrap all items in a responsive List component
  const list: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: listItems,
  };

  return list;
}
