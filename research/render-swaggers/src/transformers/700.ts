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
  // Map GitHub reaction types to FontAwesome icons and colors
  const reactionMap: Record<string, { icon: string; color: IAutoView.IAutoViewIconProps['color'] }> = {
    '+1': { icon: 'thumbs-up', color: 'green' },
    '-1': { icon: 'thumbs-down', color: 'red' },
    laugh: { icon: 'laugh', color: 'yellow' },
    confused: { icon: 'question', color: 'orange' },
    heart: { icon: 'heart', color: 'pink' },
    hooray: { icon: 'tada', color: 'orange' },
    eyes: { icon: 'eye', color: 'blue' },
    rocket: { icon: 'rocket', color: 'teal' },
  };

  // Build an array of ChipProps for each non-zero reaction
  const reactionChips: IAutoView.IAutoViewChipProps[] = [];
  if (input.reactions) {
    for (const key of Object.keys(reactionMap)) {
      // Type-unsafe index access; we trust the compiler-validated input
      const count = (input.reactions as any)[key] as number;
      if (typeof count === 'number' && count > 0) {
        const { icon, color } = reactionMap[key];
        reactionChips.push({
          type: 'Chip',
          label: `${key} ${count}`,
          startElement: { type: 'Icon', id: icon, color },
          variant: 'outlined',
          size: 'small',
        });
      }
    }
  }

  // Create an avatar if available, otherwise a fallback icon
  const userAvatar = input.user && input.user.avatar_url
    ? {
        type: 'Avatar' as const,
        src: input.user.avatar_url,
        name: input.user.login,
        variant: 'primary' as const,
        size: 40 as const,
      }
    : {
        type: 'Icon' as const,
        id: 'user',
        color: 'gray' as const,
        size: 40 as const,
      };

  // Card header: shows user avatar, login, and a short commit ID
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    startElement: userAvatar,
    title: input.user?.login ?? 'Unknown User',
    description: `Comment on ${input.commit_id.slice(0, 7)}`,
  };

  // Card content: render the comment body as markdown for rich text
  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: {
      type: 'Markdown',
      content: input.body || '',
    },
  };

  // Card footer: reaction chips or a placeholder text, plus a link button
  const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  if (reactionChips.length > 0) {
    footerChildren.push({
      type: 'ChipGroup',
      childrenProps: reactionChips,
    });
  } else {
    footerChildren.push({
      type: 'Text',
      variant: 'caption',
      color: 'gray',
      content: 'No reactions',
    });
  }

  if (input.html_url) {
    footerChildren.push({
      type: 'Button',
      variant: 'text',
      startElement: { type: 'Icon', id: 'link', color: 'blue' },
      label: 'View on GitHub',
      href: input.html_url,
    });
  }

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: 'CardFooter',
    childrenProps: footerChildren,
  };

  // Assemble the vertical card with header, content, and footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: 'VerticalCard',
    childrenProps: [header, content, footer],
  };

  return card;
}
