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
type IAutoViewTransformerInputType = Schema.project_card;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Compose the card header with avatar, title, note and archived state indicator
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // Title with identifier
    title: `Card #${input.id}`,
    // Use note as a subtitle if present
    description: input.note ?? undefined,
    // Show the creator's avatar if available
    startElement: input.creator
      ? {
          type: "Avatar",
          src: input.creator.avatar_url,
          name: input.creator.login,
          variant: "primary",
          size: 32,
        }
      : undefined,
    // If archived, show a red chip
    endElement: input.archived
      ? {
          type: "Chip",
          label: "Archived",
          color: "error",
          size: "small",
          variant: "filled",
        }
      : undefined,
  };

  // Build a list of metadata items: column, project, dates
  const metadataItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: { type: "Text", content: "Column", variant: "caption" },
      value: {
        type: "Text",
        content: input.column_name ?? "—",
        variant: "body2",
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Project URL", variant: "caption" },
      // Link rendered as a button-like chip for clarity
      value: {
        type: "Chip",
        label: "Open",
        color: "primary",
        variant: "outlined",
        size: "small",
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Created", variant: "caption" },
      value: {
        type: "Text",
        // Format date to locale string
        content: new Date(input.created_at).toLocaleString(),
        variant: "body2",
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Updated", variant: "caption" },
      value: {
        type: "Text",
        content: new Date(input.updated_at).toLocaleString(),
        variant: "body2",
      },
    },
  ];

  // If content_url exists, add it to metadata as a button
  if (input.content_url) {
    metadataItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Content", variant: "caption" },
      value: {
        type: "Chip",
        label: "View",
        color: "secondary",
        variant: "outlined",
        size: "small",
      },
    });
  }

  // Card content: use a data list to present metadata cleanly
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: metadataItems,
    },
  };

  // Card footer: action buttons for navigating to URLs
  const footerButtons: IAutoView.IAutoViewButtonProps[] = [
    {
      type: "Button",
      label: "View Card",
      variant: "contained",
      color: "primary",
      href: input.url,
      size: "medium",
    },
    {
      type: "Button",
      label: "Open Project",
      variant: "outlined",
      color: "primary",
      href: input.project_url,
      size: "medium",
    },
  ];
  // Add content button if exists
  if (input.content_url) {
    footerButtons.push({
      type: "Button",
      label: "View Content",
      variant: "outlined",
      color: "secondary",
      href: input.content_url,
      size: "medium",
    });
  }

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerButtons,
  };

  // Assemble as a vertical card for mobile-friendly responsiveness
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}
