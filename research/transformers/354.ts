import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Gist Simple
     *
     * @title Gist Simple
    */
    export type gist_simple = {
        forks?: {
            id?: string;
            url?: string & tags.Format<"uri">;
            user?: any;
            created_at?: string & tags.Format<"date-time">;
            updated_at?: string & tags.Format<"date-time">;
        }[] | null;
        history?: any[] | null;
        /**
         * Gist
         *
         * @title Gist
        */
        fork_of?: {
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
                };
            };
            "public": boolean;
            created_at: string & tags.Format<"date-time">;
            updated_at: string & tags.Format<"date-time">;
            description: string | null;
            comments: number & tags.Type<"int32">;
            comments_enabled?: boolean;
            user: any;
            comments_url: string & tags.Format<"uri">;
            owner?: any;
            truncated?: boolean;
            forks?: any[];
            history?: any[];
        } | null;
        url?: string;
        forks_url?: string;
        commits_url?: string;
        id?: string;
        node_id?: string;
        git_pull_url?: string;
        git_push_url?: string;
        html_url?: string;
        files?: {
            [key: string]: {
                filename?: string;
                type?: string;
                language?: string;
                raw_url?: string;
                size?: number & tags.Type<"int32">;
                truncated?: boolean;
                content?: string;
                /**
                 * The encoding used for `content`. Currently, `"utf-8"` and `"base64"` are supported.
                */
                encoding?: string & tags.Default<"utf-8">;
            } | null;
        };
        "public"?: boolean;
        created_at?: string;
        updated_at?: string;
        description?: string | null;
        comments?: number & tags.Type<"int32">;
        comments_enabled?: boolean;
        user?: string | null;
        comments_url?: string;
        owner?: Schema.simple_user;
        truncated?: boolean;
    };
    export type public_user = any;
    export type gist_history = any;
    export type nullable_simple_user = any;
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
type IAutoViewTransformerInputType = Schema.gist_simple;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Build an avatar element for the gist owner, fallback to a generic user icon
  const ownerElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = input.owner
    ? {
        type: "Avatar",
        src: input.owner.avatar_url,
        name: input.owner.login,
        variant: "blue",
        size: 40,
      }
    : {
        type: "Icon",
        id: "user",
        color: "gray",
        size: 24,
      };

  // Count number of files in the gist
  const fileCount: number = input.files ? Object.keys(input.files).length : 0;

  // Count forks and comments, using defaults for missing values
  const forksCount: number = Array.isArray(input.forks) ? input.forks.length : 0;
  const commentsCount: number = input.comments ?? 0;

  // Compose a list of key/value pairs to display gist metadata
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: {
        type: "Text",
        variant: "subtitle2",
        content: "Files",
      },
      value: {
        type: "Text",
        variant: "body1",
        content: `${fileCount}`,
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        variant: "subtitle2",
        content: "Forks",
      },
      value: {
        type: "Badge",
        count: forksCount,
        maxCount: 99,
        showZero: true,
        dot: false,
        childrenProps: {
          type: "Icon",
          id: "code-branch",
          color: "blue",
          size: 20,
        },
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        variant: "subtitle2",
        content: "Comments",
      },
      value: {
        type: "Text",
        variant: "body1",
        content: `${commentsCount}`,
      },
    },
  ];

  // If this gist is a fork of another, show the parent gist ID as a chip
  if (input.fork_of) {
    dataListItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        variant: "subtitle2",
        content: "Forked From",
      },
      value: {
        type: "Chip",
        label: input.fork_of.id,
        variant: "outlined",
        size: "small",
      },
    });
  }

  // Wrap the metadata items in a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Header for the card: gist description or ID and creation timestamp
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.description || `Gist ${input.id}`,
    description: input.created_at
      ? new Date(input.created_at).toLocaleString()
      : undefined,
    startElement: ownerElement,
  };

  // Assemble a vertical card with header and content
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      header,
      {
        type: "CardContent",
        childrenProps: dataList,
      },
    ],
  };

  return card;
}
