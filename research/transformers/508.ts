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
  // Map source_type to a color for the icon
  const sourceColorMap: Record<string, IAutoView.IAutoViewIconProps['color']> = {
    organization: 'teal',
    enterprise: 'violet',
  };
  const sourceColor = input.source_type
    ? sourceColorMap[input.source_type] || 'gray'
    : 'gray';

  // Map value_type to a color for the chip
  const valueTypeColorMap: Record<string, IAutoView.IAutoViewChipProps['color']> = {
    string: 'blue',
    single_select: 'orange',
    multi_select: 'cyan',
    true_false: 'green',
  };
  const valueTypeColor =
    valueTypeColorMap[input.value_type] || ('gray' as any);

  // Build a list of DataListItemProps for each field
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1. API URL (if provided) as a button with link icon
  if (input.url) {
    items.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'API URL', variant: 'subtitle2' },
      value: {
        type: 'Button',
        variant: 'text',
        label: 'Open',
        startElement: {
          type: 'Icon',
          id: 'link',
          size: 16,
        },
        href: input.url,
      },
    });
  }

  // 2. Source Type
  if (input.source_type) {
    items.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'Source Type', variant: 'subtitle2' },
      value: {
        type: 'Chip',
        label: input.source_type,
        size: 'small',
        variant: 'filled',
        color: sourceColor as any,
      },
    });
  }

  // 3. Required flag
  items.push({
    type: 'DataListItem',
    label: { type: 'Text', content: 'Required', variant: 'subtitle2' },
    value: {
      type: 'Chip',
      label: input.required ? 'Yes' : 'No',
      size: 'small',
      variant: 'filled',
      color: input.required ? 'success' : 'error',
    },
  });

  // 4. Default Value
  {
    const def = input.default_value;
    let valueComponent:
      | IAutoView.IAutoViewTextProps
      | IAutoView.IAutoViewChipGroupProps;

    if (Array.isArray(def)) {
      // If array, show as a group of chips
      valueComponent = {
        type: 'ChipGroup',
        childrenProps: def.map((v) => ({
          type: 'Chip',
          label: v,
          size: 'small',
          variant: 'outlined',
        })),
        maxItems: 5,
      };
    } else {
      // Single string or null
      valueComponent = {
        type: 'Text',
        content: def === null || def === undefined ? 'None' : String(def),
        variant: 'body2',
      };
    }

    items.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'Default Value', variant: 'subtitle2' },
      value: valueComponent,
    });
  }

  // 5. Allowed Values
  if (input.allowed_values && input.allowed_values.length > 0) {
    items.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'Allowed Values', variant: 'subtitle2' },
      value: {
        type: 'ChipGroup',
        childrenProps: input.allowed_values.map((v) => ({
          type: 'Chip',
          label: v,
          size: 'small',
          variant: 'outlined',
        })),
        maxItems: 8,
      },
    });
  }

  // 6. Who can edit
  if (input.values_editable_by) {
    items.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'Editable By', variant: 'subtitle2' },
      value: {
        type: 'Chip',
        label: input.values_editable_by,
        size: 'small',
        variant: 'filled',
        color: 'primary',
      },
    });
  }

  // 7. Description: show as markdown for rich content
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (input.description) {
    contentChildren.push({
      type: 'Markdown',
      content: input.description,
    });
  }

  // Always include our data list of fields
  contentChildren.push({
    type: 'DataList',
    childrenProps: items,
  });

  // Compose the final VerticalCard UI
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: 'VerticalCard',
    childrenProps: [
      {
        // Header with icon and property name, and a chip showing type
        type: 'CardHeader',
        title: input.property_name,
        startElement: {
          type: 'Icon',
          id: 'tag',
          color: sourceColor,
          size: 24,
        },
        endElement: {
          type: 'Chip',
          label: input.value_type,
          size: 'small',
          variant: 'filled',
          color: valueTypeColor,
        },
      },
      {
        // Content containing description (if any) and the details list
        type: 'CardContent',
        childrenProps: contentChildren,
      },
    ],
  };

  return card;
}
