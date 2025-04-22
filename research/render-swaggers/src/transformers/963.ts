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



// Transforms a GitHub org membership into a visual card layout
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Build list items to describe the membership
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1) User: show avatar + login or N/A
  if (input.user) {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "User" },
      value: [
        {
          type: "Avatar",
          src: input.user.avatar_url,
          name: input.user.login,
          size: 32
        },
        {
          type: "Text",
          content: input.user.login
        }
      ]
    });
  } else {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "User" },
      value: { type: "Text", content: "N/A" }
    });
  }

  // 2) Role: map to colored chip for quick recognition
  const roleColor =
    input.role === "admin"
      ? "primary"
      : input.role === "member"
      ? "info"
      : "secondary";
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Role" },
    value: { type: "Chip", label: input.role, color: roleColor }
  });

  // 3) State: active → green, pending → yellow
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Status" },
    value: {
      type: "Chip",
      label: input.state,
      color: input.state === "active" ? "success" : "warning"
    }
  });

  // 4) Membership URL: clickable link via markdown
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Membership URL" },
    value: {
      type: "Markdown",
      content: `[View Membership](${input.url})`
    }
  });

  // 5) Permissions: show icon indicating create‐repo capability
  if (input.permissions && typeof input.permissions.can_create_repository === "boolean") {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Can Create Repo" },
      value: {
        type: "Icon",
        id: input.permissions.can_create_repository
          ? "check-circle"
          : "times-circle",
        color: input.permissions.can_create_repository ? "green" : "red",
        size: 16
      }
    });
  }

  // Wrap the items into a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items
  };

  // Header for the organization: logo + name + description
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.organization.login,
    description: input.organization.description ?? undefined,
    startElement: {
      type: "Avatar",
      src: input.organization.avatar_url,
      name: input.organization.login,
      size: 40
    }
  };

  // Main content: our data list
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Footer: action button to open the organization page
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      label: "View Org",
      href: input.organization_url,
      variant: "outlined",
      color: "primary"
    }
  };

  // Combine into a responsive vertical card
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer]
  };
}
