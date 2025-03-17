import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "../components/icon";

const meta = {
  title: "Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    type: "Icon",
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    id: "home",
  },
};

export const Youtube: Story = {
  args: {
    id: "arrow-down-a-z",
  },
};

export const Facebook: Story = {
  args: {
    id: "facebook-square",
  },
};
