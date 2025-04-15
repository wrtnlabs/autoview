export interface PageProps {
  params: Promise<PageParams>;
}

export interface PageParams {
  slug: string;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div>
      <h1>Hello, {slug}!</h1>
    </div>
  );
}
