import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A comment made to a gist.
     *
     * @title Gist Comment
    */
    export type gist_comment = {
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        /**
         * The comment text.
        */
        body: string;
        user: Schema.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
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
type IAutoViewTransformerInputType = Schema.gist_comment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  /**
   * Safely extract user information, falling back to placeholders if absent.
   */
  const user = input.user;
  const userName = user?.login ?? "Unknown User";
  const avatarSrc = user?.avatar_url ?? "";

  // Format the creation timestamp to a human-readable string.
  const createdAt = new Date(input.created_at).toLocaleString();

  // Avatar for the comment's author.
  const avatarProps: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    src: avatarSrc,
    name: userName,
    size: 40,
    variant: "primary",
  };

  // Header section: author avatar, name, and creation date.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    startElement: avatarProps,
    title: userName,
    description: `Commented on ${createdAt}`,
  };

  // Main content: render the comment body as Markdown.
  const markdownProps: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: input.body || "_No content provided_",
  };
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Single markdown component is acceptable for childrenProps.
    childrenProps: markdownProps,
  };

  // Visual indicator of the author's association with the repository.
  const associationChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.author_association,
    variant: "outlined",
    color: "secondary",
    size: "small",
  };

  // Icon for the "View Comment" button.
  const arrowIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: "arrow-right",
    size: 16,
    color: "blue",
  };

  // Footer with association chip and link button to the full comment.
  const viewButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    label: "View Comment",
    href: input.url,
    variant: "text",
    color: "primary",
    size: "small",
    startElement: arrowIcon,
  };
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    // Display the chip and button side by side.
    childrenProps: [associationChip, viewButton],
  };

  // Assemble the vertical card with header, content, and footer.
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
