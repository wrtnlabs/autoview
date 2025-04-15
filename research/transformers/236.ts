import type * as IAutoView from "@autoview/interface";
type CANNOT_FIND_DESIGNER_PROFILE = any;
namespace ResponseForm_lt_UserType {
    export type DetailProfile_gt_ = any;
}
type IAutoViewTransformerInputType = any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // This function transforms any incoming data into a visual representation.
  // We prefer visual components such as images, icons, or markdown (instead of plain text)
  // to make the UI engaging and responsive across devices.

  // Helper: determine if a string looks like a valid URL (only basic check)
  const isUrl = (str: string): boolean => {
    return /^https?:\/\//.test(str);
  };

  // If the input is a string, we check if it’s a URL or just textual information.
  if (typeof input === "string") {
    if (isUrl(input)) {
      // For URL strings, we assume that they point to an image resource.
      // Using the Image component to showcase a visual representation.
      return {
        src: input,
        type: "Image",
      } as IAutoView.IAutoViewImageProps;
    } else {
      // For plain text, we use the Markdown component to render it richly.
      return {
        content: input,
        type: "Markdown",
      } as IAutoView.IAutoViewMarkdownProps;
    }
  }
  // If the input is a number or boolean, we convert them into a string and render using markdown.
  else if (typeof input === "number" || typeof input === "boolean") {
    return {
      content: `\`${input}\``,
      type: "Markdown",
    } as IAutoView.IAutoViewMarkdownProps;
  }
  // If the input is an object (including arrays) and not null, we assume it's a structured data
  else if (typeof input === "object" && input !== null) {
    try {
      // Convert the object into a JSON-string representation for display.
      // This conversion is wrapped in a try-catch in case of circular references.
      const jsonString = JSON.stringify(input, null, 2);

      // Create a header for the Card with an icon to indicate it's data content.
      const header: IAutoView.IAutoViewCardHeaderProps = {
        title: "Data Overview",
        description: "Detailed view of the provided data.",
        // Use an info icon as a visual cue.
        startElement: {
          id: "info", // the icon name in kebab-case (without a prefix)
          type: "Icon",
        },
        type: "CardHeader",
      };

      // Create the content of the Card using Markdown for rich formatting.
      const content: IAutoView.IAutoViewCardContentProps = {
        // We render the JSON data inside a markdown code block for better readability.
        childrenProps: {
          content: "json\n" + jsonString + "\n```",
          type: "Markdown",
        },
        type: "CardContent",
      };

      // Compose the complete UI as a Vertical Card containing both header and content.
      return {
        childrenProps: [header, content],
        type: "VerticalCard",
      } as IAutoView.IAutoViewVerticalCardProps;
    } catch (e) {
      // If JSON.stringify fails (for example because of circular structures),
      // fall back to a simple markdown representation.
      return {
        content: "Unable to render detailed data.",
        type: "Markdown",
      } as IAutoView.IAutoViewMarkdownProps;
    }
  }
  // If input data is null or any other type we cannot handle explicitly, fallback gracefully.
  else {
    return {
      content: "No valid data provided.",
      type: "Markdown",
    } as IAutoView.IAutoViewMarkdownProps;
  }
}
