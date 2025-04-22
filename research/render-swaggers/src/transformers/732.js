export function transform($input) {
    return visualizeData($input);
}
// Transforms deployment branch policy data into a visual AutoView component
function visualizeData(input) {
    var _a;
    const policies = (_a = input.branch_policies) !== null && _a !== void 0 ? _a : [];
    // If there are no policies, show a friendly markdown message
    if (policies.length === 0) {
        return {
            type: "Markdown",
            content: "### No Branch Policies\nNo branch or tag policies found for this environment."
        };
    }
    // Map each policy to a DataListItem with an icon, name, and an ID chip
    const listItems = policies.map((policy) => {
        const isBranch = policy.type === "branch";
        // Choose an icon: code-branch for branches, tag for tags
        const icon = {
            type: "Icon",
            id: isBranch ? "code-branch" : "tag",
            color: isBranch ? "blue" : "teal",
            size: 20
        };
        // Display the policy name as a Text component
        const nameText = {
            type: "Text",
            content: policy.name ? [policy.name] : [""],
            variant: "body1"
        };
        // Show the numeric ID in a small outlined chip
        const idChip = {
            type: "Chip",
            label: policy.id !== undefined ? policy.id.toString() : "",
            variant: "outlined",
            size: "small"
        };
        return {
            type: "DataListItem",
            // Label area combines icon and name side by side
            label: [icon, nameText],
            // Value area shows the ID chip
            value: idChip
        };
    });
    // Wrap the list inside a card with a header showing total count
    const cardHeader = {
        type: "CardHeader",
        title: "Deployment Branch & Tag Policies",
        description: `${input.total_count} total`,
        startElement: {
            type: "Icon",
            id: "project-diagram",
            color: "indigo",
            size: 24
        }
    };
    const cardContent = {
        type: "CardContent",
        // Embed the DataList directly as the card's content
        childrenProps: {
            type: "DataList",
            childrenProps: listItems
        }
    };
    // Use a VerticalCard to stack the header and content responsively
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent]
    };
}
//# sourceMappingURL=732.js.map