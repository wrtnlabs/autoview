/**
 * Represents a single visual component.
 *
 * It accepts an value that matches the {@link componentSchema} and displays it.
 *
 * It holds {@link valueValidator} to validate the value. The caller must ensure that the validator is correctly implemented against the {@link componentSchema}.
 */
export interface IComponent {
  name: string;
  description: string;
  componentSchema: Record<string, unknown>;
  /**
   * Validate the value of the component. It must throw an error of type {@link TypeGuardError} if the value is invalid.
   *
   * @param value - The value of the component.
   */
  valueValidator(value: unknown): void;
}
