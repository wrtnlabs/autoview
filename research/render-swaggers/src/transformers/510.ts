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



// Transforms an array of GitHub users into an AutoView list with avatars and links.
// Shows a markdown message if there are no users.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Handle the empty‐array case with a friendly markdown message
  if (!Array.isArray(input) || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No users to display."
    };
  }

  // Map each user to a ListItem with an avatar, title, description, and link icon
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map(user => {
    // Prefer the full name; if missing, fall back to the login
    const title = user.name?.trim() || user.login;
    // Show email if available; otherwise use the profile URL
    const description = user.email?.trim() || user.html_url;

    // Avatar component rendering the user's GitHub avatar
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: user.avatar_url,
      name: user.login,
      variant: "primary",
      size: 40
    };

    // Simple right-arrow icon to indicate navigation
    const chevron: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "arrow-right",
      size: 16,
      color: "gray"
    };

    return {
      type: "ListItem",
      title,
      description,
      startElement: avatar,
      // Make the entire row clickable
      href: user.html_url,
      endElement: chevron
    };
  });

  // Wrap all items in a responsive List
  return {
    type: "List",
    childrenProps: listItems
  };
}
