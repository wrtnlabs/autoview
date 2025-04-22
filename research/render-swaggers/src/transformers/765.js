export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    // Map import status to a display color
    const statusColorMap = {
        auth: "info",
        none: "gray",
        detecting: "secondary",
        choose: "secondary",
        auth_failed: "error",
        importing: "primary",
        mapping: "warning",
        waiting_to_push: "warning",
        pushing: "warning",
        complete: "success",
        setup: "info",
        error: "error",
        unknown: "gray",
        detection_found_multiple: "warning",
        detection_found_nothing: "warning",
        detection_needs_auth: "error",
    };
    const statusColor = (_a = statusColorMap[input.status]) !== null && _a !== void 0 ? _a : "gray";
    // Build the card header with repository URL and status chip
    const header = {
        type: "CardHeader",
        title: input.vcs_url,
        description: (_b = input.status_text) !== null && _b !== void 0 ? _b : input.status,
        startElement: {
            type: "Icon",
            id: "code-branch", // FontAwesome branch icon
            color: "blue",
            size: 24,
        },
        endElement: {
            type: "Chip",
            label: input.status,
            color: statusColor,
            variant: "filled",
            size: "small",
        },
    };
    // Helper to push one DataListItem
    const listItems = [];
    function addListItem(label, valueComponent) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: label },
            value: valueComponent,
        });
    }
    // Primitive fields
    addListItem("VCS", { type: "Text", content: (_c = input.vcs) !== null && _c !== void 0 ? _c : "N/A" });
    addListItem("Use LFS", {
        type: "Chip",
        label: input.use_lfs ? "Yes" : "No",
        color: input.use_lfs ? "success" : "gray",
    });
    addListItem("Commits", {
        type: "Text",
        content: (_e = (_d = input.commit_count) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : "N/A",
    });
    addListItem("Import %", {
        type: "Text",
        content: (_g = (_f = input.import_percent) === null || _f === void 0 ? void 0 : _f.toString()) !== null && _g !== void 0 ? _g : "N/A",
    });
    addListItem("Push %", {
        type: "Text",
        content: (_j = (_h = input.push_percent) === null || _h === void 0 ? void 0 : _h.toString()) !== null && _j !== void 0 ? _j : "N/A",
    });
    addListItem("Has Large Files", {
        type: "Chip",
        label: input.has_large_files ? "Yes" : "No",
        color: input.has_large_files ? "warning" : "gray",
    });
    if (typeof input.large_files_count === "number") {
        addListItem("Large Files Count", {
            type: "Text",
            content: input.large_files_count.toString(),
        });
    }
    if (typeof input.large_files_size === "number") {
        addListItem("Large Files Size", {
            type: "Text",
            content: input.large_files_size.toString(),
        });
    }
    // List any project choices as Markdown bullet list
    if (Array.isArray(input.project_choices) && input.project_choices.length > 0) {
        const bullets = input.project_choices
            .map(choice => {
            const parts = [];
            if (choice.human_name)
                parts.push(choice.human_name);
            if (choice.vcs)
                parts.push(`[VCS: ${choice.vcs}]`);
            if (choice.tfvc_project)
                parts.push(`[TFVC: ${choice.tfvc_project}]`);
            return `- ${parts.join(" ")}`;
        })
            .join("\n");
        addListItem("Project Choices", {
            type: "Markdown",
            content: bullets,
        });
    }
    // Build the DataList component
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: listItems,
        },
    };
    // Footer with action buttons linking to URLs
    const footerButtons = [];
    if (input.html_url) {
        footerButtons.push({
            type: "Button",
            label: "View Pull Request",
            variant: "outlined",
            color: "primary",
            href: input.html_url,
        });
    }
    if (input.authors_url) {
        footerButtons.push({
            type: "Button",
            label: "View Authors",
            variant: "text",
            color: "secondary",
            href: input.authors_url,
        });
    }
    if (input.repository_url) {
        footerButtons.push({
            type: "Button",
            label: "Repository API",
            variant: "text",
            color: "gray",
            href: input.repository_url,
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerButtons,
    };
    // Compose into a VerticalCard for a structured, responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=765.js.map