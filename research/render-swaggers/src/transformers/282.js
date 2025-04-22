export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Safely extract the list of articles; handle missing or empty list
    const articles = (_b = (_a = input.data) === null || _a === void 0 ? void 0 : _a.list) !== null && _b !== void 0 ? _b : [];
    // Helper to convert the createdAt field to a readable string.
    // Since Schema.Date is a generic object, we coerce it to string.
    const formatDate = (date) => {
        try {
            const d = new Date(date);
            return isNaN(d.getTime()) ? String(date) : d.toLocaleDateString();
        }
        catch (_a) {
            return String(date);
        }
    };
    // Map each article to a VerticalCardProps
    const cards = articles.map((article) => {
        var _a, _b;
        // CardHeader: show article id, and if it's the user's article, a chip
        const header = Object.assign({ type: "CardHeader", title: `Article #${article.id}` }, (article.isMine && {
            endElement: {
                type: "Chip",
                label: "My Article",
                size: "small",
                color: "primary",
                variant: "outlined",
            },
        }));
        // CardMedia: show thumbnail if available
        const media = article.thumbnail != null
            ? { type: "CardMedia", src: article.thumbnail }
            : undefined;
        // CardContent: render the article contents as markdown for richer formatting
        const content = {
            type: "CardContent",
            childrenProps: {
                type: "Markdown",
                content: article.contents,
            },
        };
        // CardFooter: show publication date, comment count, and a heart icon if picked
        const footerChildren = [];
        // Publication date as a caption
        footerChildren.push({
            type: "Text",
            variant: "caption",
            color: "gray",
            content: `Published: ${formatDate(article.createdAt)}`,
        });
        // Comment count badge
        footerChildren.push({
            type: "Badge",
            count: (_b = (_a = article.comments) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0,
            childrenProps: {
                type: "Icon",
                id: "comment",
                color: "gray",
                size: 16,
            },
        });
        // Heart icon if user has picked (liked) the article
        if (article.myPick) {
            footerChildren.push({
                type: "Icon",
                id: "heart",
                color: "red",
                size: 16,
            });
        }
        const footer = {
            type: "CardFooter",
            childrenProps: footerChildren,
        };
        // Assemble the vertical card, filtering out undefined media
        const children = [header, media, content, footer].filter((child) => child !== undefined);
        return {
            type: "VerticalCard",
            childrenProps: children,
        };
    });
    // Compose a Carousel to display articles as swipeable cards; suitable for both desktop and mobile.
    return {
        type: "Carousel",
        autoPlay: true,
        interval: 3000,
        infinite: true,
        navControls: true,
        indicators: true,
        childrenProps: cards,
    };
}
//# sourceMappingURL=282.js.map