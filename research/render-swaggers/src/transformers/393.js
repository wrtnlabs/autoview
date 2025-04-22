export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Map visibility to a friendly chip color
    const visibilityColorMap = {
        public: "green",
        private: "red",
        selected: "orange",
    };
    const visibilityColor = (_a = visibilityColorMap[input.visibility]) !== null && _a !== void 0 ? _a : "blue";
    // Build a markdown representation of the key URLs and IDs
    const detailsLines = [];
    detailsLines.push(`- **Runners URL:** [Link](${input.runners_url})`);
    if (input.selected_repositories_url) {
        detailsLines.push(`- **Selected Repos URL:** [Link](${input.selected_repositories_url})`);
    }
    if (input.hosted_runners_url) {
        detailsLines.push(`- **Hosted Runners URL:** [Link](${input.hosted_runners_url})`);
    }
    if (input.network_configuration_id) {
        detailsLines.push(`- **Network Config ID:** ${input.network_configuration_id}`);
    }
    if (input.workflow_restrictions_read_only) {
        detailsLines.push(`- **Workflow Restrictions Read-Only**`);
    }
    if (input.restricted_to_workflows) {
        const list = (_c = (_b = input.selected_workflows) === null || _b === void 0 ? void 0 : _b.join(", ")) !== null && _c !== void 0 ? _c : "Yes";
        detailsLines.push(`- **Restricted to Workflows:** ${list}`);
    }
    return {
        // Use a vertical card to group header, content, and footer
        type: "VerticalCard",
        childrenProps: [
            {
                // Header: group name, ID, default icon, and visibility chip
                type: "CardHeader",
                title: input.name,
                description: `ID: ${input.id}`,
                startElement: {
                    type: "Icon",
                    // Highlight default groups with a star, others with user icon
                    id: input.default ? "star" : "users",
                    color: input.default ? "yellow" : "blue",
                    size: 24,
                },
                endElement: {
                    type: "Chip",
                    label: input.visibility,
                    color: visibilityColor,
                    variant: "filled",
                    size: "small",
                },
            },
            {
                // Content: key details rendered as markdown for readability
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: detailsLines.join("\n"),
                },
            },
            {
                // Footer: boolean flags as a chip group for quick status overview
                type: "CardFooter",
                childrenProps: {
                    type: "ChipGroup",
                    childrenProps: [
                        {
                            type: "Chip",
                            label: "Inherited",
                            color: input.inherited ? "teal" : "gray",
                            variant: "filled",
                            size: "small",
                        },
                        {
                            type: "Chip",
                            label: "Public Repos",
                            color: input.allows_public_repositories ? "success" : "error",
                            variant: "filled",
                            size: "small",
                        },
                        {
                            type: "Chip",
                            label: input.restricted_to_workflows ? "Workflow Restricted" : "No Workflow Restriction",
                            color: input.restricted_to_workflows ? "warning" : "gray",
                            variant: "filled",
                            size: "small",
                        },
                    ],
                },
            },
        ],
    };
}
//# sourceMappingURL=393.js.map