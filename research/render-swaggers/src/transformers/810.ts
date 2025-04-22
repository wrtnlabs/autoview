import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A collection of related issues and pull requests.
     *
     * @title Milestone
    */
    export type milestone = {
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        labels_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The number of the milestone.
        */
        number: number & tags.Type<"int32">;
        /**
         * The state of the milestone.
        */
        state: "open" | "closed";
        /**
         * The title of the milestone.
        */
        title: string;
        description: string | null;
        creator: Schema.nullable_simple_user;
        open_issues: number & tags.Type<"int32">;
        closed_issues: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        closed_at: (string & tags.Format<"date-time">) | null;
        due_on: (string & tags.Format<"date-time">) | null;
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
type IAutoViewTransformerInputType = Schema.milestone;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure input milestone fields for clarity
  const {
    title,
    description,
    number,
    state,
    open_issues,
    closed_issues,
    created_at,
    updated_at,
    due_on,
    html_url,
    labels_url,
    creator,
  } = input;

  // Helper: map milestone state to a Chip color
  const stateColor: IAutoView.IAutoViewChipProps["color"] =
    state === "closed" ? "success" : "info";

  // Helper: format ISO timestamps into locale strings (or null)
  const formatDate = (iso?: string | null): string | null =>
    iso ? new Date(iso).toLocaleString() : null;

  const createdAt = formatDate(created_at);
  const updatedAt = formatDate(updated_at);
  const dueDate = formatDate(due_on);

  // Build a list of DataListItem components to show milestone metadata
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1) Milestone number and title
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: `Milestone #${number}` },
    value: { type: "Text", content: title },
  });

  // 2) Created At
  if (createdAt) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Created At" },
      value: { type: "Text", content: createdAt },
    });
  }

  // 3) Updated At
  if (updatedAt) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Updated At" },
      value: { type: "Text", content: updatedAt },
    });
  }

  // 4) Due On
  if (dueDate) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Due On" },
      value: { type: "Text", content: dueDate },
    });
  }

  // 5) Open Issues count with an icon badge
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Open Issues" },
    value: {
      type: "Badge",
      count: open_issues,
      maxCount: 999,
      childrenProps: { type: "Icon", id: "exclamation-circle" },
    },
  });

  // 6) Closed Issues count with an icon badge
  dataListItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Closed Issues" },
    value: {
      type: "Badge",
      count: closed_issues,
      maxCount: 999,
      childrenProps: { type: "Icon", id: "check-circle" },
    },
  });

  // Compose the card header
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title,
    // only include description if present
    ...(description != null && { description }),
    // show the creator avatar or a fallback icon
    startElement: creator
      ? {
          type: "Avatar",
          src: creator.avatar_url,
          name: creator.login,
          size: 40,
        }
      : {
          type: "Icon",
          id: "user-circle",
          size: 40,
        },
    // show milestone state as a colored chip
    endElement: {
      type: "Chip",
      label: state.toUpperCase(),
      color: stateColor,
      variant: "filled",
    },
  };

  // Wrap the DataList in CardContent
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: dataListItems,
    },
  };

  // Action buttons in the card footer
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      {
        type: "Button",
        label: "View on GitHub",
        variant: "outlined",
        color: "primary",
        href: html_url,
        startElement: { type: "Icon", id: "github", size: 20 },
      },
      {
        type: "Button",
        label: "View Labels",
        variant: "outlined",
        color: "primary",
        href: labels_url,
        startElement: { type: "Icon", id: "tag", size: 20 },
      },
    ],
  };

  // Assemble the final VerticalCard
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
