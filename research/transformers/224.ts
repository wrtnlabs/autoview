import type * as IAutoView from "@autoview/interface";
type CANNOT_FIND_ONE_REPLY_COMMENT = any;
type NOT_FOUND_ARTICLE_TO_COMMENT = any;
type TOO_MANY_REPORTED_ARTICLE = any;
type CANNOT_FIND_IMAGE_TO_LEFT_COMMENT = any;
namespace ResponseForm_lt_CommentType {
    export type CreateResponse_gt_ = any;
}
type IAutoViewTransformerInputType = any | any | any | any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Check if the input is an array. If so, we will render a list.
  if (Array.isArray(input)) {
    // Map each entry of the array to a DataListItem.
    const listItems: IAutoView.IAutoViewDataListItemProps[] = input.map((item) => {
      // We assume each item can be stringified to display its contents.
      // Use a Markdown component to display the JSON representation.
      const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content: JSON.stringify(item, null, 2) // pretty-print the JSON
      };
      return {
        type: "DataListItem",
        label: markdownComponent
      };
    });
    return {
      type: "DataList",
      childrenProps: listItems
    };
  }

  // Next, check if the input is a non-null object.
  if (input && typeof input === "object") {
    // We try to extract common UX properties from the object.
    // For example, if the input contains a title or description, we use a CardHeader.
    let header: IAutoView.IAutoViewCardHeaderProps | undefined = undefined;
    if ("title" in input || "description" in input) {
      header = {
        type: "CardHeader",
        title: (input as any).title,
        description: (input as any).description,
        // Use an icon to visually enhance the header.
        startElement: {
          type: "Icon",
          id: "info", // using "info" to indicate informational header
          color: "blue",
          size: 16
        }
      };
    }
    
    // Optionally, if a thumbnail URL is provided in the input,
    // include an Image component as CardMedia.
    let media: IAutoView.IAutoViewCardMediaProps | undefined = undefined;
    if ("thumbnail" in input && typeof (input as any).thumbnail === "string") {
      media = {
        type: "CardMedia",
        src: (input as any).thumbnail
      };
    }
    
    // For the main content, try to use a Markdown component.
    // If the input has a "content" property that is a string, use it.
    // Otherwise, stringify the entire object (excluding already used keys) to present the data.
    let mainContent: IAutoView.IAutoViewCardContentProps;
    if ("content" in input && typeof (input as any).content === "string") {
      mainContent = {
        type: "CardContent",
        childrenProps: {
          type: "Markdown",
          content: (input as any).content
        }
      };
    } else {
      // Remove keys that have already been used to avoid redundancy.
      const { title, description, thumbnail, ...rest } = input as any;
      mainContent = {
        type: "CardContent",
        childrenProps: {
          type: "Markdown",
          content: JSON.stringify(rest, null, 2)
        }
      };
    }
    
    // Compose the overall vertical card.
    const childrenComponents: (IAutoView.IAutoViewCardHeaderProps |
                                IAutoView.IAutoViewCardMediaProps |
                                IAutoView.IAutoViewCardContentProps)[] = [];
    if (header) {
      childrenComponents.push(header);
    }
    if (media) {
      childrenComponents.push(media);
    }
    childrenComponents.push(mainContent);
    
    return {
      type: "VerticalCard",
      childrenProps: childrenComponents
    };
  }
  
  // Fallback: if the input is a primitive or unrecognized type,
  // render it as a Markdown component inside a Text component.
  // Note: While Markdown is preferred over plain text, we wrap it in a Text component
  // only if needed to match the component types.
  const fallbackMarkdown: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: String(input)
  };
  
  // Since we want visual engagement with icons and imagery, we wrap the markdown in a card.
  const fallbackCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Data Overview",
        description: "The provided input could not be parsed into a structured format.",
        startElement: {
          type: "Icon",
          id: "warning", // indicate a warning condition
          color: "red",
          size: 16
        }
      },
      {
        type: "CardContent",
        childrenProps: fallbackMarkdown
      }
    ]
  };
  
  return fallbackCard;
}
