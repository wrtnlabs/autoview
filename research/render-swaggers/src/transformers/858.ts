import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A repository rule with ruleset details.
     *
     * @title Repository Rule
    */
    export type repository_rule_detailed = any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any;
}
type IAutoViewTransformerInputType = Schema.repository_rule_detailed[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there's no data, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No repository rules to display.**"
        };
    }

    // Helper: create a DataListItem for a given key/value pair
    const makeDataListItem = (key: string, value: any): IAutoView.IAutoViewDataListItemProps => {
        // Convert value to a user‑friendly string
        let display = "";
        if (value === null || value === undefined) {
            display = "-";
        } else if (typeof value === "object") {
            // For arrays or objects, stringify in JSON style (small)
            display = JSON.stringify(value);
        } else {
            display = String(value);
        }
        return {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: key,
                    variant: "subtitle2",
                    color: "secondary"
                }
            ],
            value: [
                {
                    type: "Text",
                    content: display,
                    variant: "body2",
                    color: "primary"
                }
            ]
        };
    };

    // Build a VerticalCard for each rule entry
    const cards: IAutoView.IAutoViewVerticalCardProps[] = input.map((rule: any, index: number) => {
        // Determine title and description fields if present
        const title = rule.name ?? rule.id ?? `Rule ${index + 1}`;
        const description = typeof rule.description === "string" ? rule.description : undefined;

        // Build a DataList of all top‑level properties
        const dataListItems = Object.keys(rule).map(key => makeDataListItem(key, rule[key]));

        const dataList: IAutoView.IAutoViewDataListProps = {
            type: "DataList",
            childrenProps: dataListItems
        };

        // Card header with an icon indicating it's a rule
        const header: IAutoView.IAutoViewCardHeaderProps = {
            type: "CardHeader",
            title,
            description,
            startElement: {
                type: "Icon",
                id: "gavel",    // represent a rule/law
                color: "blue",
                size: 24
            }
        };

        // Card content embedding the DataList
        const content: IAutoView.IAutoViewCardContentProps = {
            type: "CardContent",
            childrenProps: dataList
        };

        // Card footer with a “Details” button (could be wired to navigation by host)
        const footer: IAutoView.IAutoViewCardFooterProps = {
            type: "CardFooter",
            childrenProps: {
                type: "Button",
                label: "Details",
                variant: "outlined",
                color: "primary"
            }
        };

        return {
            type: "VerticalCard",
            childrenProps: [header, content, footer]
        };
    });

    // If multiple cards, present as a swipeable carousel for better mobile UX
    if (cards.length > 1) {
        const carousel: IAutoView.IAutoViewCarouselProps = {
            type: "Carousel",
            autoPlay: false,
            infinite: false,
            indicators: true,
            navControls: true,
            childrenProps: cards
        };
        return carousel;
    }

    // Single card: render it directly
    return cards[0];
}
