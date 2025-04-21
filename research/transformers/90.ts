import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingSaleInquiryComment = {
        /**
         * Page information.
         *
         * @title Page information
        */
        pagination: Schema.IPage.IPagination;
        /**
         * List of records.
         *
         * @title List of records
        */
        data: Schema.IShoppingSaleInquiryComment[];
    };
    export namespace IPage {
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
    export type IShoppingSaleInquiryComment = {
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
        snapshots: Schema.IBbsArticleComment.ISnapshot[];
        /**
         * Creation time of comment.
         *
         * @title Creation time of comment
        */
        created_at: string;
    };
    export namespace IShoppingAdministrator {
        export type IInvert = any;
    }
    export type IShoppingCustomer = any;
    export namespace IShoppingSeller {
        export type IInvert = any;
    }
    export namespace IBbsArticleComment {
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
            files: Schema.IAttachmentFile.ICreate[];
        };
    }
    export namespace IAttachmentFile {
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
}
type IAutoViewTransformerInputType = Schema.IPageIShoppingSaleInquiryComment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Transform each comment into a DataListItem for display
  const items: IAutoView.IAutoViewDataListItemProps[] = input.data.map((comment) => {
    // We assume snapshots are ordered by creation time; pick the latest one
    const snapshots = comment.snapshots;
    const latest = snapshots[snapshots.length - 1];

    // Label area: show when the comment and its latest snapshot were created
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      // An icon to visually indicate a timestamp
      {
        type: "Icon",
        id: "calendar-alt",
        color: "gray",
        size: 16
      },
      // Text for the comment creation time
      {
        type: "Text",
        variant: "subtitle2",
        content: `Commented at ${new Date(comment.created_at).toLocaleString()}`
      },
      // Smaller caption for the snapshot time
      {
        type: "Text",
        variant: "caption",
        color: "gray",
        content: `Snapshot at ${new Date(latest.created_at).toLocaleString()}`
      }
    ];

    // Value area: render the body using the Markdown component for rich formatting
    const valueComponent: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: latest.body
    };

    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponent
    };
  });

  // Wrap all items in a DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items
  };

  // Card header summarizing the comments section and pagination info
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Inquiry Comments",
    description: `Page ${input.pagination.current} / ${input.pagination.pages} · Total ${input.pagination.records}`,
    // Use a comments icon to make it more engaging
    startElement: {
      type: "Icon",
      id: "comments",
      color: "blue",
      size: 24
    }
  };

  // Card content containing the DataList
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Assemble everything into a vertical card for responsive layout
  return {
    type: "VerticalCard",
    childrenProps: [header, content]
  };
}
