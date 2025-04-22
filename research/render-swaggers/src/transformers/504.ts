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
  // 1. Prepare the card header with project name, description, creator avatar, and state chip
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: input.body ?? "",
    startElement: input.creator
      ? {
          type: "Avatar",
          src: input.creator.avatar_url,
          name: input.creator.login,
          variant: "primary",
          size: 40
        }
      : undefined,
    endElement: {
      type: "Chip",
      label: input.state,
      color: input.state === "open" ? "success" : "error",
      variant: "filled",
      size: "small"
    }
  };

  // 2. Build a series of DataListItem components to display key fields
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Utility to push a text-based list item
  const pushTextItem = (label: string, value: string) => {
    listItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: label, variant: "subtitle2" }],
      value: { type: "Text", content: value, variant: "body2" }
    });
  };

  pushTextItem("ID", String(input.id));
  pushTextItem("Number", String(input.number));
  pushTextItem("Created At", new Date(input.created_at).toLocaleString());
  pushTextItem("Updated At", new Date(input.updated_at).toLocaleString());

  if (input.creator) {
    // Show creator as an avatar
    listItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Creator", variant: "subtitle2" }],
      value: {
        type: "Avatar",
        src: input.creator.avatar_url,
        name: input.creator.login,
        size: 32,
        variant: "primary"
      }
    });
  }

  // Link to the GitHub project page
  listItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: "Project Page", variant: "subtitle2" }],
    value: {
      type: "Button",
      label: "View",
      href: input.html_url,
      variant: "outlined",
      color: "primary",
      startElement: { type: "Icon", id: "arrow-right", color: "blue", size: 16 }
    }
  });

  // Link to the project's columns
  listItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: "Columns", variant: "subtitle2" }],
    value: {
      type: "Button",
      label: "Go",
      href: input.columns_url,
      variant: "text",
      color: "secondary",
      startElement: { type: "Icon", id: "columns", color: "cyan", size: 16 }
    }
  });

  // API endpoint for the project owner
  listItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: "Owner API", variant: "subtitle2" }],
    value: {
      type: "Button",
      label: "API",
      href: input.owner_url,
      variant: "text",
      color: "teal",
      startElement: { type: "Icon", id: "link", color: "teal", size: 16 }
    }
  });

  // Organization permission badge
  if (input.organization_permission) {
    listItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Org Permission", variant: "subtitle2" }],
      value: {
        type: "Chip",
        label: input.organization_permission,
        color: "info",
        variant: "outlined",
        size: "small"
      }
    });
  }

  // Private flag indicator
  if (input["private"] !== undefined) {
    listItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Private", variant: "subtitle2" }],
      value: {
        type: "Chip",
        label: input["private"] ? "Yes" : "No",
        color: input["private"] ? "error" : "success",
        variant: "filled",
        size: "small"
      }
    });
  }

  // 3. Wrap all items into a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems
  };

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // 4. Footer with a primary action to open the project in GitHub
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      {
        type: "Button",
        label: "Open in GitHub",
        href: input.html_url,
        variant: "contained",
        color: "primary",
        startElement: { type: "Icon", id: "github", color: "gray", size: 20 }
      }
    ]
  };

  // 5. Return a vertical card combining header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer]
  };
}
