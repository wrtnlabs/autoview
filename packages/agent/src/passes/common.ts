/**
 * Represents a single visual component.
 *
 * It accepts an value that matches the {@link componentSchema} and displays it.
 */
export interface IComponent {
  name: string;
  description: string;
  componentSchema: Record<string, unknown>;
}
