export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map runner status to an icon representation
    const statusIconMap = {
        Ready: { type: "Icon", id: "check-circle", color: "green", size: 20 },
        Provisioning: { type: "Icon", id: "cog", color: "blue", size: 20 },
        Shutdown: { type: "Icon", id: "power-off", color: "gray", size: 20 },
        Deleting: { type: "Icon", id: "trash-alt", color: "red", size: 20 },
        Stuck: { type: "Icon", id: "exclamation-triangle", color: "orange", size: 20 },
    };
    // Helper to format date-time or fallback
    const formattedLastActive = input.last_active_on
        ? new Date(input.last_active_on).toLocaleString()
        : "Never";
    // Build a DataList of machine specs and image info
    const detailsList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: { type: "Text", content: "Machine Specs" },
                value: {
                    type: "Markdown",
                    content: `- **Cores**: ${input.machine_size_details.cpu_cores}\n` +
                        `- **Memory**: ${input.machine_size_details.memory_gb} GB\n` +
                        `- **Storage**: ${input.machine_size_details.storage_gb} GB`
                }
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Image Details" },
                value: input.image_details
                    ? {
                        type: "Markdown",
                        content: `- **ID**: ${input.image_details.id}\n` +
                            `- **Name**: ${input.image_details.display_name}\n` +
                            `- **Size**: ${input.image_details.size_gb} GB\n` +
                            `- **Source**: ${input.image_details.source}`
                    }
                    : {
                        type: "Text",
                        content: "No image information",
                    }
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Runner Group ID" },
                value: {
                    type: "Text",
                    content: input.runner_group_id !== undefined
                        ? `${input.runner_group_id}`
                        : "N/A",
                }
            }
        ]
    };
    // Build a footer with last active time and public IPs if enabled
    const footerChildren = [
        {
            type: "Text",
            variant: "caption",
            content: `**Last Active**: ${formattedLastActive}`,
            color: "secondary"
        }
    ];
    if (input.public_ip_enabled && Array.isArray(input.public_ips) && input.public_ips.length > 0) {
        // Convert each public IP to a Chip
        const ipChips = input.public_ips.map((ip) => {
            const labelParts = [];
            if (ip.prefix)
                labelParts.push(ip.prefix);
            if (ip.length !== undefined)
                labelParts.push(`/${ip.length}`);
            return {
                type: "Chip",
                label: labelParts.join(""),
                color: "info",
                variant: "outlined"
            };
        });
        footerChildren.push({
            type: "ChipGroup",
            childrenProps: ipChips,
            maxItems: ipChips.length
        });
    }
    // Compose the VerticalCard with header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: input.name,
                description: input.platform,
                startElement: statusIconMap[input.status] || {
                    type: "Icon", id: "question-circle", color: "gray", size: 20
                }
            },
            {
                type: "CardContent",
                childrenProps: detailsList
            },
            {
                type: "CardFooter",
                childrenProps: footerChildren
            }
        ]
    };
    return card;
}
//# sourceMappingURL=385.js.map