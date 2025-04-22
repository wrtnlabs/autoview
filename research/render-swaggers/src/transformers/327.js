export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Group assignments by classroom to render subheaders
    const assignmentsByClassroom = {};
    for (const assignment of input) {
        const key = `${assignment.classroom.id}`;
        if (!assignmentsByClassroom[key]) {
            assignmentsByClassroom[key] = [];
        }
        assignmentsByClassroom[key].push(assignment);
    }
    // Build a flat array of ListSubheader and ListItem components
    const childrenProps = [];
    // Iterate classrooms in insertion order
    for (const key of Object.keys(assignmentsByClassroom)) {
        const group = assignmentsByClassroom[key];
        if (group.length === 0)
            continue;
        const classroom = group[0].classroom;
        // Add a subheader for this classroom
        childrenProps.push({
            type: "ListSubheader",
            stickToTop: true,
            childrenProps: [
                {
                    type: "Text",
                    content: classroom.name,
                    variant: "h6",
                },
            ],
        });
        // For each assignment in the classroom, add a ListItem
        for (const assignment of group) {
            // Format the deadline or show placeholder
            const dueText = assignment.deadline
                ? new Date(assignment.deadline).toLocaleDateString()
                : "No deadline";
            // Choose icon based on individual vs group
            const iconId = assignment.type === "group" ? "users" : "user";
            // Compose the endElement as chips showing accepted/submitted/passing counts
            const endChips = [
                {
                    type: "Chip",
                    label: `Accepted: ${assignment.accepted}`,
                    color: "success",
                    variant: "outlined",
                    size: "small",
                },
                {
                    type: "Chip",
                    label: `Submitted: ${assignment.submitted}`,
                    color: "info",
                    variant: "outlined",
                    size: "small",
                },
                {
                    type: "Chip",
                    label: `Passing: ${assignment.passing}`,
                    color: assignment.passing / Math.max(assignment.submitted, 1) >= 0.5 ? "primary" : "warning",
                    variant: "outlined",
                    size: "small",
                },
            ];
            childrenProps.push({
                type: "ListItem",
                title: assignment.title,
                description: `Due: ${dueText} | Lang: ${assignment.language}`,
                // Leading icon for assignment type
                startElement: {
                    type: "Icon",
                    id: iconId,
                    color: "blue",
                    size: 24,
                },
                // Trailing chips summarizing stats
                endElement: endChips,
                // Make the title clickable if there is an invite link
                href: assignment.invite_link,
            });
        }
    }
    // Return a responsive List component
    return {
        type: "List",
        childrenProps,
    };
}
//# sourceMappingURL=327.js.map