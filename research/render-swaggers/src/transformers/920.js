export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Determine chip colors based on role and state
    const roleChipColor = input.role === "maintainer" ? "green" : "blue";
    const stateChipColor = input.state === "active" ? "success" : "warning";
    // Compose a VerticalCard to render the membership info in a compact, responsive card
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with an icon and title
            {
                type: "CardHeader",
                title: "Team Membership",
                startElement: {
                    type: "Icon",
                    id: "user-friends", // group icon
                    size: 24,
                    color: "teal"
                }
            },
            // Content with a data list of URL, Role and State
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: [
                        // URL entry: clickable link button
                        {
                            type: "DataListItem",
                            label: {
                                type: "Text",
                                content: "URL",
                                variant: "subtitle2",
                                color: "gray"
                            },
                            value: {
                                type: "Button",
                                variant: "text",
                                color: "primary",
                                size: "small",
                                href: input.url,
                                startElement: {
                                    type: "Icon",
                                    id: "link",
                                    size: 16,
                                    color: "blue"
                                },
                                label: input.url
                            }
                        },
                        // Role entry: colored chip
                        {
                            type: "DataListItem",
                            label: {
                                type: "Text",
                                content: "Role",
                                variant: "subtitle2",
                                color: "gray"
                            },
                            value: {
                                type: "Chip",
                                label: input.role,
                                color: roleChipColor,
                                variant: "filled",
                                size: "small"
                            }
                        },
                        // State entry: colored chip
                        {
                            type: "DataListItem",
                            label: {
                                type: "Text",
                                content: "State",
                                variant: "subtitle2",
                                color: "gray"
                            },
                            value: {
                                type: "Chip",
                                label: input.state,
                                color: stateChipColor,
                                variant: "filled",
                                size: "small"
                            }
                        }
                    ]
                }
            }
        ]
    };
}
//# sourceMappingURL=920.js.map