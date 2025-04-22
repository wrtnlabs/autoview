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



// Transforms an array of GitHub simple_user objects into an AutoView DataList
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there is no data, present a simple text message
  if (!input || input.length === 0) {
    return {
      type: 'Text',
      content: 'No users to display',
    };
  }

  // Sort users by login for a consistent UI order
  const users = [...input].sort((a, b) =>
    a.login.localeCompare(b.login),
  );

  // Map each user into a DataListItem
  const childrenProps: IAutoView.IAutoViewDataListItemProps[] = users.map(
    (user) => {
      // Avatar for the user
      const avatar: IAutoView.IAutoViewAvatarProps = {
        type: 'Avatar',
        src: user.avatar_url,
        name: user.login,
        size: 32,
        variant: 'blue',
      };

      // Text component for the username
      const loginText: IAutoView.IAutoViewTextProps = {
        type: 'Text',
        variant: 'body1',
        content: user.login,
      };

      // A button linking to the user's GitHub profile
      const profileButton: IAutoView.IAutoViewButtonProps = {
        type: 'Button',
        variant: 'text',
        color: 'primary',
        size: 'small',
        startElement: {
          type: 'Icon',
          id: 'github',
          color: 'gray',
          size: 16,
        },
        label: 'Profile',
        href: user.html_url,
      };

      // Optional email text
      const emailText: IAutoView.IAutoViewTextProps | undefined = user.email
        ? {
            type: 'Text',
            variant: 'body2',
            content: user.email,
          }
        : undefined;

      // Build the value array: always include the profile button, then email if present
      const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
        profileButton,
      ];
      if (emailText) {
        valueComponents.push(emailText);
      }

      return {
        type: 'DataListItem',
        // Label displays avatar next to the login name
        label: [avatar, loginText],
        // Value shows the actionable profile link (and email)
        value: valueComponents,
      };
    },
  );

  // Return a DataList that holds all user items
  return {
    type: 'DataList',
    childrenProps,
  };
}
