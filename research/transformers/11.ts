import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type IShoppingDeposit = {
        id: string & tags.Format<"uuid">;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    };
}
type IAutoViewTransformerInputType = Schema.IShoppingDeposit;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Determine if this is an incoming deposit or an outgoing withdrawal
    const isDeposit = input.direction === 1;

    // Format the timestamp into a human-readable local string.
    // If the date is invalid, this will produce "Invalid Date".
    const formattedDate = new Date(input.created_at).toLocaleString();

    // Choose icon and color based on direction
    const directionIcon: IAutoView.IAutoViewIconProps = {
        type: "Icon",
        id: isDeposit ? "arrow-up" : "arrow-down",
        color: isDeposit ? "green" : "red",
        size: 24,
    };

    // Build a chip that clearly labels deposit vs withdrawal
    const directionChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: isDeposit ? "Deposit" : "Withdrawal",
        color: isDeposit ? "green" : "red",
        variant: "filled",
    };

    // A data list item for each piece of data
    const dataItems: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: "DataListItem",
            // Label with a subtle subtitle style
            label: {
                type: "Text",
                content: "ID",
                variant: "subtitle2",
            },
            // Value rendered as icon + text
            value: {
                type: "Text",
                content: [
                    { type: "Icon", id: "fingerprint", color: "gray", size: 16 },
                    " ",
                    input.id,
                ],
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Date",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: [
                    { type: "Icon", id: "calendar", color: "gray", size: 16 },
                    " ",
                    formattedDate,
                ],
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Source",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: [
                    { type: "Icon", id: "database", color: "gray", size: 16 },
                    " ",
                    input.source,
                ],
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Direction",
                variant: "subtitle2",
            },
            // Render our chip to show deposit vs withdrawal
            value: directionChip,
        },
    ];

    // Wrap the list items into a DataList component
    const detailsList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: dataItems,
    };

    // Build card header with code as title and date as a subtitle
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.code,
        description: formattedDate,
        startElement: directionIcon,
    };

    // Card content holds our details list
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: detailsList,
    };

    // Card footer shows the direction chip again for quick action context
    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: directionChip,
    };

    // A vertical card is responsive and stacks nicely on mobile
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };

    return card;
}
