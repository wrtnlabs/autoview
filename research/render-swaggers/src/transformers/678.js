export function transform($input) {
    return visualizeData($input);
}
/**
 * Transforms a CodeQL variant analysis payload into an AutoView UI component props.
 */
function visualizeData(input) {
    // Helper to map statuses to visual colors
    const mapStatusToColor = (status) => {
        switch (status) {
            case "succeeded": return "success";
            case "failed": return "error";
            case "in_progress": return "info";
            case "cancelled": return "warning";
            default: return "gray";
        }
    };
    // Safely format an ISO timestamp into a locale string
    const formatDate = (iso) => iso ? new Date(iso).toLocaleString() : "N/A";
    // Compose the status chip for the header
    const statusChip = {
        type: "Chip",
        label: input.status,
        variant: "filled",
        color: mapStatusToColor(input.status),
        size: "small",
    };
    // Build a Markdown summary of main analysis properties
    const summaryMarkdown = `
**Query Language:** ${input.query_language.toUpperCase()}  
**Controller Repo:** ${input.controller_repo.full_name}  
**Initiated By:** ${input.actor.login}  
**Created At:** ${formatDate(input.created_at)}  
**Last Updated:** ${formatDate(input.updated_at)}
`.trim();
    // Build a DataList of scanned repositories (if any)
    const scannedList = Array.isArray(input.scanned_repositories) && input.scanned_repositories.length > 0
        ? {
            type: "DataList",
            childrenProps: input.scanned_repositories.map(repoTask => {
                // Chip for per-repo status
                const repoStatusChip = {
                    type: "Chip",
                    label: repoTask.analysis_status,
                    variant: "outlined",
                    color: mapStatusToColor(repoTask.analysis_status),
                    size: "small",
                };
                // Optional result count text
                const resultText = typeof repoTask.result_count === "number"
                    ? {
                        type: "Text",
                        content: `Results: ${repoTask.result_count}`,
                        variant: "caption",
                        color: "gray",
                    }
                    : null;
                // Optional failure message text
                const failureText = repoTask.failure_message
                    ? {
                        type: "Text",
                        content: `⚠️ ${repoTask.failure_message}`,
                        variant: "caption",
                        color: "error",
                    }
                    : null;
                // Compose the repository item
                const valueComponents = [
                    repoStatusChip,
                    resultText,
                    failureText,
                ].filter(Boolean);
                return {
                    type: "DataListItem",
                    label: {
                        type: "Text",
                        content: repoTask.repository.full_name,
                        variant: "body1",
                    },
                    value: valueComponents.length === 1 ? valueComponents[0] : valueComponents,
                };
            }),
        }
        : {
            // No scanned repositories → notify user
            type: "Markdown",
            content: "_No repository scan data available._",
        };
    // The overall UI: a vertical card with header, summary, and detailed list
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                // Card Header with avatar of the actor and the status chip
                type: "CardHeader",
                title: `Variant Analysis #${input.id}`,
                description: `Status overview`,
                startElement: {
                    type: "Avatar",
                    src: input.actor.avatar_url,
                    name: input.actor.login,
                    size: 40,
                },
                endElement: statusChip,
            },
            {
                // Main content: markdown summary + data-list of scanned repos
                type: "CardContent",
                childrenProps: [
                    {
                        type: "Markdown",
                        content: summaryMarkdown,
                    },
                    scannedList,
                ],
            },
        ],
    };
    return card;
}
//# sourceMappingURL=678.js.map