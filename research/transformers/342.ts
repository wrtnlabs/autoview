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
  // Helper to format date-times into a concise local string
  const formatDate = (dt?: string): string | undefined => {
    if (!dt) return undefined;
    const d = new Date(dt);
    return isNaN(d.getTime()) ? dt : d.toLocaleString();
  };

  // Build a list of key-value items summarizing the gist
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Owner: show avatar and login
  if (input.owner) {
    dataItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Owner",
        variant: "subtitle2"
      },
      value: {
        type: "Avatar",
        // AvatarProps.src expects a URI-format string
        src: input.owner.avatar_url,
        name: input.owner.login,
        variant: "info",
        size: 32
      }
    });
  }

  // Files count
  const fileCount = input.files ? Object.keys(input.files).reduce((count, key) => {
    return input.files![key] ? count + 1 : count;
  }, 0) : 0;
  dataItems.push({
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Files",
      variant: "subtitle2"
    },
    value: {
      type: "Chip",
      label: String(fileCount),
      startElement: {
        type: "Icon",
        id: "file",
        color: "teal",
        size: 16
      },
      variant: "outlined",
      size: "small"
    }
  });

  // Forks count
  const forksCount = Array.isArray(input.forks) ? input.forks.length : 0;
  dataItems.push({
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Forks",
      variant: "subtitle2"
    },
    value: {
      type: "Chip",
      label: String(forksCount),
      startElement: {
        type: "Icon",
        id: "code-branch",
        color: "green",
        size: 16
      },
      variant: "outlined",
      size: "small"
    }
  });

  // Comments count
  if (typeof input.comments === "number") {
    dataItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Comments",
        variant: "subtitle2"
      },
      value: {
        type: "Chip",
        label: String(input.comments),
        startElement: {
          type: "Icon",
          id: "comments",
          color: "blue",
          size: 16
        },
        variant: "outlined",
        size: "small"
      }
    });
  }

  // Created and updated timestamps
  const created = formatDate(input.created_at);
  if (created) {
    dataItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Created At",
        variant: "subtitle2"
      },
      value: {
        type: "Text",
        content: created,
        variant: "body2",
        color: "gray"
      }
    });
  }
  const updated = formatDate(input.updated_at);
  if (updated) {
    dataItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Updated At",
        variant: "subtitle2"
      },
      value: {
        type: "Text",
        content: updated,
        variant: "body2",
        color: "gray"
      }
    });
  }

  // Assemble the DataList inside a CardContent
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: dataItems
    }
  };

  // Build the card header with title, description and an optional avatar
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.id ?? "Gist",
    description: input.description ?? undefined,
    startElement: input.owner
      ? {
          type: "Avatar",
          src: input.owner.avatar_url,
          name: input.owner.login,
          variant: "primary",
          size: 40
        }
      : undefined
  };

  // Final VerticalCard wrapping header and content
  return {
    type: "VerticalCard",
    childrenProps: [header, content]
  };
}
