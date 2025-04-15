import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
/**
 * A page.
 *
 * Collection of records with pagination indformation.
*/
type IPageIShoppingSaleInquiryComment = {
    /**
     * Page information.
     *
     * @title Page information
    */
    pagination: IPage.IPagination;
    /**
     * List of records.
     *
     * @title List of records
    */
    data: IShoppingSaleInquiryComment[];
};
namespace IPage {
    /**
     * Page information.
    */
    export type IPagination = {
        /**
         * Current page number.
         *
         * @title Current page number
        */
        current: number & tags.Type<"int32">;
        /**
         * Limitation of records per a page.
         *
         * @title Limitation of records per a page
        */
        limit: number & tags.Type<"int32">;
        /**
         * Total records in the database.
         *
         * @title Total records in the database
        */
        records: number & tags.Type<"int32">;
        /**
         * Total pages.
         *
         * Equal to {@link records} / {@link limit} with ceiling.
         *
         * @title Total pages
        */
        pages: number & tags.Type<"int32">;
    };
}
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
type IAutoViewTransformerInputType = IPageIShoppingSaleInquiryComment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We will use an AutoView DataList to display a list of Sale Inquiry Comments.
  // Each comment will be transformed into a DataListItem with the writer represented as an Avatar in the label,
  // and the snapshot content rendered with a Markdown component in the value.
  //
  // This approach leverages visual components (Avatar and Markdown) to avoid a plain text presentation.
  // Additionally, for mobile responsiveness, these components can adapt to various screen sizes in the final UI.
  
  // Map each comment to a IAutoViewDataListItemProps representation.
  const listItems: IAutoView.IAutoViewDataListItemProps[] = input.data.map((comment) => {
    // Extract writer information.
    // If "writer" is not a string, we convert it using JSON.stringify; in a production scenario,
    // you might have a more sophisticated mapping from writer objects to visual representations.
    const writerName =
      typeof comment.writer === "string" ? comment.writer : JSON.stringify(comment.writer);

    // Pick the latest snapshot if available. If multiple snapshots exist, show the most recent snapshot.
    const latestSnapshot =
      (comment.snapshots && comment.snapshots.length > 0)
        ? comment.snapshots[comment.snapshots.length - 1]
        : null;
    
    // Compose the markdown content.
    // We use markdown formatting to show snapshot details; if no snapshot exists, indicate that no content is available.
    const markdownContent = latestSnapshot
      ? `**Snapshot Time:** ${latestSnapshot.created_at}\n\n**Format:** ${latestSnapshot.format}\n\n${latestSnapshot.body}`
      : "No content available.";

    // Create an Avatar component for the writer.
    // The Avatar component visually represents the writer.
    const avatarComponent: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      name: writerName,
      size: 32, // chosen size for visual clarity across devices
      // Optionally, you might set the variant based on writer's role if such logic is needed.
    };

    // Create a Markdown component to display the snapshot content.
    const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: markdownContent,
    };

    // Compose the DataListItem.
    // The label displays the avatar and the value shows the snapshot details in markdown.
    const dataListItem: IAutoView.IAutoViewDataListItemProps = {
      type: "DataListItem",
      label: avatarComponent,
      value: markdownComponent,
    };

    return dataListItem;
  });

  // In addition to the comments, you might want to include pagination information somewhere in your UI.
  // Here, however, we solely focus on visualizing the list of comments in a DataList component.
  // The DataList provides a responsive, mobile-friendly layout.
  const dataListComponent: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  return dataListComponent;
}
