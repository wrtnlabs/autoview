import type * as IAutoView from "@autoview/interface";
type CANNOT_FINDONE_ARTICLE = any;
type ARLEADY_REPORTED_ARTICLE = any;
type ResponseForm_lt_true_gt_ = any;
type IAutoViewTransformerInputType = any | any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Utility function to create a markdown component for rendering text content
  const createMarkdown = (content: string): IAutoView.IAutoViewMarkdownProps => ({
    type: "Markdown",
    content
  });

  // Utility function to create a text component for simple text display (e.g., for keys)
  const createText = (content: string): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content,
    variant: "body1" // using a common text variant; modify as needed
  });

  // If input is null or undefined, render a friendly markdown message.
  if (input === null || input === undefined) {
    return createMarkdown("No data available.");
  }

  // If input is not an object (e.g., a primitive type), then render it in a markdown component.
  if (typeof input !== "object") {
    return createMarkdown(`\`\`\`
${String(input)}
\`\`\``);
  }

  // If input is an array, visualize each item with its index.
  if (Array.isArray(input)) {
    // Map each array element to a DataListItem
    const childrenItems: IAutoView.IAutoViewDataListItemProps[] = input.map((item, idx) => ({
      type: "DataListItem",
      // For each item's label, we use the index value wrapped into a text component.
      label: createText(`Item ${idx}`),
      // For value, use markdown to present the JSON stringified content.
      value: createMarkdown(`\`\`\`json
${JSON.stringify(item, null, 2)}
\`\`\``)
    }));

    return {
      type: "DataList",
      childrenProps: childrenItems
    };
  }

  // If input is an object (but not an array), iterate over its keys.
  // We create a list item for each key-value pair.
  const childrenItems: IAutoView.IAutoViewDataListItemProps[] = Object.keys(input).map((key) => {
    // Access the value associated with the key.
    const value = (input as Record<string, any>)[key];
    // If the value is an object, we JSON.stringify it.
    const valueString = typeof value === "object"
      ? JSON.stringify(value, null, 2)
      : String(value);
    return {
      type: "DataListItem",
      // Label uses a text component to display the property key.
      label: createText(key),
      // Value is shown using markdown for a visually enhanced code block look.
      value: createMarkdown(`\`\`\`json
${valueString}
\`\`\``)
    };
  });

  // Wrap the list of data items in a DataList component to provide a structured visualization.
  return {
    type: "DataList",
    childrenProps: childrenItems
  };
}
