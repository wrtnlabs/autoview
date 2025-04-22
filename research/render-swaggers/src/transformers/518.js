export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f;
    // Map enforcement levels to friendly colors
    const enforcementColorMap = {
        disabled: 'gray',
        active: 'green',
        evaluate: 'yellow',
    };
    // Build the card header with a colored chip showing enforcement status
    const header = {
        type: 'CardHeader',
        title: input.name,
        description: `${(_a = input.source_type) !== null && _a !== void 0 ? _a : 'Repository'}:${input.source}`,
        startElement: {
            type: 'Chip',
            label: input.enforcement,
            color: (_b = enforcementColorMap[input.enforcement]) !== null && _b !== void 0 ? _b : 'primary',
            variant: 'filled',
            size: 'small',
        },
    };
    // Utility to create DataListItemProps for a simple text value
    function makeTextItem(label, value) {
        return {
            type: 'DataListItem',
            label: { type: 'Text', content: label, variant: 'subtitle2' },
            value: { type: 'Text', content: value, variant: 'body2' },
        };
    }
    // Gather detail items
    const details = [];
    details.push(makeTextItem('ID', `${input.id}`));
    details.push(makeTextItem('Target', (_c = input.target) !== null && _c !== void 0 ? _c : '-'));
    // Show enforcement again in the list, this time as an outlined chip
    details.push({
        type: 'DataListItem',
        label: { type: 'Text', content: 'Enforcement', variant: 'subtitle2' },
        value: {
            type: 'Chip',
            label: input.enforcement,
            color: (_d = enforcementColorMap[input.enforcement]) !== null && _d !== void 0 ? _d : 'primary',
            variant: 'outlined',
            size: 'small',
        },
    });
    if (input.current_user_can_bypass !== undefined) {
        details.push(makeTextItem('Current user can bypass', input.current_user_can_bypass));
    }
    // If there are bypass actors, nest a DataList showing each actor
    if (Array.isArray(input.bypass_actors) && input.bypass_actors.length > 0) {
        const actorItems = input.bypass_actors.map((actor) => {
            const idText = actor.actor_id !== null && actor.actor_id !== undefined
                ? `${actor.actor_id}`
                : 'n/a';
            const modeText = actor.bypass_mode
                ? ` (${actor.bypass_mode})`
                : '';
            return {
                type: 'DataListItem',
                label: {
                    type: 'Text',
                    content: actor.actor_type,
                    variant: 'body2',
                },
                value: {
                    type: 'Text',
                    content: idText + modeText,
                    variant: 'body2',
                },
            };
        });
        // Nested DataList component
        const nestedList = {
            type: 'DataList',
            childrenProps: actorItems,
        };
        details.push({
            type: 'DataListItem',
            label: {
                type: 'Text',
                content: 'Bypass Actors',
                variant: 'subtitle2',
            },
            value: nestedList,
        });
    }
    // Timestamps
    if (input.created_at) {
        details.push(makeTextItem('Created', new Date(input.created_at).toLocaleString()));
    }
    if (input.updated_at) {
        details.push(makeTextItem('Updated', new Date(input.updated_at).toLocaleString()));
    }
    // Card content wrapping the DataList of details
    const content = {
        type: 'CardContent',
        childrenProps: {
            type: 'DataList',
            childrenProps: details,
        },
    };
    // Optional footer with a link button to the HTML page
    const footerButtons = [];
    const htmlHref = (_f = (_e = input._links) === null || _e === void 0 ? void 0 : _e.html) === null || _f === void 0 ? void 0 : _f.href;
    if (htmlHref) {
        footerButtons.push({
            type: 'Button',
            label: 'View on GitHub',
            href: htmlHref,
            variant: 'text',
            color: 'primary',
            size: 'small',
        });
    }
    const children = [header, content];
    if (footerButtons.length > 0) {
        const footer = {
            type: 'CardFooter',
            childrenProps: footerButtons,
        };
        children.push(footer);
    }
    // Wrap everything in a vertical card for responsive layout
    return {
        type: 'VerticalCard',
        childrenProps: children,
    };
}
//# sourceMappingURL=518.js.map