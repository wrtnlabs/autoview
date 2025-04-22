export function transform($input) {
    return visualizeData($input);
}
/**
 * Transforms a code scanning variant analysis repo task into a visual UI description.
 * Uses AutoView components to display repository info, status, and relevant details.
 */
function visualizeData(input) {
    var _a;
    // Helper: map analysis status to icon name and color
    const statusIconMap = {
        pending: { icon: "clock", color: "blue" },
        in_progress: { icon: "spinner", color: "blue" },
        succeeded: { icon: "check", color: "green" },
        failed: { icon: "times", color: "red" },
        canceled: { icon: "ban", color: "gray" },
        timed_out: { icon: "hourglass-half", color: "orange" }
    };
    // Helper: format bytes into human-readable string
    function humanFileSize(bytes) {
        const thresh = 1024;
        if (bytes < thresh)
            return bytes + " B";
        const units = ["KB", "MB", "GB", "TB"];
        let u = -1;
        let val = bytes;
        while (++u < units.length && val >= thresh) {
            val = val / thresh;
        }
        return val.toFixed(1) + " " + units[u];
    }
    // Build list of key/value items
    const items = [];
    // STATUS row: icon + text
    const status = input.analysis_status;
    const { icon, color } = statusIconMap[status];
    items.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Status",
            variant: "subtitle2"
        },
        value: [
            {
                type: "Icon",
                id: icon,
                color,
                size: 20
            },
            {
                type: "Text",
                content: status.replace(/_/g, " "),
                variant: "body2"
            }
        ]
    });
    // RESULT COUNT row
    if (input.result_count != null) {
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Results",
                variant: "subtitle2"
            },
            value: {
                type: "Text",
                content: input.result_count.toString(),
                variant: "body2"
            }
        });
    }
    // ARTIFACT SIZE row
    if (input.artifact_size_in_bytes != null) {
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Artifact Size",
                variant: "subtitle2"
            },
            value: {
                type: "Text",
                content: humanFileSize(input.artifact_size_in_bytes),
                variant: "body2"
            }
        });
    }
    // FAILURE MESSAGE row (only on failure)
    if (input.failure_message) {
        // Use markdown to allow multi-line and emphasis
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Failure",
                variant: "subtitle2"
            },
            value: {
                type: "Markdown",
                content: `**${input.failure_message.trim()}**`
            }
        });
    }
    // DATABASE COMMIT SHA row
    if (input.database_commit_sha) {
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "DB Commit SHA",
                variant: "subtitle2"
            },
            value: {
                type: "Text",
                content: input.database_commit_sha,
                variant: "body2"
            }
        });
    }
    // SOURCE LOCATION PREFIX row
    if (input.source_location_prefix) {
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Source Prefix",
                variant: "subtitle2"
            },
            value: {
                type: "Markdown",
                content: "\n" + input.source_location_prefix + "\n```"
            }
        });
    }
    // ARTIFACT DOWNLOAD row
    if (input.artifact_url) {
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Artifact",
                variant: "subtitle2"
            },
            value: {
                type: "Button",
                label: "Download",
                variant: "contained",
                color: "primary",
                size: "small",
                href: input.artifact_url
            }
        });
    }
    // Assemble a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // Card Header: repo avatar + name + optional description
    const header = {
        type: "CardHeader",
        title: input.repository.full_name,
        description: (_a = input.repository.description) !== null && _a !== void 0 ? _a : "",
        startElement: {
            type: "Avatar",
            src: input.repository.owner.avatar_url,
            name: input.repository.owner.login,
            variant: "primary",
            size: 40
        }
    };
    // Card Content: data table of analysis details
    const content = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Card Footer: link to GitHub repo
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View on GitHub",
            variant: "text",
            color: "primary",
            size: "small",
            href: input.repository.html_url
        }
    };
    // Return a vertical card with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
}
//# sourceMappingURL=680.js.map