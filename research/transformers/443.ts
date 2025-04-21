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
  // Compose the header of the card with an icon and copy button for quick access
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Dependabot Public Key",
    description: input.key_id, // show the key identifier
    startElement: {
      type: "Icon",
      id: "key",         // use the "key" icon to represent a public key
      color: "teal",
      size: 24,
    },
    endElement: {
      type: "IconButton",
      icon: "clipboard", // affordance for copying the public key
      variant: "outlined",
      color: "primary",
      size: "small",
    },
  };

  // Render the raw Base64 public key inside a markdown code block for better readability
  const publicKeyMarkdown: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: [
      "**Public Key**",
      "",
      "base64",
      input.key,
      "```",
    ].join("\n"),
  };

  // Wrap the markdown into a card content section
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: publicKeyMarkdown,
  };

  // Return a vertical card combining header and content. This layout is responsive
  // and stacks nicely on mobile devices.
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
