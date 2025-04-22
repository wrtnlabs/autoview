import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Delivery made by a webhook, without request and response information.
     *
     * @title Simple webhook delivery
    */
    export type hook_delivery_item = {
        /**
         * Unique identifier of the webhook delivery.
        */
        id: number & tags.Type<"int32">;
        /**
         * Unique identifier for the event (shared with all deliveries for all webhooks that subscribe to this event).
        */
        guid: string;
        /**
         * Time when the webhook delivery occurred.
        */
        delivered_at: string;
        /**
         * Whether the webhook delivery is a redelivery.
        */
        redelivery: boolean;
        /**
         * Time spent delivering.
        */
        duration: number;
        /**
         * Describes the response returned after attempting the delivery.
        */
        status: string;
        /**
         * Status code received when delivery was made.
        */
        status_code: number & tags.Type<"int32">;
        /**
         * The event that triggered the delivery.
        */
        event: string;
        /**
         * The type of activity for the event that triggered the delivery.
        */
        action: string | null;
        /**
         * The id of the GitHub App installation associated with this event.
        */
        installation_id: (number & tags.Type<"int32">) | null;
        /**
         * The id of the repository associated with this event.
        */
        repository_id: (number & tags.Type<"int32">) | null;
        /**
         * Time when the webhook delivery was throttled.
        */
        throttled_at?: (string & tags.Format<"date-time">) | null;
    };
}
type IAutoViewTransformerInputType = Schema.hook_delivery_item[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // If there are no deliveries, show a friendly markdown message
  if (input.length === 0) {
    return {
      type: "Markdown",
      content: "**No deliveries available.**",
    };
  }

  // Helper to derive color based on HTTP status code
  function getStatusColor(code: number): IAutoView.IAutoViewChipProps["color"] {
    if (code >= 200 && code < 300) return "success";
    if (code >= 300 && code < 400) return "warning";
    return "error";
  }

  // Sort deliveries by delivered_at in descending order (newest first)
  const sorted = [...input].sort((a, b) => {
    const ta = Date.parse(a.delivered_at) || 0;
    const tb = Date.parse(b.delivered_at) || 0;
    return tb - ta;
  });

  // Transform each delivery into a DataListItemProps
  const items: IAutoView.IAutoViewDataListItemProps[] = sorted.map((item) => {
    // Primary icon + timestamp display
    const timestampLabel: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Icon",
        id: "clock",
        size: 16,
        color: "gray",
      },
      {
        type: "Text",
        variant: "body2",
        color: "tertiary",
        content: ` ${new Date(item.delivered_at).toLocaleString()}`,
      },
    ];

    // Status chip with color mapping
    const statusChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: item.status,
      color: getStatusColor(item.status_code),
      variant: "filled",
      size: "small",
    };

    // Status code text
    const statusCodeText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      variant: "caption",
      color: "tertiary",
      content: `Code: ${item.status_code}`,
    };

    // Redelivery indicator if applicable
    const extraChips: IAutoView.IAutoViewChipProps[] = [];
    if (item.redelivery) {
      extraChips.push({
        type: "Chip",
        label: "Redelivery",
        color: "warning",
        variant: "outlined",
        size: "small",
      });
    }

    // Assemble the "value" side of the data list item
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      statusChip,
      statusCodeText,
      ...extraChips,
    ];

    // Build the DataListItemProps
    return {
      type: "DataListItem",
      label: timestampLabel,
      value: valueComponents,
    };
  });

  // Return the top-level DataList component with all items
  return {
    type: "DataList",
    childrenProps: items,
  };
}
