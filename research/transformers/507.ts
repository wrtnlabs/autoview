import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Custom property defined on an organization
     *
     * @title Organization Custom Property
    */
    export type custom_property = {
        /**
         * The name of the property
        */
        property_name: string;
        /**
         * The URL that can be used to fetch, update, or delete info about this property via the API.
        */
        url?: string;
        /**
         * The source type of the property
        */
        source_type?: "organization" | "enterprise";
        /**
         * The type of the value for the property
        */
        value_type: "string" | "single_select" | "multi_select" | "true_false";
        /**
         * Whether the property is required.
        */
        required?: boolean;
        /**
         * Default value of the property
        */
        default_value?: string | string[] | null;
        /**
         * Short description of the property
        */
        description?: string | null;
        /**
         * An ordered list of the allowed values of the property.
         * The property can have up to 200 allowed values.
        */
        allowed_values?: ((string & tags.MaxLength<75>)[] & tags.MaxItems<200>) | null;
        /**
         * Who can edit the values of the property
        */
        values_editable_by?: "org_actors" | "org_and_repo_actors" | null;
    };
}
type IAutoViewTransformerInputType = Schema.custom_property;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map input.value_type to a friendly color for chips
  const valueTypeColors: Record<Schema.custom_property["value_type"], IAutoView.IAutoViewChipProps["color"]> = {
    string: "blue",
    single_select: "teal",
    multi_select: "cyan",
    true_false: "lime",
  };

  // Map input.source_type to a friendly color
  const sourceTypeColors: Record<NonNullable<Schema.custom_property["source_type"]>, IAutoView.IAutoViewChipProps["color"]> = {
    organization: "indigo",
    enterprise: "violet",
  };

  // Build a list of DataListItem props to display each field
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Source Type
  if (input.source_type) {
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Source Type",
        variant: "subtitle2",
      },
      value: {
        type: "Chip",
        label: input.source_type,
        variant: "filled",
        color: sourceTypeColors[input.source_type],
        size: "small",
      },
    });
  }

  // Value Type (always present)
  listItems.push({
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Value Type",
      variant: "subtitle2",
    },
    value: {
      type: "Chip",
      label: input.value_type.replace(/_/g, " "),
      variant: "filled",
      color: valueTypeColors[input.value_type],
      size: "small",
    },
  });

  // Required flag
  listItems.push({
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Required",
      variant: "subtitle2",
    },
    value: {
      type: "Chip",
      label: input.required ? "Yes" : "No",
      variant: "outlined",
      color: input.required ? "error" : "gray",
      size: "small",
    },
  });

  // Default Value
  if (input.default_value !== undefined) {
    // default_value can be string, array of strings, or null
    let defaultValueComponent: IAutoView.IAutoViewComponentProps;
    if (Array.isArray(input.default_value)) {
      // show each default in a ChipGroup
      defaultValueComponent = {
        type: "ChipGroup",
        childrenProps: input.default_value.map((val) => ({
          type: "Chip" as const,
          label: val,
          size: "small",
          variant: "outlined",
          color: "gray",
        })),
      };
    } else if (input.default_value === null) {
      defaultValueComponent = {
        type: "Text",
        content: "None",
        variant: "body2",
      };
    } else {
      defaultValueComponent = {
        type: "Text",
        content: String(input.default_value),
        variant: "body2",
      };
    }

    listItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Default Value",
        variant: "subtitle2",
      },
      value: defaultValueComponent,
    });
  }

  // Allowed Values
  if (input.allowed_values && input.allowed_values.length > 0) {
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Allowed Values",
        variant: "subtitle2",
      },
      value: {
        type: "ChipGroup",
        // present up to 10 chips in a responsive wrap
        childrenProps: input.allowed_values.map((val) => ({
          type: "Chip" as const,
          label: val,
          size: "small",
          variant: "outlined",
          color: "primary",
        })),
      },
    });
  }

  // Editable By
  if (input.values_editable_by) {
    const humanLabel =
      input.values_editable_by === "org_actors"
        ? "Org Actors"
        : "Org & Repo Actors";
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Editable By",
        variant: "subtitle2",
      },
      value: {
        type: "Chip",
        label: humanLabel,
        size: "small",
        variant: "outlined",
        color: "info",
      },
    });
  }

  // Compose the VerticalCard layout
  const cardChildren: IAutoView.IAutoViewVerticalCardProps["childrenProps"] = [];

  // Header with title, optional description, and required badge
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.property_name,
    description: input.description ?? undefined,
    endElement: input.required
      ? {
          type: "Chip",
          label: "Required",
          variant: "filled",
          color: "error",
          size: "small",
        }
      : undefined,
  };
  cardChildren.push(header);

  // Content: a DataList of all fields
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [
      {
        type: "DataList",
        childrenProps: listItems,
      },
    ],
  };
  cardChildren.push(content);

  // Footer: a link button if `url` is provided
  if (input.url) {
    const footer: IAutoView.IAutoViewCardFooterProps = {
      type: "CardFooter",
      childrenProps: {
        type: "Button",
        label: "Manage Property",
        variant: "outlined",
        color: "primary",
        startElement: {
          type: "Icon",
          id: "link",
          size: 16,
        },
        href: input.url,
      },
    };
    cardChildren.push(footer);
  }

  // Return the final VerticalCard component descriptor
  return {
    type: "VerticalCard",
    childrenProps: cardChildren,
  };
}
