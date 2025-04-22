import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type code_scanning_autofix = {
        status: Schema.code_scanning_autofix_status;
        description: Schema.code_scanning_autofix_description;
        started_at: Schema.code_scanning_autofix_started_at;
    };
    /**
     * The status of an autofix.
    */
    export type code_scanning_autofix_status = "pending" | "error" | "success" | "outdated";
    /**
     * The description of an autofix.
    */
    export type code_scanning_autofix_description = string | null;
    /**
     * The start time of an autofix in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type code_scanning_autofix_started_at = string;
}
type IAutoViewTransformerInputType = Schema.code_scanning_autofix;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map each status to a FontAwesome icon id and a semantic color
  const statusVisualMap: Record<Schema.code_scanning_autofix_status, { id: string; color: IAutoView.IAutoViewIconProps["color"] }> = {
    pending:  { id: "clock",           color: "orange" },
    error:    { id: "exclamation-circle", color: "red"    },
    success:  { id: "check-circle",    color: "green"  },
    outdated: { id: "history",         color: "gray"   },
  };

  // Lookup icon and color, fallback to a neutral "question-circle" if status is unexpected
  const { id: iconId, color: iconColor } =
    statusVisualMap[input.status] ?? { id: "question-circle", color: "gray" };

  // Format the ISO timestamp to a human-friendly string; fallback to raw input on parse failure
  let formattedDate: string = input.started_at;
  try {
    const d = new Date(input.started_at);
    if (!isNaN(d.getTime())) {
      formattedDate = d.toLocaleString();
    }
  } catch {
    // swallow; leave formattedDate as raw ISO string
  }

  // Header: show status icon + humanized status + start time
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.status.charAt(0).toUpperCase() + input.status.slice(1),
    description: `Started at: ${formattedDate}`,
    startElement: {
      type: "Icon",
      id: iconId,
      color: iconColor,
      size: 24,
    },
  };

  // Content: render the description as Markdown, or show a placeholder Text if absent
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (input.description) {
    contentChildren.push({
      type: "Markdown",
      content: input.description,
    });
  } else {
    contentChildren.push({
      type: "Text",
      variant: "caption",
      color: "gray",
      content: "No description provided.",
    });
  }

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Use a vertical card to stack header and content; it's responsive on narrow screens
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };
}
