import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposCodespacesMachines {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            machines: Schema.codespace_machine[];
        };
    }
    /**
     * A description of the machine powering a codespace.
     *
     * @title Codespace machine
    */
    export type codespace_machine = {
        /**
         * The name of the machine.
        */
        name: string;
        /**
         * The display name of the machine includes cores, memory, and storage.
        */
        display_name: string;
        /**
         * The operating system of the machine.
        */
        operating_system: string;
        /**
         * How much storage is available to the codespace.
        */
        storage_in_bytes: number & tags.Type<"int32">;
        /**
         * How much memory is available to the codespace.
        */
        memory_in_bytes: number & tags.Type<"int32">;
        /**
         * How many cores are available to the codespace.
        */
        cpus: number & tags.Type<"int32">;
        /**
         * Whether a prebuild is currently available when creating a codespace for this machine and repository. If a branch was not specified as a ref, the default branch will be assumed. Value will be "null" if prebuilds are not supported or prebuild availability could not be determined. Value will be "none" if no prebuild is available. Latest values "ready" and "in_progress" indicate the prebuild availability status.
        */
        prebuild_availability: "none" | "ready" | "in_progress" | null;
    };
}
type IAutoViewTransformerInputType = Schema.IApiReposCodespacesMachines.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms codespace machines data into an AutoView list with badges and chips.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const { total_count, machines } = input;

    // If there are no machines, show a simple markdown message
    if (!machines || machines.length === 0) {
        return {
            type: "Markdown",
            content: "### No codespace machines available",
        };
    }

    // Helper to convert bytes into gigabytes, rounded to 1 decimal place
    const toGB = (bytes: number): number =>
        Math.round((bytes / (1024 ** 3)) * 10) / 10;

    // Create a sticky subheader displaying the total count
    const subheader: IAutoView.IAutoViewListSubheaderProps = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: [
            {
                type: "Text",
                variant: "h6",
                content: [`Total machines: ${total_count}`],
            },
        ],
    };

    // Map each codespace machine to a ListItemProps
    const items: IAutoView.IAutoViewListItemProps[] = machines.map((m) => {
        const memoryGB = toGB(m.memory_in_bytes);
        const storageGB = toGB(m.storage_in_bytes);

        // Badge showing number of CPU cores
        const cpuBadge: IAutoView.IAutoViewBadgeProps = {
            type: "Badge",
            count: m.cpus,
            childrenProps: {
                type: "Icon",
                id: "microchip", // icon representing CPU
                size: 16,
            },
        };

        // Badge showing memory in GB
        const memoryBadge: IAutoView.IAutoViewBadgeProps = {
            type: "Badge",
            count: memoryGB,
            childrenProps: {
                type: "Icon",
                id: "memory", // icon representing RAM
                size: 16,
            },
        };

        // Badge showing storage in GB
        const storageBadge: IAutoView.IAutoViewBadgeProps = {
            type: "Badge",
            count: storageGB,
            childrenProps: {
                type: "Icon",
                id: "hdd", // icon representing disk
                size: 16,
            },
        };

        return {
            type: "ListItem",
            // Display friendly name
            title: m.display_name,
            // Use internal name as secondary text
            description: m.name,
            // Show operating system as a small outlined chip
            startElement: {
                type: "Chip",
                label: m.operating_system,
                variant: "outlined",
                size: "small",
            },
            // Show resource badges (CPU, memory, storage) on the right
            endElement: [cpuBadge, memoryBadge, storageBadge],
        };
    });

    // Compose the final list component
    const list: IAutoView.IAutoViewListProps = {
        type: "List",
        childrenProps: [subheader, ...items],
    };

    return list;
}
