import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
/**
 * A page.
 *
 * Collection of records with pagination indformation.
*/
type IPageIShoppingMileageDonation = {
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
    data: IShoppingMileageDonation[];
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
type IShoppingMileageDonation = {
    id: string & tags.Format<"uuid">;
    administrator: IShoppingAdministrator.IInvert;
    citizen: IShoppingCitizen;
    value: number;
    reason: string;
    created_at: string & tags.Format<"date-time">;
};
namespace IShoppingAdministrator {
    /**
     * Invert information starting from administrator info.
     *
     * Instead of accessing to the administrator information from the
     * {@link IShoppingCustomer.member} -> {@link IShoppingMember.administrator},
     * `IShoppingAdministrator.IInvert` starts from the administrator information
     * and access to the customer, member and {@link IShoppingCitizen citizen}
     * information inversely.
    */
    export type IInvert = {
        /**
         * Discriminant for the type of customer.
         *
         * @title Discriminant for the type of customer
        */
        type: "administrator";
        /**
         * Membership joining information.
         *
         * @title Membership joining information
        */
        member: IShoppingMember.IInvert;
        /**
         * Customer, the connection information.
         *
         * @title Customer, the connection information
        */
        customer: IShoppingCustomer.IInvert;
        /**
         * Real-name and mobile number authentication information.
         *
         * @title Real-name and mobile number authentication information
        */
        citizen: IShoppingCitizen;
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Creation time of record.
         *
         * Another words, the time when the administrator has signed up.
         *
         * @title Creation time of record
        */
        created_at: string;
    };
}
namespace IShoppingMember {
    /**
     * Invert information of member.
     *
     * This invert member information has been designed to be used for another
     * invert information of sellers and administrators like below.
     *
     * - {@link IShoppingSeller.IInvert}
     * - {@link IShoppingAdministrator.IInvert}
    */
    export type IInvert = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Nickname that uniquely identifies the member.
         *
         * @title Nickname that uniquely identifies the member
        */
        nickname: string;
        /**
         * List of emails.
         *
         * @title List of emails
        */
        emails: IShoppingMemberEmail[];
        /**
         * Creation time of record.
         *
         * Another words, the time when the member has signed up.
         *
         * @title Creation time of record
        */
        created_at: string;
    };
}
/**
 * Email address of member.
 *
 * This shopping mall system allows multiple email addresses to be
 * registered for one {@link IShoppingMember member}. If you don't have to
 * plan such multiple email addresses, just use only one.
*/
type IShoppingMemberEmail = {
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Email address value.
     *
     * @title Email address value
    */
    value: string;
    /**
     * Creation time of record.
     *
     * @title Creation time of record
    */
    created_at: string;
};
namespace IShoppingCustomer {
    /**
     * Inverted customer information.
     *
     * This inverted customer information has been designed to be used for
     * another invert information of sellers and administrators like below.
     *
     * - {@link IShoppingSeller.IInvert}
     * - {@link IShoppingAdministrator.IInvert}
    */
    export type IInvert = {
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
}
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
/**
 * Citizen verification information.
 *
 * `IShoppingCitizen` is an entity that records the user's
 * {@link name real name} and {@link mobile} input information.
 *
 * For reference, in South Korea, real name authentication is required for
 * e-commerce participants, so the name attribute is important. However, the
 * situation is different overseas, so in reality, mobile attributes are the
 * most important, and identification of individual person is also done based
 * on this mobile.
 *
 * Of course, real name and mobile phone authentication information are
 * encrypted and stored.
*/
type IShoppingCitizen = {
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
     * Mobile number.
     *
     * @title Mobile number
    */
    mobile: string & tags.JsonSchemaPlugin<{
        "x-wrtn-payment-order-mobile": true
    }>;
    /**
     * Real name, or equivalent nickname.
     *
     * @title Real name, or equivalent nickname
    */
    name: string & tags.JsonSchemaPlugin<{
        "x-wrtn-payment-order-citizen": true
    }>;
};
type IAutoViewTransformerInputType = IPageIShoppingMileageDonation;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // For visual engagement, we render the donation records inside a vertical card.
  // The card contains a header (with an icon), a content section (listing each donation using a data list)
  // and a footer with pagination information.
  
  // Transform each donation record into a DataListItem.
  // Each DataListItem will present its donation information using a Markdown component for rich text.
  const donationItems: IAutoView.IAutoViewDataListItemProps[] =
    input.data && input.data.length > 0
      ? input.data.map((donation) => {
          // Construct the markdown text for each donation.
          // We use markdown headers and bold formatting for clarity.
          const markdownContent = 
            "### Donation from " + donation.citizen.name + "\n\n" +
            "**Donation ID**: " + donation.id + "\n\n" +
            "**Value**: " + donation.value + "\n\n" +
            "**Reason**: " + donation.reason + "\n\n" +
            "**Received At**: " + donation.created_at;
          
          return {
            type: "DataListItem",
            // Use a Markdown component to display donation details instead of plain text.
            label: {
              type: "Markdown",
              content: markdownContent,
            },
            // Optional: You could place additional elements in `value` if needed.
          } as IAutoView.IAutoViewDataListItemProps;
        })
      : [
          // In case there are no donation records, display an informative message.
          {
            type: "DataListItem",
            label: {
              type: "Markdown",
              content: "### No donation records found.",
            },
          } as IAutoView.IAutoViewDataListItemProps,
        ];

  // Create a DataList component that will hold all donation items.
  const donationList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: donationItems,
  };

  // Prepare pagination information using a Markdown component.
  // This ensures that even textual information uses rich formatting.
  const paginationMarkdownContent = 
    "**Page " + input.pagination.current + " of " + input.pagination.pages + "**\n\n" +
    "Total Records: " + input.pagination.records + " | " +
    "Records per Page: " + input.pagination.limit;

  const paginationComponent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: paginationMarkdownContent,
  };

  // Compose the card header.
  // We use an icon (of type Icon) on the left to enhance visual appeal.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Shopping Mileage Donations",
    description: "Overview of donation records.",
    startElement: {
      // Using a donation- or gift-themed icon.
      type: "Icon",
      id: "gift", // Assuming 'gift' is a valid icon id in kebab-case.
      color: "blue",
      size: 24,
    } as IAutoView.IAutoViewIconProps,
    // Optionally, endElement can be added if needed.
  };

  // Compose the card content, which contains the data list.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // childrenProps accepts a single component or array; here we pass our donation list.
    childrenProps: donationList,
  };

  // Compose the card footer to show pagination info.
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: paginationComponent,
  };

  // Finally, build the vertical card composing the above components.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent,
      cardFooter,
    ],
  };

  // Return the final component props which conforms to IAutoView.IAutoViewComponentProps.
  return verticalCard;
}
