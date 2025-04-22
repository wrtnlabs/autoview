import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Commit Comment
     *
     * @title Commit Comment
    */
    export type commit_comment = {
        html_url: string & tags.Format<"uri">;
        url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        body: string;
        path: string | null;
        position: (number & tags.Type<"int32">) | null;
        line: (number & tags.Type<"int32">) | null;
        commit_id: string;
        user: Schema.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        author_association: Schema.author_association;
        reactions?: Schema.reaction_rollup;
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
type IAutoViewTransformerInputType = Schema.commit_comment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: format the creation date for display
  const createdDate = new Date(input.created_at).toLocaleString();

  // Determine user avatar or fallback icon
  const avatarOrIcon: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = input.user
    ? {
        type: "Avatar",
        src: input.user.avatar_url,
        name: input.user.login,
        size: 40,
        variant: "blue",
      }
    : {
        type: "Icon",
        id: "user",
        size: 24,
        color: "gray",
      };

  // Chip to show author's association (e.g., OWNER, CONTRIBUTOR, etc.)
  const associationChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.author_association,
    variant: "outlined",
    size: "small",
    color: "info",
  };

  // Build reaction chips if reactions are provided
  let reactionGroup: IAutoView.IAutoViewChipGroupProps | undefined;
  if (input.reactions) {
    // Map GitHub reaction keys to FontAwesome icon names
    const iconMap: Record<string, string> = {
      "+1": "thumbs-up",
      "-1": "thumbs-down",
      laugh: "laugh",
      confused: "confused",
      heart: "heart",
      hooray: "hands-clapping",
      eyes: "eye",
      rocket: "rocket",
    };
    const reactionChips: IAutoView.IAutoViewChipProps[] = [];

    for (const key of Object.keys(iconMap) as Array<keyof typeof iconMap>) {
      const count = (input.reactions as any)[key] as number;
      if (count > 0) {
        reactionChips.push({
          type: "Chip",
          label: String(count),
          variant: "outlined",
          size: "small",
          color: "gray",
          startElement: {
            type: "Icon",
            id: iconMap[key],
            size: 16,
            color: "gray",
          },
        });
      }
    }
    if (reactionChips.length > 0) {
      reactionGroup = {
        type: "ChipGroup",
        childrenProps: reactionChips,
      };
    }
  }

  // Button to view the comment on GitHub
  const viewOnGitHubBtn: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    label: "View on GitHub",
    href: input.html_url,
    variant: "text",
    color: "primary",
    size: "small",
  };

  // Markdown content including file path/line context and the comment body
  const filePath = input.path ?? "N/A";
  const fileLocation =
    input.line !== null && input.line !== undefined
      ? `:${input.line}`
      : "";
  const markdownContent = `**File:** \`${filePath}${fileLocation}\`

${input.body}`;

  // Compose the card header, content, and footer
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    startElement: avatarOrIcon,
    title: input.user?.login ?? "Unknown user",
    description: `Created at ${createdDate}`,
    endElement: associationChip,
  };

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: markdownContent,
    },
  };

  // Collect footer children: reactions (if any) and the view button
  const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (reactionGroup) footerChildren.push(reactionGroup);
  footerChildren.push(viewOnGitHubBtn);

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerChildren,
  };

  // Return a vertical card combining header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}
