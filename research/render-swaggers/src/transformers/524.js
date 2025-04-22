export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map breakdown keys to human-readable names and icons
    const breakdownMapping = {
        UBUNTU: { name: "Ubuntu", icon: "ubuntu" },
        MACOS: { name: "macos", icon: "apple" },
        WINDOWS: { name: "Windows", icon: "windows" },
        ubuntu_4_core: { name: "Ubuntu (4‑core)", icon: "microchip" },
        ubuntu_8_core: { name: "Ubuntu (8‑core)", icon: "microchip" },
        ubuntu_16_core: { name: "Ubuntu (16‑core)", icon: "microchip" },
        ubuntu_32_core: { name: "Ubuntu (32‑core)", icon: "microchip" },
        ubuntu_64_core: { name: "Ubuntu (64‑core)", icon: "microchip" },
        windows_4_core: { name: "Windows (4‑core)", icon: "microchip" },
        windows_8_core: { name: "Windows (8‑core)", icon: "microchip" },
        windows_16_core: { name: "Windows (16‑core)", icon: "microchip" },
        windows_32_core: { name: "Windows (32‑core)", icon: "microchip" },
        windows_64_core: { name: "Windows (64‑core)", icon: "microchip" },
        macos_12_core: { name: "macOS (12‑core)", icon: "microchip" },
    };
    // Order in which to display breakdown entries
    const breakdownOrder = [
        "UBUNTU",
        "MACOS",
        "WINDOWS",
        "ubuntu_4_core",
        "ubuntu_8_core",
        "ubuntu_16_core",
        "ubuntu_32_core",
        "ubuntu_64_core",
        "windows_4_core",
        "windows_8_core",
        "windows_16_core",
        "windows_32_core",
        "windows_64_core",
        "macos_12_core",
    ];
    // Build DataListItem components for each non-zero breakdown entry
    const breakdownItems = [];
    for (const key of breakdownOrder) {
        const value = input.minutes_used_breakdown[key];
        if (typeof value === "number" && value > 0) {
            const mapping = breakdownMapping[key];
            breakdownItems.push({
                type: "DataListItem",
                // Label shows an icon + OS name
                label: [
                    { type: "Icon", id: mapping.icon, size: 20, color: "gray" },
                    { type: "Text", content: mapping.name, variant: "body2" }
                ],
                // Value shows minutes used
                value: { type: "Text", content: `${value} min`, variant: "body2" }
            });
        }
    }
    // If no breakdown entries, display a markdown notice
    const contentChildren = breakdownItems.length > 0
        ? { type: "DataList", childrenProps: breakdownItems }
        : { type: "Markdown", content: "_No breakdown data available._" };
    // Prepare chips for aggregate statistics
    const chips = [
        {
            type: "Chip",
            label: `Total Used: ${input.total_minutes_used} min`,
            color: "primary",
            variant: "filled",
            size: "small"
        },
        {
            type: "Chip",
            label: `Paid Used: ${input.total_paid_minutes_used} min`,
            color: "success",
            variant: "filled",
            size: "small"
        },
        {
            type: "Chip",
            label: `Free Included: ${input.included_minutes} min`,
            color: "info",
            variant: "outlined",
            size: "small"
        }
    ];
    // Compose the final vertical card UI
    const card = {
        type: "VerticalCard",
        childrenProps: [
            // Header with an icon and title
            {
                type: "CardHeader",
                title: "GitHub Actions Billing",
                startElement: { type: "Icon", id: "github", size: 24, color: "blue" }
            },
            // Main content: either a DataList or a markdown notice
            {
                type: "CardContent",
                childrenProps: contentChildren
            },
            // Footer with a group of chips summarizing totals
            {
                type: "CardFooter",
                childrenProps: {
                    type: "ChipGroup",
                    childrenProps: chips,
                    maxItems: 3
                }
            }
        ]
    };
    return card;
}
//# sourceMappingURL=524.js.map