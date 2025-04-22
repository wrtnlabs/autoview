export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // 1. Build the card header: show organization avatar and assignment title with classroom name
    const header = {
        type: "CardHeader",
        title: input.title,
        description: input.classroom.name,
        // Show the organization avatar as the startElement
        startElement: {
            type: "Avatar",
            src: input.classroom.organization.avatar_url,
            name: input.classroom.organization.login,
            variant: "primary",
            size: 40,
        },
    };
    // 2. Prepare metrics for the DataList: accepted, submitted, passing, max teams, max members, deadline
    const metrics = [
        ["Accepted", String(input.accepted)],
        ["Submitted", String(input.submitted)],
        ["Passing", String(input.passing)],
        // Null means unlimited
        ["Max Teams", input.max_teams === null ? "Unlimited" : String(input.max_teams)],
        ["Max Members", input.max_members === null ? "Unlimited" : String(input.max_members)],
        ["Deadline", input.deadline ? new Date(input.deadline).toLocaleString() : "No due date"],
    ];
    // Map each metric into a DataListItemProps
    const dataListItems = metrics.map(([labelText, valueText]) => ({
        type: "DataListItem",
        // Label on the left
        label: {
            type: "Text",
            variant: "subtitle2",
            color: "gray",
            content: labelText,
        },
        // Value on the right
        value: {
            type: "Text",
            variant: "body1",
            content: valueText,
        },
    }));
    // 3. Wrap metrics into a DataList component inside CardContent
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataListItems,
        },
    };
    // 4. Build footer buttons: view repo always, accept assignment if enabled
    const footerButtons = [];
    // Button to view the starter code repository on GitHub
    footerButtons.push({
        type: "Button",
        label: "View Repo",
        href: input.starter_code_repository.html_url,
        variant: "outlined",
        color: "primary",
        size: "medium",
    });
    // If invitations are enabled, allow a direct "Accept Assignment" button
    if (input.invitations_enabled) {
        footerButtons.push({
            type: "Button",
            label: "Accept Assignment",
            href: input.invite_link,
            variant: "contained",
            color: "secondary",
            size: "medium",
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerButtons,
    };
    // 5. Compose final VerticalCard with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=322.js.map