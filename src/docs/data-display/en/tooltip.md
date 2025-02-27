# Tooltip

A `Tooltip` is a brief text description that appears when a user hovers over or focuses on an element. It quickly conveys the function or meaning of an element, typically explaining the purpose of an `Icon` or `Button` in a concise manner.

## Usage Guidelines

- **Provide Concise Information:** A `Tooltip` should only contain brief text and should be used for supplementary information that does not significantly impact usability if left undisplayed.
- **Hover and Focus Trigger:** A `Tooltip` should appear when a user hovers over or focuses on an element. In mobile environments, `Tooltip` usage may be limited due to the nature of touch interactions.

### When Other Components Are More Suitable

Compared to the `Popover` component, which can contain various types of content (detailed descriptions, interactive elements, etc.), `Tooltip` is strictly for short, informative text.

- **For Detailed Information:** If extensive explanations or complex details are required, use the `Popover` component instead.
- **For Interactive Elements:** If buttons, input fields, or other interactive content must be included within the element, use `Popover` instead of `Tooltip`.

Additionally, for delivering important alerts or warnings that require immediate user attention, use a persistent component instead of `Tooltip`.

## Examples of Use

- Displays a `Tooltip` when hovering over an `IconButton` to explain its function.
- Provides the full name or description of an abbreviation when the user focuses on it.
- Positions a `Tooltip` next to an input field to give guidance on input formats or constraints.
