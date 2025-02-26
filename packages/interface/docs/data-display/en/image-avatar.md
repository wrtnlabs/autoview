# ImageAvatar

The `ImageAvatar` component visually represents a user or entity, helping to identify individuals or groups through profile images.

## Purpose

- Provides a visual representation of a user or entity for quick recognition and differentiation.  
- Serves as a profile image in user lists, chat lists, or other areas where identity representation is required.

## Usage Requirements

An image must be available when displaying a user's actual photo or a logo.

### When Not to Use

- If both the user's name and profile image are provided, `ImageAvatar` should take precedence.  
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