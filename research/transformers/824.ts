import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Projects are a way to organize columns and cards of work.
     *
     * @title Project
    */
    export type project = {
        owner_url: string & tags.Format<"uri">;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        columns_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * Name of the project
        */
        name: string;
        /**
         * Body of the project
        */
        body: string | null;
        number: number & tags.Type<"int32">;
        /**
         * State of the project; either 'open' or 'closed'
        */
        state: string;
        creator: Schema.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The baseline permission that all organization members have on this project. Only present if owner is an organization.
        */
        organization_permission?: "read" | "write" | "admin" | "none";
        /**
         * Whether or not this project can be seen by everyone. Only present if owner is an organization.
        */
        "private"?: boolean;
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
type IAutoViewTransformerInputType = Schema.project;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Utility function to format ISO dates into a human‐readable string.
function formatDate(iso: string): string {
  const d = new Date(iso);
  // e.g., "Jan 1, 2023"
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map GitHub project state to a colored chip
  const stateColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    open: "success",
    closed: "error",
  };
  const chipColor = stateColorMap[input.state] ?? "gray";

  // Build a small avatar or fallback icon for the project creator
  const creatorAvatar: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = input.creator
    ? {
        type: "Avatar",
        src: input.creator.avatar_url,
        name: input.creator.login,
        variant: "primary",
        size: 40,
      }
    : {
        type: "Icon",
        id: "user-circle",
        color: "gray",
        size: 40,
      };

  // Build a data list of metadata: created/updated timestamps
  const metaList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        label: [
          { type: "Icon", id: "clock", color: "gray", size: 16 },
          { type: "Text", content: "Created" },
        ],
        value: { type: "Text", content: formatDate(input.created_at) },
      },
      {
        type: "DataListItem",
        label: [
          { type: "Icon", id: "edit", color: "gray", size: 16 },
          { type: "Text", content: "Updated" },
        ],
        value: { type: "Text", content: formatDate(input.updated_at) },
      },
    ],
  };

  // Optionally show the project description/body as markdown if provided
  const markdownSection: IAutoView.IAutoViewMarkdownProps | null = input.body
    ? {
        type: "Markdown",
        content: input.body,
      }
    : null;

  // Footer buttons: view project page & view columns
  const footerButtons: IAutoView.IAutoViewButtonProps[] = [
    {
      type: "Button",
      variant: "contained",
      color: "primary",
      label: "View Project",
      href: input.html_url,
      startElement: { type: "Icon", id: "external-link-alt", size: 16 },
    },
    {
      type: "Button",
      variant: "outlined",
      color: "primary",
      label: "Columns",
      href: input.columns_url,
      startElement: { type: "Icon", id: "columns", size: 16 },
    },
  ];

  return {
    // Use a vertical card to group project details cleanly
    type: "VerticalCard",
    childrenProps: [
      {
        // Header: show project title, number, creator icon/avatar, and state chip
        type: "CardHeader",
        title: input.name,
        description: `#${input.number}`,
        startElement: creatorAvatar,
        endElement: {
          type: "Chip",
          label: input.state,
          color: chipColor,
          size: "small",
          variant: "filled",
        },
      },
      {
        // Content: markdown description (if any) + metadata list
        type: "CardContent",
        childrenProps: [
          // Insert markdown section first if present
          ...(markdownSection ? [markdownSection] : []),
          // Always show metadata after
          metaList,
        ],
      },
      {
        // Footer: quick action buttons
        type: "CardFooter",
        childrenProps: footerButtons,
      },
    ],
  };
}
