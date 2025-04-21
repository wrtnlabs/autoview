import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
}
type IAutoViewTransformerInputType = Schema.webhook_config;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: build a label consisting of an icon and a text component
  const createLabel = (
    text: string,
    iconId: string
  ): IAutoView.IAutoViewPresentationComponentProps[] => [
    {
      type: "Icon" as const,
      id: iconId,
      size: 16,
      color: "blue",
    },
    {
      type: "Text" as const,
      content: text,
      variant: "body1",
      color: "primary",
    },
  ];

  // Build list items for each field in the webhook config
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // URL field: clickable link if provided, otherwise fallback text
  if (input.url) {
    items.push({
      type: "DataListItem",
      label: createLabel("URL", "link"),
      value: {
        type: "Button",
        variant: "text",
        href: input.url,
        label: input.url,
        size: "small",
        color: "blue",
      },
    });
  } else {
    items.push({
      type: "DataListItem",
      label: createLabel("URL", "link"),
      value: {
        type: "Text",
        content: "Not Configured",
        variant: "body2",
        color: "gray",
      },
    });
  }

  // Content type: styled chip or fallback text
  if (input.content_type) {
    items.push({
      type: "DataListItem",
      label: createLabel("Content Type", "file-alt"),
      value: {
        type: "Chip",
        label: input.content_type,
        variant: "outlined",
        color: "teal",
        size: "small",
      },
    });
  } else {
    items.push({
      type: "DataListItem",
      label: createLabel("Content Type", "file-alt"),
      value: {
        type: "Text",
        content: "Not Configured",
        variant: "body2",
        color: "gray",
      },
    });
  }

  // Secret: mask all characters for security, fallback if absent
  if (input.secret) {
    const masked = "*".repeat(input.secret.length);
    items.push({
      type: "DataListItem",
      label: createLabel("Secret", "key"),
      value: {
        type: "Text",
        content: masked,
        variant: "body2",
        color: "gray",
      },
    });
  } else {
    items.push({
      type: "DataListItem",
      label: createLabel("Secret", "key"),
      value: {
        type: "Text",
        content: "Not Configured",
        variant: "body2",
        color: "gray",
      },
    });
  }

  // Insecure SSL: interpret numeric or string flags; display as a colored chip
  if (input.insecure_ssl !== undefined) {
    const flag = input.insecure_ssl === 1 || input.insecure_ssl === "1";
    const enabled = flag;
    items.push({
      type: "DataListItem",
      label: createLabel("Insecure SSL", "shield-alt"),
      value: {
        type: "Chip",
        label: enabled ? "Enabled" : "Disabled",
        variant: "filled",
        color: enabled ? "warning" : "secondary",
        size: "small",
      },
    });
  } else {
    items.push({
      type: "DataListItem",
      label: createLabel("Insecure SSL", "shield-alt"),
      value: {
        type: "Text",
        content: "Not Configured",
        variant: "body2",
        color: "gray",
      },
    });
  }

  // Wrap the items into a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Compose the full UI as a vertical card with header and content
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Webhook Configuration",
        startElement: {
          type: "Icon" as const,
          id: "cog",
          size: 20,
          color: "indigo",
        },
      },
      {
        type: "CardContent",
        childrenProps: dataList,
      },
    ],
  };
}
