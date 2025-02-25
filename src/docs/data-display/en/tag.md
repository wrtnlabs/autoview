# Tag

The `Tag` component visually highlights specific categories or concisely represents statuses using short text.

- **Tag Management:** Used to display keywords or categories related to content.

## Usage Guidelines

A `Tag` can contain short text, numbers, or small visual elements such as `ImageAvatar`, `LetterAvatar`, or `Icon`. Additionally, an `Icon` can be included to help users intuitively understand the current selection state. While `Tag` can include `ImageAvatar`, `LetterAvatar`, and `Icon` as child elements, these components cannot have `Tag` as a child.

Furthermore, `Tag` is useful for listing multiple items together. For example, it can display multiple tags for a post or list various product attributes, making grouped information more easily recognizable.

### When Not to Use

Avoid using `Tag` in the following situations:

- **When user interaction is required:** If the element needs to be added, removed, or interacted with, use a `Chip` instead.
- **When used with small components:** `Tag` is not suitable as a child element of compact components such as `ImageAvatar`, `LetterAvatar`, or `IconButton`. In these cases, `Badge` is more appropriate. In summary, `Tag` can include `ImageAvatar`, `LetterAvatar`, and `Icon` as child elements, but the reverse is not applicable.

## Examples of Use

- **Category Labels:** In e-commerce sites, `Tag` components with different colors can be used to visually highlight product attributes such as "Coupon" or "Free Shipping."
