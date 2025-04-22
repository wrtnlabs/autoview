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
  // Collect DataList items for each configuration field
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1. Webhook URL: display as a clickable button
  if (input.url) {
    items.push({
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: "URL",
          variant: "subtitle2",
          color: "tertiary",
        },
      ],
      value: {
        type: "Button",
        label: input.url,
        href: input.url,
        variant: "text",
        color: "info",
      },
    });
  }

  // 2. Content-Type: display as a small chip
  if (input.content_type) {
    items.push({
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: "Content Type",
          variant: "subtitle2",
          color: "tertiary",
        },
      ],
      value: {
        type: "Chip",
        label: input.content_type,
        variant: "outlined",
        color: "primary",
        size: "small",
      },
    });
  }

  // 3. Secret: mask for security, show as plain text
  if (input.secret) {
    const secretStr = String(input.secret);
    let masked: string;
    if (secretStr.length > 4) {
      // preserve first 2 and last 2 characters
      const head = secretStr.slice(0, 2);
      const tail = secretStr.slice(-2);
      masked = head + "*".repeat(secretStr.length - 4) + tail;
    } else {
      masked = "*".repeat(secretStr.length);
    }
    items.push({
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: "Secret",
          variant: "subtitle2",
          color: "tertiary",
        },
      ],
      value: {
        type: "Text",
        content: masked,
      },
    });
  }

  // 4. Insecure SSL flag: interpret 0/1 or string equivalents
  if (input.insecure_ssl !== undefined) {
    // treat "1" or 1 or "true" as insecure enabled
    const raw = input.insecure_ssl;
    const enabled =
      raw === 1 || raw === "1" || String(raw).toLowerCase() === "true";
    items.push({
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: "Insecure SSL",
          variant: "subtitle2",
          color: "tertiary",
        },
      ],
      value: {
        type: "Chip",
        label: enabled ? "Enabled" : "Disabled",
        variant: "outlined",
        color: enabled ? "error" : "success",
        size: "small",
      },
    });
  }

  // If no fields were provided, show a simple markdown note
  if (items.length === 0) {
    return {
      type: "Markdown",
      content: "No webhook configuration provided.",
    };
  }

  // Compose the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Wrap everything in a vertical card with a header
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Webhook Configuration",
        startElement: {
          type: "Icon",
          id: "link",
          color: "blue",
          size: 24,
        },
      },
      {
        type: "CardContent",
        childrenProps: dataList,
      },
    ],
  };
}
