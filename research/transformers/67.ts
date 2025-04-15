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
  // Create the header component using CardHeader to display the seller info and answer metadata.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // Display seller information with the answer id and created_at info.
    title: `Answer by Seller ${input.seller.id}`,
    description: `Answer ID: ${input.id} • Answer Created: ${input.created_at}`,
    // Use an icon to visually represent the seller.
    startElement: {
      type: "Icon",
      id: "user", // expecting a valid icon name in kebab-case; adjust if needed.
      color: "blue",
      size: 24,
    },
  };

  // Function to build markdown content from a snapshot.
  const buildSnapshotMarkdown = (snapshot: IBbsArticle.ISnapshot): string => {
    // Begin the markdown with a header for the snapshot title.
    let markdownContent = `## ${snapshot.title}\n\n`;
    // Include the snapshot body.
    markdownContent += `${snapshot.body}\n\n`;
    // Add the created date information for this snapshot.
    markdownContent += `*Snapshot Created: ${snapshot.created_at}*\n\n`;
    // If there are any file attachments, list them as markdown links.
    if (snapshot.files && snapshot.files.length > 0) {
      markdownContent += `**Attachments:**\n`;
      snapshot.files.forEach(file => {
        // Compose file name with extension if available.
        const fileName = file.extension ? `${file.name}.${file.extension}` : file.name;
        // Display each file as a markdown link.
        markdownContent += `- [${fileName}](${file.url})\n`;
      });
    }
    return markdownContent;
  };

  // Transform each snapshot into a CardContent component that wraps a Markdown component.
  const snapshotContents: IAutoView.IAutoViewCardContentProps[] =
    // Check if snapshots array exists and has elements.
    (input.snapshots && input.snapshots.length > 0)
      ? input.snapshots.map(snapshot => {
          return {
            type: "CardContent",
            // The childrenProps is a Markdown component to properly format the snapshot details.
            childrenProps: {
              type: "Markdown",
              content: buildSnapshotMarkdown(snapshot),
            },
          };
        })
      : [
          // If no snapshots are available, show a placeholder markdown message.
          {
            type: "CardContent",
            childrenProps: {
              type: "Markdown",
              content: "No snapshots available for this answer.",
            },
          },
        ];

  // Optionally, you may want to add a footer that shows the seller's registration date.
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    // Use a Markdown component inside the footer for a rich text representation.
    childrenProps: {
      type: "Markdown",
      content: `*Seller Registered: ${input.seller.created_at}*`,
    },
  };

  // Compose the final VerticalCard component by aggregating header, snapshot contents, and footer.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    // Combine the header, all snapshot content components, and the footer.
    childrenProps: [
      header,
      ...snapshotContents,
      footer,
    ],
  };

  // Return the composed UI component which is of type IAutoView.IAutoViewComponentProps.
  return verticalCard;
}
