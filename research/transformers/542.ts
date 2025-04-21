import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A reply to a discussion within a team.
     *
     * @title Team Discussion Comment
    */
    export type team_discussion_comment = {
        author: Schema.nullable_simple_user;
        /**
         * The main text of the comment.
        */
        body: string;
        body_html: string;
        /**
         * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
        */
        body_version: string;
        created_at: string & tags.Format<"date-time">;
        last_edited_at: (string & tags.Format<"date-time">) | null;
        discussion_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        node_id: string;
        /**
         * The unique sequence number of a team discussion comment.
        */
        number: number & tags.Type<"int32">;
        updated_at: string & tags.Format<"date-time">;
        url: string & tags.Format<"uri">;
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
type IAutoViewTransformerInputType = Schema.team_discussion_comment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: map GitHub reaction keys to FontAwesome icon IDs
  const reactionIconMap: Record<string, string> = {
    '+1': 'thumbs-up',
    '-1': 'thumbs-down',
    laugh: 'laugh',
    confused: 'confused',
    heart: 'heart',
    hooray: 'tada', // FontAwesome "tada" for celebration
    eyes: 'eye',
    rocket: 'rocket',
  };

  // Build a header with avatar and author info
  const author = input.author;
  const authorAvatar: IAutoView.IAutoViewAvatarProps = {
    type: 'Avatar',
    src: author?.avatar_url,
    name: author?.login ?? 'Unknown',
    variant: 'primary',
    size: 32,
  };

  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: author?.name ?? author?.login ?? 'Unknown User',
    description: `Posted on ${new Date(input.created_at).toLocaleString()}`,
    startElement: authorAvatar,
  };

  // Use Markdown component to render the comment body (assumes `body` is markdown)
  const contentComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
    {
      type: 'Markdown',
      content: input.body,
    } as IAutoView.IAutoViewMarkdownProps,
  ];

  // If there are reaction rollups, build a DataList of reactions
  if (input.reactions && input.reactions.total_count > 0) {
    const items: IAutoView.IAutoViewDataListItemProps[] = [];

    // Collect only reaction types (exclude url and total_count)
    for (const key of Object.keys(input.reactions) as Array<keyof typeof input.reactions>) {
      if (key === 'url' || key === 'total_count') continue;
      const count = (input.reactions as any)[key] as number;
      if (count > 0 && reactionIconMap[key]) {
        // Icon for this reaction
        const icon: IAutoView.IAutoViewIconProps = {
          type: 'Icon',
          id: reactionIconMap[key],
          color: 'gray',
          size: 16,
        };
        // Label: icon + reaction name
        const label: IAutoView.IAutoViewPresentationComponentProps[] = [
          icon,
          {
            type: 'Text',
            content: key === '+1' ? 'Upvotes' :
                     key === '-1' ? 'Downvotes' :
                     key.charAt(0).toUpperCase() + key.slice(1),
            variant: 'body2',
          },
        ];
        // Value: count
        const value: IAutoView.IAutoViewTextProps = {
          type: 'Text',
          content: count.toString(),
          variant: 'body2',
        };
        items.push({
          type: 'DataListItem',
          label,
          value,
        });
      }
    }

    if (items.length > 0) {
      contentComponents.push({
        type: 'DataList',
        childrenProps: items,
      } as IAutoView.IAutoViewDataListProps);
    }
  }

  // Assemble card content
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: contentComponents,
  };

  // Optionally show last edited timestamp in footer
  const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (input.last_edited_at) {
    footerChildren.push({
      type: 'Text',
      content: `Edited on ${new Date(input.last_edited_at).toLocaleString()}`,
      variant: 'caption',
      color: '#666',
    } as IAutoView.IAutoViewTextProps);
  }

  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: 'CardFooter',
    childrenProps: footerChildren.length > 0 ? footerChildren : undefined,
  };

  // Compose the vertical card: header, body, footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: 'VerticalCard',
    childrenProps: [header, cardContent, cardFooter].filter(
      (c): c is IAutoView.IAutoViewCardHeaderProps | IAutoView.IAutoViewCardContentProps | IAutoView.IAutoViewCardFooterProps => !!c
    ),
  };

  return card;
}
