# Collapse

The `Collapse` component allows users to expand or collapse specific content within a page, enabling them to selectively view only the necessary information. This helps reduce complexity and optimize space usage on the page.

## Usage Guidelines

- **Set Default State:** By default, content should be collapsed when the page loads, allowing users to expand it only when needed.
- **Provide a Trigger Element:** Buttons, links, or other trigger elements should be available for users to expand or collapse content.
- **Flexible Usage:** Collapse can be used to expand or collapse a single item or multiple sections at the same time. If necessary, it can be configured to allow only one section to be open at a time.
- **Clear Headers:** Each section header should clearly indicate the content it contains.

### When Not to Use

- **Hiding Important Information:** Do not place critical information inside a `Collapse` component if users must see it.
- **Nested Usage:** Avoid using multiple levels of nested `Collapse` components, as this can create confusion for users.
- **Unnecessary Usage:** Wrapping all information in `Collapse` elements can hinder user experience. Use them selectively based on the importance and priority of the content.

## Use Cases

- **Providing Additional Explanations:** Use `Collapse` to wrap supplementary explanations or extra information so that users can access it only when needed.
  - Example: "See More," "View Details."
- **Collapsing Long Lists:** Wrap long lists or tables in a `Collapse` component so that only a portion is displayed by default, with an option to expand for the full view.
  - Example: "View Full List," "See More Items."
- **Mobile Navigation Menus:** Implement `Collapse` for navigation menus on mobile websites to save screen space and allow users to expand menus as needed.
  - Example: "Open Menu," "View Categories."
- **FAQ Sections:** Use `Collapse` for frequently asked questions (FAQs), allowing users to click on a question to reveal the answer.
- **Product Details:** Structure product pages using `Collapse` to present specifications, reviews, and Q&A sections, enabling users to access relevant information selectively.
- **Settings Panels:** Organize application settings into `Collapse` sections so that users can expand only the settings they wish to modify.