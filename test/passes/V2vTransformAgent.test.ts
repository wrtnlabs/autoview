import OpenAI from "openai";
import typia, { is } from "typia";

import { LlmFailure } from "../../src/core";
import { ComponentSelectionAgent } from "../../src/passes/component-selection-agent/ComponentSelectionAgent";
import { MainContentExtractionAgent } from "../../src/passes/main-content-extraction-agent/MainContentExtractionAgent";
import { V2vTransformAgent } from "../../src/passes/v2v-transform-agent/V2vTransformAgent";
import { IAutoViewAgentProvider } from "../../src/structures/agents/IAutoViewAgentProvider";
import { TestGlobal } from "../TestGlobal";

async function main(): Promise<void> {
  if (TestGlobal.env.CHATGPT_API_KEY === undefined)
    throw new Error("env.CHATGPT_API_KEY is not defined.");

  const provider: IAutoViewAgentProvider.IChatGpt = {
    type: "chatgpt",
    model: "gpt-4o-mini",
    api: new OpenAI({
      apiKey: TestGlobal.env.CHATGPT_API_KEY,
    }),
  };

  const mainContentExtractionAgent = new MainContentExtractionAgent();

  const result1 = await mainContentExtractionAgent.execute({
    provider,
    jsonResponse: `
{
  "function": {
    "path": "connector_slack_get_files_post",
    "method": "post"
  },
  "arguments": [
    {
      "channel": "C0654GRKQNM",
      "latestDateTime": "2024-10-16T10:31:47.492Z",
      "limit": 200,
      "oldestDateTime": "2024-10-13T00:00:00.000Z",
      "secretKey": "63bfd9cf-b377-49b4-9ecc-0fb3fc0942ed"
    }
  ],
  "success": true,
  "value": {
    "ok": true,
    "files": [
      {
        "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07SBPQREAU/mockups.png",
        "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07SBPQREAU/download/mockups.png",
        "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07SBPQREAU-02c218b539/mockups_1024.png",
        "name": "Mockups.png",
        "id": "F07SBPQREAU",
        "user": "U060JBN3PGX",
        "size": 933559,
        "channels": [
          "C0654GRKQNM"
        ],
        "comments_count": 0,
        "created": 1728857835,
        "mimetype": "image/png"
      },
      {
        "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RLA68XGV/image.png",
        "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RLA68XGV/download/image.png",
        "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07RLA68XGV-7ba430e150/image_1024.png",
        "name": "image.png",
        "id": "F07RLA68XGV",
        "user": "U0769CNJVLL",
        "size": 1351407,
        "channels": [
          "C0654GRKQNM"
        ],
        "comments_count": 0,
        "created": 1728865958,
        "mimetype": "image/png"
      },
      {
        "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RP3BTBMZ/image.png",
        "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RP3BTBMZ/download/image.png",
        "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07RP3BTBMZ-b3f01a2f8f/image_1024.png",
        "name": "image.png",
        "id": "F07RP3BTBMZ",
        "user": "U0769CNJVLL",
        "size": 1327518,
        "channels": [
          "C0654GRKQNM"
        ],
        "comments_count": 0,
        "created": 1728865967,
        "mimetype": "image/png"
      },
      {
        "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07SC00310Q/image.png",
        "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07SC00310Q/download/image.png",
        "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07SC00310Q-005e912be6/image_1024.png",
        "name": "image.png",
        "id": "F07SC00310Q",
        "user": "U0769CNJVLL",
        "size": 1410819,
        "channels": [
          "C0654GRKQNM"
        ],
        "comments_count": 0,
        "created": 1728865998,
        "mimetype": "image/png"
      },
      {
        "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RP61MCHG/image.png",
        "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RP61MCHG/download/image.png",
        "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07RP61MCHG-19e338ab2d/image_1024.png",
        "name": "image.png",
        "id": "F07RP61MCHG",
        "user": "U0769CNJVLL",
        "size": 1370028,
        "channels": [
          "C0654GRKQNM"
        ],
        "comments_count": 0,
        "created": 1728866008,
        "mimetype": "image/png"
      },
      {
        "url_private": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07RLU40D1B-e506dd18f1/________________________________2024-10-14______________2.38.45.mp4",
        "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RLU40D1B/download/________________________________2024-10-14______________2.38.45.mov",
        "name": "화면 기록 2024-10-14 오후 2.38.45.mov",
        "id": "F07RLU40D1B",
        "user": "U04JTP7U1JS",
        "size": 15396803,
        "channels": [
          "C0654GRKQNM"
        ],
        "comments_count": 0,
        "created": 1728884368,
        "mimetype": "video/quicktime"
      },
      {
        "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07R8KG95ST/image.png",
        "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07R8KG95ST/download/image.png",
        "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07R8KG95ST-65edb15839/image_1024.png",
        "name": "image.png",
        "id": "F07R8KG95ST",
        "user": "U0769CNJVLL",
        "size": 1313006,
        "channels": [
          "C0654GRKQNM"
        ],
        "comments_count": 0,
        "created": 1728866108,
        "mimetype": "image/png"
      }
    ]
  }
}
`,
  });

  console.log("result1.jsonPath", result1.jsonPath);

  const componentSelectionAgent = new ComponentSelectionAgent();

  const result2 = await componentSelectionAgent.execute({
    provider,
    mainContent: result1.mainContent,
    components: [
      {
        name: "ImageViewer",
        description:
          "Renders a single image with an optional caption, optimal for highlighting individual visual content",
      },
      {
        name: "Carousel",
        description:
          "Displays a slideshow of multiple images or cards, excellent for galleries or sequential presentations",
      },
      {
        name: "DetailCard",
        description:
          "Presents a card layout with an image, title, and additional text, ideal for detailed summaries of complex items",
      },
      {
        name: "TextBlock",
        description:
          "Displays plain text content, well-suited for narrative or descriptive information",
      },
      {
        name: "BarChart",
        description:
          "Visualizes data as vertical or horizontal bars, ideal for comparing numerical values across categories or time periods",
      },
      {
        name: "PieChart",
        description:
          "Presents data as a circular chart with slices, perfect for illustrating proportions or percentages",
      },
    ],
  });

  console.log("result2", result2);

  const v2vTransformAgent = new V2vTransformAgent();
  interface ImageViewerInput {
    url: string;
    nameOrDescription: string;
  }

  const schema = typia.llm.schema<ImageViewerInput, "chatgpt">({});
  const result3 = await v2vTransformAgent.execute({
    provider,
    content: result1.mainContent,
    componentSchema: schema,
    componentValueValidator: (value) => {
      if (is<ImageViewerInput>(value)) {
        return;
      }

      throw new LlmFailure(
        "your response is not valid; please try again with the correct format, carefully following the given JSON Schema",
      );
    },
  });

  console.log("result3", result3);
}

main().catch(console.error);
