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
  // If there's no user data, render a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No users available\n\nThere are currently no GitHub users to display.",
    };
  }

  // Transform each GitHub user into a DataListItemProps
  const listItems: IAutoView.IAutoViewDataListItemProps[] = input.map((user) => {
    // 1. Avatar for the user
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: user.avatar_url,       // display their avatar image
      name: user.login,           // fallback initials if image fails
      size: 40,                   // moderately sized for list layout
    };

    // 2. Primary text: the user's login
    const loginText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: user.login,
      variant: "body1",
    };

    // 3. Secondary text: the user's real name (if available)
    const nameText: IAutoView.IAutoViewTextProps | undefined = user.name
      ? {
          type: "Text",
          content: user.name,
          variant: "caption",
          color: "gray",
        }
      : undefined;

    // 4. Action button linking to the user's GitHub profile
    const profileButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: "View Profile",
      href: user.html_url,
      variant: "outlined",
      size: "small",
    };

    // Assemble the label region: avatar + texts
    const labelRegion: IAutoView.IAutoViewPresentationComponentProps[] = [
      avatar,
      loginText,
    ];
    if (nameText) {
      labelRegion.push(nameText);
    }

    return {
      type: "DataListItem",
      label: labelRegion,
      value: profileButton,
    };
  });

  // Return a DataList that will render responsively on all screen sizes
  return {
    type: "DataList",
    childrenProps: listItems,
  };
}
