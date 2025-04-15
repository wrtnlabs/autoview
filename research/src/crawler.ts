import { HttpLlm, IHttpLlmFunction } from "@samchon/openapi";

export interface CrawledOpenApi {
  url: string;
  functions: IHttpLlmFunction<"3.1">[];
}

export async function crawlOpenApi(
  ...urls: string[]
): Promise<CrawledOpenApi[]> {
  const results = await Promise.all(urls.map(crawlOpenApiFromUrl));
  return results.filter((result): result is CrawledOpenApi => result !== null);
}

async function crawlOpenApiFromUrl(
  url: string,
): Promise<CrawledOpenApi | null> {
  const res = await fetch(url);
  const document = await res.json();

  try {
    const application = HttpLlm.application({
      model: "3.1",
      document,
      options: {
        reference: true,
      },
    });

    return {
      url,
      functions: application.functions,
    };
  } catch (error: unknown) {
    console.warn(
      `the url "${url}" does not have valid openapi schema:\n${error}`,
    );
    return null;
  }
}
