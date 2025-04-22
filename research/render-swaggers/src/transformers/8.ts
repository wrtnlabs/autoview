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
    // Attempt to format the ISO datetime into a localized string; fallback to raw if invalid
    const dateObj = new Date(input.created_at);
    const formattedDate = isNaN(dateObj.getTime())
        ? input.created_at
        : dateObj.toLocaleString();

    // Determine if this is a deposit (1) or withdrawal (-1)
    const isDeposit = input.direction === 1;

    // An icon to represent direction: down arrow for deposit, up arrow for withdrawal
    const directionIcon: IAutoView.IAutoViewIconProps = {
        type: "Icon",
        id: isDeposit ? "arrow-down" : "arrow-up",
        color: isDeposit ? "green" : "red",
        size: 24,
    };

    // A chip that displays the source of the transaction
    const sourceChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: input.source,
        variant: "filled",
        color: "info",
        size: "small",
    };

    // The card header will show the transaction code, the date, and the direction & source
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.code,
        description: formattedDate,
        // Show the direction icon on the left
        startElement: directionIcon,
        // Show the source chip on the right
        endElement: sourceChip,
    };

    // A key/value list to expose the transaction ID and direction in more detail
    const detailsList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                // Label as a Text component
                label: [{ type: "Text", content: "Transaction ID", variant: "body2" }],
                // Value as the raw UUID
                value: [{ type: "Text", content: input.id, variant: "body1" }],
            },
            {
                type: "DataListItem",
                label: [{ type: "Text", content: "Direction", variant: "body2" }],
                // Reuse the direction icon to make this row more visual
                value: directionIcon,
            },
        ],
    };

    // The card content holds the detailed list
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: detailsList,
    };

    // Assemble a responsive vertical card combining header & content
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
