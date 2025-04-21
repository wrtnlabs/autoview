import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A hosted compute network configuration.
     *
     * @title Hosted compute network configuration
    */
    export type network_configuration = {
        /**
         * The unique identifier of the network configuration.
        */
        id: string;
        /**
         * The name of the network configuration.
        */
        name: string;
        /**
         * The hosted compute service the network configuration supports.
        */
        compute_service?: "none" | "actions" | "codespaces";
        /**
         * The unique identifier of each network settings in the configuration.
        */
        network_settings_ids?: string[];
        /**
         * The time at which the network configuration was created, in ISO 8601 format.
        */
        created_on: (string & tags.Format<"date-time">) | null;
    };
}
type IAutoViewTransformerInputType = Schema.network_configuration;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
    input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
    // Map compute_service to a relevant FontAwesome icon name
    const computeIconMap: Record<Exclude<
        NonNullable<IAutoViewTransformerInputType["compute_service"]>,
        undefined
    >, string> = {
        none: "ban",
        actions: "tasks",
        codespaces: "code-branch",
    };
    const serviceKey = input.compute_service ?? "none";
    const iconName = computeIconMap[serviceKey] || computeIconMap.none;

    // Prepare the compute service display as an icon + text chip
    const computeServiceChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: input.compute_service ?? "none",
        startElement: {
            type: "Icon",
            id: iconName,
            color: input.compute_service === "none" ? "gray" : "blue",
            size: 16,
        },
        variant: "filled",
        size: "small",
    };

    // Format network settings IDs into markdown list (for readability on small screens)
    const settingsIds = input.network_settings_ids ?? [];
    const settingsContent =
        settingsIds.length > 0
            ? settingsIds.map((id) => `- \`${id}\``).join("\n")
            : "_No network settings_";

    const settingsMarkdown: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content: settingsContent,
    };

    // Format creation date into a human-readable string
    let createdOnDisplay: string;
    if (input.created_on) {
        const d = new Date(input.created_on);
        // e.g. "2023-08-04 14:23"
        createdOnDisplay = `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })}`;
    } else {
        createdOnDisplay = "N/A";
    }

    // Build a DataList of the network configuration details
    const detailsList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: "Compute Service",
                    variant: "subtitle2",
                },
                value: computeServiceChip,
            },
            {
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: "Settings IDs",
                    variant: "subtitle2",
                },
                value: settingsMarkdown,
            },
            {
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: "Created On",
                    variant: "subtitle2",
                },
                value: {
                    type: "Text",
                    content: createdOnDisplay,
                },
            },
        ],
    };

    // Assemble a vertical card to display the configuration
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name,
        description: `ID: ${input.id}`,
        startElement: {
            type: "Icon",
            id: "network-wired",
            color: "teal",
            size: 24,
        },
    };

    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: detailsList,
    };

    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
