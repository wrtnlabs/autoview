import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type IAutoViewTransformerInputType = (string & tags.Format<"date">)[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there is no input data, return a markdown component clearly stating that no data is available.
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "No data available."
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Map the input date strings into a list of list items.
  // Each list item will display the date with a calendar icon for a better visual representation.
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((dateString) => {
    // For improved readability, we can format the date string using the Date object.
    // In production code, you might wish to use a date formatting library.
    let formattedDate: string;
    try {
      const date = new Date(dateString);
      // Using locale date string. Adjust formatting as needed.
      formattedDate = date.toLocaleDateString();
    } catch {
      // If any error occurs during date formatting, fallback to using the raw string.
      formattedDate = dateString;
    }

    return {
      type: "ListItem",
      // Using the title to show the formatted date.
      title: formattedDate,
      // Set the startElement as an Icon component representing a calendar.
      startElement: {
        type: "Icon",
        id: "calendar", // using "calendar" as an indicative icon name
        color: "blue",
        size: 24
      } as IAutoView.IAutoViewIconProps,
      // Optionally, a description could include more detailed information if needed.
      description: `Original: ${dateString}`
    } as IAutoView.IAutoViewListItemProps;
  });

  // Compose the final list component.
  // Using a list provides a clear and scrollable view of potentially many items,
  // which is beneficial on mobile devices.
  const listComponent: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: listItems
  };

  return listComponent;
}
