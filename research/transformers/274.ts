import type * as IAutoView from "@autoview/interface";
namespace IApiEmojis {
    export type GetResponse = {
        [key: string]: string;
    };
}
type IAutoViewTransformerInputType = IApiEmojis.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We receive an object mapping keys to string values.
  // The goal is to visually display these key/value pairs.
  // We will use a DataList to list each emoji entry.
  // For each key, we create a DataListItem with:
  // - the label showing the key in a styled markdown format
  // - the value showing the emoji content. If the value appears to be a URL
  //   (starting with "http" or "https"), we use an Image component;
  //   otherwise, we display it using a Markdown component with larger title formatting.
  
  const keys = Object.keys(input);
  
  // Handle case where no input data is present.
  if (keys.length === 0) {
    // Using Markdown component to show an empty data state message.
    return {
      content: "### No emojis to display.",
      type: "Markdown"
    } as IAutoView.IAutoViewMarkdownProps;
  }
  
  // Transform each key/value pair into a DataList item.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = keys.map((key) => {
    const value = input[key];
    
    // Determine if the value is a URI.
    const isUri = /^https?:\/\//.test(value);
    
    // Create a component to display the value.
    // When the value is a valid URI, we use the Image component for a visual display.
    // Otherwise, we use Markdown to display the emoji or text with larger formatting.
    let valueComponent: IAutoView.IAutoViewComponentProps;
    if (isUri) {
      valueComponent = {
        src: value,
        alt: key,
        type: "Image"
      } as IAutoView.IAutoViewImageProps;
    } else {
      // Using markdown allows for flexible textual styling and renders nicely on mobile.
      valueComponent = {
        content: `### ${value}`,
        type: "Markdown"
      } as IAutoView.IAutoViewMarkdownProps;
    }
    
    // Similarly, the label is styled with Markdown to emphasize the emoji name.
    const labelComponent: IAutoView.IAutoViewComponentProps = {
      content: `**${key}**`,
      type: "Markdown"
    } as IAutoView.IAutoViewMarkdownProps;
    
    return {
      label: labelComponent,
      value: valueComponent,
      type: "DataListItem"
    } as IAutoView.IAutoViewDataListItemProps;
  });
  
  // Compose the final DataList component, which aggregates all the list items.
  // DataList is responsive and works well on mobile and desktop devices.
  return {
    childrenProps: dataListItems,
    type: "DataList"
  } as IAutoView.IAutoViewDataListProps;
}
