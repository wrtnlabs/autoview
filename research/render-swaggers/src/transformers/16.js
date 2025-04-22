export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Compose a vertical card to display a donation record
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header: shows a gift icon, title, donation amount and timestamp
            {
                type: "CardHeader",
                // Title includes the donation ID
                title: `Donation #${input.id}`,
                // Brief description of the donated value
                description: `Donated ${input.value} points`,
                // Gift icon to visually represent the donation
                startElement: {
                    type: "Icon",
                    id: "gift",
                    color: "cyan",
                    size: 32,
                },
                // Display creation date/time in the header for quick glance
                endElement: {
                    type: "Text",
                    content: input.created_at,
                    variant: "caption",
                    color: "gray",
                },
            },
            // Content: detailed fields laid out as a data list
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: [
                        // Administrator information
                        {
                            type: "DataListItem",
                            label: {
                                type: "Text",
                                content: "Administrator",
                                variant: "subtitle2",
                                color: "secondary",
                            },
                            value: {
                                type: "Text",
                                content: input.administrator.member.nickname,
                                variant: "body1",
                            },
                        },
                        // Citizen (real user) information
                        {
                            type: "DataListItem",
                            label: {
                                type: "Text",
                                content: "Citizen",
                                variant: "subtitle2",
                                color: "secondary",
                            },
                            value: {
                                type: "Text",
                                content: input.citizen.name,
                                variant: "body1",
                            },
                        },
                        // Reason field rendered as markdown for richer formatting
                        {
                            type: "DataListItem",
                            label: {
                                type: "Text",
                                content: "Reason",
                                variant: "subtitle2",
                                color: "secondary",
                            },
                            value: {
                                type: "Markdown",
                                content: input.reason,
                            },
                        },
                    ],
                },
            },
            // Footer: action button linking to the customer's session or profile
            {
                type: "CardFooter",
                childrenProps: [
                    {
                        type: "Button",
                        label: "View Session",
                        variant: "outlined",
                        // User icon to indicate navigation to a user-related page
                        startElement: {
                            type: "Icon",
                            id: "user",
                            color: "blue",
                            size: 16,
                        },
                        // Use the recorded connection URL for deep-linking
                        href: input.administrator.customer.href,
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=16.js.map