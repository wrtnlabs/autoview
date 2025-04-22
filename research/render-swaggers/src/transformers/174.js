export function transform($input) {
    return visualizeData($input);
}
// Transform LegacyV4CampaignView into a visual AutoView component
function visualizeData(input) {
    const campaign = input.campaign;
    // Fallback for missing campaign data
    if (!campaign) {
        return {
            type: "Text",
            content: "No campaign data available",
        };
    }
    /**
     * Map each sendMedium to a FontAwesome icon and color.
     * We use this for the card header's startElement.
     */
    const mediumIconMap = {
        appAlimtalk: { id: "bell", color: "orange" },
        appLine: { id: "comment", color: "green" },
        email: { id: "envelope", color: "blue" },
        inAppChat: { id: "comments", color: "teal" },
        xms: { id: "mobile-alt", color: "indigo" },
    };
    const med = mediumIconMap[campaign.sendMedium] || { id: "bell", color: "gray" };
    const headerIcon = {
        type: "Icon",
        id: med.id,
        color: med.color,
        size: 32,
    };
    // Convert campaign.state into an uppercase label chip with a color code
    const stateColorMap = {
        draft: "gray",
        active: "green",
        stopped: "orange",
        removed: "red",
    };
    const stateChip = {
        type: "Chip",
        label: (campaign.state || "unknown").toUpperCase(),
        variant: "filled",
        color: stateColorMap[campaign.state || "draft"],
        size: "medium",
    };
    // Build a list of DataListItemProps for the core campaign details
    const items = [];
    const addItem = (label, value) => {
        // Wrap plain strings into Text components
        const valComponent = typeof value === "string"
            ? { type: "Text", content: value }
            : value;
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: label },
            value: valComponent,
        });
    };
    // Mandatory fields
    addItem("Trigger Event", campaign.triggerEventName);
    addItem("Waiting Time", campaign.waitingTime);
    // Optional filter event
    if (campaign.filterEventName) {
        addItem("Filter Event", campaign.filterEventName);
    }
    // Human‑friendly schedule rendering via Markdown list
    if (campaign.sendTimeRanges && campaign.sendTimeRanges.length > 0) {
        const md = campaign.sendTimeRanges
            .map(tr => `- **Days**: ${tr.dayOfWeeks.join(", ")}, **From**: ${tr.from}, **To**: ${tr.to}`)
            .join("\n");
        addItem("Schedule", { type: "Markdown", content: md });
    }
    // Boolean flags
    addItem("Advertising", campaign.advertising ? "Yes" : "No");
    addItem("Support Bot", campaign.enableSupportBot ? "Enabled" : "Disabled");
    // Send mode
    addItem("Send Mode", campaign.sendMode);
    // Summarize all messages if present using Markdown bullets
    if (input.msgs && input.msgs.length > 0) {
        const msgsMd = input.msgs
            .map(m => {
            const parts = [
                `**${m.name}** (${m.sendMedium})`,
                m.sent !== undefined ? `Sent: ${m.sent}` : null,
                m.view !== undefined ? `View: ${m.view}` : null,
                m.click !== undefined ? `Click: ${m.click}` : null,
                m.goal !== undefined ? `Goal: ${m.goal}` : null,
            ].filter(Boolean).join(" | ");
            return `- ${parts}`;
        })
            .join("\n");
        addItem("Messages", { type: "Markdown", content: msgsMd });
    }
    // Wrap into a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Metrics chips at the footer: Sent / Views / Goals / Clicks
    const metrics = [
        { key: "Sent", value: campaign.sent, icon: "paper-plane" },
        { key: "Views", value: campaign.view, icon: "eye" },
        { key: "Goals", value: campaign.goal, icon: "bullseye" },
        { key: "Clicks", value: campaign.click, icon: "mouse-pointer" },
    ];
    const metricChips = metrics
        .filter(m => m.value !== undefined)
        .map(m => ({
        type: "Chip",
        label: `${m.value}`,
        startElement: { type: "Icon", id: m.icon, size: 16 },
        color: "primary",
        size: "small",
        variant: "outlined",
    }));
    const footerChips = {
        type: "ChipGroup",
        childrenProps: metricChips,
        maxItems: 4,
    };
    // Assemble the VerticalCard with Header, Content, and Footer
    const header = {
        type: "CardHeader",
        title: campaign.name,
        startElement: headerIcon,
        endElement: stateChip,
    };
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    const footer = {
        type: "CardFooter",
        childrenProps: footerChips,
    };
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=174.js.map