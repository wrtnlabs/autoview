export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Recursively generate a Markdown bullet list representing the category tree.
     * We use Markdown for nested lists, since AutoView supports it natively,
     * and it will render nicely on all devices.
     */
    function buildMarkdownTree(categories, level = 0) {
        let md = "";
        const indent = "  ".repeat(level);
        for (const cat of categories) {
            // Format the creation time in a human‐readable way
            const created = new Date(cat.created_at).toLocaleString();
            md += `${indent}- **${cat.name}**  \n`;
            md += `${indent}  - Code: \`${cat.code}\`  \n`;
            md += `${indent}  - Created at: ${created}  \n`;
            if (cat.children && cat.children.length > 0) {
                md += buildMarkdownTree(cat.children, level + 1);
            }
        }
        return md;
    }
    // Generate the markdown content for all top‐level categories
    const markdownContent = buildMarkdownTree(input.categories);
    // Compose a VerticalCard to present the channel as a card
    // with a header (including an icon) and markdown content.
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                // CardHeader shows the channel's name and code with an icon
                type: "CardHeader",
                title: input.name,
                description: `Channel Code: ${input.code}`,
                startElement: {
                    type: "Icon",
                    id: "sitemap", // a hierarchical/folder-like icon
                    color: "teal",
                    size: 24
                }
            },
            {
                // CardContent holds our markdown tree
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: markdownContent
                }
            }
        ]
    };
    return card;
}
//# sourceMappingURL=46.js.map