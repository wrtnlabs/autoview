import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Pull Request Reviews are reviews on pull requests.
     *
     * @title Pull Request Review
    */
    export type pull_request_review = {
        /**
         * Unique identifier of the review
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        user: Schema.nullable_simple_user;
        /**
         * The text of the review.
        */
        body: string;
        state: string;
        html_url: string & tags.Format<"uri">;
        pull_request_url: string & tags.Format<"uri">;
        _links: {
            html: {
                href: string;
            };
            pull_request: {
                href: string;
            };
        };
        submitted_at?: string & tags.Format<"date-time">;
        /**
         * A commit SHA for the review. If the commit object was garbage collected or forcibly deleted, then it no longer exists in Git and this value will be `null`.
        */
        commit_id: string | null;
        body_html?: string;
        body_text?: string;
        author_association: Schema.author_association;
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
     * How the author is associated with the repository.
     *
     * @title author_association
    */
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
}
type IAutoViewTransformerInputType = Schema.pull_request_review;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Extract user info, with graceful fallback if user is null
  const user = input.user;
  const avatar: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    // If user is null or avatar_url is missing, the UI component will hide the image
    src: user?.avatar_url ?? undefined,
    name: user?.login ?? "Unknown",
  };

  // Map review state to chip color for visual emphasis
  const stateColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    APPROVED: "success",
    CHANGES_REQUESTED: "error",
    COMMENTED: "info",
  };
  const stateChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.state,
    // Default to gray if we don't recognize the state
    color: stateColorMap[input.state] ?? "gray",
    variant: "filled",
  };

  // Format submission date; if unavailable, show placeholder
  const submittedAt = input.submitted_at
    ? new Date(input.submitted_at).toLocaleString()
    : "Date unavailable";

  // Card header showing avatar, user, date, and state of the review
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: user?.login ?? "Unknown User",
    description: submittedAt,
    startElement: avatar,
    endElement: stateChip,
  };

  // Use Markdown component for the review body; fallback text if empty
  const bodyContent =
    input.body && input.body.trim() !== ""
      ? input.body
      : "_No review comments provided_";
  const markdown: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: bodyContent,
  };
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // childrenProps can accept a single PresentationComponentProps (Markdown)
    childrenProps: markdown,
  };

  // Footer with a button linking to the GitHub review page
  const reviewButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    variant: "outlined",
    color: "primary",
    size: "small",
    label: "View on GitHub",
    startElement: {
      type: "Icon",
      id: "github",
      color: "gray",
      size: 20,
    },
    href: input.html_url,
  };
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: reviewButton,
  };

  // Compose a vertical card to display the full review data
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
