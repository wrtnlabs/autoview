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
  // When there's no data, show a friendly markdown message
  if (!Array.isArray(input) || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No users found\n\nThere are no GitHub users in the input data."
    };
  }

  // Map each GitHub user to a ListItem with avatar, name/login, and a Profile button
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map(user => {
    // Compose the secondary text: show the real name if available, otherwise show email if present
    const descriptionParts: string[] = [];
    if (user.name) {
      descriptionParts.push(`Name: ${user.name}`);
    } else if (user.email) {
      // mailto link in markdown will render clickable in Markdown component; here it's plain text
      descriptionParts.push(`Email: ${user.email}`);
    }

    return {
      type: "ListItem",
      // Primary label is the GitHub login
      title: user.login,
      // Concatenate the description parts into one line
      description: descriptionParts.join(" • "),
      // Show avatar on the left for quick recognition
      startElement: {
        type: "Avatar",
        src: user.avatar_url,
        name: user.login,
        size: 40
      },
      // Provide a direct link to the user's GitHub profile
      endElement: {
        type: "Button",
        label: "View Profile",
        variant: "text",
        size: "small",
        href: user.html_url
      },
      // Make the entire list item clickable as well
      href: user.html_url
    };
  });

  // Wrap all items in a responsive List component
  return {
    type: "List",
    childrenProps: listItems
  };
}
