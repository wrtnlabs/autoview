import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Request to install an integration on a target
     *
     * @title Integration Installation Request
    */
    export type integration_installation_request = {
        /**
         * Unique identifier of the request installation.
        */
        id: number & tags.Type<"int32">;
        node_id?: string;
        account: any | any;
        requester: Schema.simple_user;
        created_at: string & tags.Format<"date-time">;
    };
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
    export type enterprise = any;
}
type IAutoViewTransformerInputType = Schema.integration_installation_request[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no data, display a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No integration installation requests found."
    };
  }

  // Transform each installation request into a ListItem
  const items: IAutoView.IAutoViewListItemProps[] = input.map(request => {
    const { id, requester, created_at } = request;

    // Attempt to format the created_at timestamp for readability
    const date = new Date(created_at);
    const formattedDate = isNaN(date.valueOf())
      ? created_at // fallback to raw string if invalid date
      : date.toLocaleString();

    // Render the requester's avatar
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: requester.avatar_url,
      name: requester.login,
      size: 32,
      variant: "gray"
    };

    // Add a small chip showing the request id
    const idChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `#${id}`,
      color: "info",
      size: "small",
      variant: "outlined"
    };

    // Provide a button to view the requester's GitHub profile
    const profileButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: "Profile",
      href: requester.html_url,
      variant: "text",
      color: "primary",
      startElement: {
        type: "Icon",
        id: "external-link-alt",
        size: 16,
        color: "blue"
      }
    };

    return {
      type: "ListItem",
      title: requester.login,
      description: `Installed at ${formattedDate}`,
      startElement: avatar,
      // Display both the ID chip and the profile button at the end
      endElement: [idChip, profileButton]
    };
  });

  // Wrap all items in a responsive list
  const list: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: items
  };

  return list;
}
