# Chip

A `Chip` is an interactive component that supports input, selection, and filtering, helping users display and manage information or choices concisely.

- **Filter Selection:** Allows users to select or deselect various filter options.
- **Tag Management:** Enables users to add or remove tags or categories related to content.
- **Selection Display and Removal:** Visually represents selected items and allows users to remove them when needed.

## Usage Conditions

The `Chip` component can contain short text, numbers, or small visual elements such as `ImageAvatar`, `LetterAvatar`, or `Icon`. Additionally, an `Icon` can be included to help users intuitively understand the current selection state or available actions. However, while `Chip` can include `ImageAvatar`, `LetterAvatar`, or `Icon` as child elements, these components cannot have `Chip` as their child.

### When Not to Use a `Chip`

Although `Chip` can include `ImageAvatar`, `LetterAvatar`, or `Icon` as child elements, these components should not contain `Chip` as a child element. In such cases, using a `Badge` is more appropriate.

## Examples of Use

- **Filter Options:** In an e-commerce site, `Chip` components can be used for filter options like 'Price', 'Brand', and 'Color', allowing users to select their preferred conditions.
- **Selected Item Display:** When composing an email, selected recipients' names can be displayed as `Chip` elements, which users can remove by clicking.
