# Collapse

The `Collapse` component allows users to expand or collapse specific content within a page, enabling them to selectively view only the information they need. This helps reduce page complexity and optimizes space usage.

## Usage Guidelines

- **Default Collapsed State:** Content should be collapsed by default when the page loads, allowing users to expand it only when needed.
- **Trigger Elements:** Provide trigger elements such as buttons or links to enable users to expand or collapse content easily.
- **Multiple Sections Open:** Unlike an `Accordion`, multiple sections can be opened simultaneously in a `Collapse`.

### When Not to Use

- **Hiding Critical Information:** Do not use `Collapse` to hide essential information that users must see.
- **Nested Usage:** Avoid using multiple nested `Collapse` components, as this can confuse users.
- **Unnecessary Usage:** Wrapping all content in `Collapse` may negatively impact user experience. Use it appropriately based on the importance and priority of the information.

## Usage Examples

- **Providing Additional Explanations:** Wrap supplementary details or extra information in a `Collapse`, allowing users to view them only when necessary.
  - Example: *"Read More"*, *"View Details"*
- **Reducing Long Lists:** Use `Collapse` to shorten long lists or tables, displaying only a portion by default while allowing users to expand the full content.
  - Example: *"View Full List"*, *"Show More Items"*
- **Mobile Navigation Menus:** Implement `Collapse` for navigation menus on mobile websites to save screen space and let users expand menus only when needed.
  - Example: *"Open Menu"*, *"View Categories"*
