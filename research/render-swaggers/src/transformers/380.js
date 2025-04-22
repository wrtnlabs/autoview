export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Map runner source to a chip color variant.
     */
    const getSourceColor = (source) => {
        switch (source) {
            case "github":
                return "cyan";
            case "partner":
                return "green";
            case "custom":
                return "orange";
            default:
                return "gray";
        }
    };
    /**
     * Map platform keyword to an avatar color variant.
     */
    const getPlatformVariant = (platform) => {
        const p = platform.toLowerCase();
        if (p.includes("win"))
            return "blue";
        if (p.includes("ubuntu") || p.includes("linux"))
            return "orange";
        if (p.includes("mac") || p.includes("osx"))
            return "darkGray";
        return "teal";
    };
    // If there are no images, show a markdown notice.
    if (!input.images || input.images.length === 0) {
        return {
            type: "Markdown",
            content: "**No hosted runner images found.**",
        };
    }
    // Build a DataListItem for each runner image.
    const listItems = input.images.map((img) => {
        const avatar = {
            type: "Avatar",
            name: img.platform,
            variant: getPlatformVariant(img.platform),
            size: 28,
        };
        const titleText = {
            type: "Text",
            content: img.display_name,
            variant: "body1",
            color: "primary",
        };
        // Chip for size in GB
        const sizeChip = {
            type: "Chip",
            label: `${img.size_gb} GB`,
            size: "small",
            variant: "outlined",
            color: "secondary",
        };
        // Chip for source
        const sourceChip = {
            type: "Chip",
            label: img.source,
            size: "small",
            variant: "filled",
            color: getSourceColor(img.source),
        };
        return {
            type: "DataListItem",
            // combine avatar + text as label
            label: [avatar, titleText],
            // show size and source as inline chips
            value: [sizeChip, sourceChip],
        };
    });
    // Wrap the list items in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Construct a header for the card summarizing total images
    const header = {
        type: "CardHeader",
        title: "Hosted Runner Images",
        description: `${input.total_count} image${input.total_count !== 1 ? "s" : ""}`,
        // use a generic server icon for the header
        startElement: {
            type: "Icon",
            id: "server",
            size: 32,
            color: "teal",
        },
    };
    // Place the data list into the card content area
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Return a vertical card with header + content
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=380.js.map