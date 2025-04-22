export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Filter out any entries missing provider or url, and dedupe by url
    const seen = new Set();
    const accounts = input
        .filter(acc => typeof acc.provider === "string" && typeof acc.url === "string")
        .filter(acc => {
        if (seen.has(acc.url))
            return false;
        seen.add(acc.url);
        return true;
    });
    // If no valid accounts, show a friendly markdown message
    if (accounts.length === 0) {
        return {
            type: "Markdown",
            content: "**No social accounts available.**"
        };
    }
    // Map each social account to a ListItem with an icon and a visit button
    const listItems = accounts.map(acc => {
        // Derive an icon id from the provider name (e.g. "GitHub" -> "github")
        const iconId = acc.provider
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-");
        // Icon for the social provider; size 24px for touch targets on mobile
        const startIcon = {
            type: "Icon",
            id: iconId,
            size: 24,
            color: "blue"
        };
        // A small button that links to the profile URL
        const visitButton = {
            type: "Button",
            variant: "text",
            size: "small",
            label: "Visit",
            startElement: {
                type: "Icon",
                id: "external-link",
                size: 16,
                color: "gray"
            },
            href: acc.url
        };
        return {
            type: "ListItem",
            title: acc.provider,
            description: acc.url,
            startElement: startIcon,
            // Wrap in an array to support multiple end elements if desired later
            endElement: [visitButton]
        };
    });
    // Return a responsive list of social accounts
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=978.js.map