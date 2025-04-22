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
type IAutoViewTransformerInputType = Schema.hook[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Transform an array of Schema.hook objects into a DataList of DataListItems
    const items: IAutoView.IAutoViewDataListItemProps[] = input.map((hook) => {
        // 1. Prepare a ChipGroup showing all subscribed events
        const eventChips: IAutoView.IAutoViewChipProps[] = hook.events.map((evt) => ({
            type: "Chip",
            label: evt,
            size: "small",
            variant: "outlined",
        }));

        // 2. Prepare a list of presentation components for the "value" column
        const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

        if (eventChips.length) {
            valueComponents.push({
                type: "ChipGroup",
                childrenProps: eventChips,
            } as IAutoView.IAutoViewChipGroupProps);
        }

        // Format dates; fall back to raw string if invalid
        let createdLabel = hook.created_at;
        let updatedLabel = hook.updated_at;
        try {
            createdLabel = new Date(hook.created_at).toLocaleString();
            updatedLabel = new Date(hook.updated_at).toLocaleString();
        } catch {
            // leave raw if parsing fails
        }
        valueComponents.push({
            type: "Text",
            variant: "caption",
            // Array of two lines: created and updated
            content: [
                `Created: ${createdLabel}`,
                `Updated: ${updatedLabel}`,
            ],
        } as IAutoView.IAutoViewTextProps);

        // Last response info
        const resp = hook.last_response;
        if (resp !== undefined && resp !== null) {
            const status = resp.status ?? "N/A";
            const code = resp.code != null ? resp.code : "-";
            valueComponents.push({
                type: "Text",
                variant: "caption",
                content: `Last response: ${status} (${code})`,
            } as IAutoView.IAutoViewTextProps);
        }

        // Add action buttons for URLs, only if present
        if (hook.url) {
            valueComponents.push({
                type: "Button",
                label: "View",
                size: "small",
                variant: "text",
                href: hook.url,
            } as IAutoView.IAutoViewButtonProps);
        }
        if (hook.test_url) {
            valueComponents.push({
                type: "Button",
                label: "Test",
                size: "small",
                variant: "text",
                href: hook.test_url,
            } as IAutoView.IAutoViewButtonProps);
        }
        if (hook.ping_url) {
            valueComponents.push({
                type: "Button",
                label: "Ping",
                size: "small",
                variant: "text",
                href: hook.ping_url,
            } as IAutoView.IAutoViewButtonProps);
        }

        // 3. Prepare the label column: name + active/inactive icon
        const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            {
                type: "Text",
                // Hook name as the primary identifier
                content: hook.name,
                variant: "body1",
            } as IAutoView.IAutoViewTextProps,
            {
                type: "Icon",
                id: hook.active ? "check-circle" : "times-circle",
                color: hook.active ? "green" : "red",
                size: 16,
            } as IAutoView.IAutoViewIconProps,
        ];

        // 4. Assemble the DataListItem
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        } as IAutoView.IAutoViewDataListItemProps;
    });

    // 5. Return a DataList containing all hook items
    return {
        type: "DataList",
        childrenProps: items,
    } as IAutoView.IAutoViewDataListProps;
}
