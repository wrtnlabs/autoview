export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Choose a human‐readable date string: prefer published_at, fallback to created_at
    const date = (_a = input.published_at) !== null && _a !== void 0 ? _a : input.created_at;
    // Format title: use the release name if present, otherwise the tag name
    const title = (_b = input.name) !== null && _b !== void 0 ? _b : input.tag_name;
    // Header: show author avatar, title, published date; show a "Pre-release" chip if needed
    const header = {
        type: "CardHeader",
        title,
        description: `Published at ${date}`,
        startElement: {
            type: "Avatar",
            src: input.author.avatar_url,
            // use login as alt text
            name: input.author.login,
            size: 40,
            variant: "gray",
        },
        endElement: input.prerelease
            ? {
                type: "Chip",
                label: "Pre-release",
                variant: "outlined",
                color: "warning",
                size: "small",
            }
            : undefined,
    };
    // Content: render markdown body if available
    const content = {
        type: "CardContent",
        childrenProps: input.body
            ? {
                type: "Markdown",
                content: input.body,
            }
            : {
                type: "Text",
                content: "No release notes provided.",
                variant: "body2",
            },
    };
    // Footer: list all assets with download buttons
    const assetItems = input.assets.map((asset) => {
        // A button to download the asset
        const downloadButton = {
            type: "Button",
            label: "Download",
            variant: "contained",
            color: "primary",
            size: "small",
            href: asset.browser_download_url,
        };
        // Each list item: asset name on the left, download button on the right
        return {
            type: "DataListItem",
            label: {
                type: "Text",
                content: asset.name,
                variant: "body1",
            },
            value: downloadButton,
        };
    });
    // If there are no assets, display a descriptive text
    const footerChildren = assetItems.length
        ? {
            type: "DataList",
            childrenProps: assetItems,
        }
        : {
            type: "Text",
            content: "No downloadable assets.",
            variant: "body2",
        };
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Assemble a vertical card containing header, content, footer
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=853.js.map