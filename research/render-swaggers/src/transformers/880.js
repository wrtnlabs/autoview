export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a friendly message.
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No commit activity to display.",
            variant: "body1"
        };
    }
    // Determine the maximum commits in any week for color scaling.
    const maxWeeklyCommits = Math.max(...input.map(week => week.total), 1);
    // Helper: maps a commit count to a color scale.
    function getColorForCount(count) {
        if (count === 0)
            return "gray";
        const ratio = count / maxWeeklyCommits;
        if (ratio <= 0.25)
            return "green";
        if (ratio <= 0.5)
            return "teal";
        if (ratio <= 0.75)
            return "blue";
        return "indigo";
    }
    // Transform each week into a DataListItem with a row of colored dots.
    const dataListItems = input.map(week => {
        // Convert Unix-epoch-seconds to a YYYY-MM-DD label.
        const weekStart = new Date(week.week * 1000);
        const weekLabel = weekStart.toISOString().split("T")[0];
        // For each day in the week, create a small circle icon with intensity color.
        const dayIcons = week.days.map((count, idx) => ({
            type: "Icon",
            id: "circle",
            size: 8,
            color: getColorForCount(count)
        }));
        return {
            type: "DataListItem",
            // Label is the week-start date.
            label: [
                {
                    type: "Text",
                    variant: "body2",
                    content: weekLabel
                }
            ],
            // Value is the row of day-indicator icons.
            value: dayIcons
        };
    });
    // Wrap the items in a DataList.
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems
    };
    // Compose a vertical card with header and the data list.
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Commit Activity",
                description: `Showing the last ${input.length} weeks of activity.`
            },
            {
                type: "CardContent",
                childrenProps: [
                    // Provide a brief legend in markdown.
                    {
                        type: "Markdown",
                        content: `
**Legend**: Each dot represents a day's commits.  
Gray = 0 commits  
Green &lt;= 25% of max weekly commits  
Teal &lt;= 50%  
Blue &lt;= 75%  
Indigo &gt; 75%
`
                    },
                    dataList
                ]
            }
        ]
    };
}
//# sourceMappingURL=880.js.map