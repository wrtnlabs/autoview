export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Utility: escape Markdown special characters in headings/content
    const escapeMarkdown = (text) => text.replace(/([\\`*_{}\[\]()#+\-.!])/g, "\\$1");
    // Map campaign state to emoji for visual cue
    const stateEmoji = (state) => {
        switch (state) {
            case "draft":
                return "📝";
            case "active":
                return "✔️";
            case "stopped":
                return "⏹️";
            case "removed":
                return "🗑️";
            default:
                return "❔";
        }
    };
    // Map sendMedium to emoji for visual cue
    const mediumEmoji = (medium) => {
        switch (medium) {
            case "email":
                return "📧";
            case "appAlimtalk":
                return "💬";
            case "appLine":
                return "🔗";
            case "inAppChat":
                return "🗨️";
            case "xms":
                return "📱";
            default:
                return "ℹ️";
        }
    };
    // When there are no campaigns, show a friendly message
    if (!input.campaigns || input.campaigns.length === 0) {
        return {
            type: "Markdown",
            content: "### No campaigns available\nPlease check back later or ensure campaigns are configured correctly.",
        };
    }
    // Build a list of DataListItem components, one per campaign
    const items = input.campaigns.map((camp) => {
        var _a;
        // Compose the markdown for the details of this campaign
        const lines = [];
        // State line
        lines.push(`**State**: ${stateEmoji(camp.state)} ${escapeMarkdown((_a = camp.state) !== null && _a !== void 0 ? _a : "unknown")}`);
        // Medium line
        lines.push(`**Medium**: ${mediumEmoji(camp.sendMedium)} ${escapeMarkdown(camp.sendMedium)}`);
        // Timing lines
        if (camp.startAt !== undefined || camp.endAt !== undefined) {
            const start = camp.startAt !== undefined ? new Date(camp.startAt).toLocaleString() : "–";
            const end = camp.endAt !== undefined ? new Date(camp.endAt).toLocaleString() : "–";
            lines.push(`**Period**: ${start} → ${end}`);
        }
        // Key metrics lines
        if (camp.sent !== undefined)
            lines.push(`**Sent**: ${camp.sent}`);
        if (camp.view !== undefined)
            lines.push(`**Viewed**: ${camp.view}`);
        if (camp.click !== undefined)
            lines.push(`**Clicked**: ${camp.click}`);
        if (camp.goal !== undefined)
            lines.push(`**Goal**: ${camp.goal}`);
        // Join with two spaces + newline for markdown line break
        const detailContent = lines.join("  \n");
        return {
            type: "DataListItem",
            // Use markdown for the label (campaign title)
            label: {
                type: "Markdown",
                content: `#### ${escapeMarkdown(camp.name)}`,
            },
            // Use markdown for the value/details
            value: {
                type: "Markdown",
                content: detailContent,
            },
        };
    });
    // Return the DataList component wrapping all campaigns
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=225.js.map