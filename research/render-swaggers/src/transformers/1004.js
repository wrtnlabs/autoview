export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no events, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No events found**",
        };
    }
    // Helper to build a markdown description for each event
    function describeEvent(e) {
        // Issue-related actions
        if (e.payload.issue) {
            const issue = e.payload.issue;
            const action = e.payload.action || "updated";
            return `**${e.actor.login}** ${action} issue [#${issue.number}](${issue.html_url})`;
        }
        // Comment actions
        if (e.payload.comment) {
            const comment = e.payload.comment;
            return `**${e.actor.login}** commented on [an issue](${comment.html_url})`;
        }
        // Page-related events
        if (e.payload.pages && e.payload.pages.length > 0) {
            const page = e.payload.pages[0];
            const name = page.page_name || page.title || "a page";
            const url = page.html_url || "";
            return `**${e.actor.login}** ${page.action || "updated"} page [${name}](${url})`;
        }
        // Generic push event
        if (e.type === "PushEvent") {
            return `**${e.actor.login}** pushed to [${e.repo.name}](${e.repo.url})`;
        }
        // Fallback for other event types
        const repoLink = e.repo ? `[${e.repo.name}](${e.repo.url})` : "a repository";
        const ev = e.type || "an event";
        return `**${e.actor.login}** triggered **${ev}** on ${repoLink}`;
    }
    // Map each event to a DataListItemProps
    const items = input.map((e) => {
        // Avatar for the actor
        const avatar = {
            type: "Avatar",
            src: e.actor.avatar_url,
            name: e.actor.login,
            size: 32,
            variant: "gray",
        };
        // Timestamp text, formatted as ISO (could be customized)
        const timestamp = {
            type: "Text",
            variant: "caption",
            color: "secondary",
            content: e.created_at ? new Date(e.created_at).toLocaleString() : "",
        };
        // Build the markdown description
        const md = {
            type: "Markdown",
            content: describeEvent(e),
        };
        return {
            type: "DataListItem",
            // Label shows avatar + login name
            label: [
                avatar,
                {
                    type: "Text",
                    content: e.actor.login,
                    variant: "body1",
                    color: "primary",
                },
            ],
            // Value shows the markdown description and timestamp below it
            value: [
                md,
                timestamp,
            ],
        };
    });
    // Return a DataList component wrapping the items
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=1004.js.map