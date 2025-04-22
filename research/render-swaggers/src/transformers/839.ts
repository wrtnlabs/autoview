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
type IAutoViewTransformerInputType = Schema.pull_request_review[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If no reviews are provided, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No pull request reviews found."
    };
  }

  // Map each pull request review to a ListItem component
  const items: IAutoView.IAutoViewListItemProps[] = input.map((review) => {
    // Extract user information, handling null user gracefully
    const user = review.user;
    const avatarElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps =
      user && user.avatar_url
        ? {
            type: "Avatar",
            src: user.avatar_url,
            name: user.login,
            size: 40,
            variant: "info"
          }
        : {
            // Fallback icon if user data is missing
            type: "Icon",
            id: "user",
            color: "gray",
            size: 24
          };

    // Format the submission date for display
    const submittedAt = review.submitted_at
      ? new Date(review.submitted_at).toLocaleString()
      : "Unknown date";

    // Compose title and description
    const loginOrUnknown = user && user.login ? user.login : "Unknown user";
    const title = `${loginOrUnknown} – ${review.state.toLowerCase()}`;
    const description = submittedAt;

    // Use the review's HTML URL as the clickable link for the list item, and indicate navigation with an arrow icon
    const navigationIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "arrow-right",
      size: 16,
      color: "gray"
    };

    return {
      type: "ListItem",
      title,
      description,
      startElement: avatarElement,
      endElement: navigationIcon,
      href: review.html_url
    };
  });

  // Return a List component containing all reviews
  return {
    type: "List",
    childrenProps: items
  };
}
