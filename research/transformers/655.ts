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
  // Prepare a sticky subheader showing total users count
  const subheader: IAutoView.IAutoViewListSubheaderProps = {
    type: "ListSubheader",
    stickToTop: true,
    childrenProps: {
      type: "Text",
      // Display count of users
      content: `GitHub Users (${input.length})`,
      variant: "subtitle1",
    },
  };

  // Map each GitHub user to a list item
  const items: IAutoView.IAutoViewListItemProps[] = input.map((user) => {
    // Avatar showing user's GitHub avatar
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: user.avatar_url,
      name: user.login,
      size: 40,
    };

    // Action buttons: view profile and (optionally) send email
    const actions: IAutoView.IAutoViewButtonProps[] = [
      {
        type: "Button",
        variant: "text",
        // Use FontAwesome's GitHub icon
        startElement: { type: "Icon", id: "github", size: 16 },
        label: "Profile",
        href: user.html_url,
      },
    ];
    if (user.email) {
      actions.push({
        type: "Button",
        variant: "text",
        startElement: { type: "Icon", id: "envelope", size: 16 },
        label: "Email",
        href: `mailto:${user.email}`,
      });
    }

    // Build the list item
    const listItem: IAutoView.IAutoViewListItemProps = {
      type: "ListItem",
      title: user.login,
      // Show email if available, otherwise the profile URL
      description: user.email ?? user.html_url,
      startElement: avatar,
      endElement: actions,
      // Make the entire item clickable to the profile if no other action is pressed
      href: user.html_url,
    };

    return listItem;
  });

  // Compose the List component for responsive display
  const list: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: [subheader, ...items],
  };

  return list;
}
