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



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const { total_count, labels } = input;

    // Sort labels alphabetically to provide a consistent order
    const sortedLabels = [...labels].sort((a, b) => a.name.localeCompare(b.name));

    // Map each runner label into a DataListItem with an icon indicating its type
    const listItems: IAutoView.IAutoViewDataListItemProps[] = sortedLabels.map(label => {
        // Choose a lock icon for read-only labels, a tag icon for custom labels
        const iconProps: IAutoView.IAutoViewIconProps = {
            type: "Icon",
            id: label.type === "read-only" ? "lock" : "tag",
            // Use a subdued gray for read-only, green for custom to highlight custom labels
            color: label.type === "read-only" ? "gray" : "green",
            size: 16
        };

        return {
            type: "DataListItem",
            // The main label text
            title: label.name,
            // A subtitle describing label type
            description: label.type === "read-only" ? "Read‑only label" : "Custom label",
            // Icon prepended to each list item for quick visual parsing
            startElement: iconProps
        };
    });

    // Compose the data list component
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: listItems
    };

    // Build a vertical card containing a header and the data list
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Runner Labels",
                description: `Total labels: ${total_count}`,
                // An icon in the header to give visual context
                startElement: {
                    type: "Icon",
                    id: "tag",
                    color: "blue",
                    size: 20
                }
            },
            {
                type: "CardContent",
                // Embed the DataList inside the card content
                childrenProps: dataList
            }
        ]
    };
}
