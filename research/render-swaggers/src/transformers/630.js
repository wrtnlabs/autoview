export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    // Accumulate data-list items for each feature
    const items = [];
    /**
     * Helper to add a boolean feature as a DataListItem with a colored Chip
     */
    function addBoolFeature(label, enabled) {
        if (enabled === undefined)
            return;
        items.push({
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
                color: enabled ? "success" : "gray",
                variant: "filled",
                size: "small",
            },
        });
    }
    // Top‐level booleans
    addBoolFeature("Branch Protection", input.enabled);
    addBoolFeature("Linear History Required", (_a = input.required_linear_history) === null || _a === void 0 ? void 0 : _a.enabled);
    addBoolFeature("Allow Force Pushes", (_b = input.allow_force_pushes) === null || _b === void 0 ? void 0 : _b.enabled);
    addBoolFeature("Allow Deletions", (_c = input.allow_deletions) === null || _c === void 0 ? void 0 : _c.enabled);
    addBoolFeature("Block Creations", (_d = input.block_creations) === null || _d === void 0 ? void 0 : _d.enabled);
    addBoolFeature("Require Conversation Resolution", (_e = input.required_conversation_resolution) === null || _e === void 0 ? void 0 : _e.enabled);
    // Required Status Checks → rendered as markdown list
    if (input.required_status_checks) {
        const rsc = input.required_status_checks;
        const contextsMd = rsc.contexts.map((c) => `- ${c}`).join("\n") || "- (none)";
        const mdContent = `**Strict**: ${rsc.strict ? "Yes" : "No"}\n\n` +
            `**Contexts (${rsc.contexts.length})**:\n${contextsMd}`;
        items.push({
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Required Status Checks",
                    variant: "body2",
                },
            ],
            value: {
                type: "Markdown",
                content: mdContent,
            },
        });
    }
    // Pull Request Reviews → bullet‐points of review policies
    if (input.required_pull_request_reviews) {
        const pr = input.required_pull_request_reviews;
        const lines = [];
        lines.push(`- Dismiss Stale Reviews: ${pr.dismiss_stale_reviews ? "✅" : "❌"}`);
        lines.push(`- Require Code Owner Reviews: ${pr.require_code_owner_reviews ? "✅" : "❌"}`);
        if (pr.required_approving_review_count !== undefined) {
            lines.push(`- Approving Reviews Required: ${pr.required_approving_review_count}`);
        }
        if (pr.require_last_push_approval !== undefined) {
            lines.push(`- Last Push Approval: ${pr.require_last_push_approval ? "✅" : "❌"}`);
        }
        items.push({
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Pull Request Reviews",
                    variant: "body2",
                },
            ],
            value: {
                type: "Markdown",
                content: lines.join("\n"),
            },
        });
    }
    // Restrictions (counts of users/teams/apps)
    if (input.restrictions) {
        const r = input.restrictions;
        const users = (_g = (_f = r.users) === null || _f === void 0 ? void 0 : _f.length) !== null && _g !== void 0 ? _g : 0;
        const teams = (_j = (_h = r.teams) === null || _h === void 0 ? void 0 : _h.length) !== null && _j !== void 0 ? _j : 0;
        const apps = (_l = (_k = r.apps) === null || _k === void 0 ? void 0 : _k.length) !== null && _l !== void 0 ? _l : 0;
        const md = `**Users**: ${users}\n\n**Teams**: ${teams}\n\n**Apps**: ${apps}`;
        items.push({
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Restrictions",
                    variant: "body2",
                },
            ],
            value: {
                type: "Markdown",
                content: md,
            },
        });
    }
    // Required signatures: boolean sub‐object
    if (input.required_signatures) {
        addBoolFeature("Required Signatures", input.required_signatures.enabled);
    }
    // Lock branch & fork syncing
    addBoolFeature("Lock Branch", (_m = input.lock_branch) === null || _m === void 0 ? void 0 : _m.enabled);
    addBoolFeature("Allow Fork Syncing", (_o = input.allow_fork_syncing) === null || _o === void 0 ? void 0 : _o.enabled);
    // Compose a vertical card: header + a data list
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: (_p = input.name) !== null && _p !== void 0 ? _p : "Branch Protection",
                description: (_q = input.protection_url) !== null && _q !== void 0 ? _q : input.url,
                startElement: {
                    type: "Icon",
                    id: "shield-alt",
                    size: 24,
                    // IconProps only support color scales (no “success”), so use a direct color
                    color: input.enabled ? "green" : "gray",
                },
            },
            {
                type: "CardContent",
                childrenProps: [
                    {
                        type: "DataList",
                        childrenProps: items,
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=630.js.map