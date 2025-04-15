import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace IShoppingSaleInquiryAnswer {
    export type ISnapshot = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Creation time of snapshot record.
         *
         * In other words, creation time or update time or article.
         *
         * @title Creation time of snapshot record
        */
        created_at: string;
        /**
         * Format of body.
         *
         * Same meaning with extension like `html`, `md`, `txt`.
         *
         * @title Format of body
        */
        format: "html" | "md" | "txt";
        /**
         * Title of article.
         *
         * @title Title of article
        */
        title: string;
        /**
         * Content body of article.
         *
         * @title Content body of article
        */
        body: string;
        /**
         * List of attachment files.
         *
         * @title List of attachment files
        */
        files: IAttachmentFile.ICreate[];
    };
}
namespace IAttachmentFile {
    export type ICreate = {
        /**
         * File name, except extension.
         *
         * If there's file `.gitignore`, then its name is an empty string.
         *
         * @title File name, except extension
        */
        name: string;
        /**
         * Extension.
         *
         * Possible to omit like `README` case.
         *
         * @title Extension
        */
        extension: null | (string & tags.MinLength<1> & tags.MaxLength<8>);
        /**
         * URL path of the real file.
         *
         * @title URL path of the real file
        */
        url: string;
    };
}
type IAutoViewTransformerInputType = IShoppingSaleInquiryAnswer.ISnapshot;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We are going to build a vertical card to display the snapshot information in a visual way.
  // The card is composed of a header, content and optionally a footer if there are attached files.

  // 1. Create the card header with title and creation date.
  //    Use an icon (calendar) as the start element to visually hint the date information.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.title,
    // Format the created_at string into a more readable description.
    description: `Created on: ${input.created_at}`,
    // Use an icon to visually emphasize the date. Allowed startElement types include IAutoViewIconProps.
    startElement: {
      type: "Icon",
      id: "calendar", // Assuming "calendar" is a valid icon in kebab-case without prefix.
      color: "blue",
      size: 20,
    },
    // Optionally, one could add an endElement if needed.
  };

  // 2. Create the card content using a markdown component.
  //    Markdown is used to render the snapshot body in a readable and visually engaging manner.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Use the Markdown component to render the body.
    // This allows richer text formatting and support for elements like mermaid diagrams or images.
    childrenProps: {
      type: "Markdown",
      content: input.body,
    } as IAutoView.IAutoViewMarkdownProps,
  };

  // 3. Optionally create a card footer if there are attached files.
  //    We will display an icon button for each attached file.
  //    Each file icon is wrapped in a tooltip component so that users can see the file name and extension.
  let cardFooter: IAutoView.IAutoViewCardFooterProps | undefined = undefined;
  if (input.files && input.files.length > 0) {
    // Map each file to a tooltip-wrapped icon button.
    const fileButtons = input.files.map((file) => {
      // Tooltip's childrenProps can be an IconButton.
      const iconButton: IAutoView.IAutoViewIconButtonProps = {
        type: "IconButton",
        icon: "paperclip", // Using a "paperclip" icon to represent file attachments.
        variant: "outlined",
        color: "secondary",
        size: "small",
      };

      // Use Tooltip to provide file details.
      return {
        type: "Tooltip",
        message: `${file.name}${file.extension ? "." + file.extension : ""}`,
        // Tooltip accepts childrenProps as a single component.
        childrenProps: iconButton,
      } as IAutoView.IAutoViewTooltipProps;
    });

    cardFooter = {
      type: "CardFooter",
      childrenProps: fileButtons,
    };
  }

  // 4. Compose the vertical card with the header, content, and optional footer.
  //    VerticalCard's childrenProps can be an array of components.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: cardFooter
      ? [cardHeader, cardContent, cardFooter]
      : [cardHeader, cardContent],
  };

  // Return the composed vertical card.
  // This output adheres to IAutoView.IAutoViewComponentProps and is designed to be responsive and visually engaging.
  return verticalCard;
}
