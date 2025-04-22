export function transform($input) {
    return visualizeData($input);
}
// Transforms a GitHub Gist object into an AutoView vertical card presentation
function visualizeData(input) {
    var _a, _b;
    // Helper to format optional date strings into a localized representation.
    const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleString() : "N/A";
    // Build a list of chips representing each file in the gist.
    const fileChips = [];
    if (input.files) {
        for (const filename in input.files) {
            const file = input.files[filename];
            if (file) {
                fileChips.push({
                    type: "Chip",
                    label: (_a = file.filename) !== null && _a !== void 0 ? _a : filename,
                    variant: "outlined",
                    // color can be customized or omitted
                });
            }
        }
    }
    // Construct data list items for various gist metadata
    const dataListItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Files", variant: "subtitle2" },
            value: {
                type: "ChipGroup",
                childrenProps: fileChips,
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created At", variant: "subtitle2" },
            value: {
                type: "Text",
                content: formatDate(input.created_at),
                variant: "body2",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Updated At", variant: "subtitle2" },
            value: {
                type: "Text",
                content: formatDate(input.updated_at),
                variant: "body2",
            },
        },
    ];
    // If an owner exists, show their avatar in the list
    if (input.owner) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Owner", variant: "subtitle2" },
            value: {
                type: "Avatar",
                src: input.owner.avatar_url,
                name: input.owner.login,
                size: 32,
            },
        });
    }
    // Display number of forks if available
    if (Array.isArray(input.forks)) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Forks", variant: "subtitle2" },
            value: {
                type: "Text",
                content: `${input.forks.length}`,
                variant: "body2",
            },
        });
    }
    // Core data list component
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Card header: shows gist description or fallback title, owner avatar, and comment count
    const cardHeader = Object.assign(Object.assign({ type: "CardHeader", title: (_b = input.description) !== null && _b !== void 0 ? _b : `Gist ${input.id}` }, (input.owner && {
        startElement: {
            type: "Avatar",
            src: input.owner.avatar_url,
            name: input.owner.login,
            size: 40,
        },
    })), { 
        // Show comment count as a chip with an icon
        endElement: {
            type: "Chip",
            label: input.comments != null ? `${input.comments}` : "0",
            startElement: {
                type: "Icon",
                id: "comment",
                size: 16,
                color: "gray",
            },
        } });
    // Card content: embed the data list
    const cardContent = {
        type: "CardContent",
        childrenProps: [dataList],
    };
    // Card footer: provide a link button to view the gist on GitHub
    const cardFooter = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View on GitHub",
            href: input.html_url,
            startElement: {
                type: "Icon",
                id: "link",
                size: 16,
            },
        },
    };
    // Assemble the vertical card
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
}
//# sourceMappingURL=345.js.map