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



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to create a simple text component
    const createText = (text: string): IAutoView.IAutoViewTextProps => ({
        type: "Text",
        content: text,
        variant: "body2",
    });

    // Helper to create an icon component
    const createIcon = (
        id: string,
        color: IAutoView.IAutoViewIconProps["color"] = "gray",
        size: IAutoView.IAutoViewIconProps["size"] = 20
    ): IAutoView.IAutoViewIconProps => ({
        type: "Icon",
        id,
        color,
        size,
    });

    // Helper to create a chip component
    const createChip = (label: string): IAutoView.IAutoViewChipProps => ({
        type: "Chip",
        label,
        variant: "outlined",
        size: "small",
    });

    // Build DataListItems for a given record, accepts a mapping array
    const buildDataList = (
        items: Array<{
            label: string;
            value?: string | IAutoView.IAutoViewPresentationComponentProps;
        }>
    ): IAutoView.IAutoViewDataListProps => {
        const childrenProps = items
            .filter((item) => item.value !== undefined)
            .map<IBaseDataListItem>((item) => {
                // Determine the value component: either plain text or a provided component
                const valueComponent =
                    typeof item.value === "string"
                        ? createText(item.value)
                        : (item.value as IAutoView.IAutoViewPresentationComponentProps);

                return {
                    type: "DataListItem",
                    label: [createText(item.label)],
                    value: [valueComponent],
                };
            });

        return {
            type: "DataList",
            childrenProps,
        };
    };

    // Member section
    const memberList = buildDataList([
        { label: "Member ID", value: input.member.id },
        { label: "Nickname", value: input.member.nickname },
        { label: "Joined At", value: input.member.created_at },
        // Emails as a ChipGroup
        {
            label: "Emails",
            value: {
                type: "ChipGroup",
                childrenProps: input.member.emails.map((email) =>
                    createChip(email.value)
                ),
                maxItems: 5,
            } as IAutoView.IAutoViewChipGroupProps,
        },
    ]);

    // Customer section
    const customerItems: Array<{
        label: string;
        value?: string | IAutoView.IAutoViewPresentationComponentProps;
    }> = [
        { label: "Customer ID", value: input.customer.id },
        { label: "Channel", value: input.customer.channel.name },
        { label: "Channel Code", value: input.customer.channel.code },
        { label: "Connected At", value: input.customer.created_at },
        { label: "IP Address", value: input.customer.ip },
    ];
    if (input.customer.href) {
        customerItems.push({
            label: "URL",
            // Use a button to link out
            value: {
                type: "Button",
                label: "Open",
                href: input.customer.href,
                variant: "text",
                color: "primary",
            } as IAutoView.IAutoViewButtonProps,
        });
    }
    if (input.customer.referrer) {
        customerItems.push({ label: "Referrer", value: input.customer.referrer });
    }
    const customerList = buildDataList(customerItems);

    // Citizen section
    const citizenList = buildDataList([
        { label: "Citizen ID", value: input.citizen.id },
        { label: "Name", value: input.citizen.name },
        { label: "Mobile", value: input.citizen.mobile },
        { label: "Verified At", value: input.citizen.created_at },
    ]);

    // Compose CardHeader
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "Administrator",
        description: `ID: ${input.id}`,
        startElement: createIcon("user", "blue", 28),
        endElement: {
            type: "Text",
            content: `Since ${input.created_at}`,
            variant: "caption",
        },
    };

    // Compose CardContent with the three lists
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: [memberList, customerList, citizenList],
    };

    // Wrap everything in a VerticalCard for responsive layout
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };

    return card;
}

// Aliases to satisfy type inference
interface IBaseDataListItem extends IAutoView.IAutoViewDataListItemProps {}
