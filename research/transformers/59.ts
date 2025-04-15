import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
/**
 * Answers to questions about sale snapshots.
 *
 * `IShoppingSaleInquiryAnswer` is an entity that embodies the official
 * answer written by the {@link IShoppingSeller seller} to the
 * {@link IShoppingSaleInquiry inquiry} written by the
 * {@link IShoppingCustomer customer}.
 *
 * Of course, in addition to writing an official response like this, it is
 * also possible for the seller to communicate with the inqjuiry written
 * customer and multiple customers through
 * {@link IShoppingSaleInquiryComment comments} in the attribution inquiry.
 *
 * For reference, it is not possible to write comments on this answer.
 * Encourage people to write comments on the inquiry article. This is to
 * prevent comments from being scattered in both inquiry and answer
 * articles.
*/
type IShoppingSaleInquiryAnswer = {
    /**
     * Seller who've written the answer.
     *
     * @title Seller who've written the answer
    */
    seller: IShoppingSeller;
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * List of snapshot contents.
     *
     * It is created for the first time when an article is created, and is
     * accumulated every time the article is modified.
     *
     * @title List of snapshot contents
    */
    snapshots: IBbsArticle.ISnapshot[];
    /**
     * Creation time of article.
     *
     * @title Creation time of article
    */
    created_at: string;
};
/**
 * Seller information.
 *
 * `IShoppingSeller` is an entity that embodies a person who registers
 * {@link IShoppingSale sales} to operate selling activities, with
 * {@link IShoppingMember membership} joining.
 *
 * For reference, unlike {@link IShoppingCustomer customers} which can
 * participate even without membership joining, seller must join membership
 * to operate sales. Also, seller must do the
 * {@link IShoppingCitizen real-name and mobile authentication}, too.
*/
type IShoppingSeller = {
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Creation tmie of record.
     *
     * Another words, the time when the seller has signed up.
     *
     * @title Creation tmie of record
    */
    created_at: string;
};
namespace IBbsArticle {
    /**
     * Snapshot of article.
     *
     * `IBbsArticle.ISnapshot` is a snapshot entity that contains the contents of
     * the article, as mentioned in {@link IBbsArticle}, the contents of the article
     * are separated from the article record to keep evidence and prevent fraud.
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
         * In other words, creation time or update time or article.
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
         * Title of article.
         *
         * @title Title of article
        */
        title: string;
        /**
         * Content body of article.
         *
         * @title Content body of article
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
type IAutoViewTransformerInputType = IShoppingSaleInquiryAnswer;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Create a CardHeader to introduce the inquiry answer.
  // We use an icon in the header (e.g., a "user" icon) to visually represent the seller.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Inquiry Answer from Seller: ${input.seller.id}`,
    description: `Answer created on ${input.created_at}`,
    startElement: {
      type: "Icon",
      id: "user" // Assuming "user" is a valid kebab-case icon name.
      // color and size can be added if needed.
    }
  };

  // Create a DataListItem for each snapshot.
  // The snapshot content is visualized using Markdown for rich formatting.
  const snapshotItems: IAutoView.IAutoViewDataListItemProps[] = (input.snapshots || []).map((snapshot) => {
    // Build attachment markdown if attachments exist.
    let attachmentsMarkdown = "";
    if (snapshot.files && snapshot.files.length > 0) {
      attachmentsMarkdown = "\n\nAttachments:\n" + snapshot.files.map(file => {
        // File name fallback to "File" if empty.
        const displayName = file.name ? file.name : "File";
        return `- [${displayName}](${file.url})`;
      }).join("\n");
    }

    // Concatenate snapshot details.
    // We include the body and any attachments as part of the markdown content.
    const contentMarkdown = `${snapshot.body}${attachmentsMarkdown}`;
    
    return {
      type: "DataListItem",
      // Use a markdown component for the label to show snapshot title.
      label: {
        type: "Markdown",
        content: `### ${snapshot.title}`
      },
      // Use a markdown component for the value to show the snapshot body.
      value: {
        type: "Markdown",
        content: contentMarkdown
      }
    };
  });

  // Decide what to display in the CardContent component.
  // If snapshots exist, we render them in a DataList. If not, we show a simple Markdown message.
  let contentComponent: IAutoView.IAutoViewCardContentProps;
  if (snapshotItems.length > 0) {
    contentComponent = {
      type: "CardContent",
      childrenProps: {
        type: "DataList",
        childrenProps: snapshotItems
      }
    };
  } else {
    // Fallback Markdown component that indicates no snapshot is available.
    contentComponent = {
      type: "CardContent",
      childrenProps: {
        type: "Markdown",
        content: "No snapshots available for this inquiry answer."
      }
    };
  }

  // Compose the vertical card which holds the header and the content.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      contentComponent
    ]
  };

  // Return the composed component.
  return verticalCard;
}
