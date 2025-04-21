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
  // Build header: show project name, description (body), creator avatar, and project state as a chip
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    // If body is empty or null, omit description
    description: input.body ?? "",
    startElement: {
      type: "Avatar",
      src: input.creator.avatar_url,
      name: input.creator.login,
      size: 40,
    },
    endElement: {
      type: "Chip",
      label: input.state,
      color: input.state.toLowerCase() === "open" ? "success" : "error",
      variant: "filled",
      size: "small",
    },
  };

  // Build a list of project metadata
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "ID",
        variant: "subtitle2",
      },
      value: {
        type: "Text",
        content: input.id.toString(),
        variant: "body1",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Number",
        variant: "subtitle2",
      },
      value: {
        type: "Text",
        content: input.number.toString(),
        variant: "body1",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Creator",
        variant: "subtitle2",
      },
      // Show the creator avatar as the value
      value: {
        type: "Avatar",
        src: input.creator.avatar_url,
        name: input.creator.login,
        size: 32,
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Created At",
        variant: "subtitle2",
      },
      value: {
        type: "Text",
        content: new Date(input.created_at).toLocaleString(),
        variant: "body1",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Updated At",
        variant: "subtitle2",
      },
      value: {
        type: "Text",
        content: new Date(input.updated_at).toLocaleString(),
        variant: "body1",
      },
    },
    // Show public/private status only if the field is present
    ...(typeof input["private"] === "boolean"
      ? [
          {
            type: "DataListItem",
            label: {
              type: "Text",
              content: "Private",
              variant: "subtitle2",
            },
            value: {
              type: "Chip",
              label: input["private"] ? "Yes" : "No",
              color: input["private"] ? "error" : "success",
              variant: "filled",
              size: "small",
            },
          } as IAutoView.IAutoViewDataListItemProps,
        ]
      : []),
    // Permissions group
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Permissions",
        variant: "subtitle2",
      },
      value: {
        type: "ChipGroup",
        childrenProps: [
          {
            type: "Chip",
            label: "Read",
            color: input.permissions.read ? "success" : "gray",
            variant: "outlined",
            size: "small",
          },
          {
            type: "Chip",
            label: "Write",
            color: input.permissions.write ? "success" : "gray",
            variant: "outlined",
            size: "small",
          },
          {
            type: "Chip",
            label: "Admin",
            color: input.permissions.admin ? "success" : "gray",
            variant: "outlined",
            size: "small",
          },
        ],
        maxItems: 3,
      },
    },
  ];

  // Build the main content: a data list of metadata
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: listItems,
    },
  };

  // Build footer: action buttons linking to GitHub and project columns
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      {
        type: "Button",
        label: "View on GitHub",
        href: input.html_url,
        variant: "outlined",
        size: "medium",
        startElement: {
          type: "Icon",
          id: "github",
          size: 16,
          color: "gray",
        },
      },
      {
        type: "Button",
        label: "View Columns",
        href: input.columns_url,
        variant: "outlined",
        size: "medium",
        startElement: {
          type: "Icon",
          id: "columns",
          size: 16,
          color: "gray",
        },
      },
    ],
  };

  // Compose everything in a vertical card for a responsive layout
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}
