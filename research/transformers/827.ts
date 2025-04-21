import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Pull Request Review Comments are comments on a portion of the Pull Request's diff.
     *
     * @title Pull Request Review Comment
    */
    export type pull_request_review_comment = {
        /**
         * URL for the pull request review comment
        */
        url: string;
        /**
         * The ID of the pull request review to which the comment belongs.
        */
        pull_request_review_id: (number & tags.Type<"int32">) | null;
        /**
         * The ID of the pull request review comment.
        */
        id: number & tags.Type<"int32">;
        /**
         * The node ID of the pull request review comment.
        */
        node_id: string;
        /**
         * The diff of the line that the comment refers to.
        */
        diff_hunk: string;
        /**
         * The relative path of the file to which the comment applies.
        */
        path: string;
        /**
         * The line index in the diff to which the comment applies. This field is closing down; use `line` instead.
        */
        position?: number & tags.Type<"int32">;
        /**
         * The index of the original line in the diff to which the comment applies. This field is closing down; use `original_line` instead.
        */
        original_position?: number & tags.Type<"int32">;
        /**
         * The SHA of the commit to which the comment applies.
        */
        commit_id: string;
        /**
         * The SHA of the original commit to which the comment applies.
        */
        original_commit_id: string;
        /**
         * The comment ID to reply to.
        */
        in_reply_to_id?: number & tags.Type<"int32">;
        user: Schema.simple_user;
        /**
         * The text of the comment.
        */
        body: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * HTML URL for the pull request review comment.
        */
        html_url: string;
        /**
         * URL for the pull request that the review comment belongs to.
        */
        pull_request_url: string;
        author_association: Schema.author_association;
        _links: {
            self: {
                href: string & tags.Format<"uri">;
            };
            html: {
                href: string & tags.Format<"uri">;
            };
            pull_request: {
                href: string & tags.Format<"uri">;
            };
        };
        /**
         * The first line of the range for a multi-line comment.
        */
        start_line?: (number & tags.Type<"int32">) | null;
        /**
         * The first line of the range for a multi-line comment.
        */
        original_start_line?: (number & tags.Type<"int32">) | null;
        /**
         * The side of the first line of the range for a multi-line comment.
        */
        start_side?: "LEFT" | "RIGHT" | null;
        /**
         * The line of the blob to which the comment applies. The last line of the range for a multi-line comment
        */
        line?: number & tags.Type<"int32">;
        /**
         * The line of the blob to which the comment applies. The last line of the range for a multi-line comment
        */
        original_line?: number & tags.Type<"int32">;
        /**
         * The side of the diff to which the comment applies. The side of the last line of the range for a multi-line comment
        */
        side?: "LEFT" | "RIGHT";
        /**
         * The level at which the comment is targeted, can be a diff line or a file.
        */
        subject_type?: "line" | "file";
        reactions?: Schema.reaction_rollup;
        body_html?: string;
        body_text?: string;
    };
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
    /**
     * How the author is associated with the repository.
     *
     * @title author_association
    */
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
    /**
     * @title Reaction Rollup
    */
    export type reaction_rollup = {
        url: string & tags.Format<"uri">;
        total_count: number & tags.Type<"int32">;
        "+1": number & tags.Type<"int32">;
        "-1": number & tags.Type<"int32">;
        laugh: number & tags.Type<"int32">;
        confused: number & tags.Type<"int32">;
        heart: number & tags.Type<"int32">;
        hooray: number & tags.Type<"int32">;
        eyes: number & tags.Type<"int32">;
        rocket: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.pull_request_review_comment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: map GitHub reaction keys to FontAwesome icon IDs
  const reactionIconMap: Record<string, string> = {
    "+1": "thumbs-up",
    "-1": "thumbs-down",
    laugh: "laugh",
    confused: "confused",
    heart: "heart",
    hooray: "tada",
    eyes: "eye",
    rocket: "rocket",
  };

  // Build chips for each non-zero reaction
  const reactionChips: IAutoView.IAutoViewChipProps[] = [];
  if (input.reactions) {
    for (const key of Object.keys(reactionIconMap) as Array<keyof typeof reactionIconMap>) {
      // @ts-ignore -- reactions has numeric values
      const count: number = input.reactions[key] ?? 0;
      if (count > 0) {
        reactionChips.push({
          type: "Chip",
          label: String(count),
          variant: "outlined",
          size: "small",
          startElement: {
            type: "Icon",
            id: reactionIconMap[key],
            size: 16,
          },
        });
      }
    }
  }

  // Compose a ChipGroup only if there's at least one reaction
  const footerComponent: IAutoView.IAutoViewCardFooterProps | undefined =
    reactionChips.length > 0
      ? {
          type: "CardFooter",
          // Wrap multiple Chips in a ChipGroup for a horizontal layout
          childrenProps: {
            type: "ChipGroup",
            childrenProps: reactionChips,
          },
        }
      : undefined;

  // Format creation timestamp and optional reply info
  const createdAt = new Date(input.created_at);
  let description = createdAt.toLocaleString();
  if (input.in_reply_to_id != null) {
    description += ` • reply to #${input.in_reply_to_id}`;
  }

  // Determine a usable line number
  const lineNumber =
    input.line ?? input.position ?? input.original_line ?? null;

  // Build file-location chip
  const locationLabel = lineNumber != null
    ? `${input.path}:${lineNumber}`
    : input.path;

  const locationChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: locationLabel,
    variant: "outlined",
    size: "small",
    startElement: {
      type: "Icon",
      id: "code",
      size: 16,
    },
  };

  // Card header with avatar, user name, timestamp, and file location
  const headerComponent: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.user.login,
    description,
    startElement: {
      type: "Avatar",
      src: input.user.avatar_url,
      name: input.user.login,
      size: 32,
    },
    endElement: locationChip,
  };

  // Content: render the comment body as Markdown for richer formatting
  const contentComponent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: input.body,
    },
  };

  // Assemble a vertical card with header, content, and optional footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      headerComponent,
      contentComponent,
      // Only include the footer if we have reactions
      ...(footerComponent ? [footerComponent] : []),
    ],
  };

  return card;
}
