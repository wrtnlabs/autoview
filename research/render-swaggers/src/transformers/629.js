export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Extract the first line of commit message to use as card description
    const fullMessage = input.commit.commit.message || "";
    const firstLine = fullMessage.split(/\r?\n/)[0] || "";
    // Compose a chip to indicate protected status
    const statusChip = {
        type: "Chip",
        label: input["protected"] ? "Protected" : "Unprotected",
        variant: input["protected"] ? "filled" : "outlined",
        color: input["protected"] ? "error" : "success",
    };
    // Optionally compose a chip for required approving review count
    const reviewChip = input.required_approving_review_count !== undefined
        ? {
            type: "Chip",
            label: input.required_approving_review_count === 1
                ? "1 Review Required"
                : `${input.required_approving_review_count} Reviews Required`,
            variant: "outlined",
            color: "info",
        }
        : undefined;
    // Build a Markdown list of detailed branch properties for CardContent
    const details = [];
    // Commit SHA with link
    details.push(`- **Commit SHA:** [\`${input.commit.sha}\`](${input.commit.html_url})`);
    // Protection link
    details.push(`- **Protection URL:** [Link](${input.protection_url})`);
    // Branch name pattern (if any)
    if (input.pattern) {
        details.push(`- **Pattern:** \`${input.pattern}\``);
    }
    // Required approving reviews (if any)
    if (input.required_approving_review_count !== undefined) {
        details.push(`- **Required Approving Reviews:** ${input.required_approving_review_count}`);
    }
    // Assemble the components into a VerticalCard
    const card = {
        type: "VerticalCard",
        childrenProps: [
            // Card header with branch name, commit message, and status chips
            {
                type: "CardHeader",
                title: input.name,
                description: firstLine || "No commit message provided",
                startElement: statusChip,
                endElement: reviewChip,
            },
            // Card content with details rendered via Markdown
            {
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: details.join("\n"),
                },
            },
        ],
    };
    return card;
}
//# sourceMappingURL=629.js.map