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
  // Helper function to safely extract the latest snapshot from a comment.
  const getLatestSnapshot = (snapshots: IBbsArticleComment.ISnapshot[]): IBbsArticleComment.ISnapshot | null => {
    if (!snapshots || snapshots.length === 0) return null;
    // Assume snapshots are ordered by creation time; if not, sort by created_at.
    return snapshots[snapshots.length - 1];
  };

  // Create a DataListItem for each comment
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.data.map((comment) => {
    // Extract relevant fields. The writer may not be a string, so convert it.
    const writerText = comment.writer != null ? String(comment.writer) : "Unknown";
    const createdAt = comment.created_at || "Unknown time";
    // Get the latest snapshot (if any)
    const latestSnapshot = getLatestSnapshot(comment.snapshots);
    // Use Markdown to render the comment meta information in the label.
    const labelMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      // We use markdown formatting to emphasize important metadata.
      content: `**Comment by:** ${writerText}\n**Created at:** ${createdAt}`,
    };

    // Use Markdown to render the comment body in the value section.
    // If no snapshot is available, display a placeholder message.
    const bodyContent = latestSnapshot
      ? latestSnapshot.body
      : "_No content available_";
    const valueMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: bodyContent,
    };

    return {
      type: "DataListItem",
      // label accepts a presentation component.
      label: labelMarkdown,
      // value accepts a presentation component.
      value: valueMarkdown,
    };
  });

  // Create a DataList component that visualizes all comments
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Create a CardContent component that holds the DataList.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // CardContent can accept any presentation components including DataList.
    childrenProps: dataList,
  };

  // Create a CardHeader that gives summary information about the page.
  const pagination = input.pagination;
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Comments",
    // Provide page information in the description.
    description: `Page ${pagination.current} of ${pagination.pages} (Total records: ${pagination.records})`,
    // Optionally, we set a startElement icon to visually indicate comments.
    startElement: {
      type: "Icon",
      id: "comment",
      // Use a moderate icon size for better mobile experience.
      size: 20,
      // Icon colors should be valid color names; "blue" is chosen for good contrast.
      color: "blue"
    }
  };

  // Compose the final output using a Vertical Card.
  // VerticalCard children accept card header and card content.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      // Card header displays summary meta / title.
      cardHeader,
      // Card content holds the DataList component.
      cardContent
    ]
  };

  // Return the transformed output data for visualization.
  return verticalCard;
}
