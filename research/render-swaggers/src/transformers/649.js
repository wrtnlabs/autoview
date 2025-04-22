export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no teams, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No teams available\nThere are currently no teams to display."
        };
    }
    // Map permission strings to chip colors for better visual distinction
    const permissionColorMap = {
        admin: "error",
        maintain: "warning",
        push: "success",
        triage: "info",
        pull: "primary"
    };
    // Build a DataList where each team is one entry
    const items = input.map((team) => {
        var _a;
        const description = (_a = team.description) !== null && _a !== void 0 ? _a : "No description provided";
        // Build markdown content summarizing team details
        // Use bullet lists and links to avoid plain text
        const mdLines = [
            `**Description:** ${description}`,
            `**Permission Level:** \`${team.permission}\``,
            `**Members URL:** [View members](${team.members_url})`,
            `**Repositories URL:** [View repos](${team.repositories_url})`
        ];
        if (team.parent) {
            mdLines.push(`**Parent Team:** ${team.parent.name} _(ID: ${team.parent.id})_`);
        }
        return {
            type: "DataListItem",
            // Label is a combination of text and a link icon
            label: [
                {
                    type: "Text",
                    variant: "body1",
                    content: team.name
                },
                {
                    type: "Icon",
                    id: "link",
                    color: "blue",
                    size: 12
                }
            ],
            // Value is a markdown block showing the rest of the info
            value: {
                type: "Markdown",
                content: mdLines.join("\n\n")
            }
        };
    });
    // Return the DataList component props containing all teams
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=649.js.map