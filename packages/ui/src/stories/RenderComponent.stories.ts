import type { Meta, StoryObj } from "@storybook/react";

import { renderComponent } from "../renderer";
import collapse from "./fixtures/collapse.json";
import imageCarousel from "./fixtures/image-carousel.json";
import productCard from "./fixtures/product-card.json";

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
  args: (imageCarousel as Parameters<typeof renderComponent>[0]) ?? {},
};

export const ProductCard: Story = {
  args: (productCard as Parameters<typeof renderComponent>[0]) ?? {},
};

export const Collapse: Story = {
  args: (collapse as Parameters<typeof renderComponent>[0]) ?? {},
};
