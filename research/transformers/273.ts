import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace IPageIShoppingSaleReview {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IAbridge = {
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
        data: IShoppingSaleReview.IAbridge[];
    };
}
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
namespace IShoppingSaleReview {
    /**
     * Abridged information of the review.
    */
    export type IAbridge = {
        /**
         * Score of the review.
         *
         * @title Score of the review
        */
        score: number;
        /**
         * Customer who wrote the inquiry.
         *
         * @title Customer who wrote the inquiry
        */
        customer: IShoppingCustomer;
        /**
         * Formal answer for the inquiry by the seller.
         *
         * @title Formal answer for the inquiry by the seller
        */
        answer: null | any;
        /**
         * Whether the seller has viewed the inquiry or not.
         *
         * @title Whether the seller has viewed the inquiry or not
        */
        read_by_seller: boolean;
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Title of the last snapshot.
         *
         * @title Title of the last snapshot
        */
        title: string;
        /**
         * Creation time of the article.
         *
         * @title Creation time of the article
        */
        created_at: string;
        /**
         * Modification time of the article.
         *
         * In other words, the time when the last snapshot was created.
         *
         * @title Modification time of the article
        */
        updated_at: string;
        /**
         * Format of body.
         *
         * Same meaning with extension like `html`, `md`, `txt`.
         *
         * @title Format of body
        */
        format: "html" | "md" | "txt";
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
/**
 * Customer information, but not a person but a connection basis.
 *
 * `IShoppingCustomer` is an entity that literally embodies the information of
 * those who participated in the market as customers. By the way, the
 * `IShoppingCustomer` does not mean a person, but a connection basis. Therefore,
 * even if the same person connects to the shopping mall multiple, multiple
 * records are created in `IShoppingCustomer`.
 *
 * The first purpose of this is to track the customer's inflow path in detail,
 * and it is for cases where the same person enters as a non-member,
 * {@link IShoppingCartCommodity puts items in the shopping cart} in advance,
 * and only authenticates their {@link IShoppingCitizen real name} or
 * registers/logs in at the moment of {@link IShoppingOrderPublish payment}.
 * It is the second. Lastly, it is to accurately track the activities that
 * a person performs at the shopping mall in various ways like below.
 *
 * - Same person comes from an {@link IShoppingExternalUser external service}
 * - Same person creates multiple accounts
 * - Same person makes a {@link IShoppingOrderPublish purchase} as a non-member with only {@link IShoppingCitizen real name authentication}
 * - Same person acts both {@link IShoppingSeller seller} and {@link IShoppingAdministrator admin} at the same time
 *
 * Therefore, `IShoppingCustomer` can have multiple records with the same
 * {@link IShoppingCitizen}, {@link IShoppingMember}, and
 * {@link IShoppingExternalUser}. Additionally, if a customer signs up for
 * membership after verifying their real name or signs up for our service after
 * being a user of an external service, all related records are changed at once.
 * Therefore, identification and tracking of customers can be done very
 * systematically.
*/
type IShoppingCustomer = {
    /**
     * Discriminant for the type of customer.
     *
     * @title Discriminant for the type of customer
    */
    type: "customer";
    /**
     * Membership information.
     *
     * If the customer has joined as a member.
     *
     * @title Membership information
    */
    member: null | any;
    /**
     * Citizen information.
     *
     * If the customer has verified his real name and mobile number.
     *
     * @title Citizen information
    */
    citizen: null | any;
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Belonged channel.
     *
     * @title Belonged channel
    */
    channel: IShoppingChannel;
    /**
     * External user information.
     *
     * When the customer has come from an external service.
     *
     * @title External user information
    */
    external_user: null | any;
    /**
     * Connection address.
     *
     * Same with {@link window.location.href} of client.
     *
     * @title Connection address
    */
    href: string;
    /**
     * Referrer address.
     *
     * Same with {@link window.document.referrer} of client.
     *
     * @title Referrer address
    */
    referrer: null | (string & tags.Format<"uri">) | (string & tags.MaxLength<0>);
    /**
     * Connection IP Address.
     *
     * @title Connection IP Address
    */
    ip: (string & tags.Format<"ipv4">) | (string & tags.Format<"ipv6">);
    /**
     * Creation time of the connection record.
     *
     * @title Creation time of the connection record
    */
    created_at: string;
};
type IShoppingMember = any;
type IShoppingCitizen = any;
/**
 * Channel information.
 *
 * `IShoppingChannel` is a concept that shapes the distribution channel in the
 * market. Therefore, the difference in the channel in this e-commerce system
 * means that it is another site or application.
 *
 * By the way, if your shopping mall system requires only one channel, then
 * just use only one. This concept is designed to be expandable in the future.
*/
type IShoppingChannel = {
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Creation time of record.
     *
     * @title Creation time of record
    */
    created_at: string;
    /**
     * Identifier code.
     *
     * @title Identifier code
    */
    code: string;
    /**
     * Name of the channel.
     *
     * @title Name of the channel
    */
    name: string;
};
type IShoppingExternalUser = any;
namespace IShoppingSaleInquiryAnswer {
    export type IAbridge = any;
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
type IAutoViewTransformerInputType = IPageIShoppingSaleReview.IAbridge;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // In this implementation, we expect the input to contain a paginated list of sale reviews.
  // We transform each review into a DataListItem component containing visual elements:
  // - A customer avatar (using the customer's identifier as a fallback name)
  // - A text component for the review title
  // - A badge with a star icon representing the review score
  // - A markdown component for the review body (wrapping in code block if the format is not markdown)
  //
  // The overall component is a DataList that is mobile-friendly and uses components that provide
  // rich visual representation rather than plain text.
  
  // Guard: if there is no data field or it is empty, return an empty DataList.
  const reviews = input.data && Array.isArray(input.data) ? input.data : [];
  
  // Map each review record to a DataListItem component.
  const listItems: IAutoView.IAutoViewDataListItemProps[] = reviews.map(review => {
    // Construct an avatar for the review customer.
    // We use the customer's id as the name for the avatar.
    const customerAvatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      // Using first two characters of the customer id to simulate initials; if id is missing, show "N/A".
      name: (review.customer && review.customer.id) ? review.customer.id.substring(0, 2) : "NA",
      // Optionally, a src property could be provided if a valid image URI exists.
    };

    // Construct a text component for the review title.
    const reviewTitle: IAutoView.IAutoViewTextProps = {
      type: "Text",
      // The content field accepts a string.
      content: review.title,
      variant: "h6",
      color: "primary"
    };

    // Determine badge color based on review score.
    let badgeColor: "success" | "warning" | "error" = "warning";
    if (review.score >= 4) {
      badgeColor = "success";
    } else if (review.score < 3) {
      badgeColor = "error";
    }

    // Construct an icon to be used inside the badge.
    const starIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "star", // using "star" to represent review score
      size: 16,
      color: "yellow"
    };

    // Construct a badge to display the numeric review score.
    const scoreBadge: IAutoView.IAutoViewBadgeProps = {
      type: "Badge",
      count: review.score,
      color: badgeColor,
      childrenProps: starIcon
    };

    // Prepare the review body content.
    // If the review's format is "md", we pass the content directly.
    // For other formats (html, txt) we wrap the content in a markdown code block for consistency.
    const bodyContent = review.format === "md" ? review.body : "\n" + review.body + "\n```";

    // Construct the markdown component containing the review body.
    const reviewBody: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: bodyContent
    };

    // Assemble the DataListItem.
    // The label contains visual summary elements (avatar, title, badge)
    // and the value contains the review body details.
    const listItem: IAutoView.IAutoViewDataListItemProps = {
      type: "DataListItem",
      label: [
        customerAvatar,
        reviewTitle,
        scoreBadge
      ],
      value: reviewBody
    };

    return listItem;
  });
  
  // Compose the final DataList component containing all review items.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems
  };
  
  return dataList;
}
