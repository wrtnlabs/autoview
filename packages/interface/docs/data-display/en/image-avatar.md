# ImageAvatar

The `ImageAvatar` component visually represents a user or an entity through a profile picture, helping with identification and recognition.

- Provides a visual representation of a user or entity for quick recognition and differentiation.
- Commonly used in profiles, chat lists, and user directories to represent individuals or groups.

## Usage Conditions

`ImageAvatar` should be used only when an actual image is available to display, such as a user’s profile picture or a company logo.

### When Not to Use

- When both the user's name and profile image are available, `ImageAvatar` should be prioritized.
- If an icon is needed to represent a specific function or action, use an `Icon` instead of `LetterAvatar`.
- In cases where space is limited or a visual element is unnecessary, displaying the user's name as text may be more appropriate.

## Examples of Use

- **Profile Page:** Centrally positioned in a user’s detailed profile to emphasize identity.
- **Chat List:** Displays an avatar in chat lists to help identify conversation partners.
- **Navigation Bar:** Positioned at the top-right of the navigation bar to indicate the logged-in user.

## Extensions

A `Badge` can be added to the left, right, top, or bottom of the avatar to provide additional information.

- **Status Indication:** Represents the user's online status. Example: Green (Online), Gray (Offline).
- **Notification Count:** Displays the number of unread notifications requiring attention.
