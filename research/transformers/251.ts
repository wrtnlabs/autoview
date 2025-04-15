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
  // Prepare a header component to display summary information about the comment.
  // We are using an Icon in the header (using type "Icon") as a visual cue along with the title and creation time.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // Using the comment id to show a short identifier; in production you might show a full id or other title.
    title: `Comment #${input.id}`,
    // Format the created_at string to a locale friendly time format.
    description: new Date(input.created_at).toLocaleString(),
    // Use an icon to symbolize a comment. The icon name "comment" is in kebab-case.
    startElement: {
      type: "Icon",
      id: "comment", // use an appropriate icon name
      size: 24,
      color: "blue"
    }
  };

  // Prepare the content section using a markdown component.
  // - For text with format "md" or "html", render as provided.
  // - For plain text ("txt"), wrap the content in a code block (for better emphasis).
  let markdownContent = input.body;
  if (input.format === "txt") {
    // Wrapping text in a markdown code block for better formatting if only plain text is provided.
    markdownContent = "\n" + input.body + "\n```";
  }
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Use the markdown component to render the comment body in a more engaging way.
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    }
  };

  // Prepare an optional footer component for attachments if any exist.
  let footer: IAutoView.IAutoViewCardFooterProps | undefined = undefined;
  if (input.files && input.files.length > 0) {
    // An array to hold visual representations of each file.
    // If the file extension is that of an image, use an image component.
    // Otherwise, use a text button label to indicate the file attachment.
    const imageExtensions = new Set(["png", "jpg", "jpeg", "gif", "bmp", "svg", "webp"]);
    const fileComponents: (IAutoView.IAutoViewImageProps | IAutoView.IAutoViewButtonProps)[] = input.files.map(file => {
      if (file.extension && imageExtensions.has(file.extension.toLowerCase())) {
        // Display the image if the extension matches a common image type.
        return {
          type: "Image",
          src: file.url,
          alt: file.name
        };
      }
      // For non-image files, use a button component to display the file name.
      return {
        type: "Button",
        label: `${file.name}${file.extension ? "." + file.extension : ""}`,
        variant: "text"
      };
    });

    // Combine a header text for attachments and the individual file components.
    footer = {
      type: "CardFooter",
      childrenProps: [
        {
          type: "Text",
          content: "Attachments:",
          variant: "footnote",
          color: "primary"
        },
        ...fileComponents
      ]
    };
  }

  // Compose the final vertical card displaying the comment.
  // The vertical card contains header, content, and (optionally) footer.
  // This structure ensures that the UI is responsive and easy to use,
  // employing visual cues like icons, markdown, and images.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: footer ? [header, content, footer] : [header, content]
  };

  return verticalCard;
}
