export function transform($input) {
    return visualizeData($input);
}
// Transforms ChatBasedUserChatsView into a rich AutoView vertical card showing key metrics and pagination.
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    // Aggregate metrics, using 0 when arrays are undefined
    const messagesCount = (_b = (_a = input.messages) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    const sessionsCount = (_d = (_c = input.sessions) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0;
    const chatsCount = (_f = (_e = input.userChats) === null || _e === void 0 ? void 0 : _e.length) !== null && _f !== void 0 ? _f : 0;
    const usersCount = (_h = (_g = input.users) === null || _g === void 0 ? void 0 : _g.length) !== null && _h !== void 0 ? _h : 0;
    const managersCount = (_k = (_j = input.managers) === null || _j === void 0 ? void 0 : _j.length) !== null && _k !== void 0 ? _k : 0;
    const tagsCount = (_m = (_l = input.chatTags) === null || _l === void 0 ? void 0 : _l.length) !== null && _m !== void 0 ? _m : 0;
    // Build a list of DataListItem components for each metric
    const metrics = [
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'Messages' },
            value: { type: 'Text', content: messagesCount.toString() },
        },
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'Sessions' },
            value: { type: 'Text', content: sessionsCount.toString() },
        },
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'User Chats' },
            value: { type: 'Text', content: chatsCount.toString() },
        },
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'Users' },
            value: { type: 'Text', content: usersCount.toString() },
        },
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'Managers' },
            value: { type: 'Text', content: managersCount.toString() },
        },
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'Tags' },
            value: { type: 'Text', content: tagsCount.toString() },
        },
    ];
    // Wrap the items in a DataList component
    const dataList = {
        type: 'DataList',
        childrenProps: metrics,
    };
    // Header for the summary card
    const cardHeader = {
        type: 'CardHeader',
        title: 'Chat Overview',
        description: 'Key metrics at a glance',
    };
    // Content of the card containing the DataList
    const cardContent = {
        type: 'CardContent',
        childrenProps: dataList,
    };
    // Build optional pagination buttons if prev/next tokens are present
    const footerButtons = [];
    if (input.prev) {
        footerButtons.push({
            type: 'Button',
            variant: 'text',
            size: 'small',
            startElement: { type: 'Icon', id: 'arrow-left', size: 16 },
            label: 'Previous',
            href: input.prev,
        });
    }
    if (input.next) {
        footerButtons.push({
            type: 'Button',
            variant: 'text',
            size: 'small',
            endElement: { type: 'Icon', id: 'arrow-right', size: 16 },
            label: 'Next',
            href: input.next,
        });
    }
    // Footer of the card holding pagination controls, if any
    const cardFooter = {
        type: 'CardFooter',
        // If only one button, pass it directly; if two, pass as array; if none, undefined
        childrenProps: footerButtons.length === 1
            ? footerButtons[0]
            : footerButtons.length > 1
                ? footerButtons
                : undefined,
    };
    // Assemble and return a responsive vertical card
    return {
        type: 'VerticalCard',
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
}
//# sourceMappingURL=264.js.map