import type { Meta, StoryObj } from "@storybook/react";

import { HorizontalCard } from "./component";

const meta = {
  title: "HorizontalCard",
  component: HorizontalCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HorizontalCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: {
      width: 500,
    },
  },
};
