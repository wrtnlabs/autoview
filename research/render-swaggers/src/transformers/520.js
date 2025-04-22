export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e;
    // Determine an appropriate icon based on actor type
    const actorType = (_c = (_b = (_a = input.actor) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.toLowerCase()) !== null && _c !== void 0 ? _c : "";
    const iconId = actorType === "system" ? "cog" : "user";
    const iconColor = actorType === "system" ? "gray" : "blue";
    // Format the timestamp into a human‐readable string
    const formattedDate = new Date(input.updated_at).toLocaleString();
    // Serialize the state object for markdown display
    let stateJson;
    try {
        stateJson = JSON.stringify(input.state, null, 2);
    }
    catch (_f) {
        stateJson = "[Unable to serialize state]";
    }
    // Build a markdown block with section headings and code/inline formatting
    const markdownLines = [
        "## Ruleset Version Details",
        "",
        `- **Version ID**: \`${input.version_id}\``,
        `- **Updated At**: \`${formattedDate}\``,
        "",
        "## Actor",
        `- **ID**: \`${(_d = input.actor.id) !== null && _d !== void 0 ? _d : "N/A"}\``,
        `- **Type**: \`${(_e = input.actor.type) !== null && _e !== void 0 ? _e : "N/A"}\``,
        "",
        "## State",
        // If the state is essentially empty ({}), show a placeholder
        stateJson && stateJson !== "{}"
            ? "json\n" + stateJson + "\n```"
            : "_No state details available_",
    ];
    const markdownContent = markdownLines.join("\n");
    // Compose a vertical card containing a header with an icon and a markdown content block
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                // Title + description presented prominently in the header
                title: `Ruleset Version ${input.version_id}`,
                description: `Updated at ${formattedDate}`,
                // An icon as a startElement to visually indicate actor type
                startElement: {
                    type: "Icon",
                    id: iconId,
                    color: iconColor,
                    size: 28,
                },
            },
            {
                type: "CardContent",
                // Use the Markdown component for rich text, headings and code formatting
                childrenProps: {
                    type: "Markdown",
                    content: markdownContent,
                },
            },
        ],
    };
}
//# sourceMappingURL=520.js.map