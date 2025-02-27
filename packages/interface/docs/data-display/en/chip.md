# Chip

The `Chip` component provides interactive elements for input, selection, and filtering, helping users display and manage information or choices concisely.

## Purpose

`Chip` is designed to support user interaction and is commonly used in the following scenarios:

- **Filter Selection:** Enables users to select or deselect various filter options.  
- **Tag Management:** Allows users to add or remove tags or categories related to content.  
- **Displaying and Removing Selections:** Visually represents selected items and provides an option to remove them when necessary.  

## Usage Requirements

The `Chip` component can contain short text, numbers, or small visual elements such as `ImageAvatar`, `LetterAvatar`, or `Icon`. Additionally, `Icon` can be used to help users intuitively understand the current selection status or available actions. However, while `Chip` can include these components as children, components like `ImageAvatar`, `LetterAvatar`, and `Icon` should not use `Chip` as a child element.

### When Not to Use  

Avoid using the `Chip` component in the following situations:  

- **With Small Components:** `Chip` should not be used as a child of small-sized components like `ImageAvatar`, `LetterAvatar`, or `IconButton` due to space limitations.  
- **Containing `Chip` or Another `Tag`:** `Chip` should not include `Tag` or another `Chip` as a child, as these components are not designed to nest within each other.

## Examples of Use

- **Filter Options:** In an e-commerce website, `Chip` can be used to display filter options such as "Price," "Brand," and "Color," allowing users to refine their search criteria.  
- **Displaying Selected Items:** In an email composition screen, selected recipients' names can be displayed as `Chip` elements, which users can click to remove if needed.