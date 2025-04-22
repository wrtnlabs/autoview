export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const { commit: commitData, content } = input;
    // Extract commit fields with safe defaults
    const commitMessage = (_a = commitData.message) !== null && _a !== void 0 ? _a : "";
    const commitTitle = commitMessage.split("\n")[0] || "Commit";
    const fullSha = (_b = commitData.sha) !== null && _b !== void 0 ? _b : "";
    const shortSha = fullSha.slice(0, 7) || "—";
    const authorName = (_d = (_c = commitData.author) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : "Unknown author";
    const authorEmail = (_e = commitData.author) === null || _e === void 0 ? void 0 : _e.email;
    const authorDisplay = authorEmail ? `${authorName} <${authorEmail}>` : authorName;
    const commitDate = (_j = (_g = (_f = commitData.author) === null || _f === void 0 ? void 0 : _f.date) !== null && _g !== void 0 ? _g : (_h = commitData.committer) === null || _h === void 0 ? void 0 : _h.date) !== null && _j !== void 0 ? _j : "Unknown date";
    // Build a list of DataListItemProps to display various fields
    const listItems = [];
    // Commit message
    if (commitMessage) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Message" },
            value: { type: "Markdown", content: commitMessage }
        });
    }
    // SHA
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "SHA" },
        value: { type: "Text", content: shortSha }
    });
    // Author
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Author" },
        value: { type: "Text", content: authorDisplay }
    });
    // Date
    listItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Date" },
        value: { type: "Text", content: new Date(commitDate).toLocaleString() }
    });
    // Commit URL (opens in new tab)
    if (commitData.html_url) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Commit URL" },
            value: {
                type: "Button",
                label: "Open commit",
                href: commitData.html_url,
                variant: "text"
            }
        });
    }
    // If content info is available, visualize file details
    if (content) {
        if (content.name) {
            listItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "File Name" },
                value: { type: "Text", content: content.name }
            });
        }
        if (content.path) {
            listItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "Path" },
                value: { type: "Text", content: content.path }
            });
        }
        if (typeof content.size === "number") {
            listItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "Size (bytes)" },
                value: { type: "Text", content: content.size.toString() }
            });
        }
        if (content.type) {
            listItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "Type" },
                value: { type: "Text", content: content.type }
            });
        }
        // Download link
        if (content.download_url) {
            listItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "Download" },
                value: {
                    type: "Button",
                    label: "Download file",
                    href: content.download_url,
                    variant: "text"
                }
            });
        }
    }
    // Compose the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: listItems
    };
    // Card header with icon, title, and sha subtitle
    const header = {
        type: "CardHeader",
        title: commitTitle,
        description: `#${shortSha}`,
        startElement: {
            type: "Icon",
            id: "code-branch",
            size: 28,
            color: "cyan"
        }
    };
    // Card content holding the data list
    const contentCard = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Return a vertical card combining header and content for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [header, contentCard]
    };
}
//# sourceMappingURL=711.js.map