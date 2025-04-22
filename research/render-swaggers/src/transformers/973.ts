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
  // 1. Card Header: show project name, number/state, and creator avatar if available
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `#${input.number} • ${input.state}`,
    // Conditionally include avatar when creator exists
    startElement: input.creator
      ? {
          type: "Avatar",
          src: input.creator.avatar_url,
          name: input.creator.login,
          size: 40,
          variant: "primary",
        }
      : undefined,
  };

  // 2. Card Content: use Markdown to render the project body or a placeholder
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: input.body ?? "*No description provided.*",
    },
  };

  // 3. Format timestamps for footer display
  const createdAt = new Date(input.created_at).toLocaleString();
  const updatedAt = new Date(input.updated_at).toLocaleString();

  // 4. Build a data list of creation and update times
  const dateListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Created",
        variant: "caption",
        color: "gray",
      },
      value: {
        type: "Text",
        content: createdAt,
        variant: "body2",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Updated",
        variant: "caption",
        color: "gray",
      },
      value: {
        type: "Text",
        content: updatedAt,
        variant: "body2",
      },
    },
  ];

  // 5. Card Footer: include the data list and a link button to GitHub
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      {
        type: "DataList",
        childrenProps: dateListItems,
      },
      {
        type: "Button",
        variant: "text",
        size: "small",
        href: input.html_url,
        label: "View on GitHub",
        startElement: {
          type: "Icon",
          id: "external-link-alt",
          size: 16,
          color: "gray",
        },
      },
    ],
  };

  // 6. Assemble the vertical card with header, content, and footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
