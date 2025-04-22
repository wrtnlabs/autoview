export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Prepare the card header with owner avatar, repo name, and visibility/language info
    const header = {
        type: "CardHeader",
        title: input.full_name,
        description: input.private
            ? `🔒 Private repository • ${(_a = input.language) !== null && _a !== void 0 ? _a : "Unknown language"}`
            : `🌐 Public repository • ${(_b = input.language) !== null && _b !== void 0 ? _b : "Unknown language"}`,
        startElement: {
            type: "Avatar",
            src: input.owner.avatar_url,
            name: input.owner.login,
            size: 40,
            variant: "blue",
        },
    };
    // Use markdown for the description (fallback text if missing)
    const descriptionMd = {
        type: "Markdown",
        content: input.description
            ? input.description
            : "_No description provided._",
    };
    // Build stats as a data list (stars, forks, issues, watchers)
    const statsItems = [
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "star", color: "yellow", size: 16 },
                { type: "Text", content: "Stars", variant: "body2" },
            ],
            value: { type: "Text", content: input.stargazers_count.toString(), variant: "body2" },
        },
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "code-branch", color: "teal", size: 16 },
                { type: "Text", content: "Forks", variant: "body2" },
            ],
            value: { type: "Text", content: input.forks_count.toString(), variant: "body2" },
        },
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "exclamation-circle", color: "red", size: 16 },
                { type: "Text", content: "Open Issues", variant: "body2" },
            ],
            value: { type: "Text", content: input.open_issues_count.toString(), variant: "body2" },
        },
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "eye", color: "cyan", size: 16 },
                { type: "Text", content: "Watchers", variant: "body2" },
            ],
            value: { type: "Text", content: input.watchers_count.toString(), variant: "body2" },
        },
    ];
    const statsList = {
        type: "DataList",
        childrenProps: statsItems,
    };
    // Prepare chips for topics if any
    const topicChips = ((_c = input.topics) !== null && _c !== void 0 ? _c : []).map((topic) => ({
        type: "Chip",
        label: topic,
        variant: "outlined",
        size: "small",
        color: "gray",
    }));
    const chipGroup = {
        type: "ChipGroup",
        childrenProps: topicChips,
    };
    // A button linking to the repository on GitHub, with a GitHub icon
    const viewButton = {
        type: "Button",
        label: "View on GitHub",
        variant: "outlined",
        color: "primary",
        size: "small",
        href: input.html_url,
        startElement: {
            type: "Icon",
            id: "github",
            color: "darkGray",
            size: 16,
        },
    };
    // Assemble card content (description + stats)
    const content = {
        type: "CardContent",
        childrenProps: [descriptionMd, statsList],
    };
    // Assemble card footer: topics (if any) and the action button
    const footerChildren = [];
    if (topicChips.length > 0) {
        footerChildren.push(chipGroup);
    }
    footerChildren.push(viewButton);
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Return a vertical card combining all parts
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=570.js.map