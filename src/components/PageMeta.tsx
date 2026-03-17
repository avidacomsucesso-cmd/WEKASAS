import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export function PageMeta({ title, description, path }: { title: string; description: string; path: string }) {
  const location = useLocation();
  const canonicalUrl = `https://wekasas.com${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* SEO — hreflang */}
      <link rel="alternate" hrefLang="pt" href="https://wekasas.com/?lang=pt" />
      <link rel="alternate" hrefLang="es" href="https://wekasas.com/?lang=es" />
      <link rel="alternate" hrefLang="x-default" href="https://wekasas.com/" />
    </Helmet>
  );
}