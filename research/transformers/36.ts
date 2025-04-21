import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Snapshot record of sale.
     *
     * `IShoppingSaleSnapshot` is an entity that embodies a snapshot of a sale,
     * and the ERD (Entity Relationship Diagram) describes the role of the
     * `shopping_sale_snapshots` table as follows:
     *
     * > {@link IShoppingSale shopping_sales} is an entity that embodies
     * > "product sales" (sales) information registered by the
     * > {@link IShoppingSeller seller}. And the main information of the sale is
     * > recorded in the sub `shopping_sale_snapshots`, not in the main
     * > {@link IShoppingSale shopping_sales}. When a seller changes a previously
     * > registered item, the existing {@link IShoppingSale shopping_sales} record
     * > is not changed, but a new snapshot record is created.
     * >
     * > This is to preserve the {@link IShoppingCustomer customer}'s
     * > {@link IShoppingOrder purchase history} flawlessly after the customer
     * > purchases a specific item, even if the seller changes the components or price
     * > of the item. It is also intended to support sellers in so-called A/B testing,
     * > which involves changing components or prices and measuring the performance
     * > in each case.
     *
     * By the way, DTO (Data Transfer Object) level used by the front-end developer,
     * it does not distinguish {@link IShoppingSale} and `IShoppingSaleSnapshot`
     * strictly, and generally handles {@link IShoppingSale} and snapshot together.
     *
     * But even though the DTO level does not strictly distinguish them, the word and
     * concept of "snapshot" is still important, so it is recommended to understand
     * the concept of "snapshot" properly.
    */
    export type IShoppingSaleSnapshot = {
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
        content: Schema.IShoppingSaleContent;
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
        units: Schema.IShoppingSaleUnit[];
    };
    /**
     * Content information of sale snapshot.
     *
     * `IShoppingSaleContent` is an entity embodies the description contents
     * of {@link IShoppingSale}.
    */
    export type IShoppingSaleContent = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Title of the content.
         *
         * @title Title of the content
        */
        title: string;
        /**
         * Format of the body content.
         *
         * Same meaning with file extension like `html`, `md`, and `txt`.
         *
         * @title Format of the body content
        */
        format: "html" | "md" | "txt";
        /**
         * The main body content.
         *
         * Format follows the {@link format}, and default is `md` (markdown).
         *
         * @title The main body content
        */
        body: string;
        /**
         * List of attached files.
         *
         * @title List of attached files
        */
        files: Schema.IAttachmentFile[];
        /**
         * List of thumbnails.
         *
         * @title List of thumbnails
        */
        thumbnails: Schema.IAttachmentFile[];
    };
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
    /**
     * Product composition information handled in the sale.
     *
     * `IShoppingSaleUnit` is an entity that embodies the "individual product"
     * information handled in the {@link IShoppingSale sale}.
     *
     * For reference, the reason why `IShoppingSaleUnit` is separated from
     * {@link IShoppingSaleSnapshot} by an algebraic relationship of 1: N is because
     * there are some cases where multiple products are sold in one listing. This is
     * the case with so-called "bundled products".
     *
     * - Bundle from regular product (Mackbook Set)
     *   - Main Body
     *   - Keyboard
     *   - Mouse
     *   - Apple Care (Free A/S Voucher)
     *
     * And again, `IShoppingSaleUnit` does not in itself refer to the
     * {@link IShoppingSaleUnitStock final stock} that the
     * {@link IShoppingCustomer customer} will {@link IShoppingOrder purchase}.
     * The final stock can be found only after selecting all given
     * {@link IShoppingSaleUnitOption options} and their
     * {@link IShoppingSaleUnitOptionCandidate candidate values}.
     *
     * For example, even if you buy a Macbook, the final stocks are determined only
     * after selecting all the options (CPU / RAM / SSD), etc.
    */
    export type IShoppingSaleUnit = {
        /**
         * List of options.
         *
         * @title List of options
        */
        options: (any | any)[];
        /**
         * List of final stocks.
         *
         * @title List of final stocks
        */
        stocks: Schema.IShoppingSaleUnitStock[];
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
    export type IShoppingSaleUnitSelectableOption = any;
    export type IShoppingSaleUnitDescriptiveOption = any;
    /**
     * Final component information on units for sale.
     *
     * `IShoppingSaleUnitStock` is a subsidiary entity of {@link IShoppingSaleUnit}
     * that represents a product catalog for sale, and is a kind of final stock that is
     * constructed by selecting all {@link IShoppingSaleUnitSelectableOption options}
     * (variable "select" type) and their
     * {@link IShoppingSaleUnitOptionCandidate candidate} values in the belonging unit.
     * It is the "good" itself that customers actually purchase.
     *
     * - Product Name) MacBook
     *   - Options
     *     - CPU: { i3, i5, i7, i9 }
     *     - RAM: { 8GB, 16GB, 32GB, 64GB, 96GB }
     *     - SSD: { 256GB, 512GB, 1TB }
     *   - Number of final stocks: 4 * 5 * 3 = 60
     *
     * For reference, the total number of `IShoppingSaleUnitStock` records in an
     * attribution unit can be obtained using Cartesian Product. In other words, the
     * value obtained by multiplying all the candidate values that each
     * (variable "select" type) option can have by the number of cases is the total
     * number of final stocks in the unit.
     *
     * Of course, without a single variable "select" type option, the final stocks
     * count in the unit is only 1.
    */
    export type IShoppingSaleUnitStock = {
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
        price: Schema.IShoppingPrice;
        /**
         * Current inventory status of the stock.
         *
         * @title Current inventory status of the stock
        */
        inventory: Schema.IShoppingSaleUnitStockInventory;
        /**
         * List of choices.
         *
         * Which candidate values being chosen for each option.
         *
         * @title List of choices
        */
        choices: Schema.IShoppingSaleUnitStockChoice[];
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
    /**
     * Selection information of final stock.
     *
     * `IShoppingSaleUnitStockChoice` is an entity that represents which
     * {@link IShoppingSaleUnitSelectableOption option} of each variable "select"
     * type was selected for each {@link IShoppingSaleUnitStock stock} and which
     * {@link IShoppingSaleUnitOptionCandidate candidate value} was selected within
     * it.
     *
     * Of course, if the bound {@link IShoppingSaleUnit unit} does not have any
     * options, this entity can also be ignored.
    */
    export type IShoppingSaleUnitStockChoice = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Target option's {@link IShoppingSaleUnitOption.id}
        */
        option_id: string;
        /**
         * Target candidate's {@link IShoppingSaleUnitOptionCandidate.id}
        */
        candidate_id: string;
    };
}
type IAutoViewTransformerInputType = Schema.IShoppingSaleSnapshot;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // Header icon indicating snapshot
  const headerIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: "clone",
    size: 20,
    color: "blue",
  };

  // Status chip for latest vs historical snapshot
  const statusChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.latest ? "Latest" : "Snapshot",
    color: input.latest ? "success" : "gray",
    variant: input.latest ? "filled" : "outlined",
    size: "small",
  };

  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.content.title,
    description: input.latest
      ? `Snapshot ID: ${input.snapshot_id}`
      : `Sale ID: ${input.id}`,
    startElement: headerIcon,
    endElement: statusChip,
  };

  // Show the first thumbnail if available
  const firstThumb = input.content.thumbnails?.[0];
  const cardMedia: IAutoView.IAutoViewCardMediaProps | undefined = firstThumb
    ? {
        type: "CardMedia",
        src: firstThumb.url,
      }
    : undefined;

  // Build chip group for categories
  const categoryChips = (input.categories || []).map(
    (cat): IAutoView.IAutoViewChipProps => ({
      type: "Chip",
      label: cat.name,
      variant: "outlined",
      size: "small",
      color: "secondary",
    }),
  );
  const categoriesGroup: IAutoView.IAutoViewChipGroupProps | undefined =
    categoryChips.length > 0
      ? { type: "ChipGroup", childrenProps: categoryChips, maxItems: 5 }
      : undefined;

  // Build chip group for tags
  const tagChips = (input.tags || []).map(
    (tag): IAutoView.IAutoViewChipProps => ({
      type: "Chip",
      label: tag,
      variant: "filled",
      size: "small",
      color: "info",
    }),
  );
  const tagsGroup: IAutoView.IAutoViewChipGroupProps | undefined =
    tagChips.length > 0
      ? { type: "ChipGroup", childrenProps: tagChips, maxItems: 8 }
      : undefined;

  // Build a DataList of units, marking primary/required
  const unitItems: IAutoView.IAutoViewDataListItemProps[] = (
    input.units || []
  ).map((unit) => {
    const labelText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: unit.name,
      variant: "subtitle1",
    };

    const valueChips: IAutoView.IAutoViewChipProps[] = [];
    if (unit.primary) {
      valueChips.push({
        type: "Chip",
        label: "Primary",
        color: "success",
        variant: "filled",
        size: "small",
      });
    }
    if (unit.required) {
      valueChips.push({
        type: "Chip",
        label: "Required",
        color: "warning",
        variant: "outlined",
        size: "small",
      });
    }

    return {
      type: "DataListItem",
      label: [labelText],
      value: valueChips.length > 0 ? valueChips : undefined,
    };
  });
  const unitsList: IAutoView.IAutoViewDataListProps | undefined =
    unitItems.length > 0
      ? { type: "DataList", childrenProps: unitItems }
      : undefined;

  // Render the main content as markdown or text
  const contentElement: IAutoView.IAutoViewPresentationComponentProps =
    input.content.format === "md"
      ? { type: "Markdown", content: input.content.body }
      : {
          type: "Text",
          content: input.content.body,
          variant: "body1",
        };

  // Compute price range for footer
  const prices: number[] = [];
  input.units?.forEach((unit) =>
    unit.stocks?.forEach((stock) => prices.push(stock.price.real)),
  );
  const priceFooter: IAutoView.IAutoViewCardFooterProps | undefined =
    prices.length > 0
      ? {
          type: "CardFooter",
          childrenProps: [
            {
              type: "Text",
              content:
                prices.length > 1
                  ? `Price: ${Math.min(...prices)} – ${Math.max(...prices)}`
                  : `Price: ${prices[0]}`,
              variant: "subtitle2",
            },
          ],
        }
      : undefined;

  // Aggregate all content children
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (categoriesGroup) contentChildren.push(categoriesGroup);
  if (tagsGroup) contentChildren.push(tagsGroup);
  if (unitsList) contentChildren.push(unitsList);
  contentChildren.push(contentElement);

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Assemble the vertical card
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      ...(cardMedia ? [cardMedia] : []),
      cardContent,
      ...(priceFooter ? [priceFooter] : []),
    ],
  };

  return verticalCard;
}
