import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IShoppingSale {
        /**
         * Creation information of sale.
        */
        export type ICreate = {
            /**
             * Belonged section's {@link IShoppingSection.code}.
             *
             * @title Belonged section's {@link IShoppingSection.code}
            */
            section_code: string;
            /**
             * Initial status of the sale.
             *
             * `null` or `undefined`: No restriction
             * `paused`: Starts with {@link ITimestamps.paused_at paused} status
             * `suspended`: Starts with {@link ITimestamps.suspended_at suspended} status
             *
             * @title Initial status of the sale
            */
            status?: null | "paused" | "suspended";
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
            /**
             * Description and image content describing the sale.
             *
             * @title Description and image content describing the sale
            */
            content: Schema.IShoppingSaleContent.ICreate;
            /**
             * List of units.
             *
             * @title List of units
            */
            units: Schema.IShoppingSaleUnit.ICreate[];
            /**
             * List of search tags.
             *
             * @title List of search tags
            */
            tags: string[];
            /**
             * List of target categories' {@link IShoppingChannelCategory.code}s.
             *
             * If empty, it means all categories of the channel is listing the sale.
             *
             * @title List of target categories' {@link IShoppingChannelCategory.code}s
            */
            category_codes: string[];
        };
    }
    export namespace IShoppingSaleContent {
        export type ICreate = {
            title: string;
            format: "html" | "md" | "txt";
            body: string;
            files: Schema.IAttachmentFile.ICreate[];
            thumbnails: Schema.IAttachmentFile.ICreate[];
        };
    }
    export namespace IAttachmentFile {
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
    export namespace IShoppingSaleUnit {
        /**
         * Creation information of sale unit.
        */
        export type ICreate = {
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
            stocks: Schema.IShoppingSaleUnitStock.ICreate[];
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
    export namespace IShoppingSaleUnitSelectableOption {
        export type ICreate = any;
    }
    export namespace IShoppingSaleUnitDescriptiveOption {
        export type ICreate = any;
    }
    export namespace IShoppingSaleUnitStock {
        /**
         * Creation information of the stock.
        */
        export type ICreate = {
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
             * Initial inventory quantity.
             *
             * @title Initial inventory quantity
            */
            quantity: number & tags.Type<"int32">;
            /**
             * List of choices.
             *
             * Which candidate values being chosen for each option.
             *
             * @title List of choices
            */
            choices: Schema.IShoppingSaleUnitStockChoice.ICreate[];
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
    export namespace IShoppingSaleUnitStockChoice {
        /**
         * Creation information of stock choice.
        */
        export type ICreate = {
            /**
             * Target option's index number in
             * {@link IShoppingSaleUnit.ICreate.options}.
            */
            option_index: number & tags.Type<"int32">;
            /**
             * Target candidate's index number in
             * {@link IShoppingSaleUnitSelectableOption.ICreate.candidates}.
            */
            candidate_index: number & tags.Type<"int32">;
        };
    }
}
type IAutoViewTransformerInputType = Schema.IShoppingSale.ICreate;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms shopping sale data into a visual AutoView component
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Format date-time or show infinity symbol
  const formatDate = (dt: string | null): string => {
    if (!dt) return '∞';
    const d = new Date(dt);
    return isNaN(d.getTime()) ? dt : d.toLocaleString();
  };

  // Derive status label and chip color
  const rawStatus = input.status ?? 'active';
  const statusLabel = rawStatus === 'paused'
    ? 'Paused'
    : rawStatus === 'suspended'
      ? 'Suspended'
      : 'Active';
  const statusColor: IAutoView.IAutoViewChipProps['color'] =
    rawStatus === 'paused' ? 'warning'
      : rawStatus === 'suspended' ? 'error'
      : 'success';

  // Build chips for search tags
  const tagChips: IAutoView.IAutoViewChipProps[] = input.tags.map(tag => ({
    type: 'Chip',
    label: tag,
    variant: 'outlined',
    size: 'small'
  }));

  // Build DataListItem for categories
  const categoryItems: IAutoView.IAutoViewDataListItemProps[] = input.category_codes.map(code => ({
    type: 'DataListItem',
    label: { type: 'Text', content: code }
  }));

  // Build per-unit DataListItem, nesting stocks as a DataList
  const unitItems: IAutoView.IAutoViewDataListItemProps[] = input.units.map(unit => {
    const stockItems: IAutoView.IAutoViewDataListItemProps[] = unit.stocks.map(stock => {
      // Show real price and optional nominal "was" price, plus quantity
      const priceText = stock.price.real !== stock.price.nominal
        ? `${stock.price.real} (was ${stock.price.nominal})`
        : `${stock.price.real}`;
      const detail = `${priceText} — ${stock.quantity} in stock`;
      return {
        type: 'DataListItem',
        label: { type: 'Text', content: stock.name },
        value: { type: 'Text', content: detail }
      };
    });

    // If unit is required, tag it with a small error‐colored chip
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      { type: 'Text', content: unit.name, variant: 'subtitle1' }
    ];
    if (unit.required) {
      labelComponents.push({
        type: 'Chip',
        label: 'Required',
        size: 'small',
        variant: 'outlined',
        color: 'error'
      });
    }

    return {
      type: 'DataListItem',
      label: labelComponents,
      value: { type: 'DataList', childrenProps: stockItems }
    };
  });

  // Metadata DataList for status, dates, tags, categories
  const metaList: IAutoView.IAutoViewDataListProps = {
    type: 'DataList',
    childrenProps: [
      {
        type: 'DataListItem',
        label: { type: 'Text', content: 'Status', variant: 'body2' },
        value: { type: 'Chip', label: statusLabel, color: statusColor, size: 'small' }
      },
      {
        type: 'DataListItem',
        label: { type: 'Text', content: 'Opened At', variant: 'body2' },
        value: { type: 'Text', content: formatDate(input.opened_at) }
      },
      {
        type: 'DataListItem',
        label: { type: 'Text', content: 'Closed At', variant: 'body2' },
        value: { type: 'Text', content: formatDate(input.closed_at) }
      },
      {
        type: 'DataListItem',
        label: { type: 'Text', content: 'Tags', variant: 'body2' },
        value: { type: 'ChipGroup', childrenProps: tagChips }
      },
      {
        type: 'DataListItem',
        label: { type: 'Text', content: 'Categories', variant: 'body2' },
        value: { type: 'DataList', childrenProps: categoryItems }
      }
    ]
  };

  // Main card children
  const children: IAutoView.IAutoViewVerticalCardProps['childrenProps'] = [];

  // Header with title and section code
  children.push({
    type: 'CardHeader',
    title: input.content.title,
    description: `Section: ${input.section_code}`,
    startElement: { type: 'Icon', id: 'tag', size: 20 }
  });

  // Show the first thumbnail if present
  if (input.content.thumbnails?.length) {
    children.push({
      type: 'CardMedia',
      src: input.content.thumbnails[0].url
    });
  }

  // Content block: metadata, body, units
  children.push({
    type: 'CardContent',
    childrenProps: [
      metaList,
      { type: 'Markdown', content: input.content.body },
      { type: 'Markdown', content: '#### Units and Stocks' },
      { type: 'DataList', childrenProps: unitItems }
    ]
  });

  // Wrap up in a vertical card
  return {
    type: 'VerticalCard',
    childrenProps: children
  };
}
