export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // We will render the entire hierarchy as a mermaid graph for a visual tree.
    // Mermaid diagrams render well on both desktop and mobile in Markdown.
    const lines = ["mermaid", "graph TD"];
    // Sanitize an ID to a valid mermaid node identifier (must start with a letter, no spaces)
    const sanitizeId = (raw) => "N" + raw.replace(/[^a-zA-Z0-9_]/g, "_");
    // Escape quotes in labels
    const escapeLabel = (label) => label.replace(/"/g, '\\"');
    // Recursive function to declare nodes and edges
    function traverse(node) {
        const nodeId = sanitizeId(node.id);
        const label = `${escapeLabel(node.name)} (${escapeLabel(node.code)})`;
        // Declare the node with a label
        lines.push(`  ${nodeId}["${label}"]`);
        // Recurse into children
        for (const child of node.children) {
            const childId = sanitizeId(child.id);
            // Draw an edge from this node to its child
            lines.push(`  ${nodeId} --> ${childId}`);
            traverse(child);
        }
    }
    // Root channel node
    const rootId = sanitizeId(input.id);
    const rootLabel = `${escapeLabel(input.name)} (${escapeLabel(input.code)})`;
    lines.push(`  ${rootId}["${rootLabel}"]`);
    // Connect root channel to top‐level categories
    for (const cat of input.categories) {
        const catId = sanitizeId(cat.id);
        lines.push(`  ${rootId} --> ${catId}`);
        traverse(cat);
    }
    lines.push("```");
    const content = lines.join("\n");
    // Return a markdown component that includes our mermaid diagram
    return {
        type: "Markdown",
        content,
    };
}
//# sourceMappingURL=164.js.map