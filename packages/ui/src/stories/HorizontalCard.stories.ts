import type { Meta, StoryObj } from "@storybook/react";

import { HorizontalCard } from "../components/card/HorizontalCard";

const meta = {
  title: "HorizontalCard",
  component: HorizontalCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    type: "HorizontalCard",
  },
} satisfies Meta<typeof HorizontalCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    childrenProps: [
      {
        type: "CardMedia",
        src: "https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/cards/projects/174125798219240480.png?w=3840&h=1352&c=c",
      },
      {
        type: "CardContent",
        childrenProps: [
          {
            type: "Avatar",
            src: "https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/users/profile_images/167419639066373554.jpeg?w=512&h=512&c=c",
            name: "유집이",
          },
          {
            type: "Text",
            variant: "subtitle2",
            content: "오늘의집 3D 프로그램 100% 재현한 24평 신혼집",
          },
          {
            type: "Text",
            variant: "body2",
            content:
              "안녕하세요. 오늘의집과 인스타그램, 유튜브에서 활발히 활동 중인 유씨네 집 이야기의 유집이입니다. 지난 2022년 11월 책상 인테리어라는 주제를 시작으로 성장과 삶의 소소한 이야기, 공간의 긍정적인 요소들을 2년 넘도록 꾸준히",
            color: "#777",
            lineClamp: 3,
          },
        ],
      },
    ],
  },
};
