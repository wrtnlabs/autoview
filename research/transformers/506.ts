import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Custom property defined on an organization
     *
     * @title Organization Custom Property
    */
    export type custom_property = {
        /**
         * The name of the property
        */
        property_name: string;
        /**
         * The URL that can be used to fetch, update, or delete info about this property via the API.
        */
        url?: string;
        /**
         * The source type of the property
        */
        source_type?: "organization" | "enterprise";
        /**
         * The type of the value for the property
        */
        value_type: "string" | "single_select" | "multi_select" | "true_false";
        /**
         * Whether the property is required.
        */
        required?: boolean;
        /**
         * Default value of the property
        */
        default_value?: string | string[] | null;
        /**
         * Short description of the property
        */
        description?: string | null;
        /**
         * An ordered list of the allowed values of the property.
         * The property can have up to 200 allowed values.
        */
        allowed_values?: ((string & tags.MaxLength<75>)[] & tags.MaxItems<200>) | null;
        /**
         * Who can edit the values of the property
        */
        values_editable_by?: "org_actors" | "org_and_repo_actors" | null;
    };
}
type IAutoViewTransformerInputType = Schema.custom_property[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Map each custom property to a VerticalCard for visual display
    const cards: IAutoView.IAutoViewVerticalCardProps[] = input.map((prop) => {
        // Icon mapping for each value_type
        const iconMap: Record<string, { id: string; color: IAutoView.IAutoViewIconProps["color"] }> = {
            string:   { id: "font",       color: "cyan" },
            single_select: { id: "list-ul",    color: "indigo" },
            multi_select:  { id: "list",       color: "blue" },
            true_false:    { id: "toggle-on",  color: "teal" },
        };
        const iconInfo = iconMap[prop.value_type] || { id: "question", color: "gray" };

        // Build a list of key/value items to show in the card content
        const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

        // 1. Value Type
        dataListItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Value Type",
                variant: "body2",
            },
            value: {
                type: "Chip",
                label: prop.value_type,
                color: iconInfo.color,
                variant: "outlined",
            },
        });

        // 2. Required
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Required", variant: "body2" },
            value: {
                type: "Chip",
                label: prop.required ? "Yes" : "No",
                color: prop.required ? "success" : "gray",
                variant: "outlined",
            },
        });

        // 3. Default Value (if provided)
        if (prop.default_value != null) {
            // Render default value as inline code via markdown
            const raw = Array.isArray(prop.default_value)
                ? prop.default_value.map((v) => `\`${v}\``).join(", ")
                : `\`${prop.default_value}\``;
            dataListItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "Default", variant: "body2" },
                value: { type: "Markdown", content: raw },
            });
        }

        // 4. Allowed Values (if any)
        if (prop.allowed_values && prop.allowed_values.length > 0) {
            const chips = prop.allowed_values.map((v) => ({
                type: "Chip" as const,
                label: v,
                variant: "outlined" as const,
                color: "primary" as const,
                size: "small" as const,
            }));
            dataListItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "Allowed Values", variant: "body2" },
                value: {
                    type: "ChipGroup",
                    childrenProps: chips,
                    maxItems: 5,
                },
            });
        }

        // 5. Editable By (if provided)
        if (prop.values_editable_by) {
            dataListItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "Editable By", variant: "body2" },
                value: {
                    type: "Chip",
                    label: prop.values_editable_by,
                    variant: "outlined",
                    color: "info",
                },
            });
        }

        // Assemble the components of each card
        const header: IAutoView.IAutoViewCardHeaderProps = {
            type: "CardHeader",
            title: prop.property_name,
            description: prop.description ?? undefined,
            startElement: {
                type: "Icon",
                id: iconInfo.id,
                color: iconInfo.color,
                size: 24,
            },
        };

        const content: IAutoView.IAutoViewCardContentProps = {
            type: "CardContent",
            childrenProps: {
                type: "DataList",
                childrenProps: dataListItems,
            },
        };

        // Footer with a link button if a URL is present
        const footer: IAutoView.IAutoViewCardFooterProps = {
            type: "CardFooter",
            childrenProps: prop.url
                ? {
                      type: "Button",
                      label: "View API",
                      href: prop.url,
                      variant: "outlined",
                      size: "small",
                  }
                : undefined,
        };

        return {
            type: "VerticalCard",
            childrenProps: [header, content, footer],
        };
    });

    // Wrap all cards in a responsive Carousel for easy navigation
    return {
        type: "Carousel",
        childrenProps: cards,
        indicators: true,
        navControls: true,
        infinite: false,
        // small gutter for spacing on mobile
        gutter: 8,
    };
}
