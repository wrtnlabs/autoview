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
  // First, extract pagination information and data comments from the input.
  const { pagination, data: comments } = input;
  
  // Create a DataListItem for each comment.
  // We use the writer information in a Text component as label,
  // and the most recent snapshot's body (if available) in a Markdown component as value.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = (comments || []).map(comment => {
    // If snapshots are available, pick the most recent one.
    // Assuming snapshots are stored in chronological order, the last element is the latest.
    const snapshots = comment.snapshots || [];
    const latestSnapshot = snapshots.length > 0 ? snapshots[snapshots.length - 1] : null;
    
    // Compose the writer information.
    // Since comment.writer type is any, we coerce it to string; if missing, we display "Unknown".
    const writerText = typeof comment.writer === "string" ? comment.writer : "Unknown";
    
    return {
      type: "DataListItem",
      // Use a Text component to display the writer info.
      label: {
        type: "Text",
        // Use a markdown-like emphasis if preferred. Here we simply include the writer name.
        content: `**Comment by:** ${writerText}`,
        variant: "subtitle2"
      } as IAutoView.IAutoViewTextProps,
      // Use a Markdown component to render the comment content.
      value: {
        type: "Markdown",
        content: latestSnapshot && latestSnapshot.body 
                  ? latestSnapshot.body 
                  : "_No content available_"
      } as IAutoView.IAutoViewMarkdownProps,
    };
  });
  
  // Compose a DataList component to list all comments.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // Compose a CardHeader to show an overview including pagination details.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Comments",
    description: `Page ${pagination.current} of ${pagination.pages}`,
    // Use an Icon as the start element (e.g., a comment icon) to make the UI visually engaging.
    startElement: {
      type: "Icon",
      id: "comment",
      size: 24,
      color: "blue"
    } as IAutoView.IAutoViewIconProps,
  };

  // Compose a CardContent component containing the DataList.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Finally, wrap the header and content inside a VerticalCard.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content]
  };

  // Return the final composed component which conforms to IAutoView.IAutoViewComponentProps.
  return verticalCard;
}
