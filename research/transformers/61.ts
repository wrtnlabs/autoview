import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
/**
 * A comment written on an inquiry article.
 *
 * `IShoppingSaleInquiryComment` is a subtype entity of {@link IBbsArticleComment},
 * and is used when you want to communicate with multiple people about an
 * {@link IShoppingSaleInquiry inquiry} written by a
 * {@link IShoppingCustomer customer}.
 *
 * For reference, only related parties can write comments for
 * {@link IShoppingSeller sellers}, but there is no limit to
 * {@link IShoppingCustomer customers}. In other words, anyone customer can
 * freely write a comment, even if they are not the person who wrote the inquiry.
*/
type IShoppingSaleInquiryComment = {
    /**
     * Writer of the comment.
     *
     * Both customer and seller can write comment on the sale inquiry.
     *
     * By the way, no restriction on the customer, but seller must be the
     * person who've registered the sale.
     *
     * @title Writer of the comment
    */
    writer: any | any | any;
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Parent comment's ID.
     *
     * @title Parent comment's ID
    */
    parent_id: null | (string & tags.Format<"uuid">);
    /**
     * List of snapshot contents.
     *
     * It is created for the first time when a comment being created, and is
     * accumulated every time the comment is modified.
     *
     * @title List of snapshot contents
    */
    snapshots: IBbsArticleComment.ISnapshot[];
    /**
     * Creation time of comment.
     *
     * @title Creation time of comment
    */
    created_at: string;
};
namespace IShoppingAdministrator {
    export type IInvert = any;
}
type IShoppingCustomer = any;
namespace IShoppingSeller {
    export type IInvert = any;
}
namespace IBbsArticleComment {
    /**
     * Snapshot of comment.
     *
     * `IBbsArticleComment.ISnapshot` is a snapshot entity that contains
     * the contents of the comment.
     *
     * As mentioned in {@link IBbsArticleComment}, designed to keep evidence
     * and prevent fraud.
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
type IAutoViewTransformerInputType = IShoppingSaleInquiryComment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract writer information safely.
  // We attempt to use "name" if available, otherwise fall back to stringified value.
  const writerName = (input.writer && typeof input.writer === "object" && "name" in input.writer)
    ? (input.writer as any).name
    : String(input.writer);

  // Create a simple icon to represent the writer.
  const writerIcon: IAutoView.IAutoViewIconProps = {
    // We assume a generic "user" icon is available. The ID must be in kebab-case and without any prefix.
    id: "user",
    color: "blue", // using a color from the accepted options
    size: 20,      // a moderate size for icons
    type: "Icon",
  };

  // Compose markdown content from snapshots.
  // If there are multiple snapshots, we list them out with their creation time and body.
  let markdownContent = "";
  if (input.snapshots && input.snapshots.length > 0) {
    // Iterate over snapshots and compose markdown text.
    markdownContent = input.snapshots.map(snapshot => {
      // For each snapshot, include creation time and the body, and list attached files if any.
      let fileList = "";
      if (snapshot.files && snapshot.files.length > 0) {
        fileList = snapshot.files.map(file => `- [${file.name}${file.extension ? "." + file.extension : ""}](${file.url})`).join("\n");
        // Prepend files list header if needed.
        fileList = "\n**Attachments:**\n" + fileList;
      }
      return `### Snapshot on ${snapshot.created_at}\n\n${snapshot.body}${fileList}\n`;
    }).join("\n---\n");
  }
  else {
    // When no snapshot is provided, fallback to a simple message.
    markdownContent = "No comment content available.";
  }

  // Create a markdown component to visualize the snapshot content.
  const contentMarkdown: IAutoView.IAutoViewMarkdownProps = {
    content: markdownContent,
    type: "Markdown",
  };

  // Compose the CardHeader component.
  // This component displays the writer's name and creation date.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    title: writerName,
    description: `Created at: ${input.created_at}`,
    // Use the writer icon in the startElement slot.
    startElement: writerIcon,
    type: "CardHeader",
  };

  // Compose the CardContent component.
  // It embeds the markdown component to render the snapshots.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    childrenProps: contentMarkdown,
    type: "CardContent",
  };

  // Optionally, compose the CardFooter component.
  // Here we show the ID of the comment as a plain text element embedded in a markdown,
  // since visualizing an identifier with plain text is unavoidable.
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    childrenProps: {
      content: `**Comment ID:** ${input.id}`,
      type: "Text",
    } as IAutoView.IAutoViewTextProps,
    type: "CardFooter",
  };

  // Finally, compose a vertical card to aggregate all the sections.
  // Using a vertical card makes it responsive and easy to view on mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    childrenProps: [
      cardHeader,
      cardContent,
      cardFooter
    ],
    type: "VerticalCard",
  };

  // In production scenarios, additional error handling or alternative visualizations
  // may be included if the input is missing some expected properties.
  return verticalCard;
}
