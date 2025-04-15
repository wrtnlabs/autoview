import type * as IAutoView from "@autoview/interface";
type SELECT_MORE_THAN_ONE_IMAGE = any;
type ResponseForm_lt_Array_lt_string_gt__gt_ = any;
type IAutoViewTransformerInputType = any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If the input is not an object (or is null), fall back to rendering JSON using markdown.
  if (typeof input !== "object" || input === null) {
    const fallbackMarkdown: IAutoView.IAutoViewMarkdownProps = {
      content: "json\n" + JSON.stringify(input, null, 2) + "\n```",
      type: "Markdown"
    };
    return fallbackMarkdown;
  }

  // Prepare an array of DataListItems to represent key-value pairs from the input data.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Iterate over each key in the input object.
  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const value = input[key];

      // Determine how to visually represent the value.
      // If value is a string that appears to be an image URL, use an Image component.
      let valueComponent: IAutoView.IAutoViewComponentProps;
      if (
        typeof value === "string" &&
        /^(http|https):\/\/.*\.(jpg|jpeg|png|gif|svg)$/.test(value)
      ) {
        valueComponent = {
          src: value,
          type: "Image"
        } as IAutoView.IAutoViewImageProps;
      } else {
        // Otherwise, use a Markdown component to render the value as formatted text.
        // This keeps the UI visually engaging while still providing detailed data.
        valueComponent = {
          content: `**${key}:** ${JSON.stringify(value)}`,
          type: "Markdown"
        } as IAutoView.IAutoViewMarkdownProps;
      }

      // For the label, we use a Markdown element that highlights the key.
      const labelComponent: IAutoView.IAutoViewMarkdownProps = {
        content: `**${key}**`,
        type: "Markdown"
      };

      // Append the new DataListItem to our array.
      dataListItems.push({
        label: labelComponent,
        value: valueComponent,
        type: "DataListItem"
      });
    }
  }

  // Create a DataList component to display all key-value pairs in a list format.
  const dataList: IAutoView.IAutoViewDataListProps = {
    childrenProps: dataListItems,
    type: "DataList"
  };

  // Create a CardHeader component with an icon to make the UI visually appealing.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    title: "Data Overview",
    description: "This card summarizes the input data visually.",
    startElement: {
      id: "info",  // assuming "info" is a valid icon name in kebab-case
      type: "Icon",
      size: 24,
      color: "blue"
    } as IAutoView.IAutoViewIconProps,
    type: "CardHeader"
  };

  // Package the DataList inside a CardContent component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    childrenProps: dataList,
    type: "CardContent"
  };

  // Compose the final UI card as a VerticalCard, a container suited for responsive layouts.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    childrenProps: [cardHeader, cardContent],
    type: "VerticalCard"
  };

  // Return the composed component structure to be rendered.
  return verticalCard;
}
