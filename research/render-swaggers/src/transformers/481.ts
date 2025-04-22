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
  // Map membership state and role to chip colors for visual distinction.
  const stateColorMap: Record<string, IAutoView.IAutoViewChipProps['color']> = {
    active: 'success',
    pending: 'warning',
  };
  const roleColorMap: Record<string, IAutoView.IAutoViewChipProps['color']> = {
    admin: 'error',
    member: 'primary',
    billing_manager: 'info',
  };

  // Build a list of DataListItem components to display structured data.
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1. Membership state
  items.push({
    type: 'DataListItem',
    label: {
      type: 'Text',
      content: 'Status',
      variant: 'body2',
    },
    value: {
      type: 'Chip',
      label: input.state,
      color: stateColorMap[input.state] ?? 'gray',
      variant: 'filled',
      size: 'medium',
    },
  });

  // 2. Membership role
  items.push({
    type: 'DataListItem',
    label: {
      type: 'Text',
      content: 'Role',
      variant: 'body2',
    },
    value: {
      type: 'Chip',
      label: input.role,
      color: roleColorMap[input.role] ?? 'gray',
      variant: 'filled',
      size: 'medium',
    },
  });

  // 3. Permissions (if available)
  if (input.permissions && typeof input.permissions.can_create_repository === 'boolean') {
    items.push({
      type: 'DataListItem',
      label: {
        type: 'Text',
        content: 'Can Create Repos',
        variant: 'body2',
      },
      value: {
        type: 'Icon',
        id: input.permissions.can_create_repository ? 'check-circle' : 'times-circle',
        color: input.permissions.can_create_repository ? 'green' : 'red',
        size: 16,
      },
    });
  }

  // 4. User information (avatar + login) or fallback text
  items.push({
    type: 'DataListItem',
    label: {
      type: 'Text',
      content: 'User',
      variant: 'body2',
    },
    value: input.user
      ? [
          {
            type: 'Avatar',
            src: input.user.avatar_url,
            name: input.user.login,
            size: 24,
          },
          {
            type: 'Text',
            content: input.user.login,
            variant: 'body2',
            color: 'primary',
          },
        ]
      : {
          type: 'Text',
          content: 'No User',
          variant: 'body2',
          color: 'gray',
        },
  });

  // 5. Link to the raw membership resource
  if (input.url) {
    items.push({
      type: 'DataListItem',
      label: {
        type: 'Text',
        content: 'Details',
        variant: 'body2',
      },
      value: {
        type: 'Markdown',
        content: `[View Membership](${input.url})`,
      },
    });
  }

  // Compose a vertical card: header with organization info, content with the data list.
  return {
    type: 'VerticalCard',
    childrenProps: [
      {
        type: 'CardHeader',
        title: input.organization.login,
        description: input.organization.description ?? '',
        startElement: {
          type: 'Avatar',
          src: input.organization.avatar_url,
          name: input.organization.login,
          size: 40,
        },
      },
      {
        type: 'CardContent',
        childrenProps: {
          type: 'DataList',
          childrenProps: items,
        },
      },
    ],
  };
}
