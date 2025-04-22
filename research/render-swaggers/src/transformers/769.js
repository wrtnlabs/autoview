export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Map import status to a Chip color
    const statusColor = (() => {
        switch (input.status) {
            case "error":
            case "auth_failed":
                return "error";
            case "complete":
                return "success";
            case "importing":
            case "pushing":
            case "mapping":
                return "warning";
            case "detecting":
            case "choose":
            case "waiting_to_push":
            case "setup":
            case "detection_needs_auth":
            case "detection_found_multiple":
            case "detection_found_nothing":
                return "info";
            case "none":
            case "unknown":
                return "gray";
            default:
                return "primary";
        }
    })();
    // Helper to create a Text component for simple labels
    const createText = (text) => ({
        type: "Text",
        content: text,
    });
    // Helper to create a small outlined Chip
    const createChip = (label, color = "primary") => ({
        type: "Chip",
        label,
        color,
        size: "small",
        variant: "outlined",
    });
    // Build rows for the DataList
    const listItems = [];
    // VCS type
    listItems.push({
        type: "DataListItem",
        label: [createText("VCS")],
        value: createChip((_a = input.vcs) !== null && _a !== void 0 ? _a : "unknown", input.vcs ? "primary" : "gray"),
    });
    // LFS usage
    if (typeof input.use_lfs === "boolean") {
        listItems.push({
            type: "DataListItem",
            label: [createText("Large File Storage")],
            value: createChip(input.use_lfs ? "Enabled" : "Disabled", input.use_lfs ? "success" : "error"),
        });
    }
    // TFVC Project (optional)
    if (input.tfvc_project) {
        listItems.push({
            type: "DataListItem",
            label: [createText("TFVC Project")],
            value: createText(input.tfvc_project),
        });
    }
    // Source URL
    listItems.push({
        type: "DataListItem",
        label: [createText("Source URL")],
        value: {
            type: "Button",
            label: "View",
            variant: "text",
            size: "small",
            href: input.vcs_url,
        },
    });
    // Repository page
    listItems.push({
        type: "DataListItem",
        label: [createText("Repository URL")],
        value: {
            type: "Button",
            label: "Open",
            variant: "text",
            size: "small",
            href: input.html_url,
        },
    });
    // Progress percentages
    if (typeof input.import_percent === "number") {
        listItems.push({
            type: "DataListItem",
            label: [createText("Import Progress")],
            value: createText(`${input.import_percent}%`),
        });
    }
    if (typeof input.push_percent === "number") {
        listItems.push({
            type: "DataListItem",
            label: [createText("Push Progress")],
            value: createText(`${input.push_percent}%`),
        });
    }
    // Commit count
    if (typeof input.commit_count === "number") {
        listItems.push({
            type: "DataListItem",
            label: [createText("Commit Count")],
            value: createText(input.commit_count.toString()),
        });
    }
    // Large files details
    if (input.has_large_files) {
        listItems.push({
            type: "DataListItem",
            label: [createText("Large Files Count")],
            value: createText(((_b = input.large_files_count) !== null && _b !== void 0 ? _b : 0).toString()),
        });
        listItems.push({
            type: "DataListItem",
            label: [createText("Large Files Size")],
            value: createText(`${input.large_files_size} bytes`),
        });
    }
    // Authors count
    if (typeof input.authors_count === "number") {
        listItems.push({
            type: "DataListItem",
            label: [createText("Authors")],
            value: createText(input.authors_count.toString()),
        });
    }
    // Status chip for the header
    const statusChip = {
        type: "Chip",
        label: input.status,
        color: statusColor,
        size: "small",
        variant: "filled",
    };
    // Compose a VerticalCard with header, content (DataList) and a footer button
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Import Status",
                description: (_c = input.status_text) !== null && _c !== void 0 ? _c : "",
                startElement: {
                    type: "Icon",
                    id: "sync-alt",
                    color: "blue",
                    size: 20,
                },
                endElement: statusChip,
            },
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: listItems,
                },
            },
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Button",
                    label: "View Repository",
                    variant: "contained",
                    color: "primary",
                    size: "medium",
                    href: input.html_url,
                },
            },
        ],
    };
}
//# sourceMappingURL=769.js.map