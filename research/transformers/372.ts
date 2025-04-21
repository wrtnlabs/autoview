import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A GitHub organization.
     *
     * @title Organization Simple
    */
    export type organization_simple = {
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string & tags.Format<"uri">;
        hooks_url: string;
        issues_url: string;
        members_url: string;
        public_members_url: string;
        avatar_url: string;
        description: string | null;
    };
}
type IAutoViewTransformerInputType = Schema.organization_simple[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no organizations, display a friendly message
  if (input.length === 0) {
    return {
      type: "Text",
      content: "No organizations found.",
      variant: "body1",
      color: "gray",
    };
  }

  // Map each organization to a ListItem component
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((org) => {
    // Avatar for the organization, using its avatar_url
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: org.avatar_url,
      name: org.login,
      size: 40, // midsize avatar for clarity
    };

    // Button that links to the organization's repositories
    const repoButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: "View Repos",
      variant: "outlined",
      size: "small",
      href: org.repos_url,
    };

    // Build the ListItem; clicking the item itself will navigate to the organization's main URL
    const item: IAutoView.IAutoViewListItemProps = {
      type: "ListItem",
      title: org.login,
      // Only show description if provided, otherwise omit for cleaner UI
      description: org.description ?? undefined,
      startElement: avatar,
      endElement: repoButton,
      href: org.url,
    };

    return item;
  });

  // Return a responsive list of organizations
  return {
    type: "List",
    childrenProps: listItems,
  };
}
