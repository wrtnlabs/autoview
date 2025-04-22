export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper: format ISO date string to a simple local date
    const formatDate = (iso) => iso ? new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : undefined;
    // Map GitHub reaction keys to FontAwesome icon IDs
    const reactionIconMap = {
        url: "link",
        total_count: "chart-bar",
        "+1": "thumbs-up",
        "-1": "thumbs-down",
        laugh: "laugh",
        confused: "meh",
        heart: "heart",
        hooray: "trophy",
        eyes: "eye",
        rocket: "rocket",
    };
    // Build a list item for each asset (download link button)
    const assetListItem = (asset) => ({
        type: "DataListItem",
        label: {
            type: "Text",
            content: `📦 ${asset.name} (${asset.size.toLocaleString()} bytes)`,
        },
        value: {
            type: "Button",
            variant: "outlined",
            size: "small",
            startElement: { type: "Icon", id: "download", size: 16 },
            label: "Download",
            href: asset.browser_download_url,
        },
    });
    // If there are assets, wrap them in a DataList
    const assetsComponent = input.assets && input.assets.length > 0
        ? {
            type: "DataList",
            childrenProps: input.assets.map(assetListItem),
        }
        : undefined;
    // Build reaction chips if reactions rollup is provided
    const reactionChips = [];
    if (input.reactions) {
        Object.keys(input.reactions).forEach((key) => {
            const count = input.reactions[key];
            // Skip URL and total_count fields
            if (key === "url" || key === "total_count" || count <= 0)
                return;
            reactionChips.push({
                type: "Chip",
                variant: "outlined",
                size: "small",
                color: "gray",
                startElement: { type: "Icon", id: reactionIconMap[key], size: 12 },
                label: count.toString(),
            });
        });
    }
    // Wrap reaction chips in a ChipGroup if any
    const reactionsComponent = reactionChips.length > 0
        ? {
            type: "ChipGroup",
            childrenProps: reactionChips,
        }
        : undefined;
    // Compose CardHeader: show author avatar, title and subtitle
    const header = {
        type: "CardHeader",
        // Title prefers release name, fallback to tag name
        title: (_a = input.name) !== null && _a !== void 0 ? _a : input.tag_name,
        // Subtitle shows tag, created and published dates
        description: [
            `Tag: ${input.tag_name}`,
            input.draft ? "Draft" : undefined,
            input.prerelease ? "Prerelease" : undefined,
            `Created: ${formatDate(input.created_at)}`,
            input.published_at ? `Published: ${formatDate(input.published_at)}` : undefined,
        ]
            .filter(Boolean)
            .join(" • "),
        startElement: {
            type: "Avatar",
            src: input.author.avatar_url,
            name: input.author.login,
            size: 36,
        },
    };
    // Compose CardContent: markdown body + assets list
    const contentChildren = [];
    if (input.body) {
        contentChildren.push({
            type: "Markdown",
            content: input.body,
        });
    }
    else {
        contentChildren.push({
            type: "Text",
            content: "No description provided.",
        });
    }
    if (assetsComponent) {
        contentChildren.push({ type: "Divider", orientation: "horizontal", color: "#e0e0e0" });
        contentChildren.push(assetsComponent);
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Compose CardFooter: reactions summary
    const footer = {
        type: "CardFooter",
        childrenProps: reactionsComponent ? reactionsComponent : [],
    };
    // Final vertical card assembly
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=854.js.map