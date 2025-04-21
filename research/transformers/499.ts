import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsPrivateRegistries {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            configurations: Schema.org_private_registry_configuration[];
        };
    }
    /**
     * Private registry configuration for an organization
     *
     * @title Organization private registry
    */
    export type org_private_registry_configuration = {
        /**
         * The name of the private registry configuration.
        */
        name: string;
        /**
         * The registry type.
        */
        registry_type: "maven_repository";
        /**
         * The username to use when authenticating with the private registry.
        */
        username?: string | null;
        /**
         * Which type of organization repositories have access to the private registry.
        */
        visibility: "all" | "private" | "selected";
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    };
}
type IAutoViewTransformerInputType = Schema.IApiOrgsPrivateRegistries.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to format ISO date strings into a human-friendly format.
    const formatDate = (iso: string): string => {
        try {
            return new Date(iso).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        } catch {
            return iso;
        }
    };

    // Build a DataListItem for each registry configuration.
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.configurations.map((cfg) => {
        // Build Markdown content for the details of each configuration.
        const lines: string[] = [
            `**Type:** ${cfg.registry_type}`,
            `**Visibility:** ${cfg.visibility}`,
            cfg.username != null ? `**Username:** ${cfg.username}` : "",
            `**Created At:** ${formatDate(cfg.created_at)}`,
            `**Updated At:** ${formatDate(cfg.updated_at)}`,
        ].filter((line) => line !== "");

        return {
            type: "DataListItem",
            // Use a Text component for the item label.
            label: {
                type: "Text",
                content: cfg.name,
                variant: "body1",
                color: "primary",
            },
            // Use a Markdown component for the value to leverage bold and lists.
            value: {
                type: "Markdown",
                content: lines.join("\n\n"),
            },
        };
    });

    // Compose the final UI as a VerticalCard with a header and a data list.
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Private Registry Configurations",
                description: `Total: ${input.total_count}`,
                // Prepend an icon to visually represent configurations.
                startElement: {
                    type: "Icon",
                    id: "cog",
                    color: "blue",
                    size: 24,
                },
            },
            {
                type: "CardContent",
                // Embed a DataList to lay out each configuration as key-value entries.
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
        ],
    };
}
