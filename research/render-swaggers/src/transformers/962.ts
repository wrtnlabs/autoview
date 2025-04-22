import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Org Membership
     *
     * @title Org Membership
    */
    export type org_membership = {
        url: string & tags.Format<"uri">;
        /**
         * The state of the member in the organization. The `pending` state indicates the user has not yet accepted an invitation.
        */
        state: "active" | "pending";
        /**
         * The user's membership type in the organization.
        */
        role: "admin" | "member" | "billing_manager";
        organization_url: string & tags.Format<"uri">;
        organization: Schema.organization_simple;
        user: Schema.nullable_simple_user;
        permissions?: {
            can_create_repository: boolean;
        };
    };
    /**
     * A GitHub organization.
     *
     * @title Organization Simple
    */
    export type organization_simple = {
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string & tags.Format<"uri">;
        hooks_url: string;
        issues_url: string;
        members_url: string;
        public_members_url: string;
        avatar_url: string;
        description: string | null;
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
type IAutoViewTransformerInputType = Schema.org_membership;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure relevant fields from membership record
  const { organization, state, role, permissions, user } = input;

  // Map role to a color scale for visual distinction
  const roleColorMap: Record<string, IAutoView.IAutoViewChipProps['color']> = {
    admin: 'error',
    member: 'info',
    billing_manager: 'warning',
  };
  const chipRoleColor = roleColorMap[role] ?? 'gray';

  // 1) CardHeader: shows organization avatar, name, and role badge
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: organization.login,
    // show description in header if available
    description: organization.description ?? undefined,
    startElement: {
      type: 'Avatar',
      src: organization.avatar_url,
      name: organization.login,
      size: 40,
      variant: 'gray',
    },
    endElement: {
      type: 'Chip',
      label: role,
      color: chipRoleColor,
      variant: 'filled',
    },
  };

  // 2) CardContent: primary action to view the organization on GitHub
  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: {
      type: 'Button',
      label: 'View on GitHub',
      href: organization.url,
      variant: 'outlined',
      color: 'primary',
    },
  };

  // 3) Build a DataList of detailed properties (status, role, permissions, user)
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Membership status
  listItems.push({
    type: 'DataListItem',
    label: {
      type: 'Text',
      content: 'Status',
      variant: 'caption',
      color: 'gray',
    },
    value: {
      type: 'Chip',
      label: state,
      color: state === 'active' ? 'success' : 'warning',
      variant: 'outlined',
    },
  });

  // Role (repeated for detail view)
  listItems.push({
    type: 'DataListItem',
    label: {
      type: 'Text',
      content: 'Role',
      variant: 'caption',
      color: 'gray',
    },
    value: {
      type: 'Chip',
      label: role,
      color: chipRoleColor,
      variant: 'filled',
    },
  });

  // Permission: can_create_repository
  if (permissions && typeof permissions.can_create_repository === 'boolean') {
    listItems.push({
      type: 'DataListItem',
      label: {
        type: 'Text',
        content: 'Can Create Repo',
        variant: 'caption',
        color: 'gray',
      },
      value: {
        type: 'Icon',
        id: permissions.can_create_repository ? 'check' : 'times',
        color: permissions.can_create_repository ? 'green' : 'red',
        size: 16,
      },
    });
  }

  // User info, if available
  if (user) {
    listItems.push({
      type: 'DataListItem',
      label: {
        type: 'Text',
        content: 'User',
        variant: 'caption',
        color: 'gray',
      },
      value: {
        type: 'Chip',
        label: user.login,
        color: 'primary',
        variant: 'outlined',
        startElement: {
          type: 'Avatar',
          src: user.avatar_url,
          name: user.name ?? user.login,
          size: 24,
          variant: 'gray',
        },
      },
    });
  }

  // Wrap the items in a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: 'DataList',
    childrenProps: listItems,
  };

  // 4) CardFooter: holds the detailed DataList
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: 'CardFooter',
    childrenProps: dataList,
  };

  // 5) Assemble the VerticalCard with header, action, and details
  return {
    type: 'VerticalCard',
    childrenProps: [header, content, footer],
  };
}
