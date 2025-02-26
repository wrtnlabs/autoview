# Tag

The `Tag` component visually highlights content related to a specific category or expresses a status using short text.

## Purpose

- **Tag Management:** Used to display keywords or categories related to content.

## Usage Requirements

The `Tag` component can contain short text and numbers. It can also contain small visual elements such as `ImageAvatar`, `LetterAvatar`, or `Icon` to help users intuitively understand the tag content.

Additionally, `Tag` is useful for listing multiple items simultaneously. For example, when displaying multiple tags on a post or listing various features of a product, multiple `Tag` components can be grouped together to enhance clarity and organization.

### When Not to Use  

Avoid using the `Tag` component in the following situations:  

- **When Interaction is Required:** If users need to add or remove elements, use `Chip` instead.  
- **With Small Components:** `Tag` should not be used as a child of small-sized components like `ImageAvatar`, `LetterAvatar`, or `IconButton` due to space limitations.  
- **Containing `Chip` or Another `Tag`:** `Tag` should not include `Chip` or another `Tag` as a child, as these components are not designed to nest within each other.

## Examples of Use

- **Category Labels:** In an e-commerce website, `Tag` can be used to display product attributes such as "Coupon" or "Free Shipping," using different colors to enhance visual clarity.