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



// Transforms a shopping sale creation payload into an IAutoView component tree.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Format date-times for display
  const openedAt: string = input.opened_at
    ? new Date(input.opened_at).toLocaleString()
    : "Ongoing";
  const closedAt: string = input.closed_at
    ? new Date(input.closed_at).toLocaleString()
    : "No end";

  // Build small chips for search tags
  const tagChips: IAutoView.IAutoViewChipProps[] = input.tags.map((tag) => ({
    type: "Chip",
    label: tag,
    size: "small",
    variant: "outlined",
    color: "secondary",
  }));

  // Build small chips for category codes
  const categoryChips: IAutoView.IAutoViewChipProps[] = input.category_codes.map(
    (code) => ({
      type: "Chip",
      label: code,
      size: "small",
      variant: "outlined",
      color: "info",
    }),
  );

  // Build a DataListItem for each sale unit, rendering details via markdown
  const unitItems: IAutoView.IAutoViewDataListItemProps[] = input.units.map(
    (unit) => {
      // Compose a markdown summary for the unit
      let md = `### ${unit.name}\n`;
      md += `- **Primary:** ${unit.primary}\n`;
      md += `- **Required:** ${unit.required}\n`;
      md += `- **Options count:** ${unit.options.length}\n\n`;
      md += `**Stocks:**\n`;
      unit.stocks.forEach((stock) => {
        md += `- **${stock.name}**: $${stock.price.real} (nominal $${stock.price.nominal}), Qty: ${stock.quantity}\n`;
        if (stock.choices.length) {
          // List choices as [opt→cand]
          const choices = stock.choices
            .map(
              (c) => `\`[opt${c.option_index}→cand${c.candidate_index}]\``,
            )
            .join(" ");
          md += `  - Choices: ${choices}\n`;
        }
      });

      return {
        type: "DataListItem",
        // Simple label with the unit's name
        label: {
          type: "Text",
          content: `Unit: ${unit.name}`,
        },
        // Full details inside a markdown block
        value: {
          type: "Markdown",
          content: md,
        },
      };
    },
  );

  // Wrap the units in a nested DataList
  const unitsList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: unitItems,
  };

  // Determine a chip color for the initial status badge
  const statusColor =
    input.status === "paused"
      ? "warning"
      : input.status === "suspended"
      ? "error"
      : "primary";

  return {
    type: "VerticalCard",
    childrenProps: [
      // Card header: sale title, format badge, and status chip
      {
        type: "CardHeader",
        title: input.content.title,
        description: `Format: ${input.content.format.toUpperCase()}`,
        startElement: {
          type: "Icon",
          id: "tags", // FontAwesome "tags" icon for visual flair
        },
        endElement: {
          type: "Chip",
          label: input.status ?? "none",
          variant: "filled",
          color: statusColor,
        },
      },
      // If there are thumbnails, show them in a simple carousel
      ...(input.content.thumbnails.length
        ? [
            {
              type: "Carousel",
              autoPlay: false,
              infinite: false,
              gutter: 8,
              navControls: true,
              indicators: true,
              childrenProps: input.content.thumbnails.map((thumb) => ({
                // Each slide is a simple card with a media image
                type: "VerticalCard" as const,
                childrenProps: {
                  type: "CardMedia",
                  src: thumb.url,
                },
              })),
            } as IAutoView.IAutoViewCarouselProps,
          ]
        : []),
      // Main content: markdown body + metadata list + units list
      {
        type: "CardContent",
        childrenProps: [
          // Body text rendered as markdown to support rich formatting
          {
            type: "Markdown",
            content: input.content.body,
          },
          // Metadata and nested unit breakdown
          {
            type: "DataList",
            childrenProps: [
              {
                type: "DataListItem",
                label: { type: "Text", content: "Section Code" },
                value: { type: "Text", content: input.section_code },
              },
              {
                type: "DataListItem",
                label: { type: "Text", content: "Opened At" },
                value: { type: "Text", content: openedAt },
              },
              {
                type: "DataListItem",
                label: { type: "Text", content: "Closed At" },
                value: { type: "Text", content: closedAt },
              },
              {
                type: "DataListItem",
                label: { type: "Text", content: "Search Tags" },
                value: {
                  type: "ChipGroup",
                  childrenProps: tagChips,
                },
              },
              {
                type: "DataListItem",
                label: { type: "Text", content: "Categories" },
                value: {
                  type: "ChipGroup",
                  childrenProps: categoryChips,
                },
              },
              {
                type: "DataListItem",
                label: { type: "Text", content: "Units" },
                value: unitsList,
              },
            ],
          },
        ],
      },
      // Footer with a simple summary line
      {
        type: "CardFooter",
        childrenProps: {
          type: "Text",
          content: `Sale belongs to section: ${input.section_code}`,
        },
      },
    ],
  } as IAutoView.IAutoViewVerticalCardProps;
}
