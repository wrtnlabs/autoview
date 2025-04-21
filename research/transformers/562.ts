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
  // Helper: format ISO date-time into local date string
  const formatDate = (iso?: string): string =>
    iso ? new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';

  // Build avatar or fallback icon for the creator
  const creatorAvatar: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = input.creator
    ? {
        type: "Avatar",
        src: input.creator.avatar_url,
        name: input.creator.login,
        size: 40,
      }
    : {
        type: "Icon",
        id: "user",
        size: 40,
        color: "gray",
      };

  // Build an 'Archived' chip if the card is archived
  const archivedChip: IAutoView.IAutoViewChipProps | undefined = input.archived
    ? {
        type: "Chip",
        label: "Archived",
        color: "error",
        size: "small",
        variant: "outlined",
      }
    : undefined;

  // Prepare markdown for notes and additional details
  const noteContent = input.note && input.note.trim() !== ""
    ? input.note.trim()
    : "_No notes provided_";
  const detailLines: string[] = [];

  if (input.column_name) {
    detailLines.push(`- **Column:** ${input.column_name}`);
  }
  if (input.project_id) {
    detailLines.push(`- **Project ID:** ${input.project_id}`);
  }
  if (input.content_url) {
    detailLines.push(`- **Content URL:** [Open](${input.content_url})`);
  }
  // Always show last updated
  detailLines.push(`- **Created:** ${formatDate(input.created_at)}`);
  detailLines.push(`- **Updated:** ${formatDate(input.updated_at)}`);

  const markdown: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content:
      `### Notes\n` +
      `${noteContent}\n\n` +
      `### Details\n` +
      detailLines.join("\n"),
  };

  // Build action buttons in the footer
  const buttons: IAutoView.IAutoViewButtonProps[] = [
    {
      type: "Button",
      label: "View Card",
      href: input.url,
      variant: "outlined",
      color: "primary",
      startElement: { type: "Icon", id: "link", size: 16, color: "blue" },
    },
    {
      type: "Button",
      label: "View Project",
      href: input.project_url,
      variant: "outlined",
      color: "primary",
      startElement: { type: "Icon", id: "folder-open", size: 16, color: "blue" },
    },
  ];
  if (input.content_url) {
    buttons.push({
      type: "Button",
      label: "Open Content",
      href: input.content_url,
      variant: "text",
      color: "secondary",
      startElement: { type: "Icon", id: "file", size: 16, color: "gray" },
    });
  }

  // Compose the CardHeader
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Card #${input.id}`,
    description: formatDate(input.created_at),
    startElement: creatorAvatar,
    // show archived status at the end, if applicable
    ...(archivedChip ? { endElement: archivedChip } : {}),
  };

  // Compose the CardContent with markdown
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: markdown,
  };

  // Compose the CardFooter with action buttons
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: buttons,
  };

  // Return a vertical card aggregating header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}
