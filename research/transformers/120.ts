import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IShoppingSeller {
        /**
         * Invert information starting from seller info.
         *
         * Instead of accessing to the seller information from the
         * {@link IShoppingCustomer.member} -> {@link IShoppingMember.seller},
         * `IShoppingSeller.IInvert` starts from the seller information
         * and access to the customer, member and {@link IShoppingCitizen citizen}
         * information inversely.
        */
        export type IInvert = {
            /**
             * Discriminant for the type of seller.
             *
             * @title Discriminant for the type of seller
            */
            type: "seller";
            /**
             * Membership joining information.
             *
             * @title Membership joining information
            */
            member: Schema.IShoppingMember.IInvert;
            /**
             * Customer, the connection information.
             *
             * @title Customer, the connection information
            */
            customer: Schema.IShoppingCustomer.IInvert;
            /**
             * Real-name and mobile number authentication information.
             *
             * @title Real-name and mobile number authentication information
            */
            citizen: Schema.IShoppingCitizen;
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
    }
    export namespace IShoppingMember {
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
            emails: Schema.IShoppingMemberEmail[];
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
    export type IShoppingMemberEmail = {
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
    export namespace IShoppingCustomer {
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
    export type IShoppingCitizen = {
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
        mobile: string;
        /**
         * Real name, or equivalent nickname.
         *
         * @title Real name, or equivalent nickname
        */
        name: string;
    };
}
type IAutoViewTransformerInputType = Schema.IShoppingSeller.IInvert;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Destructure input for easier access
    const { id, created_at, member, customer, citizen } = input;

    // Format timestamps for human-readable display
    const sellerCreated = new Date(created_at).toLocaleString();
    const customerCreated = new Date(customer.created_at).toLocaleString();

    // Header with seller identity and signup time
    const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: `Seller #${id}`,
        description: `Signed up: ${sellerCreated}`,
        // Use a user icon to make it more visual
        startElement: {
            type: "Icon",
            id: "user",
            size: 28,
            color: "blue"
        }
    };

    // Build chips for each member email
    const emailChips: IAutoView.IAutoViewChipProps[] = member.emails.map(email => ({
        type: "Chip",
        label: email.value,
        color: "teal",
        size: "small",
        variant: "outlined"
    }));

    // Build a list of DataListItemProps for all key fields
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
        // Member section
        {
            type: "DataListItem",
            label: { type: "Text", content: "Member Nickname" },
            value: { type: "Text", content: member.nickname }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Member ID" },
            value: { type: "Text", content: member.id }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Member Emails" },
            // Show a chip group if emails exist, else fallback to text
            value: emailChips.length > 0
                ? { type: "ChipGroup", childrenProps: emailChips }
                : { type: "Text", content: "None" }
        },
        // Customer section
        {
            type: "DataListItem",
            label: { type: "Text", content: "Channel" },
            value: {
                type: "Text",
                content: `${customer.channel.name} (${customer.channel.code})`
            }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Connection IP" },
            value: { type: "Text", content: customer.ip }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Connected At" },
            value: { type: "Text", content: customerCreated }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Referrer" },
            // Use markdown link if referrer is present
            value: customer.referrer
                ? { type: "Markdown", content: `[Referral](${customer.referrer})` }
                : { type: "Text", content: "None" }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Page URL" },
            value: { type: "Markdown", content: `[Visit](${customer.href})` }
        },
        // Citizen section
        {
            type: "DataListItem",
            label: { type: "Text", content: "Citizen Name" },
            value: { type: "Text", content: citizen.name }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Mobile" },
            value: { type: "Text", content: citizen.mobile }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Citizen ID" },
            value: { type: "Text", content: citizen.id }
        }
    ];

    // Wrap the items in a DataList for structured display
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: dataListItems
    };

    // Main content area of the card
    const cardContent: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList
    };

    // Compose a vertical card with header and content
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent]
    };
}
