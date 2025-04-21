import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposActionsRunnersGenerateJitconfig {
        export type PostResponse = {
            runner: Schema.runner;
            /**
             * The base64 encoded runner configuration.
            */
            encoded_jit_config: string;
        };
    }
    /**
     * A self hosted runner
     *
     * @title Self hosted runners
    */
    export type runner = {
        /**
         * The ID of the runner.
        */
        id: number & tags.Type<"int32">;
        /**
         * The ID of the runner group.
        */
        runner_group_id?: number & tags.Type<"int32">;
        /**
         * The name of the runner.
        */
        name: string;
        /**
         * The Operating System of the runner.
        */
        os: string;
        /**
         * The status of the runner.
        */
        status: string;
        busy: boolean;
        labels: Schema.runner_label[];
        ephemeral?: boolean;
    };
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
type IAutoViewTransformerInputType = Schema.IApiReposActionsRunnersGenerateJitconfig.PostResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const { runner, encoded_jit_config } = input;

    // Prepare chips for runner labels
    const labelChips: IAutoView.IAutoViewChipProps[] = runner.labels.map((lbl) => ({
        type: "Chip",
        label: lbl.name,
        // differentiate read-only vs custom labels by color
        color: lbl.type === "read-only" ? "secondary" : "primary",
        variant: "outlined",
        size: "small",
    }));

    // Prepare the list of key/value pairs for runner properties
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

    // Numeric ID
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "ID", variant: "body2" },
        value: { type: "Text", content: String(runner.id), variant: "body2" },
    });

    // Optional runner group
    if (runner.runner_group_id !== undefined) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Group ID", variant: "body2" },
            value: { type: "Text", content: String(runner.runner_group_id), variant: "body2" },
        });
    }

    // Operating System
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "OS", variant: "body2" },
        value: { type: "Text", content: runner.os, variant: "body2" },
    });

    // Status field
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Status", variant: "body2" },
        value: { type: "Text", content: runner.status, variant: "body2" },
    });

    // Busy indicator as a colored chip
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Busy", variant: "body2" },
        value: {
            type: "Chip",
            label: runner.busy ? "Yes" : "No",
            color: runner.busy ? "error" : "success",
            variant: "filled",
            size: "small",
        },
    });

    // Ephemeral flag (only if true)
    if (runner.ephemeral) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Ephemeral", variant: "body2" },
            value: {
                type: "Chip",
                label: "Yes",
                color: "info",
                variant: "outlined",
                size: "small",
            },
        });
    }

    // Labels array as a chip group
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Labels", variant: "body2" },
        value: {
            type: "ChipGroup",
            childrenProps: labelChips,
            maxItems: 8,
        },
    });

    // Build the DataList component
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: dataListItems,
    };

    // Compose the vertical card
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [
            // Header with runner name and status icon
            {
                type: "CardHeader",
                title: runner.name,
                description: runner.status,
                startElement: {
                    type: "Icon",
                    id: "server",
                    size: 24,
                    color: "blue",
                },
            },
            // Content shows all runner details in a list
            {
                type: "CardContent",
                childrenProps: dataList,
            },
            // Footer with a download config button
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Button",
                    variant: "contained",
                    color: "primary",
                    label: "Download Config",
                    startElement: {
                        type: "Icon",
                        id: "download",
                        size: 20,
                        color: "gray",
                    },
                    // Link to the base64-encoded config for download
                    href: `data:application/json;base64,${encoded_jit_config}`,
                },
            },
        ],
    };

    return card;
}
