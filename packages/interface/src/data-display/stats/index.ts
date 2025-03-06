import { IAutoViewComponentProps } from "../../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../../properties/IAutoViewComponentPropsBase";

/**
 * Props for the `AutoViewStats` component.
 *
 * The `AutoViewStats` component highlights key numerical data in a dashboard-style format,
 * providing users with an at-a-glance overview of important metrics.
 *
 * Common use cases:
 * - **Highlighting Key Metrics:** Displays essential statistics such as revenue, user growth, or system health.
 * - **Summarizing Data:** Presents important figures extracted from larger datasets for quick insights.
 * - **Tracking Changes and Comparisons:** Shows real-time updates, goal achievements, or fluctuations over time.
 */
export interface IAutoViewStatsProps
  extends IAutoViewComponentPropsBase<"Stats"> {
  /**
   * The title of the statistic.
   * - Provides context for the displayed number.
   * - Should be concise and clearly describe the metric.
   *
   * Example:
   * ```tsx
   * <AutoViewStats title="Total Sales" value="1,245" />
   * ```
   */
  title: string;

  /**
   * The primary numerical value displayed in the stats component.
   * - Can be formatted as a string to support custom number formatting.
   * - Represents the key metric being highlighted.
   */
  value: string;

  /**
   * The number of decimal places to display.
   * - Used to ensure consistency in numerical formatting.
   * - If not provided, the value is displayed as-is.
   *
   * Example:
   * - `precision = 2` → `12.34`
   * - `precision = 0` → `12`
   */
  precision?: number;

  /**
   * A React element displayed **before** the numerical value.
   * - Commonly used for currency symbols (`$`, `€`), units, or icons.
   *
   * Example:
   * ```tsx
   * <AutoViewStats valuePrefix="$" value="1,245" />
   * ```
   */
  valuePrefix?: IAutoViewComponentProps;

  /**
   * A React element displayed **after** the numerical value.
   * - Typically used for units (`kg`, `%`, `kWh`) or additional indicators.
   *
   * Example:
   * ```tsx
   * <AutoViewStats value="75" valueSuffix="%" />
   * ```
   */
  valueSuffix?: IAutoViewComponentProps;
}

/**
 * Namespace for additional stats-related properties.
 */
export namespace IAutoViewStats {
  /**
   * Defines the color of the stats component.
   * - Used to visually distinguish different types of data.
   * - Accepts any valid CSS color string (e.g., `"#FF0000"`, `"green"`, `"rgba(255, 0, 0, 1)"`).
   */
  export type IColors = string;

  /**
   * Represents predefined status types for the stats component.
   * - Used to categorize or visually indicate different metric types.
   *
   * Available statuses:
   * - `"error"`: Represents a negative or critical status.
   * - `"info"`: Provides general informational data.
   * - `"success"`: Indicates a positive outcome or achievement.
   * - `"warning"`: Highlights a potential issue or cautionary metric.
   */
  export type IStatus = "error" | "info" | "success" | "warning";

  /**
   * Interface for extended stats configurations.
   */
  export interface IExtended {
    /**
     * The color of the stats component.
     * - Accepts any valid CSS color string.
     */
    color: IColors;

    /**
     * The status type of the stats component.
     * - Helps categorize and visually differentiate the displayed data.
     */
    status: IStatus;

    /**
     * The size of the stats component.
     * - Can be specified as a string (`"small"`, `"medium"`, `"large"`) or a numerical pixel value (`12`, `16`, `24`).
     */
    size: string | number;
  }
}
