import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Project cards represent a scope of work.
     *
     * @title Project Card
    */
    export type project_card = {
        url: string & tags.Format<"uri">;
        /**
         * The project card's ID
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        note: string | null;
        creator: Schema.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * Whether or not the card is archived
        */
        archived?: boolean;
        column_name?: string;
        project_id?: string;
        column_url: string & tags.Format<"uri">;
        content_url?: string & tags.Format<"uri">;
        project_url: string & tags.Format<"uri">;
    };
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
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
    } | null;
}
type IAutoViewTransformerInputType = Schema.project_card[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: convert ISO date-time to a friendly locale string
  function formatDate(iso: string): string {
    const date = new Date(iso);
    if (isNaN(date.getTime())) {
      return iso; // fallback to raw value if parsing fails
    }
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  // Transform each project_card into a ListItemProps for a responsive list view
  const items: IAutoView.IAutoViewListItemProps[] = input.map((card) => {
    const creator = card.creator;
    const login = creator?.login ?? 'Unknown';
    const created = formatDate(card.created_at);

    // Title uses the card's note if present, otherwise a fallback label
    const title = card.note ?? `Project Card #${card.id}`;

    // Description shows who created and when
    const description = `Created by ${login} on ${created}`;

    // Show an avatar if we have one, otherwise a placeholder icon
    const startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps =
      creator?.avatar_url
        ? {
            type: 'Avatar',
            src: creator.avatar_url,
            name: login,
            size: 40,
          }
        : {
            type: 'Icon',
            id: 'user',
            color: 'gray',
            size: 24,
          };

    // Button linking to the card's detail (content_url if available, else project_url)
    const endElement: IAutoView.IAutoViewButtonProps = {
      type: 'Button',
      label: 'View',
      variant: 'text',
      size: 'small',
      href: card.content_url ?? card.project_url,
    };

    return {
      type: 'ListItem',
      title,
      description,
      startElement,
      endElement,
    };
  });

  // Wrap all items in a List component for a mobile‐friendly, scrollable view
  return {
    type: 'List',
    childrenProps: items,
  };
}
