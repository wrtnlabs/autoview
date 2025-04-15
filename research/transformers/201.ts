import type * as IAutoView from "@autoview/interface";
type RecordingResponse = {
    signedUrl?: string;
};
type IAutoViewTransformerInputType = RecordingResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Determine if a valid signedUrl was provided
  const hasRecording = input.signedUrl != null && input.signedUrl.trim() !== "";
  
  // Create a header for the recording card.
  // The header uses an icon (a microphone) to visually indicate the recording element.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Recording",
    // Provide a brief description depending on whether the recording is available.
    description: hasRecording ? "Recording available" : "No recording available",
    // The startElement is an icon indicating the recording feature.
    startElement: {
      id: "microphone", // This should match one of the allowed icon names in kebab-case.
      color: "blue",
      size: 20,
      type: "Icon"
    }
  };

  // Define the main content of the card.
  // If a recording URL is provided, display it as an image.
  // Otherwise, show a Markdown component with a message.
  const contentComponent: IAutoView.IAutoViewPresentationComponentProps = hasRecording
    ? {
        type: "Image",
        src: input.signedUrl as string & tags.Format<"uri">,
        alt: "Recording preview"
      } as IAutoView.IAutoViewImageProps
    : {
        type: "Markdown",
        content: "## No Recording Available\n\nPlease upload a recording to view its preview."
      } as IAutoView.IAutoViewMarkdownProps;

  // Wrap the content component inside a CardContent component.
  // This encapsulation provides a consistent visual structure.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentComponent
  };

  // Compose the final vertical card.
  // This card aggregates the header and content, ensuring a responsive
  // and visually engaging UI for both desktop and mobile browsers.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent
    ]
  };

  // Return the composed UI component.
  return verticalCard;
}
