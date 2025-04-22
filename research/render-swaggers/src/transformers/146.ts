import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.IShoppingSaleInquiryComment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Transform each snapshot into a DataListItem for visual display
  const snapshotItems: IAutoView.IAutoViewDataListItemProps[] =
    input.snapshots?.map((snapshot) => {
      // Header label components: timestamp and format chip
      const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
        {
          type: "Text",
          // Show when this snapshot was created
          content: `At ${new Date(snapshot.created_at).toLocaleString()}`,
          variant: "subtitle2",
        },
        {
          type: "Chip",
          label: snapshot.format.toUpperCase(),
          size: "small",
          variant: "outlined",
        },
      ];

      // Markdown component for the body content
      const bodyComponent: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content: snapshot.body,
      };

      // If there are attachments, render them as a group of chips
      const fileChips: IAutoView.IAutoViewChipProps[] = snapshot.files.map(
        (file) => ({
          type: "Chip",
          label: file.name + (file.extension ? `.${file.extension}` : ""),
          size: "small",
          variant: "outlined",
        })
      );

      // Only include the chip group if there are files
      const fileChipsGroup: IAutoView.IAutoViewChipGroupProps | undefined =
        fileChips.length > 0
          ? {
              type: "ChipGroup",
              childrenProps: fileChips,
              // Show up to 5 chips, collapse the rest
              maxItems: 5,
            }
          : undefined;

      // Compose the value section: markdown body and optional file group
      const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
        bodyComponent,
      ];
      if (fileChipsGroup) valueComponents.push(fileChipsGroup);

      return {
        type: "DataListItem",
        label: labelComponents,
        value: valueComponents,
      };
    }) ?? [];

  // If there are no snapshots, show a friendly message
  if (snapshotItems.length === 0) {
    return {
      type: "VerticalCard",
      childrenProps: {
        type: "CardContent",
        childrenProps: {
          type: "Text",
          content: "No snapshots available for this comment.",
          variant: "body2",
        },
      },
    };
  }

  // DataList wrapping all snapshot items
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: snapshotItems,
  };

  // Card header showing the comment ID and parent relationship
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Comment ID: ${input.id}`,
    description: input.parent_id ? `Reply to: ${input.parent_id}` : undefined,
    startElement: {
      type: "Icon",
      id: "comment",
      size: 24,
      color: "blue",
    },
  };

  // Card content embedding the DataList of snapshots
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Assemble everything into a VerticalCard for a responsive layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
