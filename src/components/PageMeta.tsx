import { Helmet } from "react-helmet-async";

export function PageMeta(props: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const canonical = `https://wekasas.com${props.path}`;
  const image = props.image ?? "/og.png";

  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
