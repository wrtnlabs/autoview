# LetterAvatar

The `LetterAvatar` component visually represents a user or an entity using initials, enabling easy identification of individuals or groups.

- Effectively conveys the identity of a user or entity for quick recognition and differentiation.
- Used as a placeholder when a profile image is unavailable, commonly appearing in profiles, chat lists, and user directories.

## Usage Conditions

A user's name or nickname must be provided, as the initials are generated based on this information. If no name is available, a default user icon will be displayed instead.

### Initials Examples

- 김철수 → 김 or 김철  
- 佐藤 愛子 → 佐 or 佐愛  
- 李浩然 → 李 or 李浩  
- Heinrich Müller → H or HM  
- María Federica García → M or MG  
- Jean LeBlanc → J or JL  

### When Not to Use

- If both a user’s name and profile image are available, `ImageAvatar` should be used instead.
- If an icon is needed to represent a specific function or action, use an `Icon` instead of `LetterAvatar`.
- In cases where space is limited or a visual element is unnecessary, displaying the user’s name as text may be more appropriate.

## Examples of Use

- **Profile Page:** Positioned centrally in a user's detailed profile to emphasize identity.
- **Chat List:** Displays an avatar in chat lists to help identify conversation partners.
- **Navigation Bar:** Positioned at the top-right of the navigation bar to indicate the logged-in user.

## Extensions

A `Badge` can be added to the left, right, top, or bottom of the avatar to provide additional information.

- **Status Indication:** Represents the user's online status. Example: Green (Online), Gray (Offline).
- **Notification Count:** Displays the number of unread notifications requiring attention.
