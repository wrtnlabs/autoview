export function transform($input) {
    return visualizeData($input);
}
// Transforms a GitHub Pages deployment record into a visually engaging AutoView card.
function visualizeData(input) {
    // 1. Card Header: Title with a GitHub icon
    const header = {
        type: "CardHeader",
        title: "GitHub Pages Deployment",
        startElement: {
            type: "Icon",
            id: "github", // FontAwesome GitHub icon (kebab-case)
            size: 24 // Reasonable size for visibility
        }
    };
    // 2. Build list of details (ID, optional preview link)
    const items = [];
    // Deployment ID as a colored chip for quick scanning
    items.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Deployment ID",
            variant: "subtitle2"
        },
        value: {
            type: "Chip",
            label: String(input.id),
            variant: "filled",
            color: "primary",
            size: "small"
        }
    });
    // Preview link if available
    if (input.preview_url) {
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Preview",
                variant: "subtitle2"
            },
            value: {
                type: "Button",
                variant: "text",
                label: "Open Preview",
                href: input.preview_url,
                startElement: {
                    type: "Icon",
                    id: "eye",
                    size: 16
                }
            }
        });
    }
    // 3. Assemble the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // 4. Card Content: wrap the DataList
    const content = {
        type: "CardContent",
        childrenProps: [dataList]
    };
    // 5. Card Footer: action buttons for page and status monitoring
    const footerButtons = [
        {
            type: "Button",
            variant: "contained",
            color: "success",
            label: "View Site",
            href: input.page_url,
            startElement: {
                type: "Icon",
                id: "external-link",
                size: 16
            }
        },
        {
            type: "Button",
            variant: "contained",
            color: "info",
            label: "Check Status",
            href: input.status_url,
            startElement: {
                type: "Icon",
                id: "sync",
                size: 16
            }
        }
    ];
    const footer = {
        type: "CardFooter",
        childrenProps: footerButtons
    };
    // 6. Final Vertical Card composition
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
    return card;
}
//# sourceMappingURL=819.js.map