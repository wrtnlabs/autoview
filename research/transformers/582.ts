import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposActionsOrganizationVariables {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            variables: Schema.actions_variable[];
        };
    }
    /**
     * @title Actions Variable
    */
    export type actions_variable = {
        /**
         * The name of the variable.
        */
        name: string;
        /**
         * The value of the variable.
        */
        value: string;
        /**
         * The date and time at which the variable was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time at which the variable was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
    };
}
type IAutoViewTransformerInputType = Schema.IApiReposActionsOrganizationVariables.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If no variables are defined, show a friendly markdown message.
    if (!input.variables || input.variables.length === 0) {
        return {
            type: "Markdown",
            content: "### No environment variables found\n\nThere are no actions variables defined for this organization.",
        };
    }

    // Map each variable into a DataListItem with name, value chip, and timestamp chips.
    const listItems: IAutoView.IAutoViewDataListItemProps[] = input.variables.map(variable => {
        // Primary chip showing the variable's value.
        const valueChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: variable.value,
            variant: "filled",
            color: "teal",
            size: "small",
        };

        // Chips for creation and update timestamps, formatted for readability.
        const createdChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: `Created: ${new Date(variable.created_at).toLocaleDateString()}`,
            variant: "outlined",
            color: "gray",
            size: "small",
        };
        const updatedChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: `Updated: ${new Date(variable.updated_at).toLocaleDateString()}`,
            variant: "outlined",
            color: "gray",
            size: "small",
        };

        return {
            type: "DataListItem",
            // The label is the variable name.
            label: {
                type: "Text",
                variant: "body1",
                content: variable.name,
            },
            // The value area shows the value chip and timestamp chips.
            value: [valueChip, createdChip, updatedChip],
        };
    });

    // Compose the overall DataList.
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: listItems,
    };

    // Card header with an icon and a dynamic title showing total count.
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: `Environment Variables (${input.total_count})`,
        startElement: {
            type: "Icon",
            id: "list",   // FontAwesome icon name (without prefix)
            size: 24,
            color: "blue",
        },
    };

    // Card content wrapping the DataList.
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList,
    };

    // Assemble everything into a VerticalCard for responsive display.
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
