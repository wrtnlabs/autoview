import type * as IAutoView from "@autoview/interface";
type IAutoViewTransformerInputType = string[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // In this implementation, we create a vertical card that contains a header and a content section.
  // The header uses an icon and a title to make the UI visually engaging.
  // The content section holds a data list that converts each input string into a markdown-based list item.
  // This approach ensures responsiveness and better visual appeal on both desktop and mobile devices.

  // Create the header of the card with an icon.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Data Visualization",
    description: "A visual representation of your input data.",
    // The startElement accepts only certain component types.
    // Here we choose an Icon component to visually represent the summary.
    startElement: {
      type: "Icon",
      id: "chart-bar", // expected to be a valid kebab-case icon name (without prefix)
      size: 24,
      color: "blue"
    }
  };

  // Transform each input string into a DataListItem with a markdown component as its label.
  const listItems: IAutoView.IAutoViewDataListItemProps[] = input.map((item) => {
    // Use markdown for text representation to improve appearance.
    const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      // Using markdown syntax (bold text) to help visual emphasis.
      content: `**${item}**`
    };

    return {
      type: "DataListItem",
      label: markdownComponent
    };
  });

  // Handle the edge case where no input data is provided.
  if (listItems.length === 0) {
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: "No data available."
      }
    });
  }

  // Create a DataList container to hold the list items.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems
  };

  // Wrap the data list inside a CardContent component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Compose the final vertical card component with header and content.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent
    ]
  };

  // Return the composed component.
  return verticalCard;
}
