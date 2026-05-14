import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ChevronLeft, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getPostBySlug } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogPost() {
  const { id } = useParams(); // 'id' will contain the slug because of the route definition
  const { t } = useTranslation();
  const post = id ? getPostBySlug(id) : undefined;

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Artigo não encontrado</h1>
        <Link to="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
          Voltar ao Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <article className="bg-white pb-20">
        <div className="bg-[color:var(--color-charcoal)] py-20 md:py-32">
          <div className="wk-container">
            <Link to="/blog" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors">
              <ChevronLeft className="mr-1 h-4 w-4" />
              {t('blog.back_to_blog')}
            </Link>
            
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 border-none px-4 py-1">
                {post.categoria.toUpperCase()}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                {post.titulo}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Equipa WEKASAS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.data).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.tempoLeitura}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="wk-container -mt-10">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img 
                src={post.imagemHero} 
                alt={post.imagemHeroAlt} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8 md:p-16">
              <div className="prose prose-lg prose-slate max-w-none text-slate-700
                prose-headings:text-slate-900 prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-24 prose-h2:mb-12
                prose-p:leading-relaxed prose-p:mb-16 prose-p:text-justify
                prose-img:rounded-2xl prose-img:mt-16 prose-img:mb-4 prose-img:shadow-lg
                prose-blockquote:border-l-4 prose-blockquote:border-charcoal prose-blockquote:bg-slate-50 prose-blockquote:p-10 prose-blockquote:my-20 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:text-slate-800
                prose-table:w-full prose-table:my-16
                prose-th:bg-slate-100 prose-th:p-4 prose-th:text-left
                prose-td:p-4 prose-td:border-b prose-td:border-slate-100
                prose-hr:my-24 prose-hr:border-slate-200
                [&>em]:block [&>em]:text-center [&>em]:text-sm [&>em]:text-slate-500 [&>em]:mb-20
              ">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.conteudo}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
