import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Actions OIDC subject customization for a repository
     *
     * @title Actions OIDC subject customization for a repository
    */
    export type oidc_custom_sub_repo = {
        /**
         * Whether to use the default template or not. If `true`, the `include_claim_keys` field is ignored.
        */
        use_default: boolean;
        /**
         * Array of unique strings. Each claim key can only contain alphanumeric characters and underscores.
        */
        include_claim_keys?: string[];
    };
}
type IAutoViewTransformerInputType = Schema.oidc_custom_sub_repo;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Prepare a status chip for the template mode (Default vs Custom)
  const templateStatusChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.use_default ? "Default Template" : "Custom Template",
    color: input.use_default ? "success" : "warning",
    variant: "filled",
    size: "small",
  };

  // Build the list of properties to display in a DataList
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1. Display the boolean flag as an icon (check or cross)
  listItems.push({
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Use Default Template",
      variant: "body2",
    },
    value: {
      type: "Icon",
      id: input.use_default ? "check-circle" : "times-circle",
      color: input.use_default ? "green" : "red",
      size: 20,
    },
  });

  // 2. If custom template, show the included claim keys (or a warning if missing)
  if (!input.use_default) {
    if (Array.isArray(input.include_claim_keys) && input.include_claim_keys.length > 0) {
      // Map each claim key to a Chip
      const keyChips: IAutoView.IAutoViewChipProps[] = input.include_claim_keys.map(
        (key) => ({
          type: "Chip",
          label: key,
          color: "info",
          variant: "outlined",
          size: "small",
        })
      );

      listItems.push({
        type: "DataListItem",
        label: {
          type: "Text",
          content: "Include Claim Keys",
          variant: "body2",
        },
        value: {
          type: "ChipGroup",
          childrenProps: keyChips,
          maxItems: keyChips.length,
        },
      });
    } else {
      // No keys provided
      listItems.push({
        type: "DataListItem",
        label: {
          type: "Text",
          content: "Include Claim Keys",
          variant: "body2",
        },
        value: {
          type: "Text",
          content: "No claim keys defined",
          variant: "body2",
          color: "warning",
        },
      });
    }
  }

  // Assemble the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  // Compose the card header with icon and status chip
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "OIDC Subject Customization",
    description: "Actions OIDC subject customization for a repository",
    startElement: {
      type: "Icon",
      id: "cog",
      color: "blue",
      size: 24,
    },
    endElement: templateStatusChip,
  };

  // Wrap the DataList inside CardContent
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Finally, return a VerticalCard containing the header and content
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  return card;
}
