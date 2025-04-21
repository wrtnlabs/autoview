import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IShoppingAdministrator {
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
             * Creation time of record.
             *
             * Another words, the time when the administrator has signed up.
             *
             * @title Creation time of record
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
type IAutoViewTransformerInputType = Schema.IShoppingAdministrator.IInvert;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms administrator invert data into a visual AutoView component tree.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const {
        id: adminId,
        created_at: adminCreatedAt,
        member,
        customer,
        citizen,
    } = input;

    /**
     * Helper to build a DataListItemProps with an icon, label text, and value text.
     * Uses Text and Icon components for clarity.
     */
    function createItem(
        iconId: string,
        labelText: string,
        valueText: string | null
    ): IAutoView.IAutoViewDataListItemProps {
        return {
            type: "DataListItem",
            // Label shows a compact icon + text
            label: [
                { type: "Icon", id: iconId, size: 16, color: "blue" },
                {
                    type: "Text",
                    content: ` ${labelText}`,
                    variant: "body2",
                },
            ],
            // Value is rendered as plain text; fall back to "N/A"
            value: {
                type: "Text",
                content: valueText ?? "N/A",
                variant: "body2",
            },
        };
    }

    // Aggregate all relevant fields into list items
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
        createItem("user", "Member Nickname", member.nickname),
        createItem(
            "envelope",
            "Emails",
            member.emails.map((e) => e.value).join(", ")
        ),
        createItem("calendar", "Member Since", member.created_at),
        createItem("id-badge", "Customer ID", customer.id),
        createItem(
            "globe",
            "Channel",
            `${customer.channel.name} (${customer.channel.code})`
        ),
        createItem("network-wired", "IP", customer.ip),
        createItem("clock", "Connected At", customer.created_at),
        createItem("link", "Referrer", customer.referrer),
        createItem("user-check", "Real Name", citizen.name),
        createItem("mobile-alt", "Mobile", citizen.mobile),
        createItem("user-plus", "Admin Since", adminCreatedAt),
    ];

    // Compose a vertical card with header, content (data list), and footer
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: citizen.name,
                description: "Administrator Profile",
                // Use an avatar with the administrator's name initials
                startElement: {
                    type: "Avatar",
                    name: citizen.name,
                    size: 40,
                    variant: "primary",
                },
                // Show the admin's ID as a chip for quick reference
                endElement: {
                    type: "Chip",
                    label: adminId,
                    variant: "outlined",
                    color: "secondary",
                    size: "small",
                },
            },
            {
                type: "CardContent",
                // Embed the data list as the main body of the card
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
            {
                type: "CardFooter",
                // Action button for further navigation or detail view
                childrenProps: {
                    type: "Button",
                    label: "View Details",
                    variant: "contained",
                    color: "primary",
                    size: "medium",
                },
            },
        ],
    };
}
