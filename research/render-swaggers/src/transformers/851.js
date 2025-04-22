export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Build the card header with release title, publish date, and author avatar
    const title = (_a = input.name) !== null && _a !== void 0 ? _a : input.tag_name;
    const publishedDate = input.published_at
        ? new Date(input.published_at).toLocaleDateString()
        : "Unpublished";
    const header = {
        type: "CardHeader",
        title,
        description: `Published at: ${publishedDate}`,
        startElement: {
            type: "Avatar",
            src: input.author.avatar_url,
            name: input.author.login,
        },
        // Show a chip indicating draft/prerelease/full-release status
        endElement: {
            type: "Chip",
            label: input.draft
                ? "Draft"
                : input.prerelease
                    ? "Prerelease"
                    : "Release",
            color: input.draft
                ? "warning"
                : input.prerelease
                    ? "info"
                    : "success",
            variant: "filled",
            size: "small",
        },
    };
    // Build content: markdown for release body and a data list of assets
    const contentChildren = [];
    if (typeof input.body === "string" && input.body.trim() !== "") {
        contentChildren.push({
            type: "Markdown",
            content: input.body,
        });
    }
    if (Array.isArray(input.assets) && input.assets.length > 0) {
        const assetItems = input.assets.map((asset) => ({
            type: "DataListItem",
            // Label with an icon + filename
            label: [
                { type: "Icon", id: "file-alt", size: 16, color: "gray" },
                { type: "Text", content: asset.name },
            ],
            // Download button for each asset
            value: {
                type: "Button",
                label: "Download",
                href: asset.browser_download_url,
                variant: "outlined",
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
        childrenProps: contentChildren,
    };
    // Build footer: show reaction counts as a chip group
    const footerChips = [];
    if (input.reactions) {
        // Map of reaction field to display label
        const reactionFields = [
            ["+1", "+1"],
            ["-1", "-1"],
            ["laugh", "laugh"],
            ["confused", "confused"],
            ["heart", "heart"],
            ["hooray", "hooray"],
            ["eyes", "eyes"],
            ["rocket", "rocket"],
        ];
        reactionFields.forEach(([field, label]) => {
            const count = input.reactions[field];
            if (count > 0) {
                footerChips.push({
                    type: "Chip",
                    label: `${label} ${count}`,
                    variant: "outlined",
                    size: "small",
                    color: "primary",
                });
            }
        });
    }
    const footerChildren = [];
    if (footerChips.length > 0) {
        footerChildren.push({
            type: "ChipGroup",
            childrenProps: footerChips,
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Assemble a vertical card with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=851.js.map