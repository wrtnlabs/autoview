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
  // If no gists are available, show a friendly message using Markdown
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "**No gists available**\n\nThere are no public gists to display at this time.",
    };
  }

  // Sort gists by creation date descending, so the newest appear first
  const sorted = [...input].sort((a, b) => {
    const da = new Date(a.created_at).getTime();
    const db = new Date(b.created_at).getTime();
    return db - da;
  });

  // Map each gist to a ListItemProps
  const items: IAutoView.IAutoViewListItemProps[] = sorted.map((gist) => {
    // Determine the gist owner; fallback from `user` to `owner`
    const owner = gist.user ?? gist.owner ?? null;

    // Build an avatar component if we have an owner
    const avatar: IAutoView.IAutoViewAvatarProps | undefined = owner
      ? {
          type: "Avatar",
          src: owner.avatar_url,
          name: owner.login,
          size: 40,
          variant: "primary",
        }
      : undefined;

    // Format creation date for display
    const createdDate = new Date(gist.created_at).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    // Fallback title if the description is empty
    const titleText = gist.description && gist.description.trim().length > 0
      ? gist.description
      : `Gist ${gist.id}`;

    // Badge showing number of comments, wrapping a comment icon
    const commentBadge: IAutoView.IAutoViewBadgeProps = {
      type: "Badge",
      count: gist.comments,
      showZero: false,
      childrenProps: {
        type: "Icon",
        id: "comment",
        color: "gray",
        size: 16,
      },
    };

    // Build the ListItemProps. We make the entire item a link to the gist.
    const listItem: IAutoView.IAutoViewListItemProps = {
      type: "ListItem",
      // Clicking the item will open the gist in a new tab/browser window
      href: gist.html_url,
      title: titleText,
      description: `Created on ${createdDate}`,
      // Show the owner's avatar, if present
      startElement: avatar,
      // Show the comments badge at the end
      endElement: commentBadge,
    };

    return listItem;
  });

  // Prepend a sticky subheader to label the list
  const subheader: IAutoView.IAutoViewListSubheaderProps = {
    type: "ListSubheader",
    stickToTop: true,
    childrenProps: {
      type: "Text",
      content: "Public Gists",
      variant: "h5",
      color: "primary",
    },
  };

  // Return a List component containing all the gists
  const list: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: [subheader, ...items],
  };

  return list;
}
