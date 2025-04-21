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
  // Extract user safely; GitHub API allows nullable user
  const user = input.user;
  const userName = user ? (user.name || user.login) : "Unknown User";

  // Prepare avatar or fallback icon for the reviewer
  const avatarProps: IAutoView.IAutoViewAvatarProps | undefined = user && user.avatar_url
    ? {
        type: "Avatar",
        src: user.avatar_url,
        name: userName,
        size: 40,
        variant: "gray",
      }
    : undefined;

  // Map GitHub review state to a user-friendly label and color
  const rawState = (input.state || "").toUpperCase();
  const stateLabel = rawState
    .split("_")
    .map(s => s.charAt(0) + s.slice(1).toLowerCase())
    .join(" ");
  let stateColor: IAutoView.IAutoViewChipProps["color"];
  switch (rawState) {
    case "APPROVED":
      stateColor = "success";
      break;
    case "CHANGES_REQUESTED":
      stateColor = "error";
      break;
    case "COMMENTED":
      stateColor = "info";
      break;
    case "PENDING":
      stateColor = "warning";
      break;
    default:
      stateColor = "secondary";
  }

  // Render the review state as a colored chip for quick visual cue
  const stateChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: stateLabel,
    color: stateColor,
    variant: "filled",
    size: "medium",
  };

  // Format submission date into a human-readable string; fallback to empty if missing
  const submittedAt = input.submitted_at
    ? new Date(input.submitted_at).toLocaleString()
    : "";

  // Card header shows the reviewer's avatar, name, submission date, and state chip
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: userName,
    description: submittedAt,
    // Only include the avatar if we have one
    ...(avatarProps ? { startElement: avatarProps } : {}),
    endElement: stateChip,
  };

  // Use Markdown component for the review body to preserve formatting and render links
  const bodyContent = input.body || "";
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: bodyContent,
    },
  };

  // Footer provides a button to view the review on GitHub
  const viewButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    label: "View on GitHub",
    href: input.html_url,
    variant: "text",
    color: "primary",
    size: "medium",
  };
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: viewButton,
  };

  // Assemble all sections into a vertical card for responsive display
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter],
  };
}
