import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A team's access to a project.
     *
     * @title Team Project
    */
    export type team_project = {
        owner_url: string;
        url: string;
        html_url: string;
        columns_url: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        name: string;
        body: string | null;
        number: number & tags.Type<"int32">;
        state: string;
        creator: Schema.simple_user;
        created_at: string;
        updated_at: string;
        /**
         * The organization permission for this project. Only present when owner is an organization.
        */
        organization_permission?: string;
        /**
         * Whether the project is private or not. Only present when owner is an organization.
        */
        "private"?: boolean;
        permissions: {
            read: boolean;
            write: boolean;
            admin: boolean;
        };
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
}
type IAutoViewTransformerInputType = Schema.team_project;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure input fields for clarity
  const {
    name,
    number,
    state,
    created_at,
    updated_at,
    body,
    html_url,
    columns_url,
    organization_permission,
    private: isPrivate,
    permissions,
    creator,
  } = input;

  // --- 1. Card Header ---
  // Displays project name, number, state, creation date and user avatar
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: name,
    description: [
      `#${number}`,
      state.charAt(0).toUpperCase() + state.slice(1),
      new Date(created_at).toLocaleDateString(),
    ].join(" • "),
    startElement: {
      type: "Avatar",
      src: creator.avatar_url,
      name: creator.login,
      size: 40,
      variant: "primary",
    },
  };

  // --- 2. Build DataList Items for metadata ---
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Project URL
  listItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: ["Project URL"] }],
    value: {
      type: "Button",
      variant: "text",
      color: "primary",
      href: html_url,
      startElement: { type: "Icon", id: "external-link-alt", color: "blue", size: 16 },
      label: ["Visit"],
    },
  });

  // Columns URL
  listItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: ["Columns"] }],
    value: {
      type: "Button",
      variant: "text",
      color: "primary",
      href: columns_url,
      startElement: { type: "Icon", id: "columns", color: "blue", size: 16 },
      label: ["Open"],
    },
  });

  // Visibility
  listItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: ["Visibility"] }],
    value: {
      type: "Chip",
      label: isPrivate ? "Private" : "Public",
      color: isPrivate ? "error" : "success",
      size: "small",
      variant: "filled",
    },
  });

  // Organization permission (optional field)
  if (organization_permission) {
    listItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: ["Org Permission"] }],
      value: {
        type: "Text",
        content: [organization_permission],
      },
    });
  }

  // Permissions flags as a group of chips
  listItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: ["Permissions"] }],
    value: {
      type: "ChipGroup",
      childrenProps: [
        {
          type: "Chip",
          label: "Read",
          color: permissions.read ? "success" : "gray",
          size: "small",
          variant: "filled",
        },
        {
          type: "Chip",
          label: "Write",
          color: permissions.write ? "success" : "gray",
          size: "small",
          variant: "filled",
        },
        {
          type: "Chip",
          label: "Admin",
          color: permissions.admin ? "success" : "gray",
          size: "small",
          variant: "filled",
        },
      ],
    },
  });

  // Last updated timestamp
  listItems.push({
    type: "DataListItem",
    label: [{ type: "Text", content: ["Last Updated"] }],
    value: {
      type: "Text",
      content: [new Date(updated_at).toLocaleString()],
    },
  });

  // --- 3. Card Content ---
  // Optionally render project body as markdown, then the metadata list
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (body) {
    contentChildren.push({
      type: "Markdown",
      content: body,
    });
  }
  contentChildren.push({
    type: "DataList",
    childrenProps: listItems,
  });

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // --- 4. Card Footer ---
  // Primary actions: open project or its columns
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      {
        type: "Button",
        variant: "contained",
        color: "primary",
        label: ["Open Project"],
        href: html_url,
      },
      {
        type: "Button",
        variant: "outlined",
        color: "primary",
        label: ["Open Columns"],
        href: columns_url,
      },
    ],
  };

  // --- 5. Compose into a VerticalCard ---
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}
