export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Map each access_level to an appropriate icon and color.
     * - "none"        → lock icon in gray
     * - "user"        → user icon in blue
     * - "organization"→ users icon in teal
     */
    const iconMap = {
        none: { id: "lock", color: "gray" },
        user: { id: "user", color: "blue" },
        organization: { id: "users", color: "teal" },
    };
    /**
     * Human‑friendly descriptions for each access level.
     * Will be rendered as markdown to allow rich text.
     */
    const descriptionMap = {
        none: `
External workflows cannot access actions or reusable workflows in this repository.
Only workflows defined here will run successfully.
`,
        user: `
Workflows in private user‑owned repositories may reuse actions from this repository.
This level enables sharing across individual accounts.
`,
        organization: `
Any workflow within the organization can access and reuse actions in this repository.
Recommended for centralized, team‑wide maintenance.
`,
    };
    // Select the icon/color pair; default to "none" if somehow missing.
    const { id: iconId, color: iconColor } = iconMap[input.access_level] || iconMap.none;
    return {
        // Use a vertical card to group header and content responsively.
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with title, icon, and current access level label.
                type: "CardHeader",
                title: "Workflow Access Level",
                description: `\`${input.access_level}\``,
                startElement: {
                    type: "Icon",
                    id: iconId,
                    color: iconColor,
                    size: 24,
                },
            },
            {
                // Card content with detailed description in markdown for better readability.
                type: "CardContent",
                childrenProps: [
                    {
                        type: "Markdown",
                        content: descriptionMap[input.access_level] || descriptionMap.none,
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=584.js.map