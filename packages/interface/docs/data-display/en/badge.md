# Badge

A `Badge` is a small visual element that provides additional information or indicates a status for another component. It is primarily used to display notification counts, status indicators, or classifications, helping to draw the user's attention to a specific element.

- **Concise Information Delivery:** It effectively conveys visual information using short text, numbers, or colors.

## Usage Guidelines

A `Badge` should never be used alone; it must always serve as a child component of another element, providing supplementary information in a compact manner.

- **Placement:** Typically, a `Badge` is positioned at the corner of its parent component, most commonly in the top-right corner. However, placement may vary depending on the design and type of parent component.
- **Content:** A `Badge` conveys information concisely through short text, numbers, or colors. Text should be limited to a maximum of four alphabetic characters. If a number exceeds 1,000, it should be displayed as '999+'.

### When Not to Use a `Badge`

- **When user interaction is required:** Since `Badge` does not support interaction, components like `Chip` should be used for selectable or removable elements such as tags or filters.
- **When displaying more than two words:** A `Badge` is optimized for short and concise information. Displaying lengthy text may reduce readability. In such cases, consider using a `Chip` instead.
- **When multiple statuses need to be displayed simultaneously:** Attaching multiple `Badge` components to a single element can complicate the design. For example, if an item needs to indicate both "NEW" and "SALE" statuses, using separate `Chip` components improves readability and usability.

## Examples of Use

- **Online status indication:** Represents a user’s online status.
  - Example: Green (online), Gray (offline).
- **Notification icon:** Displays the number of unread messages in the top-right corner of an email icon.
  - Example: '1', '999+'.
- **Product status display:** Indicates the status of items in an online store.
  - Example: 'SALE', 'Low Stock'.
- **Category labeling:** Represents the category or group a content item belongs to.
  - Example: 'Women's Clothing', 'Audio Equipment'.
