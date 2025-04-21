import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IPageIShoppingSaleSnapshot {
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
            data: Schema.IShoppingSaleSnapshot.ISummary[];
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
    export namespace IShoppingSaleSnapshot {
        /**
         * Summarized information of the sale snapshot.
        */
        export type ISummary = {
            /**
             * Price range of the unit.
             *
             * @title Price range of the unit
            */
            price_range: Schema.IShoppingSalePriceRange;
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
            content: Schema.IShoppingSaleContent.IInvert;
            /**
             * List of categories.
             *
             * Which categories the sale is registered to.
             *
             * @title List of categories
            */
            categories: Schema.IShoppingChannelCategory.IInvert[];
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
            units: Schema.IShoppingSaleUnit.ISummary[];
        };
    }
    export type IShoppingSalePriceRange = {
        lowest: Schema.IShoppingPrice;
        highest: Schema.IShoppingPrice;
    };
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
    export namespace IShoppingSaleContent {
        export type IInvert = {
            id: string & tags.Format<"uuid">;
            title: string;
            thumbnails: Schema.IAttachmentFile[];
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
        export type ISummary = {
            price_range: Schema.IShoppingSalePriceRange;
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
}
type IAutoViewTransformerInputType = Schema.IPageIShoppingSaleSnapshot.ISummary;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const { pagination, data } = input;

    // Helper to format a number into a dollar price string with two decimals.
    const formatPrice = (value: number): string => {
        return `$${value.toFixed(2)}`;
    };

    // Build the header subcomponent that shows current page info.
    const header: IAutoView.IAutoViewListSubheaderProps = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: [
            {
                type: "Text",
                // Using a concise page indicator for users.
                content: `Page ${pagination.current} of ${pagination.pages}`,
                variant: "subtitle1"
            }
        ]
    };

    // Convert each sale snapshot into a ListItem for display.
    const items: IAutoView.IAutoViewListItemProps[] = data.map((snapshot) => {
        const { content, price_range, categories } = snapshot;
        const lowest = price_range.lowest;
        const highest = price_range.highest;

        // Prepare image thumbnail if available.
        const firstThumb = Array.isArray(content.thumbnails) && content.thumbnails.length > 0
            ? content.thumbnails[0]
            : null;

        // Prepare up to three category chips, then a "+N" chip if more.
        const maxChips = 3;
        const chipProps: IAutoView.IAutoViewChipProps[] = [];
        for (let i = 0; i < categories.length; i++) {
            if (i < maxChips) {
                chipProps.push({
                    type: "Chip",
                    label: categories[i].name,
                    variant: "outlined",
                    size: "small",
                    color: "primary"
                });
            } else {
                const remaining = categories.length - maxChips;
                chipProps.push({
                    type: "Chip",
                    label: `+${remaining}`,
                    variant: "outlined",
                    size: "small",
                    color: "gray"
                });
                break;
            }
        }

        return {
            type: "ListItem",
            // Title is the main sale title.
            title: content.title,
            // Description shows the real price range and nominal in parentheses.
            description: `${formatPrice(lowest.real)} - ${formatPrice(highest.real)} (nominal ${formatPrice(lowest.nominal)} - ${formatPrice(highest.nominal)})`,
            // Display the first thumbnail image as a preview.
            startElement: firstThumb
                ? {
                      type: "Image",
                      src: firstThumb.url,
                      alt: content.title
                  }
                : undefined,
            // Render category chips on the right side.
            endElement: chipProps.length > 0 ? chipProps : undefined,
            // If the snapshot is the latest, show a badge on the left.
            href: undefined
        };
    });

    // Compose the final List component with header + items.
    const listProps: IAutoView.IAutoViewListProps = {
        type: "List",
        childrenProps: [header, ...items]
    };

    return listProps;
}
