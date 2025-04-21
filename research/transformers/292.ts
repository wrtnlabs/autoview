import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type SELECT_MORE_THAN_ONE_IMAGE = any;
    export type ResponseForm_lt_Array_lt_string_gt__gt_ = any;
}
type IAutoViewTransformerInputType = any | any;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Handle arrays
  if (Array.isArray(input)) {
    // If array of image URLs, render a carousel of cards with images
    if ((input as any[]).every(item => typeof item === 'string' && item.startsWith('http'))) {
      const childrenProps = (input as string[]).map(url => ({
        type: 'HorizontalCard',
        childrenProps: { type: 'CardMedia', src: url }
      } as IAutoView.IAutoViewHorizontalCardProps));
      return {
        type: 'Carousel',
        childrenProps
      } as IAutoView.IAutoViewCarouselProps;
    }

    // Fallback: list each element in a DataList
    const childrenProps = (input as any[]).map((item, idx) => ({
      type: 'DataListItem',
      label: [{ type: 'Text', content: [`Item ${idx}`] }],
      value: visualizeData(item)
    } as IAutoView.IAutoViewDataListItemProps));
    return {
      type: 'DataList',
      childrenProps
    } as IAutoView.IAutoViewDataListProps;
  }

  // Handle objects (excluding null)
  if (input !== null && typeof input === 'object') {
    const childrenProps: IAutoView.IAutoViewDataListItemProps[] = [];
    for (const key of Object.keys(input)) {
      const value = (input as any)[key];
      // Label component for the key
      const label: IAutoView.IAutoViewPresentationComponentProps[] = [
        { type: 'Text', content: [key] }
      ];
      // Determine how to visualize the corresponding value
      let valueComp: IAutoView.IAutoViewComponentProps;

      if (typeof value === 'string') {
        if (value.startsWith('http')) {
          // URL string -> Image
          valueComp = { type: 'Image', src: value };
        } else if (value.length > 100) {
          // Long text -> Markdown (better wrapping)
          valueComp = { type: 'Markdown', content: value };
        } else {
          // Short text -> Text
          valueComp = { type: 'Text', content: [value] };
        }
      } else if (typeof value === 'number') {
        // Numeric value -> Chip
        valueComp = { type: 'Chip', label: String(value) };
      } else if (typeof value === 'boolean') {
        // Boolean -> Icon (check or times)
        valueComp = {
          type: 'Icon',
          id: value ? 'check' : 'times',
          color: value ? 'green' : 'red'
        };
      } else {
        // Nested structure -> collapsible section
        valueComp = {
          type: 'Collapse',
          header: {
            type: 'CollapseHeader',
            childrenProps: [{ type: 'Text', content: [`${key} details`] }]
          },
          content: {
            type: 'CollapseContent',
            // Recursively visualize nested data
            childrenProps: [
              visualizeData(value) as IAutoView.IAutoViewPresentationComponentProps
            ]
          }
        } as IAutoView.IAutoViewCollapseProps;
      }

      childrenProps.push({
        type: 'DataListItem',
        label,
        value: valueComp as any
      } as IAutoView.IAutoViewDataListItemProps);
    }

    // Render the object's key/value pairs as a DataList
    return {
      type: 'DataList',
      childrenProps
    } as IAutoView.IAutoViewDataListProps;
  }

  // Fallback for primitives (null, undefined, symbol, etc.)
  const text = input == null ? 'N/A' : String(input);
  return {
    type: 'Text',
    content: [text]
  } as IAutoView.IAutoViewTextProps;
}
