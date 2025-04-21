import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Marketplace Listing Plan
     *
     * @title Marketplace Listing Plan
    */
    export type marketplace_listing_plan = {
        url: string & tags.Format<"uri">;
        accounts_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        number: number & tags.Type<"int32">;
        name: string;
        description: string;
        monthly_price_in_cents: number & tags.Type<"int32">;
        yearly_price_in_cents: number & tags.Type<"int32">;
        price_model: "FREE" | "FLAT_RATE" | "PER_UNIT";
        has_free_trial: boolean;
        unit_name: string | null;
        state: string;
        bullets: string[];
    };
}
type IAutoViewTransformerInputType = Schema.marketplace_listing_plan[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no plans, show a simple markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "**No plans available**",
    };
  }

  // Map each plan to a VerticalCard for a carousel
  const cards: IAutoView.IAutoViewVerticalCardProps[] = input.map((plan) => {
    // Format prices in dollars
    const monthly = (plan.monthly_price_in_cents / 100).toFixed(2);
    const yearly = (plan.yearly_price_in_cents / 100).toFixed(2);

    // Build the description based on the price model
    let description: string;
    switch (plan.price_model) {
      case "FREE":
        description = "Free plan";
        break;
      case "FLAT_RATE":
        description = `$${monthly}/mo, billed annually at $${yearly}/yr`;
        break;
      case "PER_UNIT":
        description = `$${monthly}/unit/mo`;
        break;
      default:
        description = "";
    }

    // Generate a markdown bullet list of features
    const bulletContent =
      plan.bullets && plan.bullets.length > 0
        ? plan.bullets.map((b) => `- ${b}`).join("\n")
        : "- No features listed";

    // Compose footer actions: primary button + optional free-trial chip
    const footerChildren: (
      | IAutoView.IAutoViewButtonProps
      | IAutoView.IAutoViewChipProps
    )[] = [];

    footerChildren.push({
      type: "Button",
      label: "Select Plan",
      variant: "contained",
      color: plan.price_model === "FREE" ? "success" : "primary",
      size: "medium",
      href: plan.url,
    });

    if (plan.has_free_trial) {
      footerChildren.push({
        type: "Chip",
        label: "Free Trial",
        variant: "outlined",
        color: "info",
        size: "small",
      });
    }

    return {
      type: "VerticalCard",
      childrenProps: [
        {
          // Header with name, price info, and icon
          type: "CardHeader",
          title: plan.name,
          description: description,
          startElement: {
            type: "Icon",
            id: "coins",
            color: "teal",
            size: 24,
          },
        },
        {
          // Main content: feature list as markdown
          type: "CardContent",
          childrenProps: {
            type: "Markdown",
            content: bulletContent,
          },
        },
        {
          // Footer with action button(s)
          type: "CardFooter",
          childrenProps: footerChildren,
        },
      ],
    };
  });

  // Return the carousel component wrapping all plan cards
  return {
    type: "Carousel",
    childrenProps: cards,
    navControls: true,
    indicators: true,
    infinite: true,
  };
}
