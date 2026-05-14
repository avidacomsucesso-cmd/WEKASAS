export interface BlogPost {
  id: string;
  slug: string;
  categoria: string;
  data: string;
  tempoLeitura: string;
  titulo: string;
  subtitulo: string;
  metaDescricao: string;
  imagemHero: string;
  imagemHeroAlt: string;
  tags: string[];
  conteudo: string;
}

export interface BlogData {
  meta: {
    total: number;
    idioma: string;
  };
  artigos: BlogPost[];
}

import blogDataRaw from "./wekasas_blog_artigos.json";

const blogData = blogDataRaw as BlogData;

export const getPosts = (): BlogPost[] => {
  return blogData.artigos;
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogData.artigos.find((post) => post.slug === slug);
};

export const getPostById = (id: string): BlogPost | undefined => {
  return blogData.artigos.find((post) => post.id === id);
};
