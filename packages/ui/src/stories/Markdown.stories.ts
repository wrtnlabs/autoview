import type { Meta, StoryObj } from "@storybook/react";

import { Markdown } from "../components/markdown";

export default {
  title: "Markdown",
  component: Markdown,
} as Meta<typeof Markdown>;

export const Index: StoryObj<typeof Markdown> = {
  args: {
    content:
      "# Markdown Test\n" +
      "---\n" +
      "# Heading1\n" +
      "## Heading2\n" +
      "### Heading3\n" +
      "#### Heading4\n" +
      "##### Heading5\n" +
      "###### Heading6\n" +
      "---\n" +
      "# Text\n" +
      "Basic Text\n\n" +
      "**Bold**\n\n" +
      "_Italic_\n\n" +
      "~Strike Though~\n\n" +
      "> Quote\n\n" +
      "[Link](https://wrtn.ai/)\n\n" +
      "---\n" +
      "# List\n" +
      "- Bullet List1\n" +
      "- Bullet List2\n" +
      "- Bullet List3\n\n" +
      "1. Numbered List1\n" +
      "2. Numbered List2\n" +
      "3. Numbered List3\n" +
      "---\n" +
      "# Code\n" +
      "### Inline Code\n" +
      "`inline code`\n" +
      "### Default Code\n" +
      "```javascript\n" +
      "const numbers = Array(10).fill().map((_, index) => index + 1);\n" +
      "console.log(numbers);\n" +
      "```\n" +
      "---\n" +
      "# Table\n" +
      "| Dessert (100g serving) | Calories |" +
      "\n" +
      "| --- | --- |" +
      "\n" +
      "| Frozen yogurt | 159 |" +
      "\n" +
      "| Ice cream sandwich	 | 237 |" +
      "\n" +
      "| Eclair | 262 |" +
      "\n" +
      "\n" +
      "---\n" +
      "# Image \n" +
      "![Markdown Logo](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp9LnZ1FTSu84cFzORE4amLGI_-H1xa1HLZg&s)\n\n" +
      "---\n",
  },
};
