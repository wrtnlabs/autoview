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
  // Parse and format the creation date, fallback to raw string if invalid
  const createdDate = new Date(input.created_at);
  const formattedDate = isNaN(createdDate.getTime())
    ? input.created_at
    : createdDate.toLocaleString();

  // Determine if this is a deposit (1) or withdrawal (-1)
  const isDeposit = input.direction === 1;

  // Icon representing direction: down arrow for deposit, up arrow for withdrawal
  const directionIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: isDeposit ? "arrow-down" : "arrow-up",
    color: isDeposit ? "green" : "red",
    size: 24,
  };

  // A chip summarizing the transaction type
  const directionChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: isDeposit ? "Deposit" : "Withdrawal",
    color: isDeposit ? "success" : "error",
    size: "small",
    variant: "filled",
    startElement: directionIcon,
  };

  // Helper to create a text component for labels and values
  const makeText = (
    content: string,
    variant: IAutoView.IAutoViewTextProps["variant"] = "body2",
    color?: IAutoView.IAutoViewTextProps["color"]
  ): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content,
    variant,
    color,
  });

  // Build a data list of the key fields
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        label: [makeText("ID", "caption", "tertiary")],
        value: makeText(input.id, "body2"),
      },
      {
        type: "DataListItem",
        label: [makeText("Source", "caption", "tertiary")],
        value: makeText(input.source, "body2"),
      },
      {
        type: "DataListItem",
        label: [makeText("Date", "caption", "tertiary")],
        value: makeText(formattedDate, "body2"),
      },
      {
        type: "DataListItem",
        label: [makeText("Type", "caption", "tertiary")],
        value: directionChip,
      },
    ],
  };

  // Compose a vertical card with a header and the data list content
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        // Header shows the transaction code prominently
        type: "CardHeader",
        title: input.code,
        description: formattedDate,
        startElement: directionIcon,
      },
      {
        // Content holds the detailed list
        type: "CardContent",
        childrenProps: dataList,
      },
    ],
  };

  return card;
}
