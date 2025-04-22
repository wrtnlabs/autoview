export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g;
    // Extract branch name from URL for display
    const branchName = input.url.split("/").pop() || input.url;
    // Prepare header with an icon and branch information
    const header = {
        type: "CardHeader",
        title: branchName,
        description: input.url,
        startElement: {
            type: "Icon",
            id: "code-branch", // FontAwesome branch icon
            color: "blue",
            size: 24,
        },
    };
    // Helper to render boolean-enabled policies as Chips
    function renderFlag(label, enabled) {
        return {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: label,
                    variant: "body2",
                },
            ],
            value: {
                type: "Chip",
                label: enabled ? "Enabled" : "Disabled",
                color: enabled ? "green" : "error",
                variant: "filled",
            },
        };
    }
    // Build list of DataListItemProps
    const items = [];
    // 1. Required status checks
    if (input.required_status_checks) {
        const s = input.required_status_checks;
        const md = [
            `**Strict**: ${s.strict}`,
            `**Contexts**: ${s.contexts.join(", ") || "None"}`,
            `**Checks Count**: ${s.checks.length}`,
            `**Details**: [View Contexts](${s.contexts_url})`,
        ].join("\n\n");
        items.push({
            type: "DataListItem",
            label: [
                { type: "Text", content: "Status Checks", variant: "body2" },
            ],
            value: {
                type: "Markdown",
                content: md,
            },
        });
    }
    // 2. Pull request reviews policy
    if (input.required_pull_request_reviews) {
        const r = input.required_pull_request_reviews;
        const lines = [];
        if (typeof r.required_approving_review_count === "number") {
            lines.push(`- **Approvals Required**: ${r.required_approving_review_count}`);
        }
        lines.push(`- **Dismiss Stale Reviews**: ${!!r.dismiss_stale_reviews}`);
        lines.push(`- **Require Code Owner Reviews**: ${!!r.require_code_owner_reviews}`);
        lines.push(`- **Bypass Allowances (users/teams/apps)**: 
    - Users: ${(_b = (_a = r.bypass_pull_request_allowances) === null || _a === void 0 ? void 0 : _a.users.length) !== null && _b !== void 0 ? _b : 0}
    - Teams: ${(_d = (_c = r.bypass_pull_request_allowances) === null || _c === void 0 ? void 0 : _c.teams.length) !== null && _d !== void 0 ? _d : 0}
    - Apps: ${(_g = (_f = (_e = r.bypass_pull_request_allowances) === null || _e === void 0 ? void 0 : _e.apps) === null || _f === void 0 ? void 0 : _f.length) !== null && _g !== void 0 ? _g : 0}`);
        const md = lines.join("\n");
        items.push({
            type: "DataListItem",
            label: [
                { type: "Text", content: "Pull Request Reviews", variant: "body2" },
            ],
            value: {
                type: "Markdown",
                content: md,
            },
        });
    }
    // 3. Other boolean-based policies
    const booleanPolicies = [
        {
            prop: "required_signatures",
            label: "Required Signatures",
            getEnabled: (x) => x.enabled === true,
        },
        {
            prop: "enforce_admins",
            label: "Enforce Admins",
            getEnabled: (x) => x.enabled === true,
        },
        {
            prop: "required_linear_history",
            label: "Linear History",
            getEnabled: (x) => x.enabled === true,
        },
        {
            prop: "allow_force_pushes",
            label: "Allow Force Pushes",
            getEnabled: (x) => x.enabled === true,
        },
        {
            prop: "allow_deletions",
            label: "Allow Deletions",
            getEnabled: (x) => x.enabled === true,
        },
        {
            prop: "required_conversation_resolution",
            label: "Conversation Resolution",
            getEnabled: (x) => x.enabled === true,
        },
        {
            prop: "block_creations",
            label: "Block Creations",
            getEnabled: (x) => x.enabled === true,
        },
        {
            prop: "lock_branch",
            label: "Lock Branch",
            getEnabled: (x) => x.enabled === true,
        },
        {
            prop: "allow_fork_syncing",
            label: "Allow Fork Syncing",
            getEnabled: (x) => x.enabled === true,
        },
    ];
    for (const policy of booleanPolicies) {
        // Only render if property is present
        const obj = input[policy.prop];
        if (obj !== undefined) {
            items.push(renderFlag(policy.label, policy.getEnabled(obj)));
        }
    }
    // 4. Restrictions: users, teams, apps
    if (input.restrictions) {
        const r = input.restrictions;
        const md = [
            `- **Users**: ${r.users.length}`,
            `- **Teams**: ${r.teams.length}`,
            `- **Apps**: ${r.apps.length}`,
        ].join("\n");
        items.push({
            type: "DataListItem",
            label: [
                { type: "Text", content: "Restrictions", variant: "body2" },
            ],
            value: {
                type: "Markdown",
                content: md,
            },
        });
    }
    // Compose the DataList
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Wrap everything in a vertical card for a responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            { type: "CardContent", childrenProps: dataList },
        ],
    };
    return card;
}
//# sourceMappingURL=631.js.map