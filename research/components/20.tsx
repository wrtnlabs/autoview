import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Order application information.
     *
     * `IShoppingOrder` is an entity that embodies {@link IShoppingCustomer customer}'s
     * order application information. However, please note that at this time, you are
     * still at the "order application" stage and not the "order confirmation" stage.
     *
     * And as soon as a customer applies for an order, all
     * {@link IShoppingCartCommodity commodities} in the target shopping cart are
     * promoted to {@link IShoppingOrderGood goods}, and those good records are created
     * under this `IShoppingOrder`.
     *
     * Of course, not all commodities in the target shopping cart become
     * {@link IShoppingOrderGood}, but only those selected by the customer become the
     * {@link IShoppingOrderGood}.
    */
    export type IShoppingOrder = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Representative name of the order.
         *
         * @title Representative name of the order
        */
        name: string;
        /**
         * Customer who've applied for the order.
         *
         * @title Customer who've applied for the order
        */
        customer: AutoViewInputSubTypes.IShoppingCustomer;
        /**
         * List of goods in the order.
         *
         * @title List of goods in the order
        */
        goods: AutoViewInputSubTypes.IShoppingOrderGood[];
        /**
         * Price information including discounts.
         *
         * For reference, this price value has multiplied by the {@link volume} value.
         * Therefore, even if {@link volume} value is equal to the target
         * {@link IShoppingCartCommodity.volume}, this price value can be different
         * with the {@link IShoppingCartCommodity.price} value.
         *
         * @title Price information including discounts
        */
        price: AutoViewInputSubTypes.IShoppingOrderPrice;
        /**
         * Order completion and payment information.
         *
         * @title Order completion and payment information
        */
        publish: null | any;
        /**
         * Creation time of the record.
         *
         * @title Creation time of the record
        */
        created_at: string;
    };
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
        channel: AutoViewInputSubTypes.IShoppingChannel;
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
            channel: AutoViewInputSubTypes.IShoppingChannel;
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
    export type IShoppingMember = any;
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
            emails: AutoViewInputSubTypes.IShoppingMemberEmail[];
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
     * Information about the individual goods that make up your order.
     *
     * `IShoppingOrderGood` is an entity that represents each good ordered by a
     * {@link IShoppingCustomer customer}, and the record is created in the process
     * of upgrading the product {@link IShoppingCartCommodity commodity} in the
     * shopping cart to a good due to the customer's {@link IShoppingOrder order}
     * request.
     *
     * And `IShoppingOrderGood`, like {@link IShoppingCartCommodity}, is a concept
     * that corresponds to the listing {@link IShoppingSaleSnapshot sale snapshot}.
     *
     * For reference, `IShoppingOrderGood` also contains {@link volume} information
     * separately from the belonging {@link IShoppingCartCommodity.volume}. This is
     * because there are some cases where you put 3 books in your shopping cart and
     * then change them to 4 during the actual order application process. This is to
     * increase the reusability of the shopping cart by changing the volume attribute
     * of the current entity rather than directly changing the commodity information.
     *
     * In addition, `IShoppingOrderGood` becomes the most basic unit for the post-order
     * process, that is, after service (A/S). For example, after receiving a
     * customer's product, confirming the order is recorded in the {@link confirmed_at}
     * attribute. Additionally, `IShoppingOrderGood` is the unit in which customers
     * issues or request exchanges or refunds for ordered products.
    */
    export type IShoppingOrderGood = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Commodity that is the basis of the good.
         *
         * @title Commodity that is the basis of the good
        */
        commodity: AutoViewInputSubTypes.IShoppingCartCommodity;
        /**
         * Volume of the good.
         *
         * The value multiplied to {@link IShoppingCartCommodityStock.quantity}.
         * It's purpose is exactly same with {@link IShoppingCartCommodity.volume},
         * but rewritten because the {@link IShoppingCartCommodity} records are reusable
         * until payment.
         *
         * @title Volume of the good
        */
        volume: number & tags.Type<"int32">;
        /**
         * Price information including discounts and multiplied volume.
         *
         * @title Price information including discounts and multiplied volume
        */
        price: AutoViewInputSubTypes.IShoppingOrderPrice.ISummary;
        /**
         * State of delivery about the good.
         *
         * @title State of delivery about the good
        */
        state: null | "none" | "underway" | "preparing" | "manufacturing" | "shipping" | "delivering" | "arrived";
        /**
         * Confirmation time of order good.
         *
         * When be confirmed, customer can't request refund or exchange.
         *
         * The confirmation be accomplished by following cases.
         *
         * - Customer does it directly.
         * - 14 days after the delivery.
         *
         * @title Confirmation time of order good
        */
        confirmed_at: null | (string & tags.Format<"date-time">);
    };
    /**
     * Item in a shopping cart.
     *
     * `IShoppingCartCommodity` is an entity that represents a
     * {@link IShoppingSaleSnapshot snapshot} of the items that
     * {@link IShoppingCustomer customer} has placed into his shopping cart with a
     * {@link IShoppingOrder purchase} in mind. And if the customer continues this
     * into an actual order in the future, `IShoppingCartCommodity` be changed to
     * {@link IShoppingOrderGood}.
     *
     * And while adding a sale snapshot to the shopping cart, the customer inevitably
     * selects specific {@link IShoppingSaleUnit units} and
     * {@link IShoppingSaleUnitStock final stocks} within the listing snapshot.
     * Information about these units and stocks is recorded in the subsidiary entity
     * {@link IShoppingCartCommodityStock}. Also, there is an attribute {@link volume}
     * that indicates how many sets of snapshots of the target commodity will be
     * purchased. This "volume" is a value that will be multiplied by
     * {@link IShoppingSaleUnitStock.IInvert.quantity}, the quantity for each
     * component.
    */
    export type IShoppingCartCommodity = {
        /**
         * Primary Key.
         *
         * If you want to continue to the order the commodity, then use this ID to order.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Invert information of the sale (snapshot), in the perspective of commodity.
         *
         * @title Invert information of the sale (snapshot), in the perspective of commodity
        */
        sale: AutoViewInputSubTypes.IShoppingSaleSnapshot.IInvert;
        /**
         * Whether current commodity is orderable or not.
         *
         * If this attribute is `false`, then the commodity is not orderable, because
         * it has already been ordered.
         *
         * @title Whether current commodity is orderable or not
        */
        orderable: boolean;
        /**
         * Whether current commodity is pseudo or not.
         *
         * When this attribute is `true`, then the commodity is not the real one,
         * but just fake information only for calculating the discount effect by
         * {@link IShoppingCoupon coupons}.
         *
         * @title Whether current commodity is pseudo or not
        */
        pseudo: boolean;
        /**
         * Volume of the commodity to purchase.
         *
         * A value indicating how many sets would be multiplied to the children
         * {@link IShoppingSaleUnitStock.IInvert.quantity} values.
         *
         * @title Volume of the commodity to purchase
        */
        volume: number & tags.Type<"int32">;
        /**
         * Price of the commodity.
         *
         * For reference, this price value has not been multiplied by the
         * {@link volume} value. It just sumed up the prices of the children
         * {@link IShoppingSaleUnitStock.IInvert.price} values.
         *
         * @title Price of the commodity
        */
        price: AutoViewInputSubTypes.IShoppingPrice;
        /**
         * Creation time of the record.
         *
         * @title Creation time of the record
        */
        created_at: string;
    };
    export namespace IShoppingSaleSnapshot {
        /**
         * Invert information of the sale snapshot, in the perspective of commodity.
         *
         * `IShoppingSaleSnapshot.IInvert` is a structure used to represent a
         * snapshot in the perspective of a {@link IShoppingCommodity}, corresponding
         * to an {@link IShoppingCartCommodityStock} entity.
         *
         * Therefore, `IShoppingSaleSnapshot.IInvert` does not contain every
         * {@link IShoppingSaleUnit units} and {@link IShoppingSaleUnitStock stocks}
         * of the snapshot records, but only some of the records which are put
         * into the {@link IShoppingCartCommodity shopping cart}.
        */
        export type IInvert = {
            /**
             * Belonged section's information.
             *
             * @title Belonged section's information
            */
            section: AutoViewInputSubTypes.IShoppingSection;
            /**
             * Seller who've registered the sale.
             *
             * @title Seller who've registered the sale
            */
            seller: AutoViewInputSubTypes.IShoppingSeller.IInvert;
            /**
             * Primary Key of Sale.
             *
             * @title Primary Key of Sale
            */
            id: string;
            /**
             * Primary Key of Snapshot.
             *
             * @title Primary Key of Snapshot
            */
            snapshot_id: string;
            /**
             * Whether the snapshot is the latest one or not.
             *
             * @title Whether the snapshot is the latest one or not
            */
            latest: boolean;
            /**
             * Description and image content describing the sale.
             *
             * @title Description and image content describing the sale
            */
            content: AutoViewInputSubTypes.IShoppingSaleContent.IInvert;
            /**
             * List of categories.
             *
             * Which categories the sale is registered to.
             *
             * @title List of categories
            */
            categories: AutoViewInputSubTypes.IShoppingChannelCategory.IInvert[];
            /**
             * List of search tags.
             *
             * @title List of search tags
            */
            tags: string[];
            /**
             * List of units.
             *
             * Records about individual product composition information that are sold
             * in the sale. Each {@link IShoppingSaleUnit unit} record has configurable
             * {@link IShoppingSaleUnitOption options},
             * {@link IShoppingSaleUnitOptionCandidate candidate} values for each
             * option, and {@link IShoppingSaleUnitStock final stocks} determined by
             * selecting every candidate values of each option.
             *
             * @title List of units
            */
            units: AutoViewInputSubTypes.IShoppingSaleUnit.IInvert[];
            /**
             * Creation time of the record.
             *
             * Note that, this property is different with {@link opened_at},
             * which means the timepoint of the sale is opened.
             *
             * @title Creation time of the record
            */
            created_at: string;
            /**
             * Last updated time of the record.
             *
             * In another words, creation time of the last snapshot.
             *
             * @title Last updated time of the record
            */
            updated_at: string;
            /**
             * Paused time of the sale.
             *
             * The sale is paused by the seller, for some reason.
             *
             * {@link IShoppingCustomer Customers} can still see the sale on the
             * both list and detail pages, but the sale has a warning label
             * "The sale is paused by the seller".
             *
             * @title Paused time of the sale
            */
            paused_at: null | (string & tags.Format<"date-time">);
            /**
             * Suspended time of the sale.
             *
             * The sale is suspended by the seller, for some reason.
             *
             * {@link IShoppingCustomer Customers} cannot see the sale on the
             * both list and detail pages. It is almost same with soft delettion,
             * but there's a little bit difference that the owner
             * {@link IShoppingSeller seller} can still see the sale and resume it.
             *
             * Of course, the {@link IShoppingCustomer customers} who have
             * already purchased the sale can still see the sale on the
             * {@link IShoppingOrder order} page.
             *
             * @title Suspended time of the sale
            */
            suspended_at: null | (string & tags.Format<"date-time">);
            /**
             * Opening time of the sale.
             *
             * @title Opening time of the sale
            */
            opened_at: null | (string & tags.Format<"date-time">);
            /**
             * Closing time of the sale.
             *
             * If this value is `null`, the sale be continued forever.
             *
             * @title Closing time of the sale
            */
            closed_at: null | (string & tags.Format<"date-time">);
        };
    }
    /**
     * Section information.
     *
     * `IShoppingSection` is a concept that refers to the spatial information of
     * the market.
     *
     * If we compare the section mentioned here to the offline market, it means a
     * spatially separated area within the store, such as the "fruit corner" or
     * "butcher corner". Therefore, in the {@link IShoppingSale sale} entity, it is
     * not possible to classify multiple sections simultaneously, but only one section
     * can be classified.
     *
     * By the way, if your shopping mall system requires only one section, then just
     * use only one. This concept is designed to be expandable in the future.
    */
    export type IShoppingSection = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Identifier code.
         *
         * @title Identifier code
        */
        code: string;
        /**
         * Representative name of the section.
         *
         * @title Representative name of the section
        */
        name: string;
        /**
         * Creation time of record.
         *
         * @title Creation time of record
        */
        created_at: string;
    };
    export type IShoppingSeller = any;
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
            member: AutoViewInputSubTypes.IShoppingMember.IInvert;
            /**
             * Customer, the connection information.
             *
             * @title Customer, the connection information
            */
            customer: AutoViewInputSubTypes.IShoppingCustomer.IInvert;
            /**
             * Real-name and mobile number authentication information.
             *
             * @title Real-name and mobile number authentication information
            */
            citizen: AutoViewInputSubTypes.IShoppingCitizen;
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
    export namespace IShoppingSaleContent {
        export type IInvert = {
            id: string & tags.Format<"uuid">;
            title: string;
            thumbnails: AutoViewInputSubTypes.IAttachmentFile[];
        };
    }
    /**
     * Attachment File.
     *
     * Every attachment files that are managed in current system.
     *
     * For reference, it is possible to omit one of file {@link name}
     * or {@link extension} like `.gitignore` or `README` case, but not
     * possible to omit both of them.
    */
    export type IAttachmentFile = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Creation time of attachment file.
         *
         * @title Creation time of attachment file
        */
        created_at: string;
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
    export namespace IShoppingChannelCategory {
        /**
         * Invert category information with parent category.
        */
        export type IInvert = {
            /**
             * Parent category info with recursive structure.
             *
             * If no parent exists, then be `null`.
             *
             * @title Parent category info with recursive structure
            */
            parent: null | any;
            /**
             * Primary Key.
             *
             * @title Primary Key
            */
            id: string;
            /**
             * Identifier code of the category.
             *
             * The code must be unique in the channel.
             *
             * @title Identifier code of the category
            */
            code: string;
            /**
             * Parent category's ID.
             *
             * @title Parent category's ID
            */
            parent_id: null | (string & tags.Format<"uuid">);
            /**
             * Representative name of the category.
             *
             * The name must be unique within the parent category. If no parent exists,
             * then the name must be unique within the channel between no parent
             * categories.
             *
             * @title Representative name of the category
            */
            name: string;
            /**
             * Creation time of record.
             *
             * @title Creation time of record
            */
            created_at: string;
        };
    }
    export namespace IShoppingSaleUnit {
        export type IInvert = {
            /**
             * List of final stocks.
             *
             * @title List of final stocks
            */
            stocks: AutoViewInputSubTypes.IShoppingSaleUnitStock.IInvert[];
            /**
             * Primary Key.
             *
             * @title Primary Key
            */
            id: string;
            /**
             * Representative name of the unit.
             *
             * @title Representative name of the unit
            */
            name: string;
            /**
             * Whether the unit is primary or not.
             *
             * Just a labeling value.
             *
             * @title Whether the unit is primary or not
            */
            primary: boolean;
            /**
             * Whether the unit is required or not.
             *
             * When the unit is required, the customer must select the unit. If do not
             * select, customer can't buy it.
             *
             * For example, if there's a sale "Macbook Set" and one of the unit is the
             * "Main Body", is it possible to buy the "Macbook Set" without the
             * "Main Body" unit? This property is for that case.
             *
             * @title Whether the unit is required or not
            */
            required: boolean;
        };
    }
    export namespace IShoppingSaleUnitStock {
        /**
         * Invert information from the cart.
        */
        export type IInvert = {
            /**
             * Primary Key.
             *
             * @title Primary Key
            */
            id: string;
            /**
             * Representative name of the stock.
             *
             * @title Representative name of the stock
            */
            name: string;
            /**
             * Price of the stock.
             *
             * @title Price of the stock
            */
            price: AutoViewInputSubTypes.IShoppingPrice;
            /**
             * Quantity of the stock in the cart.
             *
             * @title Quantity of the stock in the cart
            */
            quantity: number & tags.Type<"int32">;
            /**
             * Current inventory status of the stock.
             *
             * @title Current inventory status of the stock
            */
            inventory: AutoViewInputSubTypes.IShoppingSaleUnitStockInventory;
            /**
             * List of choices.
             *
             * Which values being written for each option.
             *
             * @title List of choices
            */
            choices: AutoViewInputSubTypes.IShoppingSaleUnitStockChoice.IInvert[];
        };
    }
    /**
     * Shopping price interface.
    */
    export type IShoppingPrice = {
        /**
         * Nominal price.
         *
         * This is not {@link real real price} to pay, but just a nominal price to show.
         * If this value is greater than the {@link real real price}, it would be shown
         * like {@link IShoppingSeller seller} is giving a discount.
         *
         * @title Nominal price
        */
        nominal: number;
        /**
         * Real price to pay.
         *
         * @title Real price to pay
        */
        real: number;
    };
    /**
     * Inventory information of a final stock.
    */
    export type IShoppingSaleUnitStockInventory = {
        /**
         * Total income quantity.
         *
         * @title Total income quantity
        */
        income: number & tags.Type<"int32">;
        /**
         * Total outcome quantity.
         *
         * @title Total outcome quantity
        */
        outcome: number & tags.Type<"int32">;
    };
    export namespace IShoppingSaleUnitStockChoice {
        /**
         * Invert information from the cart.
        */
        export type IInvert = {
            /**
             * Primary Key.
             *
             * @title Primary Key
            */
            id: string;
            /**
             * Target option.
             *
             * @title Target option
            */
            option: any | any;
            /**
             * Selected candidate value.
             *
             * @title Selected candidate value
            */
            candidate: null | any;
            /**
             * Written value.
             *
             * @title Written value
            */
            value: null | string | number | boolean;
        };
    }
    export namespace IShoppingSaleUnitSelectableOption {
        export type IInvert = any;
    }
    export type IShoppingSaleUnitDescriptiveOption = any;
    export type IShoppingSaleUnitOptionCandidate = any;
    /**
     * Price information of the order including discounts.
    */
    export type IShoppingOrderPrice = {
        /**
         * List of discount coupon ticket payments.
         *
         * @title List of discount coupon ticket payments
        */
        ticket_payments: AutoViewInputSubTypes.IShoppingCouponTicketPayment[];
        /**
         * Amount of the cash payment.
         *
         * @title Amount of the cash payment
        */
        cash: number;
        /**
         * Amount of the deposit payment.
         *
         * @title Amount of the deposit payment
        */
        deposit: number;
        /**
         * Amount of the mileage payment.
         *
         * @title Amount of the mileage payment
        */
        mileage: number;
        /**
         * Amount of the discount coupon ticket payment.
         *
         * @title Amount of the discount coupon ticket payment
        */
        ticket: number;
        /**
         * Nominal price.
         *
         * This is not {@link real real price} to pay, but just a nominal price to show.
         * If this value is greater than the {@link real real price}, it would be shown
         * like {@link IShoppingSeller seller} is giving a discount.
         *
         * @title Nominal price
        */
        nominal: number;
        /**
         * Real price to pay.
         *
         * @title Real price to pay
        */
        real: number;
    };
    export namespace IShoppingOrderPrice {
        /**
         * Summarized information of the order price.
        */
        export type ISummary = {
            /**
             * Amount of the cash payment.
             *
             * @title Amount of the cash payment
            */
            cash: number;
            /**
             * Amount of the deposit payment.
             *
             * @title Amount of the deposit payment
            */
            deposit: number;
            /**
             * Amount of the mileage payment.
             *
             * @title Amount of the mileage payment
            */
            mileage: number;
            /**
             * Amount of the discount coupon ticket payment.
             *
             * @title Amount of the discount coupon ticket payment
            */
            ticket: number;
            /**
             * Nominal price.
             *
             * This is not {@link real real price} to pay, but just a nominal price to show.
             * If this value is greater than the {@link real real price}, it would be shown
             * like {@link IShoppingSeller seller} is giving a discount.
             *
             * @title Nominal price
            */
            nominal: number;
            /**
             * Real price to pay.
             *
             * @title Real price to pay
            */
            real: number;
        };
    }
    /**
     * Discount coupon ticket payment details.
     *
     * `IShoppingCouponTicketPayment` is an entity that embodies the payment
     * information for the {@link IShoppingOrder order} of
     * {@link IShoppingCouponTicket}, and is used when a consumer uses the
     * discount coupon ticket he or she was issued to order and has the payment
     * amount deducted.
     *
     * And since {@link IShoppingOrder} itself is not an entity used in
     * situations where an order is completed, but rather an entity designed to
     * express an order request, the creation of this
     * `IShoppingCouponTicketPayment` record does not actually mean that the
     * attached ticket disappears. Until the {@link IShoppingCustomer customer}
     * {@link IShoppingOrderPublish.paid_at completes the payment} and confirms
     * the order, the ticket can be understood as a kind of deposit.
     *
     * Additionally, this record can be deleted by the customer reversing the
     * payment of the ticket, but it can also be deleted when the attribution
     * order itself is cancelled.
    */
    export type IShoppingCouponTicketPayment = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Target ticket.
         *
         * @title Target ticket
        */
        ticket: AutoViewInputSubTypes.IShoppingCouponTicket;
        /**
         * Creation time of the record.
         *
         * @title Creation time of the record
        */
        created_at: string;
    };
    /**
     * Discount coupon ticket issuance details.
     *
     * `IShoppingCouponTicket` is an entity that symbolizes
     * {@link IShoppingCoupon discount coupon} tickets issued by
     * {@link IShoppingCustomer customers}.
     *
     * And if the target discount coupon specification itself has an expiration
     * date, the expiration date is recorded in expired_at and is automatically
     * discarded after that expiration date. Of course, it doesn't matter if you
     * use the discount coupon for your order within the deadline.
    */
    export type IShoppingCouponTicket = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Customer who've taken the coupon ticket.
         *
         * @title Customer who've taken the coupon ticket
        */
        customer: AutoViewInputSubTypes.IShoppingCustomer;
        /**
         * Target coupon.
         *
         * @title Target coupon
        */
        coupon: AutoViewInputSubTypes.IShoppingCoupon;
        /**
         * Creation time of the record.
         *
         * @title Creation time of the record
        */
        created_at: string;
        /**
         * Expiration time of the ticket.
         *
         * @title Expiration time of the ticket
        */
        expired_at: null | (string & tags.Format<"date-time">);
    };
    /**
     * Discount coupon.
     *
     * `IShoppingCoupon` is an entity that symbolizes discount coupons at
     * a shopping mall.
     *
     * Note that, `IShoppingCoupon` only contains specification information
     * about discount coupons. Please keep in mind that this is a different
     * concept from {@link IShoppingCouponTicket}, which refers to the issuance
     * of a discount coupon, or {@link IShoppingCouponTicketPayment}, which
     * refers to its payment.
     *
     * Additionally, discount coupons are applied on an order-by-order basis,
     * but each has its own unique restrictions. For example, a coupon with
     * {@link IShoppingCouponSellerCriteria} may or may not be used only for
     * {@link IShoppingSale} of listings registered by the {@link IShoppingSeller}.
     * Also, there are restrictions such as
     * {@link IShoppingCouponDiscount.threshold minimum amount restrictions} for
     * using discount coupons and
     * {@link IShoppingCouponDiscount.limit maximum discount amount limits}.
     *
     * In addition, you can set whether to issue discount coupons publicly or
     * give them only to people who know the specific issuing code. In addition,
     * there are restrictions such as issued discount coupons having an
     * {@link IShoppingCouponRestriction.expired_at expiration date} or being
     * issued only to customers who came in through a
     * {@link IShoppingCouponFunnelCriteria specific funnel}.
     *
     * For more information, please refer to the properties below and the
     * subsidiary entities described later.
    */
    export type IShoppingCoupon = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Designer who've made the coupon.
         *
         * @title Designer who've made the coupon
        */
        designer: any | any;
        /**
         * Inventory information.
         *
         * @title Inventory information
        */
        inventory: AutoViewInputSubTypes.IShoppingCouponInventory;
        /**
         * List of criteria information.
         *
         * @title List of criteria information
        */
        criterias: (any | any | any | any)[];
        /**
         * Discount information.
         *
         * @title Discount information
        */
        discount: any | any;
        /**
         * Restriction information.
         *
         * @title Restriction information
        */
        restriction: AutoViewInputSubTypes.IShoppingCouponRestriction;
        /**
         * Representative name of the coupon.
         *
         * @title Representative name of the coupon
        */
        name: string;
        /**
         * Opening time of the coupon.
         *
         * @title Opening time of the coupon
        */
        opened_at: null | (string & tags.Format<"date-time">);
        /**
         * Closing time of the coupon.
         *
         * Tickets cannot be issued after this time.
         *
         * However, previously issued tickets can still be used until their
         * expiration date.
         *
         * @title Closing time of the coupon
        */
        closed_at: null | (string & tags.Format<"date-time">);
        /**
         * Creation tie of the record.
         *
         * @title Creation tie of the record
        */
        created_at: string;
    };
    export type IShoppingAdministrator = any;
    /**
     * Inventory information of the coupon.
     *
     * If a {@link IShoppingCoupon coupon} has been designed with limited
     * inventory, this `IShoppingCouponInventory` structure represents the
     * remaining inventory information.
    */
    export type IShoppingCouponInventory = {
        /**
         * Remaining volume for everyone.
         *
         * If there is a limit to the quantity issued, it becomes impossible to
         * issue tickets exceeding this value.
         *
         * In other words, the concept of N coupons being issued on a first-come,
         * first-served basis is created.
         *
         * @title Remaining volume for everyone
        */
        volume: null | (number & tags.Type<"uint32">);
        /**
         * Remaining volume per citizen.
         *
         * As a limit to the total amount of issuance per person, it is common to
         * assign 1 to limit duplicate issuance to the same citizen, or to use the
         * `nul`` value to set no limit.
         *
         * Of course, by assigning a value of N, the total amount issued to the
         * same citizen can be limited.
         *
         * @title Remaining volume per citizen
        */
        volume_per_citizen: null | (number & tags.Type<"uint32">);
    };
    export type IShoppingCouponSectionCriteria = any;
    export type IShoppingCouponSellerCriteria = any;
    export type IShoppingCouponSaleCriteria = any;
    export type IShoppingCouponFunnelCriteria = any;
    export namespace IShoppingCouponDiscount {
        export type IAmount = any;
        export type IPercent = any;
    }
    /**
     * Restriction information of the coupon.
    */
    export type IShoppingCouponRestriction = {
        /**
         * Access level of coupon.
         *
         * - public: possible to find from public API
         * - private: unable to find from public API
         *   - arbitrarily assigned by the seller or administrator
         *   - issued from one-time link
         *
         * @title Access level of coupon
        */
        access: "public" | "private";
        /**
         * Exclusivity or not.
         *
         * An exclusive discount coupon refers to a discount coupon that has an
         * exclusive relationship with other discount coupons and can only be
         * used alone. That is, when an exclusive discount coupon is used, no
         * other discount coupon can be used for the same
         * {@link IShoppingOrder order} or {@link IShoppingOrderGood good}.
         *
         * Please note that this exclusive attribute is a very different concept
         * from multiplicative, which means whether the same coupon can be
         * multiplied and applied to multiple coupons of the same order, so
         * please do not confuse them.
         *
         * @title Exclusivity or not
        */
        exclusive: boolean;
        /**
         * Limited quantity issued.
         *
         * If there is a limit to the quantity issued, it becomes impossible
         * to issue tickets exceeding this value.
         *
         * In other words, the concept of N coupons being issued on
         * a first-come, first-served basis is created.
         *
         * @title Limited quantity issued
        */
        volume: null | (number & tags.Type<"uint32">);
        /**
         * Limited quantity issued per person.
         *
         * As a limit to the total amount of issuance per person, it is
         * common to assign 1 to limit duplicate issuance to the same citizen,
         * or to use the NULL value to set no limit.
         *
         * Of course, by assigning a value of N, the total amount issued
         * to the same citizen can be limited.
         *
         * @title Limited quantity issued per person
        */
        volume_per_citizen: null | (number & tags.Type<"uint32">);
        /**
         * Expiration day(s) value.
         *
         * The concept of expiring N days after a discount coupon ticket is issued.
         *
         * Therefore, customers must use the ticket within N days, if possible,
         * from the time it is issued.
         *
         * @title Expiration day(s) value
        */
        expired_in: null | (number & tags.Type<"uint32">);
        /**
         * Expiration date.
         *
         * A concept that expires after YYYY-MM-DD after a discount coupon ticket
         * is issued.
         *
         * Double restrictions are possible with expired_in, of which the one
         * with the shorter expiration date is used.
         *
         * @title Expiration date
        */
        expired_at: null | (string & tags.Format<"date-time">);
    };
    export type IShoppingOrderPublish = any;
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingOrder;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const orderDate = new Date(value.created_at).toLocaleString();
  const totalItems = value.goods.reduce((sum, g) => sum + (g.volume ?? 0), 0);
  const nominalTotal = value.price.nominal;
  const realTotal = value.price.real;
  const discountTotal =
    (value.price.nominal - value.price.real) ||
    value.price.ticket + value.price.mileage + value.price.deposit + value.price.cash;

  const stateLabels: Record<string, string> = {
    none: "Not started",
    preparing: "Preparing",
    underway: "Underway",
    manufacturing: "Manufacturing",
    shipping: "Shipping",
    delivering: "Delivering",
    arrived: "Arrived",
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">{value.name}</h2>
        <p className="text-sm text-gray-500">Ordered: {orderDate}</p>
        <p className="text-sm text-gray-600">Total items: {totalItems}</p>
        {value.customer.channel?.name && (
          <p className="text-sm text-gray-600">Channel: {value.customer.channel.name}</p>
        )}
      </div>

      {/* Goods List */}
      <div className="space-y-4">
        {value.goods.map((good) => {
          const thumbnailUrl =
            good.commodity.sale.content.thumbnails?.[0]?.url || "";
          const title = good.commodity.sale.content.title;
          const quantity = good.volume;
          const unitPrice =
            quantity > 0 ? good.price.real / quantity : good.price.real;
          const stateLabel =
            good.state ? stateLabels[good.state] : "Pending";
          const confirmedAt = good.confirmed_at
            ? new Date(good.confirmed_at).toLocaleDateString()
            : null;

          return (
            <div
              key={good.id}
              className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg"
            >
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt={title}
                  className="h-16 w-16 object-cover rounded"
                />
              ) : (
                <div className="h-16 w-16 bg-gray-200 rounded" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {title}
                </p>
                <p className="text-sm text-gray-600">
                  Qty: {quantity} &times; ₩{unitPrice.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">State: {stateLabel}</p>
                {confirmedAt && (
                  <p className="text-xs text-green-600">
                    Confirmed: {confirmedAt}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-baseline">
          <div>
            {nominalTotal > realTotal && (
              <div className="text-sm text-gray-500 line-through">
                ₩{nominalTotal.toLocaleString()}
              </div>
            )}
            <div className="text-2xl font-bold text-gray-800">
              ₩{realTotal.toLocaleString()}
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Discount: ₩{discountTotal.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
