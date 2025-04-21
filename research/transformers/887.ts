import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Repository invitations let you manage who you collaborate with.
     *
     * @title Repository Invitation
    */
    export type repository_subscription = {
        /**
         * Determines if notifications should be received from this repository.
        */
        subscribed: boolean;
        /**
         * Determines if all notifications should be blocked from this repository.
        */
        ignored: boolean;
        reason: string | null;
        created_at: string & tags.Format<"date-time">;
        url: string & tags.Format<"uri">;
        repository_url: string & tags.Format<"uri">;
    };
}
type IAutoViewTransformerInputType = Schema.repository_subscription;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the "owner/repo" portion from the repository URL for a concise title.
  const trimmedUrl = input.repository_url.replace(/\/+$/, "");
  const segments = trimmedUrl.split("/").filter((seg) => seg.length > 0);
  const ownerRepo =
    segments.length >= 2
      ? `${segments[segments.length - 2]}/${segments[segments.length - 1]}`
      : input.repository_url;

  // Format the creation date into a human‑readable string.
  const createdAtDisplay = new Date(input.created_at).toLocaleString();

  // Compose chips for subscription and ignore status.
  const subscriptionChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.subscribed ? "Subscribed" : "Unsubscribed",
    color: input.subscribed ? "success" : "error",
    variant: "filled",
  };

  const ignoreChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.ignored ? "Ignored" : "Not Ignored",
    color: input.ignored ? "warning" : "secondary",
    variant: "filled",
  };

  // Prepare text components for reason and creation date.
  const reasonText: IAutoView.IAutoViewTextProps = {
    type: "Text",
    content: input.reason ?? "None",
  };

  const dateText: IAutoView.IAutoViewTextProps = {
    type: "Text",
    content: createdAtDisplay,
  };

  // Build a data list of the key fields with icons and values.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: [
        { type: "Icon", id: "bell", color: input.subscribed ? "green" : "gray", size: 20 },
        { type: "Text", content: " Notifications" },
      ],
      value: subscriptionChip,
    },
    {
      type: "DataListItem",
      label: [
        { type: "Icon", id: "bell-slash", color: input.ignored ? "orange" : "gray", size: 20 },
        { type: "Text", content: " Ignore" },
      ],
      value: ignoreChip,
    },
    {
      type: "DataListItem",
      label: [
        { type: "Icon", id: "info-circle", color: "blue", size: 20 },
        { type: "Text", content: " Reason" },
      ],
      value: reasonText,
    },
    {
      type: "DataListItem",
      label: [
        { type: "Icon", id: "clock", color: "cyan", size: 20 },
        { type: "Text", content: " Created At" },
      ],
      value: dateText,
    },
    {
      type: "DataListItem",
      label: [
        { type: "Icon", id: "link", color: "teal", size: 20 },
        { type: "Text", content: " Repository" },
      ],
      value: {
        type: "Button",
        variant: "text",
        size: "small",
        startElement: { type: "Icon", id: "external-link-alt", color: "blue", size: 16 },
        label: "View",
        href: input.repository_url,
      },
    },
  ];

  // Assemble the final vertical card UI.
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Header with a GitHub icon, concise title, and subtitle.
        type: "CardHeader",
        startElement: { type: "Icon", id: "github", color: "gray", size: 24 },
        title: ownerRepo,
        description: "Subscription Details",
      },
      {
        // Main content: a data list presenting all fields.
        type: "CardContent",
        childrenProps: [
          {
            type: "DataList",
            childrenProps: dataListItems,
          },
        ],
      },
      {
        // Footer with an action button to manage the subscription.
        type: "CardFooter",
        childrenProps: {
          type: "Button",
          variant: "outlined",
          color: "primary",
          size: "medium",
          startElement: { type: "Icon", id: "cog", color: "gray", size: 16 },
          label: "Manage Subscription",
          href: input.url,
        },
      },
    ],
  };
}
