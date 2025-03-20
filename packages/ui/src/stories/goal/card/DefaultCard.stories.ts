import type { Meta, StoryObj } from "@storybook/react";

import { DefaultCard } from "./component";

const meta = {
  title: "DefaultCard",
  component: DefaultCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DefaultCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: {
      width: 300,
    },
  },
};
