export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // 1. Build avatar list for users
    const userAvatars = ((_a = input.users) === null || _a === void 0 ? void 0 : _a.map(user => ({
        type: "Avatar",
        src: user.avatar_url,
        name: user.login,
        variant: "gray",
        size: 28,
    }))) || [];
    // 2. Build chip list for teams
    const teamChips = ((_b = input.teams) === null || _b === void 0 ? void 0 : _b.map(team => ({
        type: "Chip",
        label: team.name || "",
        variant: "outlined",
        color: "primary",
        size: "small",
    }))) || [];
    // 3. Build chip list for apps
    const appChips = ((_c = input.apps) === null || _c === void 0 ? void 0 : _c.map(app => ({
        type: "Chip",
        label: app.name || "",
        variant: "outlined",
        color: "secondary",
        size: "small",
    }))) || [];
    // 4. Compose markdown for the policy URLs
    const urlsMarkdown = [
        `- Policy URL: [Open](${input.url})`,
        `- Users URL: [Open](${input.users_url})`,
        `- Teams URL: [Open](${input.teams_url})`,
        `- Apps URL: [Open](${input.apps_url})`,
    ].join("\n");
    // 5. Assemble the VerticalCard
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header: title with a lock icon
                type: "CardHeader",
                title: "Branch Restriction Policy",
                startElement: {
                    type: "Icon",
                    id: "lock",
                    color: "blue",
                    size: 24,
                },
            },
            {
                // Content: a DataList summarizing users, teams, and apps
                type: "CardContent",
                childrenProps: [
                    {
                        type: "DataList",
                        childrenProps: [
                            {
                                // Users: show avatar group
                                type: "DataListItem",
                                label: {
                                    type: "Text",
                                    content: "Users",
                                    variant: "subtitle1",
                                },
                                value: {
                                    type: "AvatarGroup",
                                    childrenProps: userAvatars,
                                    maxItems: 5,
                                    totalItems: userAvatars.length,
                                },
                            },
                            {
                                // Teams: show team chips
                                type: "DataListItem",
                                label: {
                                    type: "Text",
                                    content: "Teams",
                                    variant: "subtitle1",
                                },
                                value: {
                                    type: "ChipGroup",
                                    childrenProps: teamChips,
                                    maxItems: 5,
                                },
                            },
                            {
                                // Apps: show app chips
                                type: "DataListItem",
                                label: {
                                    type: "Text",
                                    content: "Apps",
                                    variant: "subtitle1",
                                },
                                value: {
                                    type: "ChipGroup",
                                    childrenProps: appChips,
                                    maxItems: 5,
                                },
                            },
                        ],
                    },
                ],
            },
            {
                // Footer: markdown links to all relevant URLs
                type: "CardFooter",
                childrenProps: {
                    type: "Markdown",
                    content: urlsMarkdown,
                },
            },
        ],
    };
}
//# sourceMappingURL=644.js.map