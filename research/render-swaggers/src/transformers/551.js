export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: format ISO date to local date string
    function formatDate(iso) {
        try {
            const dt = new Date(iso);
            if (isNaN(dt.getTime()))
                return iso;
            return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
        }
        catch (_a) {
            return iso;
        }
    }
    // Helper: truncate long descriptions
    function truncate(text, maxLength = 100) {
        return text.length > maxLength ? text.slice(0, maxLength - 1) + "…" : text;
    }
    // If no projects, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No projects available.**",
        };
    }
    // Map project state to chip color
    const stateColorMap = {
        open: "success",
        closed: "error",
    };
    // Build list items for each project
    const items = input.map((proj) => {
        // Build a concise description with truncated body and creation date
        const bodyText = proj.body ? truncate(proj.body, 80) : "No description";
        const created = formatDate(proj.created_at);
        const desc = `${bodyText} • Created ${created}`;
        // Avatar of project creator
        const avatar = {
            type: "Avatar",
            src: proj.creator.avatar_url,
            name: proj.creator.login,
            variant: "primary",
            size: 32,
        };
        // Chip showing project state
        const stateChip = {
            type: "Chip",
            label: proj.state.toUpperCase(),
            color: stateColorMap[proj.state] || "primary",
            variant: "outlined",
            size: "small",
        };
        // Button to view project on GitHub
        const viewButton = {
            type: "Button",
            variant: "text",
            size: "small",
            label: "View",
            href: proj.html_url,
            startElement: {
                type: "Icon",
                id: "arrow-right",
                size: 16,
                color: "gray",
            },
        };
        return {
            type: "ListItem",
            title: proj.name,
            description: desc,
            startElement: avatar,
            // Show state chip and view button on the right
            endElement: [stateChip, viewButton],
        };
    });
    // Optional subheader for the list
    const subheader = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            content: "Projects",
            variant: "h5",
        },
    };
    // Return the list of projects
    return {
        type: "List",
        childrenProps: [subheader, ...items],
    };
}
//# sourceMappingURL=551.js.map