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
    // If no custom properties, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No custom properties found\nThere are no organization custom properties to display."
        };
    }

    // Helper maps to choose an icon and color based on value_type
    const iconMap: Record<string, string> = {
        string: "font",
        single_select: "list-alt",
        multi_select: "list",
        true_false: "toggle-on"
    };
    const iconColorMap: Record<string, IAutoView.IAutoViewIconProps["color"]> = {
        string: "gray",
        single_select: "orange",
        multi_select: "yellow",
        true_false: "green"
    };

    // Transform each Schema.custom_property into an IAutoViewListItemProps
    const items: IAutoView.IAutoViewListItemProps[] = input.map((prop) => {
        // Determine the icon for the value_type
        const iconId = iconMap[prop.value_type] || "tag";
        const iconColor = iconColorMap[prop.value_type] || "blue";

        // Chip for the value_type
        const valueTypeChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: prop.value_type.replace(/_/g, " "),
            color: "teal",
            size: "small",
            variant: "outlined"
        };

        // Chip for required vs optional
        const requiredChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: prop.required ? "Required" : "Optional",
            color: prop.required ? "error" : "gray",
            size: "small",
            variant: "outlined"
        };

        // Chip for source_type if present
        const sourceChip: IAutoView.IAutoViewChipProps | null = prop.source_type
            ? {
                  type: "Chip",
                  label: prop.source_type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
                  color: "info",
                  size: "small",
                  variant: "outlined"
              }
            : null;

        // Chip for who can edit values
        const editableLabel = prop.values_editable_by === "org_actors"
            ? "Org Actors"
            : prop.values_editable_by === "org_and_repo_actors"
            ? "Org & Repo Actors"
            : null;
        const editableChip: IAutoView.IAutoViewChipProps | null = editableLabel
            ? {
                  type: "Chip",
                  label: editableLabel,
                  color: "blue",
                  size: "small",
                  variant: "outlined"
              }
            : null;

        // Chip for default_value if provided
        const defaultChip: IAutoView.IAutoViewChipProps | null = prop.default_value != null
            ? {
                  type: "Chip",
                  label:
                      Array.isArray(prop.default_value)
                          ? `Default: ${prop.default_value.join(", ")}`
                          : `Default: ${prop.default_value}`,
                  color: "indigo",
                  size: "small",
                  variant: "outlined"
              }
            : null;

        // Assemble endElement chips, filtering out any nulls
        const endElements: IAutoView.IAutoViewChipProps[] = [
            valueTypeChip,
            requiredChip,
            sourceChip,
            editableChip,
            defaultChip
        ].filter((c): c is IAutoView.IAutoViewChipProps => c !== null);

        return {
            type: "ListItem",
            title: prop.property_name,
            // Use the description field for a brief explanation, if available
            description: prop.description ?? undefined,
            // Show an icon that represents the value type
            startElement: {
                type: "Icon",
                id: iconId,
                color: iconColor,
                size: 24
            },
            // Display all metadata as a row of chips
            endElement: endElements
        };
    });

    // Return a responsive List of all properties
    return {
        type: "List",
        childrenProps: items
    };
}
