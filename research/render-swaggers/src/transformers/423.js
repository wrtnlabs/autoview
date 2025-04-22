export function transform($input) {
    return visualizeData($input);
}
// Transforms a campaign summary into a visual AutoView component.
// We build a VerticalCard containing a header (with title, state badge),
// content (timeline, managers, teams, contact button) and footer (alert stats).
function visualizeData(input) {
    var _a;
    // Helper: format ISO timestamps into human-readable strings.
    const formatDate = (iso) => {
        try {
            return new Date(iso).toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        }
        catch (_a) {
            return iso;
        }
    };
    // Build the card header: icon + campaign name + state badge.
    const header = {
        type: "CardHeader",
        // Use provided name or fallback to the campaign number.
        title: (_a = input.name) !== null && _a !== void 0 ? _a : `Campaign #${input.number}`,
        description: input.description,
        startElement: {
            type: "Icon",
            id: "bullhorn",
            size: 24,
            color: "blue",
        },
        endElement: {
            type: "Chip",
            label: input.state.toUpperCase(),
            color: input.state === "open" ? "success" : "error",
            size: "small",
            variant: "filled",
        },
    };
    // Prepare a Markdown timeline with all relevant dates.
    const timelineLines = [
        `- **Created:** ${formatDate(input.created_at)}`,
        `- **Updated:** ${formatDate(input.updated_at)}`,
    ];
    if (input.published_at) {
        timelineLines.push(`- **Published:** ${formatDate(input.published_at)}`);
    }
    timelineLines.push(`- **Ends:** ${formatDate(input.ends_at)}`);
    if (input.closed_at) {
        // closed_at may be null or string; guard null
        timelineLines.push(`- **Closed:** ${formatDate(input.closed_at)}`);
    }
    const timelineMarkdown = {
        type: "Markdown",
        content: ["### 🗓️ Timeline", "", ...timelineLines].join("\n"),
    };
    // Build an avatar for each manager.
    const managerAvatars = input.managers.map((mgr) => {
        var _a;
        return ({
            type: "Avatar",
            src: mgr.avatar_url,
            name: (_a = mgr.name) !== null && _a !== void 0 ? _a : mgr.login,
            size: 32,
            variant: "info",
        });
    });
    const managersGroup = {
        type: "AvatarGroup",
        childrenProps: managerAvatars,
        maxItems: managerAvatars.length,
    };
    // Build chips for each team manager, if any.
    const teamChips = [];
    if (input.team_managers && input.team_managers.length > 0) {
        for (const team of input.team_managers) {
            teamChips.push({
                type: "Chip",
                label: team.name,
                variant: "outlined",
                color: "secondary",
                size: "small",
            });
        }
    }
    // Contact button, if a link is provided.
    const contactButton = input.contact_link
        ? {
            type: "Button",
            variant: "text",
            color: "primary",
            href: input.contact_link,
            label: "Contact",
            startElement: {
                type: "Icon",
                id: "envelope",
                size: 16,
            },
        }
        : undefined;
    // Build alert statistics chips, if provided.
    const alertChips = [];
    if (input.alert_stats) {
        alertChips.push({
            type: "Chip",
            label: `Open: ${input.alert_stats.open_count}`,
            color: "warning",
            size: "small",
            variant: "outlined",
        });
        alertChips.push({
            type: "Chip",
            label: `In Progress: ${input.alert_stats.in_progress_count}`,
            color: "info",
            size: "small",
            variant: "outlined",
        });
        alertChips.push({
            type: "Chip",
            label: `Closed: ${input.alert_stats.closed_count}`,
            color: "success",
            size: "small",
            variant: "outlined",
        });
    }
    // Assemble the CardContent section.
    const contentChildren = [
        timelineMarkdown,
        managersGroup,
    ];
    if (teamChips.length > 0) {
        contentChildren.push({
            type: "ChipGroup",
            childrenProps: teamChips,
            maxItems: teamChips.length,
        });
    }
    if (contactButton) {
        contentChildren.push(contactButton);
    }
    const cardContent = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Assemble the CardFooter section with alert stats.
    const footerChildren = [];
    if (alertChips.length > 0) {
        footerChildren.push({
            type: "ChipGroup",
            childrenProps: alertChips,
            maxItems: alertChips.length,
        });
    }
    const cardFooter = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Return the full VerticalCard structure.
    return {
        type: "VerticalCard",
        childrenProps: [header, cardContent, cardFooter],
    };
}
//# sourceMappingURL=423.js.map