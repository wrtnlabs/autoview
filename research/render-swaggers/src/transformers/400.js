export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // When there's no runner data, render a friendly markdown notice
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "_No runner applications available._"
        };
    }
    // Map common OS names to FontAwesome icon IDs
    const osIconMap = {
        windows: "windows",
        linux: "linux",
        darwin: "apple"
    };
    // Transform each runner record into a list item
    const items = input.map((runner) => {
        // Pick an icon for the OS, fallback to 'server' if unknown
        const osKey = runner.os.toLowerCase();
        const iconId = osIconMap[osKey] || "server";
        const startIcon = {
            type: "Icon",
            id: iconId,
            color: "blue",
            size: 24
        };
        // Assemble action elements on the right side: download button, checksum chip, and optional badge
        const endItems = [];
        // Primary download button
        endItems.push({
            type: "Button",
            label: "Download",
            variant: "contained",
            color: "primary",
            size: "small",
            href: runner.download_url
        });
        // If a checksum is provided, show a chip with the leading characters
        if (runner.sha256_checksum) {
            const truncated = runner.sha256_checksum.slice(0, 8) + "...";
            endItems.push({
                type: "Chip",
                label: truncated,
                size: "small",
                variant: "outlined",
                color: "gray"
            });
        }
        // If a temporary download token exists, indicate it with a small badge + key icon
        if (runner.temp_download_token) {
            endItems.push({
                type: "Badge",
                count: 1,
                childrenProps: {
                    type: "Icon",
                    id: "key",
                    color: "teal",
                    size: 16
                },
                color: "info",
                maxCount: 1,
                showZero: false,
                offset: { horizontal: "right", vertical: "top" }
            });
        }
        return {
            type: "ListItem",
            title: runner.filename,
            description: `OS: ${runner.os}, Arch: ${runner.architecture}`,
            startElement: startIcon,
            // If only one element, pass it directly; otherwise pass the full array
            endElement: endItems.length === 1 ? endItems[0] : endItems,
            href: runner.download_url
        };
    });
    // Wrap all items in a responsive List component
    return {
        type: "List",
        childrenProps: items
    };
}
//# sourceMappingURL=400.js.map