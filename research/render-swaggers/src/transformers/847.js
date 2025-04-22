export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e;
    // Prepare the card header with the release tag, name, author avatar, and draft/prerelease chip
    const header = {
        type: "CardHeader",
        title: input.tag_name,
        // Use the release "name" as description if provided
        description: (_a = input.name) !== null && _a !== void 0 ? _a : "",
        // Show author avatar on the left
        startElement: {
            type: "Avatar",
            src: input.author.avatar_url,
            name: input.author.login,
            variant: "primary",
            size: 32,
        },
        // Show a chip on the right indicating draft or prerelease status
        endElement: {
            type: "Chip",
            label: input.draft
                ? "Draft"
                : input.prerelease
                    ? "Prerelease"
                    : "Release",
            variant: "outlined",
            size: "small",
            color: input.draft
                ? "warning"
                : input.prerelease
                    ? "info"
                    : "success",
        },
    };
    // Compose the markdown body: include release date and body content
    const mdContent = `**Published:** ${(_b = input.published_at) !== null && _b !== void 0 ? _b : "N/A"}\n\n${(_c = input.body) !== null && _c !== void 0 ? _c : "_No release notes provided._"}`;
    const markdown = {
        type: "Markdown",
        content: mdContent,
    };
    // Build a data list of assets if any; otherwise a simple text
    let assetsSection;
    if (Array.isArray(input.assets) && input.assets.length > 0) {
        const items = input.assets.map((asset) => ({
            type: "DataListItem",
            // Label is the asset file name
            label: {
                type: "Text",
                content: asset.name,
                variant: "body2",
            },
            // Value is a download button
            value: {
                type: "Button",
                label: "Download",
                variant: "outlined",
                size: "small",
                href: asset.browser_download_url,
            },
        }));
        assetsSection = {
            type: "DataList",
            childrenProps: items,
        };
    }
    else {
        assetsSection = {
            type: "Text",
            content: "No assets attached to this release.",
            variant: "body2",
        };
    }
    // Footer chips: asset count and reactions if available
    const footerChips = [];
    // Asset count chip
    footerChips.push({
        type: "Chip",
        label: `Assets: ${(_e = (_d = input.assets) === null || _d === void 0 ? void 0 : _d.length) !== null && _e !== void 0 ? _e : 0}`,
        variant: "outlined",
        size: "small",
        color: "primary",
    });
    // Reaction count chip if present
    if (input.reactions) {
        footerChips.push({
            type: "Chip",
            label: `Reactions: ${input.reactions.total_count}`,
            variant: "outlined",
            size: "small",
            color: "secondary",
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "ChipGroup",
            childrenProps: footerChips,
            maxItems: footerChips.length,
        },
    };
    // Assemble the vertical card with header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: [markdown, assetsSection],
            },
            footer,
        ],
    };
    return card;
}
//# sourceMappingURL=847.js.map