export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { users, teams } = input;
    // Transform GitHub users into avatar props
    const userAvatars = users.map((user) => ({
        type: "Avatar",
        src: user.avatar_url,
        name: user.login,
        variant: "primary",
        size: 40,
    }));
    // Transform GitHub teams into chip props
    const teamChips = teams.map((team) => ({
        type: "Chip",
        label: team.name,
        variant: "filled",
        color: "secondary",
        size: "medium",
    }));
    // If there are reviewers, show an avatar group; otherwise fallback to a text note
    const userReviewersComponent = users.length
        ? {
            type: "AvatarGroup",
            childrenProps: userAvatars,
            // show up to 5 avatars and indicate the total number if larger
            maxItems: 5,
            totalItems: users.length,
        }
        : {
            type: "Text",
            content: "No individual review requests",
            variant: "body2",
        };
    // If there are team reviewers, show a chip group; otherwise fallback to a text note
    const teamReviewersComponent = teams.length
        ? {
            type: "ChipGroup",
            childrenProps: teamChips,
            // limit visible chips on small screens
            maxItems: 5,
        }
        : {
            type: "Text",
            content: "No team review requests",
            variant: "body2",
        };
    // Build list items for users and teams
    const dataListItems = [
        {
            type: "DataListItem",
            // Use a subtitle2 text for the label
            label: [
                {
                    type: "Text",
                    content: "Users",
                    variant: "subtitle2",
                },
            ],
            value: userReviewersComponent,
        },
        {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Teams",
                    variant: "subtitle2",
                },
            ],
            value: teamReviewersComponent,
        },
    ];
    // Wrap the items in a DataList
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Compose a vertical card with a header and content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Pull Request Review Requests",
                // Use an icon to visually indicate reviewers
                startElement: {
                    type: "Icon",
                    id: "user-group", // FontAwesome icon name
                    size: 24,
                    color: "blue",
                },
            },
            {
                type: "CardContent",
                // Pass the DataList directly; AutoView will render it responsively
                childrenProps: dataList,
            },
        ],
    };
}
//# sourceMappingURL=836.js.map