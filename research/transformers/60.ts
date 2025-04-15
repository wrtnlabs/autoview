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
  // Transform the input snapshot data into a Vertical Card that contains a header, a markdown content area, and (if available)
  // a footer listing any attachment files as chips.
  
  // Create a Card Header component to display the title and creation date.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.title,
    description: `Created at: ${input.created_at}`,
    // Use an icon to indicate the creation date (using a calendar icon)
    startElement: {
      type: "Icon",
      id: "calendar", // Icon name in kebab-case; assumes a calendar icon is available.
      size: 16,
      color: "blue"
    }
  };

  // Create a Card Content component wrapping the body text in a Markdown component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: input.body
    }
  };

  // Initialize an array to hold the children components for the Vertical Card.
  const childrenComponents: (IAutoView.IAutoViewCardHeaderProps | IAutoView.IAutoViewCardContentProps | IAutoView.IAutoViewCardFooterProps)[] = [
    cardHeader,
    cardContent
  ];

  // If there are attachment files, create a Card Footer with chips representing each file.
  if (input.files && input.files.length > 0) {
    // Map over each file and create a Chip component.
    const fileChips: IAutoView.IAutoViewChipProps[] = input.files.map((file) => {
      // Construct the display label for the file by combining the name and extension (if available).
      const fileLabel = file.extension ? `${file.name}.${file.extension}` : file.name;
      return {
        type: "Chip",
        label: fileLabel,
        // Use an attachment icon to visually indicate a file.
        startElement: {
          type: "Icon",
          id: "attachment", // Icon name should represent attachment.
          size: 16,
          color: "gray"
        },
        variant: "outlined",
        color: "primary",
        size: "small"
      };
    });

    // Create the Card Footer component to hold the file chips.
    const cardFooter: IAutoView.IAutoViewCardFooterProps = {
      type: "CardFooter",
      childrenProps: fileChips
    };

    // Append the footer to the children components.
    childrenComponents.push(cardFooter);
  }

  // Compose the final Vertical Card that will display the data.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: childrenComponents
  };

  return verticalCard;
}
