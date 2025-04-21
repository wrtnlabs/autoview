import type * as IAutoView from "@autoview/interface";
namespace Schema { }
type IAutoViewTransformerInputType = string;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to create a text component
  const createText = (text: string): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content: text,
    variant: "body2",
  });

  // Helper to create a markdown component
  const createMarkdown = (md: string): IAutoView.IAutoViewMarkdownProps => ({
    type: "Markdown",
    content: md,
  });

  // Helper to create a chip for simple badges
  const createChip = (label: string): IAutoView.IAutoViewChipProps => ({
    type: "Chip",
    label,
    variant: "filled",
    color: "primary",
    size: "small",
  });

  // Helper to create an image component
  const createImage = (src: string, alt = ""): IAutoView.IAutoViewImageProps => ({
    type: "Image",
    src,
    alt,
  });

  // Determine how to visualize a single value
  function visualizeValue(value: any): IAutoView.IAutoViewPresentationComponentProps {
    // Strings
    if (typeof value === "string") {
      const trimmed = value.trim();
      // URL to an image
      if (/^https?:\/\/.+\.(png|jpg|jpeg|gif|svg)(\?.*)?$/i.test(trimmed)) {
        return createImage(trimmed, "image");
      }
      // Long text or contains newlines -> show as code block in markdown
      if (trimmed.length > 100 || trimmed.includes("\n")) {
        const block = "json\n" + trimmed + "\n```";
        return createMarkdown(block);
      }
      // Otherwise simple text
      return createText(trimmed);
    }

    // Numbers and booleans -> chip
    if (typeof value === "number" || typeof value === "boolean") {
      return createChip(String(value));
    }

    // Null or undefined
    if (value === null || value === undefined) {
      return createText(String(value));
    }

    // Objects or arrays -> show JSON code block
    try {
      const json = JSON.stringify(value, null, 2);
      return createMarkdown("```json\n" + json + "\n```");
    } catch {
      // Fallback to text
      return createText(String(value));
    }
  }

  // Parse the input string into JSON
  let data: any;
  try {
    data = JSON.parse(input);
  } catch (err) {
    // If parsing fails, show an error markdown
    return createMarkdown("### Invalid JSON\nCould not parse the input data.");
  }

  // Build list items for object or array root
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  if (Array.isArray(data)) {
    // For arrays, list each index => value
    data.forEach((item, idx) => {
      items.push({
        type: "DataListItem",
        label: createText(`#${idx}`),
        value: visualizeValue(item),
      });
    });
  } else if (typeof data === "object" && data !== null) {
    // For objects, list each key => value
    Object.keys(data).forEach((key) => {
      const val = data[key];
      items.push({
        type: "DataListItem",
        label: createText(key),
        value: visualizeValue(val),
      });
    });
  } else {
    // Primitive root -> show directly
    return visualizeValue(data) as IAutoView.IAutoViewComponentProps;
  }

  // Return a data list component visualizing all items
  return {
    type: "DataList",
    childrenProps: items,
  };
}
