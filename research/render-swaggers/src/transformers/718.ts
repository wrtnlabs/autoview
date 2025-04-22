import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The public key used for setting Dependabot Secrets.
     *
     * @title DependabotPublicKey
    */
    export type dependabot_public_key = {
        /**
         * The identifier for the key.
        */
        key_id: string;
        /**
         * The Base64 encoded public key.
        */
        key: string;
    };
}
type IAutoViewTransformerInputType = Schema.dependabot_public_key;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We choose a VerticalCard to group header (with icon and copy button)
  // and content (the actual public key in a code block).
  // Using Markdown for code formatting improves readability and ensures mobile responsiveness.
  
  // Compose the card header with an icon, title, and key identifier.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Dependabot Public Key",
    // Display the key_id as a subtitle
    description: input.key_id,
    // Visual cue: a key icon
    startElement: {
      type: "Icon",
      id: "key",
      color: "blue",
      size: 20
    },
    // A copy button hinting at user action (copying the key)
    endElement: {
      type: "IconButton",
      icon: "clipboard",
      variant: "outlined",
      color: "primary",
      size: "small"
    }
  };

  // Compose the card content, embedding the raw public key in a fenced code block.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Use Markdown to render the key with monospace and proper scroll on small screens.
    childrenProps: [
      {
        type: "Markdown",
        content: [
          "text",
          input.key,
          "```"
        ].join("\n")
      }
    ]
  };

  // Return a vertical card with the header and code content.
  return {
    type: "VerticalCard",
    childrenProps: [header, content]
  };
}
