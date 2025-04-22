import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Contributor
     *
     * @title Contributor
    */
    export type contributor = {
        login?: string;
        id?: number & tags.Type<"int32">;
        node_id?: string;
        avatar_url?: string & tags.Format<"uri">;
        gravatar_id?: string | null;
        url?: string & tags.Format<"uri">;
        html_url?: string & tags.Format<"uri">;
        followers_url?: string & tags.Format<"uri">;
        following_url?: string;
        gists_url?: string;
        starred_url?: string;
        subscriptions_url?: string & tags.Format<"uri">;
        organizations_url?: string & tags.Format<"uri">;
        repos_url?: string & tags.Format<"uri">;
        events_url?: string;
        received_events_url?: string & tags.Format<"uri">;
        type: string;
        site_admin?: boolean;
        contributions: number & tags.Type<"int32">;
        email?: string;
        name?: string;
        user_view_type?: string;
    };
}
type IAutoViewTransformerInputType = Schema.contributor[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms an array of contributors into a visual DataList
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no contributors, show an informative markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No contributors found\n\nIt looks like there are no contributors to display at this time."
    };
  }

  // Convert each contributor record into a DataListItemProps
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((contributor) => {
    const {
      login = "Unknown",
      avatar_url,
      html_url,
      contributions = 0
    } = contributor;

    // Avatar with fallback to initials when no URL is provided
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      name: login,
      size: 28,
      variant: "blue",
      src: avatar_url ?? undefined
    };

    // Username label
    const nameText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      variant: "body1",
      content: login
    };

    // Chip showing the number of contributions
    const contributionsChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `${contributions}`,
      variant: "outlined",
      size: "small",
      color: "primary"
    };

    // Optional button linking to the GitHub profile
    const profileButton: IAutoView.IAutoViewButtonProps | null = html_url
      ? {
          type: "Button",
          label: "Profile",
          variant: "text",
          color: "primary",
          size: "small",
          href: html_url,
          startElement: {
            type: "Icon",
            id: "github",
            color: "gray",
            size: 12
          }
        }
      : null;

    // Assemble the right-hand side components: always show contributions, then profile button if available
    const valueComponents: Array<IAutoView.IAutoViewChipProps | IAutoView.IAutoViewButtonProps> = [
      contributionsChip
    ];
    if (profileButton) {
      valueComponents.push(profileButton);
    }

    return {
      type: "DataListItem",
      startElement: avatar,
      // We wrap the username in an array to allow extension with icons or other text
      label: [nameText],
      value: valueComponents
    };
  });

  // Return the DataList container holding all items
  return {
    type: "DataList",
    childrenProps: items
  };
}
