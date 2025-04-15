import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace IShoppingSale {
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
        content: IShoppingSaleContent.ICreate;
        /**
         * List of units.
         *
         * @title List of units
        */
        units: IShoppingSaleUnit.ICreate[];
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
namespace IShoppingSaleContent {
    export type ICreate = {
        title: string;
        format: "html" | "md" | "txt";
        body: string;
        files: IAttachmentFile.ICreate[];
        thumbnails: IAttachmentFile.ICreate[];
    };
}
namespace IAttachmentFile {
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
namespace IShoppingSaleUnit {
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
        stocks: IShoppingSaleUnitStock.ICreate[];
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
namespace IShoppingSaleUnitSelectableOption {
    export type ICreate = any;
}
namespace IShoppingSaleUnitDescriptiveOption {
    export type ICreate = any;
}
namespace IShoppingSaleUnitStock {
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
        price: IShoppingPrice;
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
        choices: IShoppingSaleUnitStockChoice.ICreate[];
    };
}
/**
 * Shopping price interface.
*/
type IShoppingPrice = {
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
namespace IShoppingSaleUnitStockChoice {
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
type IAutoViewTransformerInputType = IShoppingSale.ICreate;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Compose the card header to display the sale title and category information.
  // We use an icon as the startElement to bring visual engagement.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.content.title,
    description: `Sale for Section: ${input.section_code}`,
    // Using an icon here. The allowed types for startElement include IAutoViewIconProps.
    startElement: {
      type: "Icon",
      // We choose an icon id that represents a sale or tag; adjust as needed.
      id: "tag",
      color: "blue",
      size: 16,
    },
    // endElement can be omitted if not needed; you could also add decorative elements here.
  };

  // Compose the card content.
  // We want to display a rich description so we use the markdown component.
  // In addition, if a thumbnail is provided, we show an image component above the markdown text.
  const contentComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

  // If there is at least one thumbnail, add an Image component for visual appeal.
  if (input.content.thumbnails && input.content.thumbnails.length > 0) {
    // Use the first thumbnail.
    contentComponents.push({
      type: "Image",
      src: input.content.thumbnails[0].url,
      alt: input.content.thumbnails[0].name || input.content.title,
    });
  }
  
  // Include the sale description using a Markdown component to render rich text.
  contentComponents.push({
    type: "Markdown",
    content: input.content.body,
  });

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentComponents,
  };

  // Compose the card footer.
  // Here we want to show meta-information such as sale status, opening and closing times, and tags.
  // Since we want to avoid plain text as much as possible, we use a Text component which can easily
  // render markdown-like content if needed.
  let footerText = "";
  footerText += `**Status:** ${input.status ?? "active"}  \n`;
  if (input.opened_at) {
    footerText += `**Opened:** ${input.opened_at}  \n`;
  }
  if (input.closed_at) {
    footerText += `**Closed:** ${input.closed_at}  \n`;
  }
  if (input.tags && input.tags.length > 0) {
    footerText += `**Tags:** ${input.tags.join(", ")}`;
  }

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      {
        type: "Text",
        // Using markdown syntax in the content (e.g., **bold**)
        content: footerText,
        variant: "body1",
        color: "gray",
      } as IAutoView.IAutoViewTextProps,
    ],
  };

  // Finally, compose a VerticalCard that includes all the above components.
  // A VerticalCard is suitable for displaying collections of components in a responsive,
  // mobile-friendly layout.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, cardContent, footer],
  };

  return verticalCard;
}
