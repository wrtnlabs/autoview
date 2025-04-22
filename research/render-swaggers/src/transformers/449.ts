import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Organization Invitation
     *
     * @title Organization Invitation
    */
    export type organization_invitation = {
        id: number & tags.Type<"int32">;
        login: string | null;
        email: string | null;
        role: string;
        created_at: string;
        failed_at?: string | null;
        failed_reason?: string | null;
        inviter: Schema.simple_user;
        team_count: number & tags.Type<"int32">;
        node_id: string;
        invitation_teams_url: string;
        invitation_source?: string;
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
}
type IAutoViewTransformerInputType = Schema.organization_invitation[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to map invitation roles to chip colors
  const getRoleColor = (role: string): IAutoView.IAutoViewChipProps['color'] => {
    switch (role.toLowerCase()) {
      case 'admin':
      case 'owner':
        return 'error';
      case 'member':
      case 'contributor':
        return 'primary';
      default:
        return 'info';
    }
  };

  // Transform each invitation into a DataListItem component
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map(inv => {
    // Build label: inviter avatar and login
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: 'Avatar',
        src: inv.inviter.avatar_url,
        name: inv.inviter.login,
        size: 32,
      } as IAutoView.IAutoViewAvatarProps,
      {
        type: 'Text',
        content: inv.inviter.login,
        variant: 'body1',
      } as IAutoView.IAutoViewTextProps,
    ];

    // Build value: role chip, email link (if any), team count, created date, and failure indicator (if any)
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

    // Role as a small filled chip
    valueComponents.push({
      type: 'Chip',
      label: inv.role,
      variant: 'filled',
      size: 'small',
      color: getRoleColor(inv.role),
    } as IAutoView.IAutoViewChipProps);

    // Email link via markdown for clickability
    if (inv.email) {
      // Markdown will render [email](mailto:email)
      valueComponents.push({
        type: 'Markdown',
        content: `[${inv.email}](mailto:${inv.email})`,
      } as IAutoView.IAutoViewMarkdownProps);
    }

    // Team count with users icon
    valueComponents.push(
      {
        type: 'Icon',
        id: 'users',
        color: 'gray',
        size: 16,
      } as IAutoView.IAutoViewIconProps,
      {
        type: 'Text',
        content: `${inv.team_count}`,
        variant: 'caption',
        color: 'gray',
      } as IAutoView.IAutoViewTextProps,
    );

    // Created date (formatted for locale)
    valueComponents.push({
      type: 'Text',
      content: new Date(inv.created_at).toLocaleDateString(),
      variant: 'caption',
      color: 'tertiary',
    } as IAutoView.IAutoViewTextProps);

    // If invitation failed, show an icon with tooltip explaining the reason
    if (inv.failed_reason) {
      valueComponents.push({
        type: 'Tooltip',
        message: inv.failed_reason,
        childrenProps: {
          type: 'Icon',
          id: 'exclamation-triangle',
          color: 'red',
          size: 16,
        },
      } as IAutoView.IAutoViewTooltipProps);
    }

    return {
      type: 'DataListItem',
      label: labelComponents,
      value: valueComponents,
    };
  });

  // Wrap all items in a DataList for responsive display
  return {
    type: 'DataList',
    childrenProps: items,
  } as IAutoView.IAutoViewDataListProps;
}
