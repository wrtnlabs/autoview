# Stats

The `Stats` component highlights key numerical data in an overview (dashboard) to provide users with essential insights at a glance. This allows users to quickly grasp the current status and proceed with further analysis if needed.

- **Highlighting Key Metrics:** Emphasizes the most critical statistics of a business or system for immediate reference.
- **Summarizing Data:** Extracts and presents only the most relevant figures from complex datasets for quick understanding.
- **Tracking Changes and Comparisons:** Visually represents changes over time, goal achievement rates, and real-time fluctuations.

## Usage Guidelines

When using `Stats`, follow these best practices:

1. **Provide Clear Labels:** Each metric should have a clear and intuitive label that accurately represents its meaning.
2. **Maintain Consistent Formatting:** Ensure uniformity in number formatting, decimal places, and units for readability.
3. **Optimize Visual Emphasis:** Use size, color, and icons to highlight important data while avoiding excessive decorative elements.
4. **Group Related Data:** Organize statistics within the same category into a single `Stats` group for better context.
5. **Reflect Real-Time Updates:** If data is dynamic, ensure that `Stats` updates in real time to provide the latest information.
6. **Minimize Unnecessary Data:** Since dashboards prioritize fast information delivery, avoid including excessive numbers or unnecessary details.

### When Other Components Are More Suitable

To prevent the misuse of `Stats`, consider using other components in the following scenarios:

- **For Complex Data Visualization:** If trends and fluctuations need to be emphasized, use the `Chart` component instead.
- **For Detailed Data Exploration:** If extensive information needs to be presented, use a `Table`, and if specific numerical values require further explanation, use a `Popover`.

## Examples of Use

- **Dashboard Overview:** Displays key metrics such as total users, daily visitors, and new signups.
- **E-commerce KPIs:** Summarizes total revenue, monthly sales growth rate, and refund rate.
- **Project Management Status:** Visualizes completed tasks, ongoing tasks, and on-time completion rates.
- **Server Monitoring:** Provides real-time insights into CPU usage, memory consumption, and active sessions to diagnose system performance quickly.
