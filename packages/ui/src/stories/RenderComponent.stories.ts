import type { Meta, StoryObj } from "@storybook/react";

import { renderComponent } from "../renderer";
import imageCarousel from "./fixtures/image-carousel.json";

const meta = {
  title: "RenderComponent",
  component: renderComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof renderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Carousel: Story = {
  args: imageCarousel as Parameters<typeof renderComponent>[0],
};
