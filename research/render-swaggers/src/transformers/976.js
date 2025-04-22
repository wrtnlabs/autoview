export function transform($input) {
    return visualizeData($input);
}
// Transforms a GitHub full repository object into a visual AutoView component
function visualizeData(input) {
    var _a, _b;
    // 1. Card header: repo name, optional description, and owner avatar
    const header = {
        type: "CardHeader",
        title: input.full_name,
        // if description is null, undefined will omit it in rendering
        description: (_a = input.description) !== null && _a !== void 0 ? _a : undefined,
        startElement: {
            type: "Avatar",
            src: input.owner.avatar_url,
            // use the owner's real name if present, otherwise login
            name: (_b = input.owner.name) !== null && _b !== void 0 ? _b : input.owner.login,
            variant: "info",
            size: 40,
        },
    };
    // 2. Build stat chips: stars, forks, watchers, open issues
    const statsChips = [
        {
            type: "Chip",
            label: input.stargazers_count.toString(),
            variant: "filled",
            color: "yellow",
            size: "small",
            startElement: { type: "Icon", id: "star", color: "yellow", size: 12 },
        },
        {
            type: "Chip",
            label: input.forks_count.toString(),
            variant: "filled",
            color: "cyan",
            size: "small",
            startElement: { type: "Icon", id: "code-branch", color: "cyan", size: 12 },
        },
        {
            type: "Chip",
            label: input.watchers_count.toString(),
            variant: "filled",
            color: "blue",
            size: "small",
            startElement: { type: "Icon", id: "eye", color: "blue", size: 12 },
        },
        {
            type: "Chip",
            label: input.open_issues_count.toString(),
            variant: "filled",
            color: "red",
            size: "small",
            startElement: { type: "Icon", id: "exclamation-circle", color: "red", size: 12 },
        },
    ];
    // 3. Card content: a group of stat chips, plus topics rendered as markdown if any
    const contentChildren = [
        {
            type: "ChipGroup",
            childrenProps: statsChips,
        },
    ];
    if (Array.isArray(input.topics) && input.topics.length > 0) {
        // Render the list of topics inline using markdown for quick scanning
        const topicsMarkdown = "**Topics:** " + input.topics.map((t) => `\`${t}\``).join(", ");
        contentChildren.push({
            type: "Markdown",
            content: topicsMarkdown,
        });
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // 4. Card footer: a primary action button linking to the repository page
    const footer = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "Button",
                variant: "contained",
                color: "primary",
                label: "View Repository",
                href: input.html_url,
                endElement: { type: "Icon", id: "arrow-right", size: 16 },
            },
        ],
    };
    // 5. Compose a vertical card with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=976.js.map