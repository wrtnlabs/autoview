import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.simple_user[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no data, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No users to display"
    };
  }

  // Map each GitHub user to a DataListItem with avatar, name, and action buttons
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map(user => {
    // Fallback to login if name is missing
    const displayName = user.name ?? user.login;

    // Avatar on the left
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: user.avatar_url,
      name: displayName,
      size: 40,
      variant: "gray"
    };

    // Username text
    const nameText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      variant: "body1",
      content: displayName
    };

    // Button to open the GitHub profile
    const profileButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      variant: "text",
      color: "primary",
      size: "small",
      href: user.html_url,
      label: "Profile",
      startElement: {
        type: "Icon",
        id: "github",
        size: 16,
        color: "gray"
      }
    };

    // Button to open the repositories list
    const reposButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      variant: "text",
      color: "primary",
      size: "small",
      href: user.repos_url,
      label: "Repos",
      startElement: {
        type: "Icon",
        id: "book",
        size: 16,
        color: "gray"
      }
    };

    // Button to open the followers list
    const followersButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      variant: "text",
      color: "primary",
      size: "small",
      href: user.followers_url,
      label: "Followers",
      startElement: {
        type: "Icon",
        id: "user-group",
        size: 16,
        color: "gray"
      }
    };

    return {
      type: "DataListItem",
      // Label contains avatar + username
      label: [avatar, nameText],
      // Value contains action buttons
      value: [profileButton, reposButton, followersButton]
    };
  });

  // Wrap all items in a DataList for responsive, scrollable rendering
  return {
    type: "DataList",
    childrenProps: items
  };
}
