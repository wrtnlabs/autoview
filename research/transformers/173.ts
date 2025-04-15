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
  // Transform the input data into a structured UI presentation using a VerticalCard component.
  // We'll display the page header (with pagination info) and a list of comments
  // Each comment is displayed as a DataListItem with a leading avatar (or icon) and its content rendered via Markdown.
  
  // Map each comment to a DataListItem component
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.data.map(comment => {
    // Attempt to extract the writer's name and avatar if available.
    // We assume writer may be an object with a 'name' field and optionally an 'avatar' URL.
    let writerName: string = "";
    let writerAvatar: string | undefined = undefined;
    if (typeof comment.writer === "object" && comment.writer !== null) {
      writerName = comment.writer.name || "Unknown Writer";
      writerAvatar = comment.writer.avatar; // if exists, otherwise undefined
    } else {
      // If writer is not an object, simply use its string representation.
      writerName = String(comment.writer);
    }
    
    // Determine the most up-to-date snapshot to display.
    // Use the last snapshot in the snapshots list if available.
    const snapshot = (Array.isArray(comment.snapshots) && comment.snapshots.length > 0)
      ? comment.snapshots[comment.snapshots.length - 1]
      : null;
    
    // Create a Markdown component to render the comment content.
    // If no snapshot exists, show a fallback message.
    const markdownContent: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: snapshot ? snapshot.body : "No content available."
    };

    // Prepare the label using a Markdown component that displays writer name and creation date.
    const label: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: `${writerName} • ${new Date(comment.created_at).toLocaleString()}`
    };

    // Set up the startElement as an Avatar if a valid avatar URL is provided,
    // Otherwise, fall back to an Icon component (e.g., a default user icon).
    let startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps;
    if (writerAvatar) {
      startElement = {
        type: "Avatar",
        src: writerAvatar,
        name: writerName,
        variant: "primary",
        size: 32
      };
    } else {
      startElement = {
        type: "Icon",
        id: "user", // icon name in kebab-case without set prefix
        size: 32,
        color: "gray"
      };
    }
    
    // If the comment is a reply (has a parent_id), we add an endElement icon to indicate this.
    const endElement = comment.parent_id
      ? {
          type: "Icon",
          id: "reply",  // use a 'reply' icon to indicate a reply comment
          size: 24,
          color: "blue"
        }
      : undefined;
    
    // Construct and return the DataListItem for this comment.
    return {
      type: "DataListItem",
      // Using the label property to indicate writer and date information.
      label: label,
      // Using the value property to display the comment content rendered in markdown.
      value: markdownContent,
      startElement: startElement,
      endElement: endElement
    };
  });
  
  // Create a DataList component to contain all comment items.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };
  
  // Create a CardHeader component to display the title and pagination information.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Sale Inquiry Comments",
    description: `Page ${input.pagination.current} of ${input.pagination.pages}`
    // Optional: add startElement or endElement if needed.
  };
  
  // Optionally, we can add pagination details in the CardFooter.
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Text",
      content: `Showing ${input.data.length} comment${input.data.length !== 1 ? "s" : ""} out of ${input.pagination.records} total record${input.pagination.records !== 1 ? "s" : ""}.`,
      variant: "caption",
      color: "gray"
    }
  };
  
  // Wrap the header, comment list (in CardContent), and footer inside a VerticalCard for a structured layout.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      {
        type: "CardContent",
        // Use the data list as the main content area to display all comments.
        childrenProps: dataList
      },
      cardFooter
    ]
  };
  
  // Return the final composed component.
  return verticalCard;
}
