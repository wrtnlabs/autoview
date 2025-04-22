export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to sanitize IDs for mermaid (must start with letter, no hyphens)
    const sanitize = (id) => {
        // Replace non-alphanumeric with underscore, prefix with 'n' if starting with digit
        let clean = id.replace(/[^a-zA-Z0-9]/g, "_");
        if (/^[0-9]/.test(clean))
            clean = "n" + clean;
        return clean;
    };
    // Traverse the category tree to build mermaid nodes and edges
    const nodes = new Set();
    const edges = [];
    const traverse = (node) => {
        const nodeId = sanitize(node.id);
        // Define the node label using the category name (escape brackets)
        const label = node.name.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
        nodes.add(`${nodeId}["${label}"]`);
        for (const child of node.children || []) {
            const childId = sanitize(child.id);
            // Ensure the child node is defined
            traverse(child);
            // Create an edge from parent to child
            edges.push(`${nodeId} --> ${childId}`);
        }
    };
    // Build mermaid definitions for all top-level categories
    if (input.categories && input.categories.length > 0) {
        for (const top of input.categories) {
            traverse(top);
        }
        // Compose mermaid diagram code
        const mermaidLines = [
            "graph TD",
            // Node definitions
            ...Array.from(nodes),
            // Edge definitions
            ...edges,
        ];
        const mermaid = mermaidLines.join("\n");
        // Compose markdown content with title and mermaid diagram
        const content = [
            `## Channel: ${input.name}`,
            `*Code:* \`${input.code}\`  `,
            `*Created:* ${new Date(input.created_at).toLocaleString()}`,
            "",
            "mermaid",
            mermaid,
            "```",
        ].join("\n");
        return {
            type: "Markdown",
            content,
        };
    }
    else {
        // Fallback: no categories to display, show a friendly message
        return {
            type: "Text",
            variant: "body1",
            content: "No categories available for this channel.",
        };
    }
}
//# sourceMappingURL=165.js.map