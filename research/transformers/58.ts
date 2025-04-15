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
  // Determine an appropriate icon based on the sale status.
  // Allowed statuses: null, "paused", "suspended"
  // We'll choose:
  // - "paused": display a "pause" icon with orange color
  // - "suspended": display an "exclamation-triangle" icon with red color
  // - Otherwise (active): display a "check-circle" icon with blue color
  let statusIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: "",
    size: 24,
    color: "blue"
  };
  if (input.status === "paused") {
    statusIcon.id = "pause";
    statusIcon.color = "orange";
  } else if (input.status === "suspended") {
    statusIcon.id = "exclamation-triangle";
    statusIcon.color = "red";
  } else {
    statusIcon.id = "check-circle";
    statusIcon.color = "blue";
  }

  // Optionally, if there is a thumbnail image within the content, use the first one.
  const thumbnail = input.content.thumbnails && input.content.thumbnails.length > 0
    ? input.content.thumbnails[0]
    : null;

  // Build an image component if thumbnail exists.
  const imageComponent: IAutoView.IAutoViewImageProps | undefined = thumbnail
    ? {
        type: "Image",
        src: thumbnail.url,
        alt: thumbnail.name || "Sale Thumbnail"
      }
    : undefined;

  // Create a markdown component to display the sale body content.
  const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: input.content.body
  };

  // Create a text component to display sale timings.
  const timingText: IAutoView.IAutoViewTextProps = {
    type: "Text",
    content: `Sale opens at: ${input.opened_at ? input.opened_at : "N/A"} | Closes at: ${input.closed_at ? input.closed_at : "Ongoing"}`,
    variant: "caption",
    color: "gray"
  };

  // Build a card header which uses the sale title and section code.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.content.title,
    description: `Section: ${input.section_code}`,
    // use the status icon to visually indicate the sale state
    startElement: statusIcon,
    // Optionally, you could add more elements to endElement if needed.
  };

  // Build a card content component that visually groups the image (if available) and markdown content.
  // We place the image on top if present, followed by the markdown.
  const cardContentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (imageComponent) {
    cardContentChildren.push(imageComponent);
  }
  // Push the markdown content next.
  cardContentChildren.push(markdownComponent);

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: cardContentChildren
  };

  // Build a card footer to display timing information and optionally unit count.
  // Here we also show how many sale units are available.
  const unitText: IAutoView.IAutoViewTextProps = {
    type: "Text",
    // Display the count of sale units and tags if available.
    content: `Units: ${input.units.length} | Tags: ${input.tags.join(", ")}`,
    variant: "footnote",
    color: "gray"
  };

  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      timingText,
      unitText
    ]
  };

  // Compose everything in a vertical card
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent,
      cardFooter
    ]
  };

  // Return the composed vertical card for rendering.
  return verticalCard;
}
