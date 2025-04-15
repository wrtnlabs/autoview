import type * as IAutoView from "@autoview/interface";
namespace shared {
    export type StringView = {
        result?: string;
    };
}
type IAutoViewTransformerInputType = shared.StringView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We choose to visualize the input data inside a vertical card,
  // including a header with an icon and content wrapped in a markdown component.
  // This design makes the presentation appealing and easy-to-read on various devices.
  
  // If input.result is not provided, show a default message.
  const content = input.result && input.result.trim().length > 0 
    ? input.result 
    : "No content provided.";

  // Compose the header of the card.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Data Overview",
    description: "Visual representation of the provided input",
    // The startElement here accepts types like IAutoViewIconProps.
    // We use an icon to draw attention and provide a visual cue.
    startElement: {
      type: "Icon",
      id: "info",   // using 'info' icon as a visual signifier
      size: 24,
      color: "blue"
    }
  };

  // Compose the content using a markdown component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // The childrenProps accepts an array or a single presentation component.
    // We wrap our data in a markdown component so that if the text contains markdown
    // formatting or mermaid charts, it will be rendered accordingly.
    childrenProps: {
      type: "Markdown",
      content: content
    }
  };

  // Compose the final card component. Using a vertical card ensures that the UI is responsive
  // and works well on both desktop and mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    // childrenProps is defined as an array of components.
    childrenProps: [
      cardHeader,
      cardContent
    ]
  };

  // Return the final transformed output data.
  return verticalCard;
}
