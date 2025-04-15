import type * as IAutoView from "@autoview/interface";
type CANNOT_FINDONE_ARTICLE = any;
type ResponseForm_lt_boolean_gt_ = any;
type IS_NOT_WRITER_OF_THIS_ARTICLE = any;
type IAutoViewTransformerInputType = any | any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



/**
 * Helper function to create a Markdown component.
 * Uses IAutoViewMarkdownProps to display text content.
 */
function createMarkdown(content: string): IAutoView.IAutoViewMarkdownProps {
  return {
    type: "Markdown",
    content,
  };
}

/**
 * Helper function to create an Image component.
 * Uses IAutoViewImageProps to display an image.
 */
function createImage(src: string): IAutoView.IAutoViewImageProps {
  return {
    type: "Image",
    src,
    alt: "Visual representation",
  };
}

/**
 * Transforms a given value into an appropriate AutoView visual component.
 * For string values that appear to be image URLs, an image is shown.
 * Otherwise, values are rendered via Markdown.
 */
function transformValue(value: any): IAutoView.IAutoViewComponentProps {
  if (typeof value === "string") {
    // Check if the string looks like an image URL (common image extensions).
    if (/^https?:\/\/.*\.(jpg|jpeg|png|gif|svg)$/i.test(value.trim())) {
      return createImage(value);
    }
    return createMarkdown(value);
  } else if (typeof value === "number" || typeof value === "boolean") {
    return createMarkdown(String(value));
  } else if (typeof value === "object" && value !== null) {
    // Convert object to a pretty-printed JSON string.
    try {
      return createMarkdown(JSON.stringify(value, null, 2));
    } catch (e) {
      return createMarkdown("Unable to display object data");
    }
  }
  // Fallback for unsupported types.
  return createMarkdown("Unsupported data type");
}

/**
 * Main function to transform input data into an AutoView component
 * that displays the information in a visually engaging way.
 *
 * The function behaves differently based on the input type:
 * - For primitive values (string, number, boolean), it returns a simple Markdown component.
 * - For arrays, it builds a DataList where each array item is visualized.
 * - For objects, it builds a vertical card containing a header and a list
 *   of key-value pairs (each rendered as a DataListItem).
 * - For null/undefined or invalid input, it shows a default message.
 */
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Handle primitive types by returning a simple Markdown component.
  if (typeof input === "string" || typeof input === "number" || typeof input === "boolean") {
    return createMarkdown(String(input));
  }

  // Handle arrays by transforming each item into a DataListItem.
  if (Array.isArray(input)) {
    const listItems = input.map((item, index) => {
      // Each list item gets a label showing its index.
      const labelMarkdown = createMarkdown(`Item ${index + 1}`);
      const valueComponent = transformValue(item);
      return {
        type: "DataListItem",
        label: labelMarkdown,
        value: valueComponent,
      } as IAutoView.IAutoViewDataListItemProps;
    });

    // Create a DataList to aggregate the list items.
    const dataList: IAutoView.IAutoViewDataListProps = {
      type: "DataList",
      childrenProps: listItems,
    };

    return dataList;
  }

  // Handle object input (non-null) by iterating over its keys.
  if (typeof input === "object" && input !== null) {
    const keys = Object.keys(input);
    const listItems = keys.map((key) => {
      // Render the key as a Markdown label.
      const labelComponent = createMarkdown(key);
      // Transform the associated value visually.
      const valueComponent = transformValue((input as any)[key]);
      return {
        type: "DataListItem",
        label: labelComponent,
        value: valueComponent,
      } as IAutoView.IAutoViewDataListItemProps;
    });

    // Create a DataList to hold the key-value pairs.
    const dataList: IAutoView.IAutoViewDataListProps = {
      type: "DataList",
      childrenProps: listItems,
    };

    // Compose a card header with an icon to give visual context.
    const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
      type: "CardHeader",
      title: "Data Overview",
      description: "Visualized input data",
      startElement: {
        type: "Icon",
        id: "info", // Using a common icon name
        color: "blue",
        size: 16,
      },
    };

    // Card content holds the data list.
    const cardContent: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      childrenProps: dataList,
    };

    // A vertical card aggregates the header and content.
    const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
      type: "VerticalCard",
      childrenProps: [cardHeader, cardContent],
    };

    return verticalCard;
  }

  // If input is invalid (null or undefined), return a message.
  return createMarkdown("No valid input provided");
}
