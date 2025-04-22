export function transform($input) {
    return visualizeData($input);
}
/**
 * Transforms an array of runner_application objects into a carousel of cards,
 * each showing details and a download action.
 */
function visualizeData(input) {
    // Helper to choose an OS-specific icon
    const mapOSIcon = (os) => {
        const name = os.toLowerCase();
        let iconId = "server";
        if (name.includes("windows"))
            iconId = "windows";
        else if (name.includes("linux"))
            iconId = "linux";
        else if (name.includes("darwin") || name.includes("mac"))
            iconId = "apple";
        return {
            type: "Icon",
            id: iconId,
            size: 32,
            color: "blue",
        };
    };
    // Empty case: show a friendly message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No runners available.\nPlease check back later.",
        };
    }
    // Build a VerticalCard for each runner entry
    const cards = input.map((item) => {
        // Compose download URL, attach token if present
        const downloadUrl = item.temp_download_token
            ? `${item.download_url}?token=${encodeURIComponent(item.temp_download_token)}`
            : item.download_url;
        // Card header: filename as title, OS/arch as description, OS icon
        const header = {
            type: "CardHeader",
            title: item.filename,
            description: `${item.os} / ${item.architecture}`,
            startElement: mapOSIcon(item.os),
        };
        // Card content: show a list of details via markdown for readability
        const detailsMdLines = [
            `- **Download URL:** [Click here](${downloadUrl})`,
            item.sha256_checksum ? `- **SHA256:** \`${item.sha256_checksum}\`` : undefined,
        ].filter(Boolean);
        const content = {
            type: "CardContent",
            childrenProps: {
                type: "Markdown",
                content: detailsMdLines.join("\n"),
            },
        };
        // Card footer: a prominent download button
        const footer = {
            type: "CardFooter",
            childrenProps: {
                type: "Button",
                label: "Download",
                color: "primary",
                variant: "contained",
                size: "medium",
                href: downloadUrl,
            },
        };
        // Combine into a vertical card
        const card = {
            type: "VerticalCard",
            childrenProps: [header, content, footer],
        };
        return card;
    });
    // If only one card, return it directly for a simpler UI
    if (cards.length === 1) {
        return cards[0];
    }
    // Otherwise return a carousel to allow swiping through multiple runners
    const carousel = {
        type: "Carousel",
        childrenProps: cards,
        gutter: 16,
        indicators: true,
        navControls: true,
        infinite: false,
        autoPlay: false,
    };
    return carousel;
}
//# sourceMappingURL=588.js.map