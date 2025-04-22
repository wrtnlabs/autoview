export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Determine styling based on unread flag
    const accentColor = input.unread ? "error" : "primary";
    // Build markdown content for thread links
    const markdownContent = [
        `**Subject Type:** ${input.subject.type}`,
        ``,
        `- [View Thread](${input.url})`,
        `- [Latest Comment](${input.subject.latest_comment_url})`
    ].join("\n");
    return {
        type: "VerticalCard",
        // Use a vertical card to encapsulate header, content, and actions
        childrenProps: [
            {
                type: "CardHeader",
                // Thread title and repository info
                title: input.subject.title,
                description: input.repository.full_name,
                // Show repository owner's avatar
                startElement: {
                    type: "Avatar",
                    src: input.repository.owner.avatar_url,
                    name: input.repository.owner.login,
                    size: 40,
                    variant: accentColor
                },
                // Show the reason as a chip
                endElement: {
                    type: "Chip",
                    label: input.reason,
                    variant: "outlined",
                    color: accentColor,
                    size: "small"
                }
            },
            {
                type: "CardContent",
                // Embed markdown for additional links and metadata
                childrenProps: [
                    {
                        type: "Markdown",
                        content: markdownContent
                    }
                ]
            },
            {
                type: "CardFooter",
                // Action buttons for opening thread and managing subscription
                childrenProps: [
                    {
                        type: "Button",
                        label: ["Open Thread"],
                        variant: "contained",
                        color: accentColor,
                        size: "medium",
                        href: input.url,
                        startElement: {
                            type: "Icon",
                            id: "external-link",
                            color: "gray",
                            size: 16
                        }
                    },
                    {
                        type: "Button",
                        label: ["Manage Subscription"],
                        variant: "outlined",
                        color: "gray",
                        size: "small",
                        href: input.subscription_url,
                        startElement: {
                            type: "Icon",
                            id: "bell",
                            color: "gray",
                            size: 16
                        }
                    }
                ]
            }
        ]
    };
}
//# sourceMappingURL=369.js.map