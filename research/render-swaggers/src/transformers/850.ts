import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Generated name and body describing a release
     *
     * @title Generated Release Notes Content
    */
    export type release_notes_content = {
        /**
         * The generated name of the release
        */
        name: string;
        /**
         * The generated body describing the contents of the release supporting markdown formatting
        */
        body: string;
    };
}
type IAutoViewTransformerInputType = Schema.release_notes_content;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure name and markdown body from input
  const { name, body } = input;

  // Determine if the body contains meaningful markdown
  const hasContent = typeof body === "string" && body.trim().length > 0;

  // Compose the card header with an icon to make the release visually distinct
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: name,
    // Use a tag icon to represent a release; blue color for visibility
    startElement: {
      type: "Icon",
      id: "tag",
      color: "blue",
      size: 20,
    },
  };

  // If there's markdown content, render it via a Markdown component.
  // Otherwise, render a fallback text message.
  const contentChild: IAutoView.IAutoViewMarkdownProps | IAutoView.IAutoViewTextProps = hasContent
    ? {
        type: "Markdown",
        content: body,
      }
    : {
        type: "Text",
        content: "No release notes available.",
        variant: "body2",
        color: "gray",
      };

  // Wrap the markdown or fallback text in a CardContent for consistent styling
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChild,
  };

  // Finally, stack header and content in a vertical card for a responsive layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
