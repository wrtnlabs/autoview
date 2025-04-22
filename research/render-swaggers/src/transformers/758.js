export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Prepare header: display name and ID, and a status chip indicating active/inactive
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `Webhook ID: ${input.id}`,
        endElement: {
            type: "Chip",
            label: input.active ? "Active" : "Inactive",
            color: input.active ? "green" : "gray",
            variant: "filled",
        },
    };
    // Safely join events, falling back to "None" if the array is empty or missing
    const eventsList = Array.isArray(input.events) && input.events.length > 0
        ? input.events.join(", ")
        : "None";
    // Last response details with null-coalescing for missing fields
    const lastResp = input.last_response || {};
    const respStatus = (_a = lastResp.status) !== null && _a !== void 0 ? _a : "N/A";
    const respCode = lastResp.code !== null && typeof lastResp.code === "number"
        ? lastResp.code
        : "N/A";
    const respMsg = (_b = lastResp.message) !== null && _b !== void 0 ? _b : "N/A";
    // Compose markdown content to visually structure the details
    const markdownLines = [
        `**Type**: \`${input.type}\``,
        `**Events**: ${eventsList}`,
        `**URL**: [Link](${input.url})`,
        `**Test URL**: [Link](${input.test_url})`,
        `**Ping URL**: [Link](${input.ping_url})`,
        `**Last Response**:`,
        `- Status: ${respStatus}`,
        `- Code: ${respCode}`,
        `- Message: ${respMsg}`,
        `**Created At**: ${input.created_at}`,
        `**Updated At**: ${input.updated_at}`,
    ];
    const markdownContent = {
        type: "Markdown",
        content: markdownLines.join("\n\n"),
    };
    // Wrap the markdown in a CardContent to include it in the vertical card
    const content = {
        type: "CardContent",
        childrenProps: markdownContent,
    };
    // Return a vertical card composed of header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=758.js.map