# Badge

The `Badge` component is a small visual element that provides additional information or indicates status within another component. It is primarily used to display notification counts, status indicators, or classifications and helps draw user attention to specific elements.

## Purpose

- **Concise Information Delivery:** Effectively conveys visual information using short text, numbers, or colors.

## Usage Rules

`Badge` is never used independently; it always serves as a child component to provide supplementary information.

- **Positioning:** Typically placed at the top-right corner of the parent component but can be adjusted depending on the component type and design.  
- **Size & Shape:** Can be circular, rectangular, or other forms depending on the importance of the information and design requirements.  
- **Content:** Should contain short text, numbers, or colors for concise information delivery. For text, a maximum of 4 characters (in alphabetic scripts) is recommended. If a number exceeds 1,000, it should be displayed as `'999+'`.  

### When Not to Use

- **For Interactive Elements:** Since `Badge` does not support user interaction (e.g., selection or removal), use the `Chip` component for interactive filters or tags.  
- **For Long Text:** `Badge` is optimized for brief information. If more than two words are needed, use `Chip` instead to maintain readability.  
- **For Multiple Status Indicators:** Using multiple `Badge` components on a single element can clutter the design. For example, if a product needs both "NEW" and "SALE" labels, using `Chip` instead can improve readability and usability.

## Examples of Use

- **Online Status Indicator:** Displays a user’s online presence. Example: Green (Online), Gray (Offline).  
- **Notification Icon:** Shows the number of unread messages by placing a `Badge` at the top-right of a mail icon. Example: `'1'`, `'999+'`.  
- **Product Status Label:** Indicates the current state of an item in an e-commerce store. Example: `'SALE'`, `'Limited Stock'`.  
- **Category Tagging:** Represents the category or group a piece of content belongs to. Example: `'Women's Clothing'`, `'Audio Devices'`.