export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Utility to map platform names to a consistent chip color
    const mapPlatformColor = (platform) => {
        const key = platform.toLowerCase();
        if (key.includes("windows"))
            return "blue";
        if (key.includes("ubuntu") || key.includes("linux"))
            return "orange";
        if (key.includes("mac") || key.includes("osx"))
            return "gray";
        return "teal";
    };
    // Utility to map source types to a chip color
    const mapSourceColor = (source) => {
        switch (source) {
            case "github":
                return "cyan";
            case "partner":
                return "green";
            case "custom":
                return "secondary";
            default:
                return "gray";
        }
    };
    // Build a DataListItem for each runner image
    const dataListItems = input.images.map((image) => {
        // A chip showing the OS/platform
        const platformChip = {
            type: "Chip",
            label: image.platform,
            variant: "filled",
            size: "small",
            color: mapPlatformColor(image.platform),
        };
        // A chip showing the disk size in GB
        const sizeChip = {
            type: "Chip",
            label: `${image.size_gb} GB`,
            variant: "outlined",
            size: "small",
            color: "info",
        };
        // A chip showing the image source
        const sourceChip = {
            type: "Chip",
            label: image.source,
            variant: "outlined",
            size: "small",
            color: mapSourceColor(image.source),
        };
        return {
            type: "DataListItem",
            // The display name as the label
            label: [
                {
                    type: "Text",
                    content: image.display_name,
                    variant: "body1",
                },
            ],
            // Show platform, size, and source as chips in the value area
            value: [platformChip, sizeChip, sourceChip],
        };
    });
    // The card header summarizing the total
    const header = {
        type: "CardHeader",
        title: "Hosted Runner Images",
        description: `${input.total_count} image${input.total_count !== 1 ? "s" : ""}`,
        startElement: {
            type: "Icon",
            id: "server", // using a server icon to hint at runner hosts
            size: 24,
            color: "blue",
        },
    };
    // Depending on whether we have any images, show a DataList or a friendly markdown message
    const contentChildren = [];
    if (input.images.length > 0) {
        const dataList = {
            type: "DataList",
            childrenProps: dataListItems,
        };
        contentChildren.push(dataList);
    }
    else {
        // Graceful empty state
        const markdown = {
            type: "Markdown",
            content: "### No runner images found.\n\nPlease check back later or supply custom images.",
        };
        contentChildren.push(markdown);
    }
    const cardContent = {
        type: "CardContent",
        // We embed the DataList or Markdown as a child component
        childrenProps: contentChildren,
    };
    // Wrap everything in a VerticalCard for a compact, responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, cardContent],
    };
    return card;
}
//# sourceMappingURL=379.js.map