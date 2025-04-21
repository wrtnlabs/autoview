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



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Prepare the 'startElement' for the card header: user's avatar if available, otherwise a generic icon
  const author = input.user;
  const startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = author
    ? {
        type: "Avatar",
        src: author.avatar_url,
        name: author.login,
        // choice of variant can be extended, default to primary
        variant: "primary",
      }
    : {
        type: "Icon",
        id: "user",
        color: "gray",
        size: 24,
      };

  // Map GitHub review state to a chip color
  const stateColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    APPROVED: "success",
    COMMENTED: "info",
    "CHANGES_REQUESTED": "error",
  };
  const chipColor = stateColorMap[input.state.toUpperCase()] || "primary";

  // Format submission date for display
  const submittedAt = input.submitted_at
    ? new Date(input.submitted_at).toLocaleString()
    : "Unknown date";

  // CardHeader: shows who reviewed, when, and the review state
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: author?.login ?? "Unknown Reviewer",
    description: `${input.author_association.replace(/_/g, " ")} · ${submittedAt}`,
    startElement,
    endElement: {
      type: "Chip",
      label: input.state,
      color: chipColor,
      variant: "outlined",
      size: "small",
    },
  };

  // CardContent: render the review body as Markdown for richer formatting
  const bodyContent = input.body?.trim() || "No review comments provided.";
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: bodyContent,
    },
  };

  // CardFooter: action buttons linking to the GitHub review and the pull request
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      {
        type: "Button",
        label: "View Review",
        href: input.html_url,
        color: "primary",
        variant: "text",
        size: "small",
      },
      {
        type: "Button",
        label: "View Pull Request",
        href: input.pull_request_url,
        color: "secondary",
        variant: "text",
        size: "small",
      },
    ],
  };

  // Assemble the final VerticalCard with header, content, and footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
