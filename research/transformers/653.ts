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
  // If there are no users, render a simple markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "**No users found**",
    };
  }

  // Map each GitHub user to a ListItem with avatar, title, description, and a link button
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((user) => {
    // Use the user's name or email as description fallbacks
    const descriptionText = user.name ?? user.email ?? "";

    // Avatar component for startElement
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: user.avatar_url,
      name: user.login,
      size: 40,
      variant: "gray",
    };

    // A text button linking to the user's GitHub profile
    const profileButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      variant: "text",
      color: "primary",
      size: "small",
      label: ["View"],
      href: user.html_url,
    };

    return {
      type: "ListItem",
      // Display avatar at the start
      startElement: avatar,
      // Main title is the login
      title: user.login,
      // Show name or email (if available) as description
      description: descriptionText,
      // Link button at the end
      endElement: profileButton,
    };
  });

  // Compose the final list component
  const list: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: listItems,
  };

  return list;
}
