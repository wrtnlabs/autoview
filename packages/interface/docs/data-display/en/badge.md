# Badge

The `Badge` component overlays UI elements to display numerical values or indicate specific statuses. This component is used in the following two cases:

- **Displaying numerical values**: Used to convey numeric information such as the number of unread notifications or items in a shopping cart.
- **Dot for status indication**: Used as a small dot to highlight new content or indicate a specific status (e.g., online status).

The Badge component is **not** intended for displaying short text. It **only** supports numerical values or dots for status indication.

## Usage Guidelines

The `Badge` component is never used independently; it is always a child component of another component, providing supplementary information in a concise manner.

- **Placement:** Typically positioned at the top-right corner of the parent component. However, placement may vary based on design requirements.
- **Content:**
  - **Numerical values:** Displays numeric information such as unread notifications or the number of items in a cart. Generally, one- or two-digit numbers are displayed, and for numbers over 100, it is recommended to show `'99+'`.
  - **Dot for status indication:** Used as a small dot to highlight new content or indicate a specific status (e.g., online status).

### When Not to Use

- **When interaction is required:** If the user needs to select or remove an element, such as a tag or filter, the `Badge` component should not be used, as it does not support interactions. In such cases, the `Chip` component is more appropriate.
- **When text is needed:** Since `Badge` is not designed for displaying text other than numbers, using `Chip` is recommended for better readability.

## Examples of Use

- **Indicating online status:** Represents a user's online status. Example: Green (online), Gray (offline).
- **Notification icon:** Placed at the top-right corner of an email icon to indicate the number of unread messages. Example: `1`, `77`, `'99+'`.