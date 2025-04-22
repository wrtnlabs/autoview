import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema { }
type IAutoViewTransformerInputType = (string & tags.Format<"date">)[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms an array of date strings into a visual list with calendar icons.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map each date string to a DataListItem with an icon and formatted text
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((dateStr) => {
    // Attempt to parse the date; if invalid, fall back to raw input
    const date = new Date(dateStr);
    const formatted = isNaN(date.getTime())
      ? dateStr
      : date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });

    // Calendar icon for visual cue
    const icon: IAutoView.IAutoViewIconProps = {
      type: 'Icon',
      id: 'calendar',
      color: 'blue',
      size: 20,
    };

    // Display the formatted date
    const text: IAutoView.IAutoViewTextProps = {
      type: 'Text',
      content: formatted,
      variant: 'body1',
    };

    return {
      type: 'DataListItem',
      // Combine icon and text in the label
      label: [icon, text],
    };
  });

  // Wrap all items in a DataList container
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: 'DataList',
    childrenProps: items,
  };

  return dataList;
}
