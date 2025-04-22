export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map package types to chip colors for better visual distinction
    const packageTypeColorMap = {
        npm: "orange",
        maven: "blue",
        rubygems: "red",
        docker: "cyan",
        nuget: "teal",
        container: "gray",
    };
    // Map visibility to chip colors
    const visibilityColorMap = {
        public: "success",
        private: "error",
    };
    // Header: show package name, type description, and owner avatar or default icon
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `${input.package_type.toUpperCase()} package`,
        startElement: input.owner
            ? {
                type: "Avatar",
                src: input.owner.avatar_url,
                name: input.owner.login,
                size: 40,
            }
            : {
                type: "Icon",
                id: "cube", // default package icon
                color: "gray",
                size: 32,
            },
    };
    // Content: display key metadata as chips and dates in markdown
    const content = {
        type: "CardContent",
        childrenProps: [
            // Group of chips: type, visibility, version count
            {
                type: "ChipGroup",
                childrenProps: [
                    {
                        type: "Chip",
                        label: input.package_type,
                        color: packageTypeColorMap[input.package_type],
                        variant: "filled",
                        size: "small",
                    },
                    {
                        type: "Chip",
                        label: `${input.version_count} versions`,
                        color: "secondary",
                        variant: "outlined",
                        size: "small",
                    },
                    {
                        type: "Chip",
                        label: input.visibility,
                        color: visibilityColorMap[input.visibility],
                        variant: "filled",
                        size: "small",
                    },
                ],
                maxItems: 3,
            },
            // Dates rendered in markdown for emphasis
            {
                type: "Markdown",
                content: [
                    `**Created At:** ${new Date(input.created_at).toLocaleString()}`,
                    `**Updated At:** ${new Date(input.updated_at).toLocaleString()}`,
                ].join("\n\n"),
            },
        ],
    };
    // Footer: action buttons linking to API and GitHub pages
    const footer = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "Button",
                variant: "outlined",
                color: "primary",
                startElement: {
                    type: "Icon",
                    id: "link",
                    color: "blue",
                    size: 16,
                },
                label: "API",
                href: input.url,
            },
            {
                type: "Button",
                variant: "outlined",
                color: "primary",
                startElement: {
                    type: "Icon",
                    id: "github",
                    color: "indigo",
                    size: 16,
                },
                label: "GitHub",
                href: input.html_url,
            },
        ],
    };
    // Compose into a vertical card for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=492.js.map