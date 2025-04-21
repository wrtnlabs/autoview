export interface PageProps {
  params: Promise<PageParams>;
}

export interface PageParams {
  slug: string;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const transformer = await import(`@transformers/${slug}.ts`);
  const { transform } = transformer;

  console.log(transformer);

  return (
    <div>
      <h1>Hello, {slug}!</h1>
    </div>
  );
}
