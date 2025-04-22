export function transform($input) {
    return visualizeData($input);
}
// Transforms codespace machines data into an AutoView list with badges and chips.
function visualizeData(input) {
    const { total_count, machines } = input;
    // If there are no machines, show a simple markdown message
    if (!machines || machines.length === 0) {
        return {
            type: "Markdown",
            content: "### No codespace machines available",
        };
    }
    // Helper to convert bytes into gigabytes, rounded to 1 decimal place
    const toGB = (bytes) => Math.round((bytes / (1024 ** 3)) * 10) / 10;
    // Create a sticky subheader displaying the total count
    const subheader = {
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
    const items = machines.map((m) => {
        const memoryGB = toGB(m.memory_in_bytes);
        const storageGB = toGB(m.storage_in_bytes);
        // Badge showing number of CPU cores
        const cpuBadge = {
            type: "Badge",
            count: m.cpus,
            childrenProps: {
                type: "Icon",
                id: "microchip", // icon representing CPU
                size: 16,
            },
        };
        // Badge showing memory in GB
        const memoryBadge = {
            type: "Badge",
            count: memoryGB,
            childrenProps: {
                type: "Icon",
                id: "memory", // icon representing RAM
                size: 16,
            },
        };
        // Badge showing storage in GB
        const storageBadge = {
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
    const list = {
        type: "List",
        childrenProps: [subheader, ...items],
    };
    return list;
}
//# sourceMappingURL=689.js.map