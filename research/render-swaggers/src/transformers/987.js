export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no packages, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "## No packages available\nIt looks like there are no packages to display."
        };
    }
    // Map each package to a VerticalCard for a rich, responsive UI
    const cards = input.map((pkg) => {
        // Header with package name, type, and owner avatar if available
        const header = {
            type: "CardHeader",
            title: pkg.name,
            description: pkg.package_type,
            startElement: pkg.owner
                ? {
                    type: "Avatar",
                    src: pkg.owner.avatar_url,
                    name: pkg.owner.login,
                    size: 40,
                    variant: "blue"
                }
                : {
                    type: "Icon",
                    id: "cube", // fallback package icon
                    color: "gray",
                    size: 32
                }
        };
        // DataList showing key package metrics
        const dataListItems = [
            {
                type: "DataListItem",
                label: [{ type: "Text", content: ["📦 Versions"] }],
                value: [{ type: "Text", content: [String(pkg.version_count)] }]
            },
            {
                type: "DataListItem",
                label: [{ type: "Text", content: ["👁 Visibility"] }],
                value: [{ type: "Text", content: [pkg.visibility] }]
            },
            {
                type: "DataListItem",
                label: [{ type: "Text", content: ["🕒 Created At"] }],
                value: [{ type: "Text", content: [new Date(pkg.created_at).toLocaleDateString()] }]
            },
            {
                type: "DataListItem",
                label: [{ type: "Text", content: ["⚙️ Updated At"] }],
                value: [{ type: "Text", content: [new Date(pkg.updated_at).toLocaleDateString()] }]
            }
        ];
        const content = {
            type: "CardContent",
            childrenProps: [
                {
                    type: "DataList",
                    childrenProps: dataListItems
                }
            ]
        };
        // Footer with a button linking to the package page
        const footer = {
            type: "CardFooter",
            childrenProps: {
                type: "Button",
                variant: "outlined",
                color: "primary",
                size: "medium",
                label: "View on GitHub",
                href: pkg.html_url
            }
        };
        return {
            type: "VerticalCard",
            childrenProps: [header, content, footer]
        };
    });
    // Wrap all cards in a responsive carousel
    const carousel = {
        type: "Carousel",
        autoPlay: false,
        infinite: false,
        indicators: true,
        navControls: true,
        interval: 40, // smooth scrolling physics
        childrenProps: cards
    };
    return carousel;
}
//# sourceMappingURL=987.js.map