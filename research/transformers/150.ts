import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IPageIShoppingSaleReview {
        /**
         * A page.
         *
         * Collection of records with pagination indformation.
        */
        export type ISummary = {
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
            data: Schema.IShoppingSaleReview.ISummary[];
        };
    }
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
    export namespace IShoppingSaleReview {
        /**
         * Summarized information of the review.
        */
        export type ISummary = {
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
            customer: Schema.IShoppingCustomer;
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
    export type IShoppingCustomer = {
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
        channel: Schema.IShoppingChannel;
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
    export type IShoppingMember = any;
    export type IShoppingCitizen = any;
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
    export type IShoppingChannel = {
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
    export type IShoppingExternalUser = any;
    export namespace IShoppingSaleInquiryAnswer {
        export type ISummary = any;
    }
}
type IAutoViewTransformerInputType = Schema.IPageIShoppingSaleReview.ISummary;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Generate a list of reviews using the List component
  const items: IAutoView.IAutoViewListItemProps[] = input.data.map((review) => {
    const {
      title,
      created_at,
      score,
      read_by_seller,
      customer,
    } = review;

    // Round score to nearest integer for star icons
    const starCount = Math.max(0, Math.min(5, Math.round(score)));

    // Build star icons array
    const stars: IAutoView.IAutoViewIconProps[] = Array.from(
      { length: starCount },
      () => ({
        type: "Icon",
        id: "star",
        color: "yellow",
        size: 16,
      })
    );

    // Build a chip indicating read/unread status
    const statusChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: read_by_seller ? "Read" : "New",
      color: read_by_seller ? "success" : "error",
      variant: "outlined",
      size: "small",
    };

    // Combine stars and status chip for the endElement
    const endElements = [...stars, statusChip];

    // Use a user icon as the startElement
    const userIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: "user",
      color: "gray",
      size: 24,
    };

    // Build a human‐friendly date label
    let dateLabel: string;
    try {
      dateLabel = new Date(created_at).toLocaleDateString();
    } catch {
      dateLabel = created_at;
    }

    // Compose the list item
    return {
      type: "ListItem",
      title,
      description: `Posted on ${dateLabel} via ${customer.channel.name}`,
      startElement: userIcon,
      endElement: endElements,
    };
  });

  // Return the List component wrapping all the review items
  return {
    type: "List",
    childrenProps: items,
  };
}
