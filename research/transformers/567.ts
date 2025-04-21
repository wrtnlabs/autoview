import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Project Collaborator Permission
     *
     * @title Project Collaborator Permission
    */
    export type project_collaborator_permission = {
        permission: string;
        user: Schema.nullable_simple_user;
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
type IAutoViewTransformerInputType = Schema.project_collaborator_permission;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms a project_collaborator_permission into a visual component
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If the user object is null, render a markdown warning.
  if (!input.user) {
    return {
      type: "Markdown",
      content: "**No collaborator data available**\n\nUser information is missing."
    };
  }

  const user = input.user;

  // Avatar for the collaborator
  const avatar: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    src: user.avatar_url,
    name: user.name || user.login,
    size: 40,
    variant: "gray"
  };

  // Chip to indicate permission level
  const permissionChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.permission,
    variant: "filled",
    color: "primary",
    size: "small"
  };

  // Button linking to the user's GitHub profile
  const profileButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    variant: "text",
    color: "secondary",
    size: "small",
    href: user.html_url,
    startElement: {
      type: "Icon",
      id: "github",
      size: 16,
      color: "gray"
    },
    label: "View Profile"
  };

  // Assemble additional details into a data list
  const detailItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "Login", variant: "body2" }],
      value: [{ type: "Text", content: user.login, variant: "body2" }]
    },
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "Email", variant: "body2" }],
      value: [{ type: "Text", content: user.email ?? "N/A", variant: "body2" }]
    },
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "User ID", variant: "body2" }],
      value: [{ type: "Text", content: String(user.id), variant: "body2" }]
    }
  ];

  // Compose a vertical card with header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Header: avatar + name + permission chip
        type: "CardHeader",
        title: user.name || user.login,
        description: `Collaborator`,
        startElement: avatar,
        endElement: permissionChip
      },
      {
        // Content: detailed data list
        type: "CardContent",
        childrenProps: {
          type: "DataList",
          childrenProps: detailItems
        }
      },
      {
        // Footer: action button
        type: "CardFooter",
        childrenProps: profileButton
      }
    ]
  };
}
