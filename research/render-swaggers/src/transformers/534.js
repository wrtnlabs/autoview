export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper to format date-times into a readable local string
    const formatDate = (iso) => iso ? new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A';
    // Build a list of key/value pairs to display in the details section
    const detailsItems = [
        {
            type: 'DataListItem',
            label: [
                { type: 'Text', content: 'Team ID', variant: 'subtitle2' }
            ],
            value: [
                { type: 'Text', content: String(input.id), variant: 'body1' }
            ]
        },
        {
            type: 'DataListItem',
            label: [
                { type: 'Text', content: 'Members', variant: 'subtitle2' }
            ],
            value: [
                { type: 'Text', content: String(input.members_count), variant: 'body1' }
            ]
        },
        {
            type: 'DataListItem',
            label: [
                { type: 'Text', content: 'Repositories', variant: 'subtitle2' }
            ],
            value: [
                { type: 'Text', content: String(input.repos_count), variant: 'body1' }
            ]
        },
        {
            type: 'DataListItem',
            label: [
                { type: 'Text', content: 'Created', variant: 'subtitle2' }
            ],
            value: [
                { type: 'Text', content: formatDate(input.created_at), variant: 'body1' }
            ]
        },
        {
            type: 'DataListItem',
            label: [
                { type: 'Text', content: 'Updated', variant: 'subtitle2' }
            ],
            value: [
                { type: 'Text', content: formatDate(input.updated_at), variant: 'body1' }
            ]
        }
    ];
    // If privacy is specified, add it to the details
    if (input.privacy) {
        detailsItems.push({
            type: 'DataListItem',
            label: [{ type: 'Text', content: 'Privacy', variant: 'subtitle2' }],
            value: [{ type: 'Text', content: input.privacy, variant: 'body1' }]
        });
    }
    // Compose the final layout as a vertical card with header, content, and footer
    return {
        type: 'VerticalCard',
        childrenProps: [
            {
                // Card header with team name, description, avatar and permission chip
                type: 'CardHeader',
                title: input.name,
                description: (_a = input.description) !== null && _a !== void 0 ? _a : undefined,
                startElement: {
                    type: 'Avatar',
                    src: input.organization.avatar_url,
                    name: input.organization.login,
                    size: 40,
                    variant: 'primary'
                },
                endElement: {
                    // Show the team's permission as a chip for quick visual reference
                    type: 'Chip',
                    label: input.permission,
                    variant: 'outlined',
                    color: 'info',
                    size: 'small'
                }
            },
            {
                // Card content embeds a data list of details
                type: 'CardContent',
                childrenProps: {
                    type: 'DataList',
                    childrenProps: detailsItems
                }
            },
            {
                // Card footer with an action button linking to the team's page
                type: 'CardFooter',
                childrenProps: {
                    type: 'Button',
                    label: 'View on GitHub',
                    href: input.html_url,
                    variant: 'contained',
                    color: 'primary',
                    size: 'medium',
                    startElement: {
                        type: 'Icon',
                        id: 'github',
                        size: 20,
                        color: 'gray'
                    }
                }
            }
        ]
    };
}
//# sourceMappingURL=534.js.map