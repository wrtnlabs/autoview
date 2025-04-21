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



// Transforms a GitHub Gist object into an AutoView vertical card presentation
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to format optional date strings into a localized representation.
  const formatDate = (dateStr?: string): string =>
    dateStr ? new Date(dateStr).toLocaleString() : "N/A";

  // Build a list of chips representing each file in the gist.
  const fileChips: IAutoView.IAutoViewChipProps[] = [];
  if (input.files) {
    for (const filename in input.files) {
      const file = input.files[filename];
      if (file) {
        fileChips.push({
          type: "Chip",
          label: file.filename ?? filename,
          variant: "outlined",
          // color can be customized or omitted
        });
      }
    }
  }

  // Construct data list items for various gist metadata
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: { type: "Text", content: "Files", variant: "subtitle2" },
      value: {
        type: "ChipGroup",
        childrenProps: fileChips,
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Created At", variant: "subtitle2" },
      value: {
        type: "Text",
        content: formatDate(input.created_at),
        variant: "body2",
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Updated At", variant: "subtitle2" },
      value: {
        type: "Text",
        content: formatDate(input.updated_at),
        variant: "body2",
      },
    },
  ];

  // If an owner exists, show their avatar in the list
  if (input.owner) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Owner", variant: "subtitle2" },
      value: {
        type: "Avatar",
        src: input.owner.avatar_url,
        name: input.owner.login,
        size: 32,
      },
    });
  }

  // Display number of forks if available
  if (Array.isArray(input.forks)) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Forks", variant: "subtitle2" },
      value: {
        type: "Text",
        content: `${input.forks.length}`,
        variant: "body2",
      },
    });
  }

  // Core data list component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Card header: shows gist description or fallback title, owner avatar, and comment count
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.description ?? `Gist ${input.id}`,
    // Show owner avatar if present
    ...(input.owner && {
      startElement: {
        type: "Avatar",
        src: input.owner.avatar_url,
        name: input.owner.login,
        size: 40,
      },
    }),
    // Show comment count as a chip with an icon
    endElement: {
      type: "Chip",
      label: input.comments != null ? `${input.comments}` : "0",
      startElement: {
        type: "Icon",
        id: "comment",
        size: 16,
        color: "gray",
      },
    },
  };

  // Card content: embed the data list
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList],
  };

  // Card footer: provide a link button to view the gist on GitHub
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      label: "View on GitHub",
      href: input.html_url,
      startElement: {
        type: "Icon",
        id: "link",
        size: 16,
      },
    },
  };

  // Assemble the vertical card
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter],
  };
}
