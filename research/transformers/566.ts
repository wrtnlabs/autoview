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



// Transforms an array of GitHub users into a responsive AutoView List component
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Edge case: if no users, display a friendly markdown message
  if (input.length === 0) {
    return {
      type: "Markdown",
      content: "### No users found\nPlease try a different query."
    };
  }

  // Map each GitHub user to a ListItem with avatar, login, and a link button
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map(user => {
    // Fallback to login if the name is null or empty
    const descriptionText = user.name && user.name.trim().length > 0
      ? user.name
      : user.login;

    return {
      type: "ListItem",
      title: user.login,
      description: descriptionText,
      // Show the user's avatar
      startElement: {
        type: "Avatar",
        src: user.avatar_url,
        name: user.login,
        size: 40
      },
      // Provide a button linking to the user's GitHub page
      endElement: {
        type: "Button",
        label: "View",
        variant: "text",
        href: user.html_url,
        startElement: {
          type: "Icon",
          id: "arrow-right",
          size: 16,
          color: "blue"
        }
      }
    };
  });

  // Wrap all items in a List component for responsive rendering
  return {
    type: "List",
    childrenProps: listItems
  };
}
