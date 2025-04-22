export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no threads, render a friendly markdown message instead of an empty list.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "## No notifications\nYou have no recent threads.",
        };
    }
    // Clone and sort threads by most recently updated first.
    const sortedThreads = [...input].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    /**
     * Formats an ISO date string into a short human‐readable string.
     * Example: "2023-05-10T12:34:56Z" → "May 10, 2023"
     */
    function formatDate(iso) {
        const d = new Date(iso);
        return d.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
    // Map each thread to a ListItemProps.
    const listItems = sortedThreads.map((thread) => ({
        type: "ListItem",
        title: thread.subject.title,
        description: `${thread.reason} • ${formatDate(thread.updated_at)}`,
        // Show repository owner avatar on the left.
        startElement: {
            type: "Avatar",
            src: thread.repository.owner.avatar_url,
            name: thread.repository.owner.login,
            variant: "blue",
            size: 40,
        },
        // Show a chip indicating read/unread state.
        endElement: {
            type: "Chip",
            label: thread.unread ? "Unread" : "Read",
            color: thread.unread ? "primary" : "gray",
            size: "small",
            variant: "outlined",
        },
        // Link the entire item to the thread URL.
        href: thread.url,
    }));
    // Prepend a sticky subheader for better UX on long lists.
    const listWithHeader = {
        type: "List",
        childrenProps: [
            {
                type: "ListSubheader",
                stickToTop: true,
                childrenProps: [
                    {
                        type: "Text",
                        content: "Notifications",
                        variant: "h4",
                    },
                ],
            },
            ...listItems,
        ],
    };
    return listWithHeader;
}
//# sourceMappingURL=368.js.map