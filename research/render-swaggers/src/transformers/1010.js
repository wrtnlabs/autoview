export function transform($input) {
    return visualizeData($input);
}
/**
 * Maps common social providers to FontAwesome icon IDs.
 * Extend this map to support more providers as needed.
 */
const providerIconMap = {
    twitter: "twitter",
    github: "github",
    facebook: "facebook",
    linkedin: "linkedin",
    instagram: "instagram",
    youtube: "youtube",
    // Add more mappings here...
};
/**
 * Transforms an array of social account objects into an AutoView component
 * that visually represents each account with an icon and a link button.
 */
function visualizeData(input) {
    // If there's no data, show a friendly markdown notice
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "*No social accounts available.*",
        };
    }
    // Build a DataListItem for each social account
    const listItems = input.map((account) => {
        const providerKey = account.provider.trim().toLowerCase();
        // Fallback to a generic link icon if provider is unknown
        const iconId = providerIconMap[providerKey] || "link";
        // Left side: icon + provider name
        const labelComponents = [
            {
                type: "Icon",
                id: iconId,
                size: 16,
                color: "blue",
            },
            {
                type: "Text",
                content: ` ${account.provider}`,
                variant: "body1",
            },
        ];
        // Right side: a text button that navigates to the social URL
        const visitButton = {
            type: "Button",
            variant: "text",
            label: "Visit",
            startElement: {
                type: "Icon",
                id: "external-link-alt",
                size: 12,
            },
            href: account.url,
        };
        return {
            type: "DataListItem",
            label: labelComponents,
            value: visitButton,
        };
    });
    // Wrap all items in a DataList for responsive display
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    return dataList;
}
//# sourceMappingURL=1010.js.map