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



// Transforms a list of GitHub simple_user objects into an AutoView data list UI
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If no users, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No users found.",
    };
  }

  // Build a DataListItem for each user
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map(user => {
    // Create the base avatar component
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: user.avatar_url,
      name: user.name ?? user.login,
      variant: "gray",
      size: 40,
    };

    // If the user is a site admin, wrap avatar in a red badge (dot)
    const avatarDisplay: IAutoView.IAutoViewComponentProps = user.site_admin
      ? {
          type: "Badge",
          dot: true,
          color: "error",
          childrenProps: avatar,
        }
      : avatar;

    // Label: avatar (or badge), username, and optional email
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      avatarDisplay as IAutoView.IAutoViewPresentationComponentProps,
      {
        type: "Text",
        variant: "body1",
        content: user.login,
      },
    ];
    if (user.email) {
      labelComponents.push({
        type: "Text",
        variant: "caption",
        content: user.email,
      });
    }

    // Value: a button linking to the user's GitHub profile
    const profileButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: "View",
      variant: "outlined",
      color: "primary",
      size: "small",
      startElement: {
        type: "Icon",
        id: "arrow-right",
        size: 16,
      },
      href: user.html_url,
    };

    return {
      type: "DataListItem",
      label: labelComponents,
      value: profileButton,
    };
  });

  // Return the assembled data list
  return {
    type: "DataList",
    childrenProps: items,
  };
}
