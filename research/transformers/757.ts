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
  // Icon indicating active status
  const statusIcon: IAutoView.IAutoViewIconProps = input.active
    ? { type: "Icon", id: "check", color: "green", size: 20 }
    : { type: "Icon", id: "times", color: "red", size: 20 };

  // Chips for each subscribed event
  const eventChips: IAutoView.IAutoViewChipProps[] = input.events.map((evt) => ({
    type: "Chip",
    label: evt,
    size: "small",
    variant: "outlined",
  }));

  // Helper to build a visit-button for URLs
  const makeVisitButton = (url: string): IAutoView.IAutoViewButtonProps => ({
    type: "Button",
    label: "Visit",
    variant: "text",
    size: "small",
    href: url,
    color: "primary",
  });

  // Assemble data list items for the webhook properties
  const items: IAutoView.IAutoViewDataListItemProps[] = [
    // Active status
    {
      type: "DataListItem",
      label: { type: "Text", content: "Active", variant: "body2" },
      value: statusIcon,
    },
    // Events
    {
      type: "DataListItem",
      label: { type: "Text", content: "Events", variant: "body2" },
      value: { type: "ChipGroup", childrenProps: eventChips },
    },
    // Main payload URL
    {
      type: "DataListItem",
      label: { type: "Text", content: "Payload URL", variant: "body2" },
      value: makeVisitButton(input.config.url ?? input.url),
    },
    // Content type (if configured)
    ...(input.config.content_type
      ? [
          {
            type: "DataListItem",
            label: { type: "Text", content: "Content Type", variant: "body2" },
            value: {
              type: "Text",
              content: input.config.content_type,
              variant: "body2",
            },
          } as IAutoView.IAutoViewDataListItemProps,
        ]
      : []),
    // Insecure SSL flag
    ...(input.config.insecure_ssl != null
      ? [
          {
            type: "DataListItem",
            label: { type: "Text", content: "Insecure SSL", variant: "body2" },
            value: {
              type: "Text",
              content: `${input.config.insecure_ssl}`,
              variant: "body2",
            },
          } as IAutoView.IAutoViewDataListItemProps,
        ]
      : []),
    // Test URL
    {
      type: "DataListItem",
      label: { type: "Text", content: "Test URL", variant: "body2" },
      value: makeVisitButton(input.test_url),
    },
    // Ping URL
    {
      type: "DataListItem",
      label: { type: "Text", content: "Ping URL", variant: "body2" },
      value: makeVisitButton(input.ping_url),
    },
    // Optional deliveries URL
    ...(input.deliveries_url
      ? [
          {
            type: "DataListItem",
            label: { type: "Text", content: "Deliveries URL", variant: "body2" },
            value: makeVisitButton(input.deliveries_url),
          } as IAutoView.IAutoViewDataListItemProps,
        ]
      : []),
    // Last response summary as markdown
    {
      type: "DataListItem",
      label: { type: "Text", content: "Last Response", variant: "body2" },
      value: {
        type: "Markdown",
        content:
          `**Code:** ${input.last_response.code ?? "N/A"}  \n` +
          `**Status:** ${input.last_response.status ?? "N/A"}  \n` +
          `**Message:** ${input.last_response.message ?? "N/A"}`,
      },
    },
  ];

  // Compose the data list
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Header with webhook name and ID
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `ID: ${input.id}`,
    startElement: {
      type: "Icon",
      id: "link",
      size: 24,
      color: "blue",
    },
  };

  // Footer showing creation and update timestamps (human-friendly)
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      {
        type: "Text",
        content: `Created: ${new Date(input.created_at).toLocaleString()}`,
        variant: "caption",
        color: "gray",
      },
      {
        type: "Text",
        content: `Updated: ${new Date(input.updated_at).toLocaleString()}`,
        variant: "caption",
        color: "gray",
      },
    ],
  };

  // Put everything into a vertical card for responsive display
  return {
    type: "VerticalCard",
    childrenProps: [
      header,
      { type: "CardContent", childrenProps: dataList },
      footer,
    ],
  };
}
