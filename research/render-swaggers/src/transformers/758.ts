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
  // Prepare header: display name and ID, and a status chip indicating active/inactive
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `Webhook ID: ${input.id}`,
    endElement: {
      type: "Chip",
      label: input.active ? "Active" : "Inactive",
      color: input.active ? "green" : "gray",
      variant: "filled",
    },
  };

  // Safely join events, falling back to "None" if the array is empty or missing
  const eventsList = Array.isArray(input.events) && input.events.length > 0
    ? input.events.join(", ")
    : "None";

  // Last response details with null-coalescing for missing fields
  const lastResp = input.last_response || {};
  const respStatus = lastResp.status ?? "N/A";
  const respCode = lastResp.code !== null && typeof lastResp.code === "number"
    ? lastResp.code
    : "N/A";
  const respMsg = lastResp.message ?? "N/A";

  // Compose markdown content to visually structure the details
  const markdownLines: string[] = [
    `**Type**: \`${input.type}\``,
    `**Events**: ${eventsList}`,
    `**URL**: [Link](${input.url})`,
    `**Test URL**: [Link](${input.test_url})`,
    `**Ping URL**: [Link](${input.ping_url})`,
    `**Last Response**:`,
    `- Status: ${respStatus}`,
    `- Code: ${respCode}`,
    `- Message: ${respMsg}`,
    `**Created At**: ${input.created_at}`,
    `**Updated At**: ${input.updated_at}`,
  ];
  const markdownContent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: markdownLines.join("\n\n"),
  };

  // Wrap the markdown in a CardContent to include it in the vertical card
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: markdownContent,
  };

  // Return a vertical card composed of header and content
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
