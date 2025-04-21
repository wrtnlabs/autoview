import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The status of a commit.
     *
     * @title Status
    */
    export type status = {
        url: string;
        avatar_url: string | null;
        id: number & tags.Type<"int32">;
        node_id: string;
        state: string;
        description: string | null;
        target_url: string | null;
        context: string;
        created_at: string;
        updated_at: string;
        creator: Schema.nullable_simple_user;
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
}
type IAutoViewTransformerInputType = Schema.status;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: capitalize the first letter
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // 1. Create a colored Chip to represent the state
  const stateLabel = capitalize(input.state);
  let stateColor: IAutoView.IAutoViewChipProps['color'] = 'secondary';
  switch (input.state.toLowerCase()) {
    case 'success':
      stateColor = 'green';
      break;
    case 'failure':
    case 'error':
      stateColor = 'error';
      break;
    case 'pending':
      stateColor = 'yellow';
      break;
    default:
      stateColor = 'secondary';
  }
  const stateChip: IAutoView.IAutoViewChipProps = {
    type: 'Chip',
    label: stateLabel,
    color: stateColor,
    variant: 'filled',
    size: 'small',
  };

  // 2. Prepare an avatar of the creator if available
  const creatorAvatar = input.creator
    ? ({
        type: 'Avatar',
        src: input.creator.avatar_url,
        name: input.creator.login,
        variant: 'secondary',
        size: 32,
      } as IAutoView.IAutoViewAvatarProps)
    : undefined;

  // 3. Helper to produce a Text component
  const makeText = (
    content: string,
    variant: IAutoView.IAutoViewTextProps['variant'] = 'body2',
  ): IAutoView.IAutoViewTextProps => ({
    type: 'Text',
    content,
    variant,
  });

  // 4. Build a DataList of details: creator, timestamps, and target URL
  const details: IAutoView.IAutoViewDataListItemProps[] = [];

  if (input.creator) {
    details.push({
      type: 'DataListItem',
      label: makeText('Creator', 'subtitle2'),
      value: creatorAvatar as IAutoView.IAutoViewPresentationComponentProps,
    });
  }

  details.push({
    type: 'DataListItem',
    label: makeText('Created At', 'subtitle2'),
    value: makeText(new Date(input.created_at).toLocaleString()),
  });

  details.push({
    type: 'DataListItem',
    label: makeText('Updated At', 'subtitle2'),
    value: makeText(new Date(input.updated_at).toLocaleString()),
  });

  if (input.target_url) {
    details.push({
      type: 'DataListItem',
      label: makeText('Target URL', 'subtitle2'),
      value: {
        type: 'Button',
        label: 'View',
        href: input.target_url,
        variant: 'outlined',
        size: 'small',
      } as IAutoView.IAutoViewButtonProps,
    });
  }

  const dataList: IAutoView.IAutoViewDataListProps = {
    type: 'DataList',
    childrenProps: details,
  };

  // 5. Compose CardHeader with state chip, context, optional description, and avatar
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    startElement: stateChip,
    title: input.context,
    description: input.description ?? undefined,
    endElement: creatorAvatar,
  };

  // 6. Wrap the DataList inside CardContent
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: dataList,
  };

  // 7. Footer: link back to the GitHub status page
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: 'CardFooter',
    childrenProps: {
      type: 'Button',
      label: 'Open on GitHub',
      href: input.url,
      variant: 'text',
      startElement: {
        type: 'Icon',
        id: 'github',
        size: 16,
      } as IAutoView.IAutoViewIconProps,
      size: 'small',
    } as IAutoView.IAutoViewButtonProps,
  };

  // 8. Return a VerticalCard that stacks header, content, and footer
  return {
    type: 'VerticalCard',
    childrenProps: [cardHeader, cardContent, cardFooter],
  } as IAutoView.IAutoViewVerticalCardProps;
}
