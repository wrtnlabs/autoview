import type * as IAutoView from "@autoview/interface";
type CANNOT_FIND_ONE_COMMENT = any;
type ResponseForm_lt_boolean_gt_ = any;
type IAutoViewTransformerInputType = any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



/**
 * Transforms input data into a visual component configuration.
 *
 * This function inspects the input data and generates a visual representation
 * using AutoView components. We prioritize visual elements like icons and images.
 *
 * The transformation logic:
 * 1. If the input is an array, then each element is rendered as a DataListItem within a DataList.
 * 2. If the input is an object, then each key/value pair is mapped into a DataListItem.
 *    - If a value is a string that looks like a URL (i.e., starts with http/https),
 *      then an Image component is used, ensuring a more engaging visual.
 *    - For other values, a Markdown component is used to display the data.
 * 3. If the input is a primitive (or null/undefined), it falls back to a simple Markdown component.
 *
 * Note: We are not performing data validation because this will be handled by the compiler.
 */
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper function to check if a string is a URL (basic check)
  const isUrl = (value: string): boolean => {
    return /^https?:\/\//.test(value);
  };

  // Case 1: Input is an array -> render each element as a DataListItem inside a DataList.
  if (Array.isArray(input)) {
    const listItems: IAutoView.IAutoViewDataListItemProps[] = input.map((item, index) => {
      let valueComponent: IAutoView.IAutoViewComponentProps;
      // If the element is an object with known structure, we could further transform.
      // For now, just handle string url or fallback to Markdown.
      if (typeof item === "string" && isUrl(item)) {
        valueComponent = { type: "Image", src: item } as IAutoView.IAutoViewImageProps;
      } else {
        // Use Markdown for non-URL items
        valueComponent = { type: "Markdown", content: JSON.stringify(item, null, 2) } as IAutoView.IAutoViewMarkdownProps;
      }
      const labelComponent = { type: "Markdown", content: `**Item ${index + 1}**` } as IAutoView.IAutoViewMarkdownProps;
      return {
        type: "DataListItem",
        label: labelComponent,
        value: valueComponent,
      } as IAutoView.IAutoViewDataListItemProps;
    });

    return { type: "DataList", childrenProps: listItems } as IAutoView.IAutoViewDataListProps;
  }

  // Case 2: Input is an object -> iterate through its keys and render key-value pairs.
  if (input && typeof input === "object") {
    const listItems: IAutoView.IAutoViewDataListItemProps[] = Object.keys(input).map((key) => {
      const value = (input as Record<string, any>)[key];
      let valueComponent: IAutoView.IAutoViewComponentProps;

      // If the value is a string and looks like a URL, use an Image component.
      if (typeof value === "string" && isUrl(value)) {
        valueComponent = { type: "Image", src: value } as IAutoView.IAutoViewImageProps;
      } else {
        // For other types, use the Markdown component for better visual formatting.
        // Using JSON.stringify to support objects or arrays as well.
        valueComponent = { type: "Markdown", content: JSON.stringify(value, null, 2) } as IAutoView.IAutoViewMarkdownProps;
      }

      // For label, we use Markdown to emphasize the key.
      const labelComponent = { type: "Markdown", content: `**${key}**` } as IAutoView.IAutoViewMarkdownProps;
      return {
        type: "DataListItem",
        label: labelComponent,
        value: valueComponent,
      } as IAutoView.IAutoViewDataListItemProps;
    });

    // Wrap the DataListItems inside a DataList component.
    return { type: "DataList", childrenProps: listItems } as IAutoView.IAutoViewDataListProps;
  }

  // Case 3: Input is primitive or invalid -> fallback to a Markdown display.
  // We use Markdown to format primitive types and ensure some visual consistency.
  return { type: "Markdown", content: String(input) } as IAutoView.IAutoViewMarkdownProps;
}
