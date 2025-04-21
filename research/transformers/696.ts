import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Collaborator
     *
     * @title Collaborator
    */
    export type collaborator = {
        login: string;
        id: number & tags.Type<"int32">;
        email?: string | null;
        name?: string | null;
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
        permissions?: {
            pull: boolean;
            triage?: boolean;
            push: boolean;
            maintain?: boolean;
            admin: boolean;
        };
        role_name: string;
        user_view_type?: string;
    };
}
type IAutoViewTransformerInputType = Schema.collaborator[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If no collaborators, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "**No collaborators found**",
    };
  }

  // Map each collaborator to a ListItemProps for a responsive, mobile‑friendly list
  const items: IAutoView.IAutoViewListItemProps[] = input.map((collaborator) => {
    // Prepare a human‑readable title: use the real name if available, otherwise the login
    const title = collaborator.name
      ? `${collaborator.name} (${collaborator.login})`
      : collaborator.login;

    // Use the avatar_url for a visual cue
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: collaborator.avatar_url,
      name: collaborator.login,
      variant: "primary",
      size: 40,
    };

    // A small button linking to the GitHub profile, with an arrow icon
    const viewButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      variant: "text",
      color: "info",
      size: "small",
      href: collaborator.html_url,
      startElement: {
        type: "Icon",
        id: "arrow-right",
        color: "cyan",
        size: 16,
      },
      label: ["View"],
    };

    // Assemble the list item
    return {
      type: "ListItem",
      title,
      // Show email if available
      description: collaborator.email ?? undefined,
      startElement: avatar,
      // Put the "View" button at the end; ListItem endElement can be an array
      endElement: [viewButton],
    };
  });

  // Return the List component with all items
  return {
    type: "List",
    childrenProps: items,
  };
}
