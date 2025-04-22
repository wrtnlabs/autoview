export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure the public IP limits from the input
    const { maximum, current_usage } = input.public_ips;
    // Compute remaining IPs, ensure non-negative
    const remaining = Math.max(maximum - current_usage, 0);
    // Determine usage ratio and select a chip color for visual cue
    const usageRatio = maximum > 0 ? current_usage / maximum : 0;
    let usageColor = "gray";
    if (usageRatio >= 0.9)
        usageColor = "error";
    else if (usageRatio >= 0.7)
        usageColor = "warning";
    else if (usageRatio > 0)
        usageColor = "success";
    // Build a markdown table to present the metrics in a compact and responsive way
    const markdownTable = maximum > 0
        ? [
            "| Metric              | Value |",
            "| ------------------- | ----- |",
            `| Total Available IPs | ${maximum}   |`,
            `| IPs in Use          | ${current_usage}   |`,
            `| IPs Remaining       | ${remaining}   |`,
        ].join("\n")
        : "> **Note:** No static public IP addresses are allocated.";
    return {
        // Use a vertical card to structure header and content responsively
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with icon, title, a summary description, and a usage percentage chip
                type: "CardHeader",
                title: "Static Public IP Limits",
                description: `Usage: ${current_usage}/${maximum}`,
                startElement: {
                    type: "Icon",
                    id: "network-wired",
                    color: "blue",
                    size: 24,
                },
                endElement: {
                    type: "Chip",
                    label: maximum > 0
                        ? `${Math.round(usageRatio * 100)}%`
                        : "0%",
                    variant: "filled",
                    color: usageColor,
                },
            },
            {
                // Card content renders the markdown table with the metrics
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: markdownTable,
                },
            },
        ],
    };
}
//# sourceMappingURL=381.js.map