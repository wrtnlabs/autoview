export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Utility: safely format an ISO date string to a human-readable form
    function formatDate(dateStr) {
        try {
            const d = new Date(dateStr);
            // Fallback if invalid date
            if (isNaN(d.getTime()))
                throw new Error("Invalid Date");
            // e.g. "2023-08-10 14:23"
            return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
                + " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
        }
        catch (_a) {
            return dateStr;
        }
    }
    // No threads: show friendly placeholder
    if (!input || input.length === 0) {
        return {
            type: "Text",
            variant: "body1",
            content: "No threads available.",
        };
    }
    // Map each thread to a ListItemProps
    const items = input.map((thread) => {
        // Owner avatar
        const avatar = {
            type: "Avatar",
            src: thread.repository.owner.avatar_url,
            name: thread.repository.owner.login,
            // Use a medium size for touch targets on mobile
            size: 32,
            // Choose a neutral color variant
            variant: "gray",
        };
        // Compose description: repository full name + updated time
        const updatedAt = formatDate(thread.updated_at);
        const description = `${thread.repository.full_name} · Updated ${updatedAt}`;
        // Badge with envelope icon indicating unread status
        const badge = {
            type: "Badge",
            // dot mode shows a small indicator when unread
            dot: thread.unread,
            // wrap an envelope icon
            childrenProps: {
                type: "Icon",
                id: thread.unread ? "envelope" : "envelope-open",
                // highlight unread in primary color
                color: thread.unread ? "blue" : "gray",
                size: 20,
            },
        };
        return {
            type: "ListItem",
            title: thread.subject.title,
            description,
            startElement: avatar,
            endElement: badge,
            // Link to the thread page (subject.url is the HTML thread URL)
            href: thread.subject.url,
        };
    });
    // Return a responsive List of threads
    return {
        type: "List",
        childrenProps: items,
    };
}
//# sourceMappingURL=812.js.map