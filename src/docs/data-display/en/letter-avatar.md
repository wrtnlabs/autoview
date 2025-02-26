# LetterAvatar

The `LetterAvatar` component visually represents a user or entity by utilizing initials, allowing for quick identification of individuals or groups.

## Purpose

- Effectively displays a user’s or entity’s identity for easy recognition and differentiation.  
- Serves as a placeholder in profiles, chat lists, and user directories when an image is unavailable.

## Usage Requirements

A user's name or nickname must be provided, as initials are generated based on this information. If the name is unavailable, a default user icon is displayed instead.

### Initials Examples

- 김철수 → 김 or 김철  
- 佐藤 愛子 → 佐 or 佐愛  
- 李浩然 → 李 or 李浩  
- Heinrich Müller → H or HM  
- María Federica García → M or MG  
- Jean LeBlanc → J or JL  

### When Not to Use

- If both the user's name and profile image are available, `ImageAvatar` should be used instead.  
- When representing a specific function or action, using an `Icon` instead of `LetterAvatar` is more appropriate.  
- If space is limited or visual elements are unnecessary, displaying the name as text is a better option.

## Examples of Use

- **Profile Page:** Positioned centrally on the user detail page to highlight individual identity.  
- **Chat List:** Displays avatars in the chat list to help users recognize contacts.  
- **Navigation Bar:** Placed on the right side of the top navigation bar to indicate the logged-in user.

## Additional Applications

A `Badge` can be added to the left, right, top, or bottom of the avatar to provide additional information.

- **Status Indicator:** Represents the user's online status. Example: Green (Online), Gray (Offline).  
- **Notification Indicator:** Displays the number of pending notifications requiring attention.