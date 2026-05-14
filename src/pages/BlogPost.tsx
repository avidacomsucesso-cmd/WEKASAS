import { SiteLayout } from "@/components/SiteLayout";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ChevronLeft, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BlogPost() {
  const { id } = useParams();
  const { t } = useTranslation();

  // In a real app, you would fetch post data by id
  // This is a placeholder for the blog post content
  return (
    <SiteLayout>
      <article className="bg-white pb-20">
        <div className="bg-[color:var(--color-charcoal)] py-20 md:py-32">
          <div className="wk-container">
            <Link to="/blog" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors">
              <ChevronLeft className="mr-1 h-4 w-4" />
              {t('blog.back_to_blog')}
            </Link>
            
            <div className="max-w-4xl">
              <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 border-none px-4 py-1">
                {t('blog.category_placeholder')}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                {t(`blog.posts.${id}.title`, { defaultValue: "Artigo do Blog" })}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Equipa WEKASAS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>15 Fev, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>6 min de leitura</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="wk-container -mt-10">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1073&auto=format&fit=crop" 
                alt="Post Cover" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8 md:p-16">
              <div className="prose prose-lg max-w-none text-slate-700">
                <p className="text-xl font-medium text-slate-900 mb-8 leading-relaxed">
                  {t(`blog.posts.${id}.excerpt`, { defaultValue: "Estamos a preparar conteúdo exclusivo sobre o mercado imobiliário em Portugal e Espanha." })}
                </p>
                
                <p className="mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                
                <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">O que muda no mercado em 2026?</h2>
                <p className="mb-6">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                
                <div className="bg-slate-50 border-l-4 border-charcoal p-8 my-10 rounded-r-2xl">
                  <p className="italic text-lg text-slate-800">
                    "A previsibilidade é o maior activo que um proprietário pode ter no mercado actual."
                  </p>
                </div>
                
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
