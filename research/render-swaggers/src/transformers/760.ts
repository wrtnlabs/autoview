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
    // Helper to build an icon-text pair for labels
    const makeLabel = (
        iconId: string,
        text: string
    ): IAutoView.IAutoViewPresentationComponentProps[] => [
        {
            type: "Icon",
            id: iconId,
            size: 16,
            color: "gray"
        },
        {
            type: "Text",
            content: text,
            variant: "body2",
            color: "gray"
        }
    ];

    // Build DataListItem for URL
    const urlValue: IAutoView.IAutoViewComponentProps = input.url
        ? {
              type: "Button",
              variant: "text",
              size: "small",
              color: "primary",
              href: input.url,
              startElement: {
                  type: "Icon",
                  id: "link",
                  size: 16,
                  color: "blue"
              },
              label: input.url
          }
        : {
              type: "Text",
              content: "Not configured",
              variant: "body2",
              color: "gray"
          };

    // Build DataListItem for Content Type
    const contentTypeValue: IAutoView.IAutoViewComponentProps = input.content_type
        ? {
              type: "Chip",
              label: input.content_type,
              variant: "filled",
              color: "primary",
              size: "small"
          }
        : {
              type: "Text",
              content: "Not configured",
              variant: "body2",
              color: "gray"
          };

    // Build DataListItem for Secret
    const secretValue: IAutoView.IAutoViewComponentProps = input.secret
        ? {
              type: "Chip",
              label: "Provided",
              variant: "outlined",
              color: "success",
              size: "small",
              startElement: {
                  type: "Icon",
                  id: "lock",
                  size: 16,
                  color: "green"
              }
          }
        : {
              type: "Chip",
              label: "Not provided",
              variant: "outlined",
              color: "gray",
              size: "small",
              startElement: {
                  type: "Icon",
                  id: "lock-open",
                  size: 16,
                  color: "gray"
              }
          };

    // Build DataListItem for Insecure SSL
    const insecureValue: IAutoView.IAutoViewComponentProps = input.insecure_ssl != null
        ? {
              type: "Chip",
              label: String(input.insecure_ssl),
              variant: "outlined",
              color: String(input.insecure_ssl) === "0" ? "success" : "error",
              size: "small",
              startElement: {
                  type: "Icon",
                  id: "exclamation-triangle",
                  size: 16,
                  color: String(input.insecure_ssl) === "0" ? "green" : "red"
              }
          }
        : {
              type: "Text",
              content: "Not configured",
              variant: "body2",
              color: "gray"
          };

    // Compose DataList items
    const items: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: "DataListItem",
            label: makeLabel("link", "Delivery URL"),
            value: urlValue
        },
        {
            type: "DataListItem",
            label: makeLabel("file-code", "Content Type"),
            value: contentTypeValue
        },
        {
            type: "DataListItem",
            label: makeLabel("key", "Secret"),
            value: secretValue
        },
        {
            type: "DataListItem",
            label: makeLabel("shield-alt", "Insecure SSL"),
            value: insecureValue
        }
    ];

    // Wrap items in a DataList component
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items
    };

    // Card header with title and icon
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "Webhook Configuration",
        startElement: {
            type: "Icon",
            id: "rss",
            size: 24,
            color: "teal"
        }
    };

    // Card content containing the DataList
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList
    };

    // Final responsive vertical card
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
