import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposActionsRunnersLabels {
        export type _DeleteResponse = {
            total_count: number & tags.Type<"int32">;
            labels: Schema.runner_label[];
        };
    }
    /**
     * A label for a self hosted runner
     *
     * @title Self hosted runner label
    */
    export type runner_label = {
        /**
         * Unique identifier of the label.
        */
        id?: number & tags.Type<"int32">;
        /**
         * Name of the label.
        */
        name: string;
        /**
         * The type of label. Read-only labels are applied automatically when the runner is configured.
        */
        type?: "read-only" | "custom";
    };
}
type IAutoViewTransformerInputType = Schema.IApiReposActionsRunnersLabels._DeleteResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms runner labels response into a visual AutoView component
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const { total_count, labels } = input;

    // If there are no labels, show a simple markdown message
    if (!labels || labels.length === 0) {
        return {
            type: "Markdown",
            content: "### No Runner Labels\nThere are no labels available for this repository runner."
        };
    }

    // Map each runner label into a Chip component
    const chipItems: IAutoView.IAutoViewChipProps[] = labels.map(label => {
        // Determine styling based on label type (read-only vs custom)
        const isCustom = label.type === "custom";
        return {
            type: "Chip",
            label: label.name,
            variant: isCustom ? "filled" : "outlined",
            color: isCustom ? "primary" : "gray",
            size: "small"
        };
    });

    // Group all chips together
    const chipGroup: IAutoView.IAutoViewChipGroupProps = {
        type: "ChipGroup",
        childrenProps: chipItems
    };

    // Build a card header with an icon and summary
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "Runner Labels",
        description: `${total_count} total`,
        startElement: {
            type: "Icon",
            id: "tag",           // FontAwesome "tag" icon
            size: 16,
            color: "cyan"
        }
    };

    // Card content holds the chip group
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: chipGroup
    };

    // Return a vertical card containing header and content
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content]
    };

    return card;
}
