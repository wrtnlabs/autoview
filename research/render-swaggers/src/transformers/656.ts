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



// Transforms an array of GitHub simple_user objects into a DataList UI component.
// Each list item shows the user's avatar, login name, a "Profile" link, and (if present) an "Email" link.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Handle empty or null input gracefully.
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "No users available to display.",
    };
  }

  // Map each user to a DataListItemProps object.
  const childrenProps: IAutoView.IAutoViewDataListItemProps[] = input.map((user) => {
    // Avatar shown at the beginning of the row.
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: user.avatar_url,
      name: user.login,
      size: 40,
      variant: "gray",
    };

    // Text component for the GitHub login.
    const loginText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: user.login,
      variant: "body1",
      color: "primary",
    };

    // Button linking to the user's GitHub profile.
    const profileButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      variant: "text",
      label: "Profile",
      href: user.html_url,
      startElement: {
        type: "Icon",
        id: "external-link-alt", // FontAwesome icon name in kebab-case
        size: 16,
        color: "blue",
      },
    };

    // If the user has an email, add an email button.
    const emailButton = user.email
      ? ({
          type: "Button",
          variant: "text",
          label: "Email",
          href: `mailto:${user.email}`,
          startElement: {
            type: "Icon",
            id: "envelope",
            size: 16,
            color: "green",
          },
        } as IAutoView.IAutoViewButtonProps)
      : undefined;

    // Assemble the right-hand side components for this row.
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = emailButton
      ? [profileButton, emailButton]
      : [profileButton];

    return {
      type: "DataListItem",
      // Render avatar and login name side by side.
      label: [avatar, loginText],
      // Render action buttons (profile/email).
      value: valueComponents,
    };
  });

  // Return the DataList with all user items.
  return {
    type: "DataList",
    childrenProps,
  };
}
