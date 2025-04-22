export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map each location type to a representative FontAwesome icon (kebab-case, without prefixes).
    const typeIconMap = {
        commit: "code-branch",
        wiki_commit: "book",
        issue_title: "exclamation-circle",
        issue_body: "exclamation-circle",
        issue_comment: "comment",
        discussion_title: "comments",
        discussion_body: "comments",
        discussion_comment: "comment-dots",
        pull_request_title: "git-pull-request",
        pull_request_body: "git-pull-request",
        pull_request_comment: "comment-dots",
        pull_request_review: "user-check",
        pull_request_review_comment: "comment-alt",
    };
    // Transform each input record into a DataListItem with an icon+text label and a markdown detail view.
    const items = input.map((loc, index) => {
        var _a, _b;
        // Determine human-readable label for the type; fallback to raw string.
        const typeKey = (_a = loc.type) !== null && _a !== void 0 ? _a : "unknown";
        // Pick an icon or fall back to a question mark.
        const iconId = (_b = typeIconMap[typeKey]) !== null && _b !== void 0 ? _b : "question-circle";
        // Safely stringify the 'details' field as JSON. Show a placeholder message if missing.
        const rawDetails = loc.details !== undefined && loc.details !== null
            ? JSON.stringify(loc.details, null, 2)
            : "No details available";
        // Wrap in a code block for better readability.
        const markdownContent = ["json", rawDetails, "```"].join("\n");
        return {
            type: "DataListItem",
            label: [
                // Start element: an icon representing the location type.
                { type: "Icon", id: iconId, size: 20, color: "blue" },
                // Followed by a text label.
                { type: "Text", content: typeKey, variant: "subtitle2", color: "primary" }
            ],
            // Use a Markdown component so JSON is nicely formatted and scrollable on small screens.
            value: { type: "Markdown", content: markdownContent }
        };
    });
    // Wrap all items in a DataList for a clean, responsive list UI.
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=870.js.map