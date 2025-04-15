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
  // In this transformation, we render the snapshot comment using a vertical card
  // that comprises a header (displaying an icon, id and creation date) and
  // content (rendering the comment body as markdown and any attachment files as a list).

  // Create a header component using CardHeader.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // Use the snapshot id to identify the comment and the creation date as description.
    title: `Comment ID: ${input.id}`,
    description: `Created at: ${new Date(input.created_at).toLocaleString()}`,
    // Use an icon as the startElement to visually represent a comment.
    startElement: {
      type: "Icon",
      id: "chat", // icon id in kebab-case (e.g., "chat" indicates a comment)
      color: "blue",
      size: 24,
    },
  };

  // Create a markdown component to render the comment body.
  // This ensures that rich text formatting is used if the body is provided in markdown or HTML,
  // and even for plain text we wrap it within a markdown renderer.
  const markdownContent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: input.body,
  };

  // If there are attachment files available, we build a data list showing each attachment.
  // Each file is rendered as a list item that includes the file's name (with extension) and
  // a download button linking to the file URL.
  let attachmentsDataList: IAutoView.IAutoViewDataListProps | undefined = undefined;

  if (input.files && input.files.length > 0) {
    // Map each attachment file into a DataListItem.
    const fileItems: IAutoView.IAutoViewDataListItemProps[] = input.files.map(file => {
      // Compose the complete file name (if extension exists, add the dot and extension).
      const fileName = file.extension ? `${file.name}.${file.extension}` : file.name;
      return {
        type: "DataListItem",
        // Use a Text component for the file name.
        label: {
          type: "Text",
          content: fileName,
          variant: "body2",
        },
        // Use a Button component for triggering the file download/open action.
        value: {
          type: "Button",
          label: "Download",
          href: file.url,
          variant: "outlined",
          color: "primary",
          size: "small",
        },
      };
    });

    attachmentsDataList = {
      type: "DataList",
      childrenProps: fileItems,
    };
  }

  // Create the card content component that aggregates the markdown message and the attachments (if any).
  // The childrenProps of CardContent allows for multiple presentation components,
  // so we include the markdown message and, conditionally, attachments.
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [ markdownContent ];
  if (attachmentsDataList) {
    // You can prepend a title for the attachments list as a Text component before the data list.
    const attachmentsTitle: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: "Attachments:",
      variant: "subtitle2",
      color: "secondary",
    };

    // Append both the title and then the list.
    contentChildren.push(attachmentsTitle);
    contentChildren.push(attachmentsDataList);
  }

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Compose the final vertical card that includes the header and the content.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [ header, cardContent ],
  };

  // Return the composed component.
  return verticalCard;
}
