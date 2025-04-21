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



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Prepare the card header, showing project name, number, state, and creator avatar or default icon.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `#${input.number} · ${input.state}`,
    startElement: input.creator
      ? {
          type: "Avatar",
          // Use the creator's GitHub avatar
          src: input.creator.avatar_url,
          name: input.creator.login,
          variant: "primary",
          size: 40,
        }
      : {
          // Fallback icon if no creator
          type: "Icon",
          id: "folder-open",
          color: "gray",
          size: 40,
        },
  };

  // Helper to format ISO datetime strings into a more readable form
  function formatDateTime(dt: string): string {
    try {
      return new Date(dt).toLocaleString();
    } catch {
      return dt;
    }
  }

  // Build a list of key/value details about the project
  const details: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      // Left side label
      label: { type: "Text", content: "ID", variant: "subtitle2" },
      // Right side value
      value: { type: "Text", content: input.id.toString(), variant: "body2" },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "State", variant: "subtitle2" },
      // Color-code the state with a Chip
      value: {
        type: "Chip",
        label: input.state,
        color: input.state === "open" ? "success" : "error",
        variant: "filled",
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Created At", variant: "subtitle2" },
      value: { type: "Text", content: formatDateTime(input.created_at), variant: "body2" },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Updated At", variant: "subtitle2" },
      value: { type: "Text", content: formatDateTime(input.updated_at), variant: "body2" },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Project URL", variant: "subtitle2" },
      // Provide a link button to the project HTML URL
      value: {
        type: "Button",
        variant: "text",
        label: "View on GitHub",
        href: input.html_url,
        startElement: { type: "Icon", id: "external-link", size: 16, color: "blue" },
      },
    },
  ];

  // If the project has a body, show it as markdown content for richer formatting
  const bodyComponent: IAutoView.IAutoViewMarkdownProps | null =
    input.body !== null && input.body.trim() !== ""
      ? {
          type: "Markdown",
          content: input.body,
        }
      : null;

  // Compose the card content: details list and optional markdown body
  const contentChildren: Array<
    | IAutoView.IAutoViewDataListProps
    | IAutoView.IAutoViewMarkdownProps
  > = [
    {
      type: "DataList",
      childrenProps: details,
    },
  ];
  if (bodyComponent) {
    contentChildren.push(bodyComponent);
  }

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Card footer with a button to the project owner (if available)
  const footerButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    variant: "outlined",
    label: input.creator ? input.creator.login : "Owner Unknown",
    href: input.owner_url,
    startElement: { type: "Icon", id: "user", size: 16, color: "gray" },
  };
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerButton,
  };

  // Wrap everything in a vertical card for a responsive, stacked layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
