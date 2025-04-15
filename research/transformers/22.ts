import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace IShoppingSaleReview {
    /**
     * Snapshot content of the review article.
    */
    export type ISnapshot = {
        /**
         * Score of the review.
         *
         * @title Score of the review
        */
        score: number;
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
type IAutoViewTransformerInputType = IShoppingSaleReview.ISnapshot;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  /* 
    This function transforms a review snapshot into a visual card component.
    It creates a vertical card containing a header with the review title and timestamp,
    a badge that visualizes the review score, markdown content for the review body,
    and (if available) a markdown list of attachment files.
    
    We use the following AutoView components:
      - CardHeader: to display the title and creation time.
      - Badge (as an allowed element for CardHeader.startElement): to show the score with a star icon.
      - Markdown: to nicely format the review body and attachment list.
      - VerticalCard: to aggregate the card components.
      
    The transformation intentionally uses icons and visual elements to enrich the UI.
  */

  // Create a badge element to display the score. This badge uses a star icon.
  const scoreBadge: IAutoView.IAutoViewBadgeProps = {
    type: "Badge",
    // The badge's visual element is an icon.
    childrenProps: {
      type: "Icon",
      id: "star",
      color: "yellow",
      size: 16,
    },
    count: input.score,
    showZero: true,
  };

  // Format the creation date from the input snapshot.
  const formattedDate = new Date(input.created_at).toLocaleString();

  // Create a card header component with the review title and creation date.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.title || "Untitled",
    description: `Reviewed at: ${formattedDate}`,
    // Use the score badge to visually indicate the review score.
    startElement: scoreBadge,
  };

  // Create a markdown component for the review body. Markdown helps with responsive display.
  const reviewContent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: input.body,
  };

  // If there are any attachment files, create a markdown text block listing them.
  let attachmentsContent: IAutoView.IAutoViewMarkdownProps | undefined = undefined;
  if (input.files && input.files.length > 0) {
    // Build a markdown list where each file is a link with its name and extension.
    const attachmentsList = input.files.map(file => {
      // If the extension is provided, append it to the file name.
      const fullName = file.extension ? `${file.name}.${file.extension}` : file.name;
      return `- [${fullName}](${file.url})`;
    }).join("\n");

    attachmentsContent = {
      type: "Markdown",
      content: `**Attachments:**\n${attachmentsList}`,
    };
  }

  // Compose the card content children.
  // We produce an array of children for the vertical card:
  // 1. The card header.
  // 2. The review content (markdown).
  // 3. (Optionally) the attachments content if any files are provided.
  const cardChildren: (IAutoView.IAutoViewCardHeaderProps | IAutoView.IAutoViewCardContentProps)[] = [];

  cardChildren.push(cardHeader);

  // Wrap the markdown review content inside a CardContent component.
  const bodyCardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: reviewContent,
  };
  cardChildren.push(bodyCardContent);

  // If attachments exist, wrap them similarly in a CardContent component.
  if (attachmentsContent) {
    const attachmentCardContent: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      childrenProps: attachmentsContent,
    };
    cardChildren.push(attachmentCardContent);
  }

  // Return the final vertical card which aggregates all the components.
  const visualComponent: IAutoView.IAutoViewComponentProps = {
    type: "VerticalCard",
    childrenProps: cardChildren,
  };

  return visualComponent;
}
