export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { data, pagination } = input;
    // If there are no donation records, show a friendly markdown message
    if (!data || data.length === 0) {
        return {
            type: "Markdown",
            content: "## No donations available.\n\nThere are currently no donation records to display."
        };
    }
    // Build list children: first a sticky subheader, then one ListItem per record
    const listChildren = [];
    // Subheader showing pagination info
    listChildren.push({
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: [
            {
                type: "Text",
                variant: "subtitle1",
                content: `Donations (Page ${pagination.current} of ${pagination.pages})`
            }
        ]
    });
    data.forEach((donation) => {
        // Format the creation date for display; fallback to raw string if invalid
        let dateText;
        const parsed = new Date(donation.created_at);
        if (!isNaN(parsed.getTime())) {
            // Use locale-sensitive formatting for better UX on mobile
            dateText = parsed.toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });
        }
        else {
            dateText = donation.created_at;
        }
        // Create an avatar showing the donor's name initials
        const avatar = {
            type: "Avatar",
            name: donation.citizen.name,
            variant: "info",
            size: 40
        };
        // Badge with a dollar icon to represent the donated amount
        const amountBadge = {
            type: "Badge",
            count: donation.value,
            color: "success",
            showZero: false,
            childrenProps: {
                type: "Icon",
                id: "dollar-sign",
                color: "green",
                size: 16
            }
        };
        // Text component for the timestamp
        const timestampText = {
            type: "Text",
            variant: "caption",
            color: "gray",
            content: dateText
        };
        // Compose a list item for each donation record
        listChildren.push({
            type: "ListItem",
            title: donation.citizen.name,
            description: donation.reason,
            startElement: avatar,
            endElement: [amountBadge, timestampText],
            href: undefined // no link by default; extension point for clickable items
        });
    });
    // Return a responsive List component
    return {
        type: "List",
        childrenProps: listChildren
    };
}
//# sourceMappingURL=17.js.map