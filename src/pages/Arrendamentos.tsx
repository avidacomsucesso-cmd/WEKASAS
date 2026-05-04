import * as React from "react";
import { PageMeta } from "@/components/PageMeta";

export default function Arrendamentos() {
  return (
    <>
      <PageMeta
        title="Arrendamentos — WEKASAS"
        description="Consulte toda a nossa carteira de imóveis disponíveis para arrendamento em Portugal e Espanha, geridos pela WEKASAS em parceria com a rede eXp Realty."
        path="/arrendamentos"
      />
      <section style={{ padding: '5rem 1.5rem', minHeight: '70vh', display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>

          {/* Label */}
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FA621C', marginBottom: '14px' }}>
            Imóveis para arrendamento
          </p>

          {/* Headline */}
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#212121', lineHeight: 1.2, marginBottom: '18px', letterSpacing: '-0.03em' }}>
            Encontre o imóvel certo<br />para arrendar
          </h1>

          {/* Sub */}
          <p style={{ fontSize: '17px', color: '#555', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Consulte toda a nossa carteira de imóveis disponíveis para arrendamento em Portugal e Espanha, geridos pela WEKASAS em parceria com a rede eXp Realty.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {[
              { val: 'PT + ES', label: 'Mercados activos' },
              { val: '100%',    label: 'Gestão profissional' },
              { val: 'eXp',     label: 'Rede certificada' },
            ].map(({ val, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '26px', fontWeight: 700, color: '#FA621C' }}>{val}</div>
                <div style={{ fontSize: '13px', color: '#999', marginTop: '3px', fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* CTA principal */}
          <a
            href="https://wesellers.expportugal.com/?listing=rent"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#FA621C', color: '#fff',
              padding: '14px 32px', borderRadius: '50px',
              fontSize: '16px', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.2s ease-in-out',
            }}
            onMouseOver={e => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Ver imóveis para arrendamento
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Nota */}
          <p style={{ marginTop: '24px', fontSize: '12px', color: '#aaa', fontWeight: 500 }}>
            Powered by eXp Realty · Listagens actualizadas em tempo real
          </p>

        </div>
      </section>
    </>
  );
}
