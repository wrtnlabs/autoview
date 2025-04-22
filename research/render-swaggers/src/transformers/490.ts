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
  // If there are no users, show a friendly message
  if (!Array.isArray(input) || input.length === 0) {
    return {
      type: "Text",
      variant: "body1",
      content: "No users to display.",
    };
  }

  // Map each GitHub user to a ListItem component
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((user) => {
    // Use the user's name or email as a description, fallback to empty string
    const description = user.name ?? user.email ?? "";

    // Avatar component for the user's avatar URL
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: user.avatar_url,
      name: user.login,
      size: 40,
    };

    return {
      type: "ListItem",
      title: user.login,
      description: description,
      startElement: avatar,
    };
  });

  // Compose the List component containing all users
  const userList: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: listItems,
  };

  return userList;
}
