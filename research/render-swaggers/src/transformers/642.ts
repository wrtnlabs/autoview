import type * as IAutoView from "@autoview/interface";
namespace Schema { }
type IAutoViewTransformerInputType = string[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no data, show a friendly markdown notice
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No data available\n\nThere is no information to display.",
    };
  }

  // Transform each string into a DataListItem with a text label
  const listItems: IAutoView.IAutoViewDataListItemProps[] = input.map((text) => ({
    type: "DataListItem",
    // Use a Text component for the label, ensures we can style it down the line
    label: {
      type: "Text",
      content: text,
      variant: "body1",
    },
  }));

  // Compose a DataList to render all items responsively
  return {
    type: "DataList",
    childrenProps: listItems,
  };
}
