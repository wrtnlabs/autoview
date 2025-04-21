import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Webhooks for repositories.
     *
     * @title Webhook
    */
    export type hook = {
        type: string;
        /**
         * Unique identifier of the webhook.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of a valid service, use 'web' for a webhook.
        */
        name: string;
        /**
         * Determines whether the hook is actually triggered on pushes.
        */
        active: boolean;
        /**
         * Determines what events the hook is triggered for. Default: ['push'].
        */
        events: string[];
        config: Schema.webhook_config;
        updated_at: string & tags.Format<"date-time">;
        created_at: string & tags.Format<"date-time">;
        url: string & tags.Format<"uri">;
        test_url: string & tags.Format<"uri">;
        ping_url: string & tags.Format<"uri">;
        deliveries_url?: string & tags.Format<"uri">;
        last_response: Schema.hook_response;
    };
    /**
     * Configuration object of the webhook
     *
     * @title Webhook Configuration
    */
    export type webhook_config = {
        url?: Schema.webhook_config_url;
        content_type?: Schema.webhook_config_content_type;
        secret?: Schema.webhook_config_secret;
        insecure_ssl?: Schema.webhook_config_insecure_ssl;
    };
    /**
     * The URL to which the payloads will be delivered.
    */
    export type webhook_config_url = string;
    /**
     * The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`.
    */
    export type webhook_config_content_type = string;
    /**
     * If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for [delivery signature headers](https://docs.github.com/webhooks/event-payloads/#delivery-headers).
    */
    export type webhook_config_secret = string;
    export type webhook_config_insecure_ssl = string | number;
    /**
     * @title Hook Response
    */
    export type hook_response = {
        code: (number & tags.Type<"int32">) | null;
        status: string | null;
        message: string | null;
    };
}
type IAutoViewTransformerInputType = Schema.hook;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure input fields for easier reference
  const {
    id,
    name,
    active,
    events,
    config,
    created_at,
    updated_at,
    url,
    test_url,
    ping_url,
    deliveries_url,
    last_response,
  } = input;

  // Helper to create a simple text component
  const makeText = (text: string): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content: text,
  });

  // Header icon representing a webhook (using RSS icon)
  const headerIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: "rss",
    color: active ? "green" : "gray",
    size: 24,
  };

  // Status chip showing active/inactive
  const statusChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: active ? "Active" : "Inactive",
    color: active ? "green" : "gray",
    variant: "filled",
  };

  // Build event chips for each event type
  const eventChips: IAutoView.IAutoViewChipProps[] = events.map((evt) => ({
    type: "Chip",
    label: evt,
    color: "info",
    size: "small",
    variant: "outlined",
  }));

  // Build configuration items as data-list entries, skipping undefined values.
  const configItems: IAutoView.IAutoViewDataListItemProps[] = [];
  if (config.url !== undefined) {
    configItems.push({
      type: "DataListItem",
      label: makeText("Config URL"),
      value: makeText(config.url),
    });
  }
  if (config.content_type !== undefined) {
    configItems.push({
      type: "DataListItem",
      label: makeText("Content Type"),
      value: makeText(config.content_type),
    });
  }
  if (config.secret !== undefined) {
    // Mask secret for security
    const masked = config.secret.replace(/./g, "•");
    configItems.push({
      type: "DataListItem",
      label: makeText("Secret"),
      value: makeText(masked),
    });
  }
  if (config.insecure_ssl !== undefined) {
    configItems.push({
      type: "DataListItem",
      label: makeText("Insecure SSL"),
      value: makeText(String(config.insecure_ssl)),
    });
  }

  // Build endpoints markdown list: primary, test, ping, and optional deliveries
  const endpointsMdLines = [`- [Primary URL](${url})`, `- [Test URL](${test_url})`, `- [Ping URL](${ping_url})`];
  if (deliveries_url) {
    endpointsMdLines.push(`- [Deliveries URL](${deliveries_url})`);
  }
  const endpointsMd: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: endpointsMdLines.join("\n"),
  };

  // Last response info
  const responseText = `**Status**: ${last_response.status ?? "N/A"}  
**Code**: ${last_response.code !== null ? last_response.code : "N/A"}  
**Message**: ${last_response.message ?? "—"}`;

  // Assemble data list items
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: makeText("Webhook ID"),
      value: makeText(`#${id}`),
    },
    {
      type: "DataListItem",
      label: makeText("Events"),
      // Use a chip group for events
      value: {
        type: "ChipGroup",
        childrenProps: eventChips,
      },
    },
    {
      type: "DataListItem",
      label: makeText("Endpoints"),
      value: endpointsMd,
    },
    {
      type: "DataListItem",
      label: makeText("Created At"),
      value: makeText(new Date(created_at).toLocaleString()),
    },
    {
      type: "DataListItem",
      label: makeText("Updated At"),
      value: makeText(new Date(updated_at).toLocaleString()),
    },
    // Spread the configuration items, if any
    ...configItems,
    {
      type: "DataListItem",
      label: makeText("Last Response"),
      value: {
        type: "Markdown",
        content: responseText,
      },
    },
  ];

  // Card header with icon and status chip
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: name,
    description: `Hook Type: ${input.type}`,
    startElement: headerIcon,
    endElement: statusChip,
  };

  // Card content wrapping the data list
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: dataListItems,
    },
  };

  // Return a vertical card containing header and content
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };
}
