import { WekaButton } from "@/components/WekaButton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getPosts } from "@/lib/blog";

export default function Blog() {
  const { t } = useTranslation();
  const posts = getPosts();

  return (
    <>
      <section className="bg-[color:var(--color-charcoal)] py-20 md:py-32">
        <div className="wk-container">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 border-none px-4 py-1">
              BLOG WEKASAS
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {t('blog.hero_title')}
            </h1>
            <p className="text-xl text-white/60 mb-8">
              {t('blog.hero_sub')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="wk-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col relative">
                <Link to={`/blog/${post.slug}`} className="absolute inset-0 z-10" aria-label={post.titulo} />
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.imagemHero}
                    alt={post.imagemHeroAlt}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="bg-white/90 text-charcoal backdrop-blur-sm border-none">
                      {post.categoria}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pt-6">
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.data).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.tempoLeitura}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {post.titulo}
                  </h3>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-slate-600 line-clamp-3">
                    {post.subtitulo}
                  </p>
                </CardContent>
                <CardFooter className="pt-0 pb-6">
                  <div className="inline-flex items-center text-sm font-bold text-charcoal hover:gap-2 transition-all">
                    {t('blog.read_more')} <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="p-12 rounded-3xl bg-charcoal text-white relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">{t('blog.newsletter_title')}</h2>
                <p className="text-white/60 mb-8">{t('blog.newsletter_sub')}</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Seu melhor email" 
                    className="flex-grow px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <WekaButton className="bg-white text-charcoal hover:bg-white/90">
                    Subscrever
                  </WekaButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
