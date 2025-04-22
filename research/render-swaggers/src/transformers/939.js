export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: format bytes to human-readable string (GiB)
    const formatBytes = (bytes) => {
        const gb = bytes / (1024 ** 3);
        return `${gb.toFixed(2)} GiB`;
    };
    const machines = input.machines || [];
    // If no machines, show a friendly markdown message
    if (machines.length === 0) {
        return {
            type: "Markdown",
            content: "### No codespace machines available.\nPlease check back later or contact support.",
        };
    }
    // Map each machine to a VerticalCard containing header, content, and footer
    const cards = machines.map((machine) => {
        // Prebuild availability chip
        let prebuildLabel = "Unknown";
        let prebuildColor = "gray";
        let prebuildVariant = "outlined";
        switch (machine.prebuild_availability) {
            case "ready":
                prebuildLabel = "Prebuild Ready";
                prebuildColor = "success";
                prebuildVariant = "filled";
                break;
            case "in_progress":
                prebuildLabel = "Prebuild In Progress";
                prebuildColor = "warning";
                prebuildVariant = "filled";
                break;
            case "none":
                prebuildLabel = "No Prebuild";
                prebuildColor = "error";
                prebuildVariant = "outlined";
                break;
            default:
                // null or unexpected
                prebuildLabel = "Prebuild Unknown";
        }
        // Chips for machine specs
        const specChips = [
            {
                type: "Chip",
                label: machine.operating_system,
                startElement: { type: "Icon", id: "server", size: 16 },
                color: "primary",
                variant: "filled",
            },
            {
                type: "Chip",
                label: `${machine.cpus} CPU${machine.cpus !== 1 ? "s" : ""}`,
                startElement: { type: "Icon", id: "microchip", size: 16 },
                color: "info",
                variant: "filled",
            },
            {
                type: "Chip",
                label: formatBytes(machine.memory_in_bytes),
                startElement: { type: "Icon", id: "memory", size: 16 },
                color: "teal",
                variant: "filled",
            },
            {
                type: "Chip",
                label: formatBytes(machine.storage_in_bytes),
                startElement: { type: "Icon", id: "hdd", size: 16 },
                color: "cyan",
                variant: "filled",
            },
        ];
        return {
            type: "VerticalCard",
            // Compose header, content, footer
            childrenProps: [
                {
                    type: "CardHeader",
                    title: machine.display_name,
                    description: machine.name,
                    startElement: { type: "Icon", id: "laptop", size: 24 },
                },
                {
                    type: "CardContent",
                    childrenProps: specChips,
                },
                {
                    type: "CardFooter",
                    childrenProps: {
                        type: "Chip",
                        label: prebuildLabel,
                        color: prebuildColor,
                        variant: prebuildVariant,
                        size: "small",
                    },
                },
            ],
        };
    });
    // Return a carousel of machine cards for responsive, swipeable UI
    return {
        type: "Carousel",
        childrenProps: cards,
        gutter: 16,
        infinite: false,
        navControls: true,
        indicators: true,
        // autoplay would distract from informational display
        autoPlay: false,
    };
}
//# sourceMappingURL=939.js.map