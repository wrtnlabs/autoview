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



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // If there are no users, show a friendly markdown message
  if (input.length === 0) {
    return {
      type: "Markdown",
      content: "### No users found\n\nThere are currently no users to display."
    };
  }

  // Transform each GitHub user into a DataListItem
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((user) => {
    // Compose the label as an array of presentation components:
    // - Avatar with the user's avatar URL
    // - Primary text for the login
    // - Secondary text for the full name or email if available
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Avatar",
        src: user.avatar_url,
        name: user.login,
        size: 40
      },
      {
        type: "Text",
        variant: "subtitle1",
        content: user.login
      }
    ];
    if (user.name) {
      labelComponents.push({
        type: "Text",
        variant: "caption",
        content: user.name,
        color: "gray"
      });
    } else if (user.email) {
      labelComponents.push({
        type: "Text",
        variant: "caption",
        content: user.email,
        color: "gray"
      });
    }

    // Create a button that links to the user's GitHub profile
    const profileButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      variant: "text",
      color: "primary",
      size: "small",
      startElement: {
        type: "Icon",
        id: "github",
        size: 16,
        color: "blue"
      },
      label: "Profile",
      href: user.html_url
    };

    return {
      type: "DataListItem",
      label: labelComponents,
      value: profileButton
    };
  });

  // Return a DataList containing all user items
  return {
    type: "DataList",
    childrenProps: items
  };
}
