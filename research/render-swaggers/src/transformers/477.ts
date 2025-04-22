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
  // Build a responsive list of users with avatar, basic info, and a link button.
  const items: IAutoView.IAutoViewListItemProps[] = input.map(user => {
    // Fallback to login if no display name is provided.
    const title = user.name ?? user.login;

    // Compose description with email (if any) and user ID for quick glance.
    const descriptionParts: string[] = [];
    if (user.email) {
      descriptionParts.push(user.email);
    }
    descriptionParts.push(`ID: ${user.id}`);

    return {
      type: "ListItem",
      title,
      description: descriptionParts.join(" • "),
      // Show user's avatar as a visual start element.
      startElement: {
        type: "Avatar",
        src: user.avatar_url,
        name: user.login,
        size: 32,
        // Use a consistent color theme.
        variant: "blue",
      },
      // Provide a button linking to the user's GitHub profile.
      endElement: {
        type: "Button",
        label: "View",
        href: user.html_url,
        variant: "outlined",
        color: "primary",
        size: "small",
        startElement: {
          type: "Icon",
          id: "arrow-right",
          size: 16,
          color: "blue",
        },
      },
    };
  });

  // Wrap items in a List component for a clean, mobile-friendly UI.
  return {
    type: "List",
    childrenProps: items,
  };
}
