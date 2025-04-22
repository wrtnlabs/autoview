export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Clone and sort by descending percentage score for better prominence of top performers
    const sorted = [...input].sort((a, b) => {
        const pa = a.points_awarded / a.points_available;
        const pb = b.points_awarded / b.points_available;
        return pb - pa;
    });
    // Build a DataListItem for each grade record
    const items = sorted.map((record) => {
        const percent = record.points_awarded / record.points_available;
        // Choose a chip color based on score thresholds
        const chipColor = percent >= 0.9
            ? "success"
            : percent >= 0.75
                ? "primary"
                : percent >= 0.5
                    ? "warning"
                    : "error";
        // GitHub avatar for the student
        const avatar = {
            type: "Avatar",
            src: `https://github.com/${record.github_username}.png`,
            name: record.github_username,
            size: 32,
            variant: "secondary",
        };
        // A chip showing "points_awarded/points_available"
        const scoreChip = {
            type: "Chip",
            label: `${record.points_awarded}/${record.points_available}`,
            color: chipColor,
            size: "small",
            variant: "filled",
        };
        // A button linking to the student's repository
        const repoButton = {
            type: "Button",
            label: ["Repo"],
            href: record.student_repository_url,
            startElement: { type: "Icon", id: "github", size: 16, color: "gray" },
            variant: "text",
            size: "small",
            color: "primary",
        };
        // Markdown block with assignment link, submission timestamp, optional starter code and group info.
        // Using Markdown for rich link formatting and line breaks.
        const detailsMd = {
            type: "Markdown",
            content: `**Assignment:** [${record.assignment_name}](${record.assignment_url})  \n` +
                `**Submitted:** ${new Date(record.submission_timestamp).toLocaleString()}` +
                (record.starter_code_url
                    ? `  \n**Starter Code:** [Link](${record.starter_code_url})`
                    : "") +
                (record.group_name ? `  \n**Group:** ${record.group_name}` : ""),
        };
        return {
            // DataListItem displays a "label" (left) and a "value" (right)
            type: "DataListItem",
            label: [
                // Avatar + username
                avatar,
                {
                    type: "Text",
                    content: record.github_username,
                    variant: "subtitle1",
                    color: "primary",
                },
                // Detailed info below
                detailsMd,
            ],
            value: [
                // Visual score chip + a direct link button
                scoreChip,
                repoButton,
            ],
        };
    });
    // Return the DataList component wrapping all items
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=324.js.map