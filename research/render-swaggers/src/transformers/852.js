export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Header: show release title/tag, author avatar, and a chip for prerelease or draft status
    const header = {
        type: "CardHeader",
        title: (_a = input.name) !== null && _a !== void 0 ? _a : input.tag_name,
        description: `Tag: ${input.tag_name}`,
        startElement: {
            type: "Avatar",
            src: input.author.avatar_url,
            name: input.author.login,
        },
        endElement: {
            type: "Chip",
            label: input.prerelease ? "Prerelease" : "Release",
            variant: "outlined",
            color: input.prerelease ? "warning" : "success",
            size: "small",
        },
    };
    // Content: render the release body as markdown if present
    const contentChildren = [];
    if (input.body) {
        contentChildren.push({
            type: "Markdown",
            content: input.body,
        });
    }
    // If there are assets, list them with a download button
    if (input.assets && input.assets.length > 0) {
        const assetItems = input.assets.map((asset) => ({
            type: "DataListItem",
            // Asset file name
            label: {
                type: "Text",
                content: asset.name,
                variant: "body2",
            },
            // Download button linking to the asset
            value: {
                type: "Button",
                label: "Download",
                href: asset.browser_download_url,
                variant: "outlined",
                color: "primary",
                size: "small",
            },
        }));
        contentChildren.push({
            type: "DataList",
            childrenProps: assetItems,
        });
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren.length > 0 ? contentChildren : undefined,
    };
    // Footer: link to the full release page on GitHub
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View on GitHub",
            href: input.html_url,
            variant: "text",
            color: "info",
        },
    };
    // Compose into a vertical card for responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=852.js.map