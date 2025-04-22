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
  // If there are no users, show a simple markdown message
  if (!Array.isArray(input) || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No GitHub users found.",
    };
  }

  // Map each GitHub user to a ListItem component
  const childrenProps: IAutoView.IAutoViewListItemProps[] = input.map((user) => {
    // Prefer real name if available, otherwise fall back to login
    const subtitle = user.name ?? "";

    return {
      type: "ListItem",
      title: user.login,
      description: subtitle,
      href: user.html_url, // Clicking the item will navigate to the GitHub profile
      startElement: {
        // Display the user's avatar for quick visual identification
        type: "Avatar",
        src: user.avatar_url,
        name: user.login,
        variant: "gray",
        size: 40,
      },
      endElement: {
        // A small arrow icon indicating this is a link
        type: "Icon",
        id: "arrow-right",
        color: "gray",
        size: 16,
      },
    };
  });

  // Return a responsive List of users; ListItems will wrap nicely on narrow viewports
  return {
    type: "List",
    childrenProps,
  };
}
