import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace IShoppingSaleInquiryComment {
    /**
     * Snapshot content of the comment.
    */
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
         * In other words, creation time or update time or comment.
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
         * Content body of comment.
         *
         * @title Content body of comment
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
type IAutoViewTransformerInputType = IShoppingSaleInquiryComment.ISnapshot;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Build a Card Header component to display some metadata about the comment.
  // Using an icon in the startElement to graphically represent a comment.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Comment ${input.id}`,
    description: `Created at: ${input.created_at}`,
    // Using an icon component to provide a visual cue; "comment" icon is a common choice.
    startElement: {
      type: "Icon",
      id: "comment", // Note: icon name should be in kebab-case without prefix; adjust if necessary.
      color: "blue",
      size: 24
    }
  };

  // Prepare the body content.
  // We use a Markdown component to render the body so that formatting (if MD or HTML) is more visually engaging.
  // For plain text, Markdown still provides a basic formatting layer.
  const markdownContent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: input.body && input.body.trim() !== "" ? input.body : "No content provided."
  };

  // Compose the Card Content using the Markdown component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: markdownContent
  };

  // If there are any attachments, we build a DataList to display each file visually.
  let attachmentsComponent: IAutoView.IAutoViewComponentProps | undefined = undefined;
  if (input.files && input.files.length > 0) {
    // Map each file to a DataListItem component.
    const fileItems: IAutoView.IAutoViewDataListItemProps[] = input.files.map((file) => {
      // Compose the display name: include extension if provided.
      const displayName = file.extension ? `${file.name}.${file.extension}` : file.name;
      // Use Markdown for the label to keep text more engaging.
      const labelComponent: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content: `**File:** ${displayName}`
      };
      return {
        type: "DataListItem",
        // DataListItem accepts presentation components for label.
        label: labelComponent
      };
    });
    // Create a DataList component with the list of files.
    const dataList: IAutoView.IAutoViewDataListProps = {
      type: "DataList",
      childrenProps: fileItems
    };
    // Wrap the attachments list into a Card Footer component to separate it visually.
    attachmentsComponent = {
      type: "CardFooter",
      childrenProps: [dataList]
    };
  }

  // Compose the final Vertical Card that aggregates header, content, and (if present) attachments.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    // Order is important: header, then content, then attachments if available.
    childrenProps: attachmentsComponent
      ? [cardHeader, cardContent, attachmentsComponent]
      : [cardHeader, cardContent]
  };

  // Return the aggregated UI component.
  return verticalCard;
}
