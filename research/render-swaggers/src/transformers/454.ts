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
  // Helper to create a DataListItem with icon, title, and a value component
  const createItem = (
    iconId: string,
    title: string,
    valueComponent: IAutoView.IAutoViewPresentationComponentProps
  ): IAutoView.IAutoViewDataListItemProps => ({
    type: "DataListItem",
    // The label shows an icon next to the property name
    label: [
      { type: "Icon", id: iconId, color: "teal", size: 20 },
      { type: "Text", content: title, variant: "subtitle2", color: "tertiary" }
    ],
    // The value is any presentation component: Text, Button, Chip, etc.
    value: valueComponent
  });

  // Build list items for each field
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // URL field: show as clickable link button if provided
  items.push(
    createItem(
      "link",
      "URL",
      input.url
        ? {
            type: "Button",
            label: input.url,
            href: input.url,
            variant: "text",
            color: "blue",
            size: "small"
          }
        : {
            type: "Text",
            content: "Not provided",
            variant: "body2",
            color: "disabled"
          }
    )
  );

  // Content-type field
  items.push(
    createItem(
      "file-alt",
      "Content Type",
      input.content_type
        ? {
            type: "Chip",
            label: input.content_type,
            variant: "outlined",
            color: "info",
            size: "small"
          }
        : {
            type: "Text",
            content: "Not provided",
            variant: "body2",
            color: "disabled"
          }
    )
  );

  // Secret field: do not display actual secret, just indicate presence
  items.push(
    createItem(
      "key",
      "Secret",
      {
        type: "Chip",
        label: input.secret ? "Configured" : "Not set",
        variant: "outlined",
        color: input.secret ? "success" : "gray",
        size: "small"
      }
    )
  );

  // insecure_ssl field: interpret "0"/0 as disabled, others as enabled
  const insecure = input.insecure_ssl !== undefined && input.insecure_ssl !== "0" && input.insecure_ssl !== 0
    ? true
    : false;
  items.push(
    createItem(
      "exclamation-triangle",
      "Insecure SSL",
      {
        type: "Chip",
        label: insecure ? "Enabled" : "Disabled",
        variant: "outlined",
        color: insecure ? "warning" : "success",
        size: "small"
      }
    )
  );

  // Compose the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items
  };

  // Create a card header with an icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Webhook Configuration",
    // Show a small description for mobile friendliness
    description: "Overview of your webhook settings",
    startElement: {
      type: "Icon",
      id: "cog",
      color: "blue",
      size: 24
    }
  };

  // Wrap the DataList in CardContent
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Assemble into a VerticalCard for responsive layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content]
  };

  return card;
}
