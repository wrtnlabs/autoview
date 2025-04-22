export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no branches are provided, show a friendly message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No branches available"
        };
    }
    // Map each branch to a responsive list item
    const listItems = input.map((branch) => {
        // Shorten SHA to first 7 characters
        const shaShort = branch.commit.sha.slice(0, 7);
        // Chip indicating protection status
        const protectionChip = {
            type: "Chip",
            label: branch.protected ? "Protected" : "Unprotected",
            color: branch.protected ? "green" : "gray",
            variant: "filled",
            size: "small"
        };
        // Button that links to the commit details, with an icon
        const commitButton = {
            type: "Button",
            variant: "text",
            size: "small",
            href: branch.commit.url,
            startElement: {
                type: "Icon",
                id: "code-branch",
                color: "gray",
                size: 12
            },
            label: shaShort
        };
        // Choose an icon for protected branches
        const statusIcon = {
            type: "Icon",
            id: branch.protected ? "lock" : "unlock",
            color: branch.protected ? "green" : "gray",
            size: 20
        };
        return {
            type: "ListItem",
            // Branch name as the headline
            title: branch.name,
            // Display commit message or URL as secondary text
            description: `Latest commit: ${shaShort}`,
            // Icon at the start to indicate protection
            startElement: statusIcon,
            // At the end, show protection chip and commit link
            endElement: [protectionChip, commitButton]
        };
    });
    // Compose the overall list component
    const branchList = {
        type: "List",
        childrenProps: listItems
    };
    return branchList;
}
//# sourceMappingURL=628.js.map