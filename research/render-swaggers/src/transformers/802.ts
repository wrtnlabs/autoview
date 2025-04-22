import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Color-coded labels help you categorize and filter your issues (just like labels in Gmail).
     *
     * @title Label
    */
    export type label = {
        /**
         * Unique identifier for the label.
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * URL for the label
        */
        url: string;
        /**
         * The name of the label.
        */
        name: string;
        /**
         * Optional description of the label, such as its purpose.
        */
        description: string | null;
        /**
         * 6-character hex code, without the leading #, identifying the color
        */
        color: string;
        /**
         * Whether this label comes by default in a new repository.
        */
        "default": boolean;
    };
}
type IAutoViewTransformerInputType = Schema.label;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Create the card header with a tag icon, the label name, and optional description.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: input.description ?? "",
    startElement: {
      type: "Icon",
      id: "tag",      // Use the "tag" icon to represent a label
      size: 24,
      color: "gray",
    },
  };

  // Build a markdown snippet for the details of the label.
  // We include HTML for a small color swatch using a div with inline styles.
  // Markdown components generally allow basic HTML for styling.
  const markdownContent = `
**Label ID:** \`${input.id}\`  
**Node ID:** \`${input.node_id}\`  
**Default:** \`${input.default}\`  
**URL:** [View on GitHub](${input.url})  

**Description:**  
${input.description ? input.description : "_No description provided._"}

**Color Preview:**  
<div style="display:inline-block;width:24px;height:24px;border:1px solid #ccc;background-color:#${input.color};vertical-align:middle;"></div> \`#${input.color}\`
`;

  const content: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: markdownContent,
  };

  // Assemble a vertical card with the header and content.
  // This layout will be responsive on mobile devices.
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      header,
      {
        type: "CardContent",
        // CardContent accepts an array of presentation components; here we pass a single Markdown block.
        childrenProps: [content],
      },
    ],
  };

  return card;
}
