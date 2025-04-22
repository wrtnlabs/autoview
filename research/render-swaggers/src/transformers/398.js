export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no runners, show a friendly Markdown message
    if (!input.runners || input.runners.length === 0) {
        return {
            type: "Markdown",
            content: "**No self-hosted runners found**",
        };
    }
    // Helper: Choose an icon for the OS name
    const getOsIconId = (os) => {
        const lower = os.toLowerCase();
        if (lower.includes("windows"))
            return "windows";
        if (lower.includes("linux"))
            return "linux";
        if (lower.includes("mac") || lower.includes("darwin") || lower.includes("os x"))
            return "apple";
        return "desktop"; // fallback
    };
    // Subheader showing the total count of runners
    const subheader = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: [
            {
                type: "Text",
                content: `Total runners: ${input.total_count}`,
            },
        ],
    };
    // Create one ListItem per runner
    const items = input.runners.map((r) => {
        // Start icon reflects OS and status (online=green, offline=gray)
        const startIcon = {
            type: "Icon",
            id: getOsIconId(r.os),
            color: r.status.toLowerCase() === "online" ? "green" : "gray",
            size: 24,
        };
        // End-element chips for busy/ephemeral flags + custom labels
        const chips = [];
        if (r.busy) {
            chips.push({
                type: "Chip",
                label: "busy",
                color: "orange",
                size: "small",
                variant: "filled",
            });
        }
        if (r.ephemeral) {
            chips.push({
                type: "Chip",
                label: "ephemeral",
                color: "blue",
                size: "small",
                variant: "outlined",
            });
        }
        for (const lbl of r.labels || []) {
            chips.push({
                type: "Chip",
                label: lbl.name,
                color: lbl.type === "custom" ? "cyan" : "gray",
                size: "small",
                variant: "outlined",
            });
        }
        return {
            type: "ListItem",
            title: r.name,
            description: r.os,
            startElement: startIcon,
            endElement: chips.length ? chips : undefined,
        };
    });
    // Compose the final List component
    return {
        type: "List",
        childrenProps: [subheader, ...items],
    };
}
//# sourceMappingURL=398.js.map