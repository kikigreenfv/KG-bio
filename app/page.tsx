"use client";

import { useEffect, useRef } from "react";

const accent = "#9F7AEA"; // Lavender - links, accents
const chartreuse = "#D1EF59"; // Yellow-Green - CTAs, announcement
const background = "#FBFBFC"; // Light Gray - main background (25% lighter)
const offWhite = "#F4F4F4"; // Off-White - secondary backgrounds
const navy = "#001633"; // Navy - primary text, headings
const mutedText = "#4A5568"; // Muted Foreground - secondary text
const lightGray = "#D0D3DA"; // Light Gray - borders, dividers

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&family=Space+Mono:wght@400;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${background}; }

  .page { background: ${background}; min-height: 100vh; position: relative; overflow: hidden; }

  .grain {
    position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }

  .content { position: relative; z-index: 1; max-width: 780px; margin: 0 auto; padding: 0 1.5rem 6rem; }

  .hero {
    padding: 5rem 0 0;
    margin-bottom: 0;
    position: relative;
    overflow: hidden;
  }

  .hero-watermark {
    position: absolute;
    top: 50%;
    right: -0.05em;
    transform: translateY(-50%);
    font-family: 'Playfair Display', serif;
    font-size: clamp(14rem, 40vw, 22rem);
    font-weight: 700;
    color: transparent;
    -webkit-text-stroke: 1px rgba(159, 122, 234, 0.1);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    z-index: 0;
  }

  .hero-content { position: relative; z-index: 1; }

  .hero-eyebrow {
    font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase; color: ${accent}; margin-bottom: 1.25rem;
  }

  .hero-name {
    font-family: 'Playfair Display', serif; font-size: clamp(3.5rem, 10vw, 6rem);
    font-weight: 700; color: ${navy}; line-height: 1.0; margin-bottom: 2rem; letter-spacing: -0.02em;
  }

  .hero-thesis {
    font-family: 'Playfair Display', serif; font-size: 1.1rem; line-height: 1.9; color: ${navy};
  }

  .divider { display: flex; align-items: center; gap: 1rem; margin: 3rem 0; }
  .divider-line { width: 43px; height: 2px; background: ${lightGray}; flex-shrink: 0; }
  .divider-mark { font-family: 'Playfair Display', serif; color: ${accent}; font-size: 1.15rem; line-height: 1; margin-top: -3px; opacity: 0.7; }

  .connect { display: flex; gap: 2.5rem; margin-bottom: 0; }
  .connect a {
    font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase; color: ${accent};
    text-decoration: none; transition: opacity 0.2s;
  }
  .connect a:hover { opacity: 0.7; }

  .credentials { font-family: 'Inter', sans-serif; font-size: 0.85rem; line-height: 2; color: ${navy}; }
  .credentials .honors { color: ${mutedText}; margin-bottom: 1rem; }
  .credentials .section-label {
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.15em;
    text-transform: uppercase; color: ${accent}; margin-bottom: 0.4rem;
  }
  .credentials .portfolio-label { color: ${navy}; font-weight: 600; }
  .credentials .portfolio-row { margin-bottom: 0.5rem; }

  .commitment {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem; line-height: 1.95; color: ${navy};
  }
  .commitment p + p { margin-top: 1.5rem; }

  .prompts-wrapper {
    background: ${offWhite};
    border-radius: 2px;
    padding: 0.5rem 2rem 1rem;
    margin: 0 -2rem;
  }

  .prompt-row {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    gap: 1.5rem;
    padding: 1rem 0;
    border-bottom: 1px solid ${lightGray};
    align-items: baseline;
  }
  .prompt-row:first-child { border-top: 1px solid ${lightGray}; }

  .prompt-label {
    font-family: 'Space Mono', monospace; font-size: 0.78rem; font-weight: 400;
    letter-spacing: 0.06em; text-transform: uppercase; color: ${accent};
  }
  .prompt-answer {
    font-family: 'Playfair Display', serif; font-size: 1rem; color: ${navy}; line-height: 1.6;
  }

  .personal { font-family: 'Inter', sans-serif; font-size: 0.85rem; color: ${mutedText}; line-height: 2; text-align: center; }

  .photo-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.6rem; }
  .photo-block { aspect-ratio: 1/1; background: ${offWhite}; overflow: hidden; display: flex; align-items: center; justify-content: center; position: relative; }
  .photo-block span { font-family: 'Inter', sans-serif; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: ${lightGray}; }
  .photo-block img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .photo-block .photo-headline {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
    font-family: 'Inter', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .photo-block:hover .photo-headline { opacity: 1; }
  .photo-block img.crop-right { object-position: right center; }
  .photo-block img.crop-center { object-position: center center; }
  .photo-block img.zoom-in { transform: scale(1.33); object-position: 75% 25%; }

  .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .fade-up.visible { opacity: 1; transform: translateY(0); }
`;

const prompts = [
  { label: "Self-made", answer: "Curiosity first, credentials second." },
  { label: "Rewired by", answer: "Learning to trust the trajectory before the proof." },
  { label: "Superpower", answer: "Connecting dots others haven't linked yet." },
  { label: "Contrarian bet", answer: "Formed early, researched hard, trusted anyway." },
  { label: "Who I back", answer: "Drive, belief, agency — everything else is workable." },
  { label: "What I owe them", answer: "Showing up, every time." },
  { label: "Bar I hold", answer: "Silly high — for ideas, for effort, not for perfection." },
  { label: "Internal weather", answer: "Intense, rarely visible." },
  { label: "Biggest adventure", answer: "Internal, always." },
  { label: "Underestimated", answer: "Consistently. Still useful." },
];

const links = [
  { label: "Writing", href: "https://kirstengreen.substack.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/kirstengreen" },
  { label: "X", href: "https://x.com/kirstenagreen" },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => el.classList.add("visible"), delay);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className="fade-up">{children}</div>;
}

const Divider = () => (
  <div className="divider">
    <div className="divider-line" />
    <span className="divider-mark">{"✦"}</span>
  </div>
);

export default function Bio() {
  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <div className="grain" />
        <div className="content">

          {/* HERO */}
          <div className="hero">
            <div className="hero-watermark">K</div>
            <div className="hero-content">
              <FadeUp delay={100}>
                <h1 className="hero-name">Kirsten<br />Green</h1>
              </FadeUp>
              <FadeUp delay={200}>
                <div style={{fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: '1.25rem', marginTop: '4.5rem'}}>Founder & General Partner, Forerunner</div>
                <p className="hero-thesis">
                  Right now, we are living through the greatest technological transformation in a century — one that is reshaping the very foundations of how the world works. The technology, the applications, the behaviors being formed today will not just shape but fundamentally redefine how we learn, how we create, how we connect, how we work, how we heal, how we move through a day and through a life. Building today is a generational opportunity to play a role in creation and I am here for it.
                </p>
                <p className="hero-thesis" style={{marginTop: '1.5rem'}}>
                  I have spent my career learning to read where technology and behavior intersect before the market does — finding where new technology meets new means of better, in service of real needs. At this fast-moving AI moment, the questions of for who, for what, and to what end matter more than ever. Technology itself is raw — how it is brought to life, received, and leveraged is where impact happens. And in that space between technology and human, that is where I stand. I am a voice for humans.
                </p>
              </FadeUp>
            </div>
          </div>

          <Divider />

          {/* CREDENTIALS */}
          <FadeUp>
            <div className="credentials">
              <div className="honors">
                <strong>{"10+ years"}</strong>{" of Forerunner. "}<strong>{"$3B raised."}</strong>{" "}
                3 seed investments to public companies, and counting. Midas List — 9 consecutive. Time 100. Forbes' Most Powerful Women. Vanity Fair's New Establishment. Barron's Most Influential Women in Finance. NYT Top 20 Venture Capitalists. Forbes feature: Women Shaping Venture Capital and AI (2026). All Raise founding member.
              </div>
              <div className="section-label" style={{marginTop: '3rem'}}>Investments</div>
              <div className="portfolio-row">
                <span className="portfolio-label">{"Category leaders:"}&nbsp;</span>
                Chime. Warby Parker. Hims & Hers. Glossier. Dollar Shave Club. Faire. Jet.
              </div>
              <div className="portfolio-row">
                <span className="portfolio-label">{"AI native:"}&nbsp;</span>
                Daydream. Natural. SuperMe. Mindtrip. humans&. Wabi. Bluelabs. Zeroclick.
              </div>
            </div>
          </FadeUp>

          {/* CONNECT */}
          <FadeUp>
            <div className="connect" style={{marginTop: '3rem'}}>
              {links.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
              ))}
            </div>
          </FadeUp>

          {/* HOW I SHOW UP */}
          <FadeUp>
            <div className="credentials">
              <div style={{fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: accent, marginBottom: '0.5rem', marginTop: '3rem'}}>How I show up</div>
            </div>
            <div className="commitment">
              <p>
                I know what's worth talking about and what's noise — and I bring a big vision for how things map together in ways that unlock greater potential. I am in it for the long arc: consistent, constructive, a true believer. Under pressure I am confident and calm. I push — but always in service of what's possible, never what's comfortable. Founders know I am kind and optimistic. What they sometimes don't expect: I am also a fierce competitor. I am here to win alongside the people I back. That combination — belief and edge, warmth and ambition — is what I bring to every partnership.
              </p>
            </div>
          </FadeUp>

          {/* PROMPTS */}
          <FadeUp>
            <div style={{fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: accent, marginBottom: '0.5rem', marginTop: '3rem'}}>The short story</div>
            <div className="prompts-wrapper">
              {prompts.map(({ label, answer }) => (
                <div key={label} className="prompt-row">
                  <span className="prompt-label">{label}</span>
                  <span className="prompt-answer">{answer}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          <Divider />

          {/* PERSONAL */}
          <FadeUp>
            <div style={{fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: accent, marginBottom: '0.5rem'}}>Also</div>
            <div className="personal" style={{textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              <p style={{margin: 0}}>Married to my long-time forever love. Two seriously awesome kids — lucky me.</p>
              <p style={{margin: 0}}>Art, drawing, journaling, fashion. Someday, more of this.</p>
              <p style={{margin: 0}}>Ideal day: outside, moving, a long unfolding conversation.</p>
              <p style={{margin: 0}}>My heart lives in San Francisco.</p>
            </div>
          </FadeUp>

          {/* PHOTOS */}
          <FadeUp>
            <div className="photo-grid" style={{marginTop: '3rem', marginLeft: '-2rem', marginRight: '-2rem', width: 'calc(100% + 4rem)'}}>
              <a href="https://www.youtube.com/watch?v=xFQ5mIJdxhA" target="_blank" rel="noopener noreferrer" className="photo-block" style={{cursor: 'pointer'}}>
                <img src="/images/gary-kg.jpg" alt="Interview conversation" />
                <div className="photo-headline">Y Combinator Interview</div>
              </a>
              <a href="https://fortune.com/videos/watch/brainstorm-tech-2024%3A-winning-with-consumers-in-ai/89fcd760-16f0-4edb-ad91-bcba8124b552" target="_blank" rel="noopener noreferrer" className="photo-block" style={{cursor: 'pointer'}}>
                <img src="/images/fortune-tech-kg.jpg" alt="Fortune Brainstorm Tech presentation" />
                <div className="photo-headline">Fortune Brainstorm Tech 2024</div>
              </a>
              <div className="photo-block">
                <img src="/images/money2020-kg.jpg" alt="Money 20/20 conference conversation" />
                <div className="photo-headline">Money 20/20</div>
              </div>
              <div className="photo-block">
                <img src="/images/humans-loop-kg.jpg" alt="Humans in the Loop 2025 conference" />
                <div className="photo-headline">Humans in the Loop 2025</div>
              </div>
              <a href="https://www.generalist.com/p/kirsten-green-3" target="_blank" rel="noopener noreferrer" className="photo-block" style={{cursor: 'pointer'}}>
                <img src="/images/generalist-kg.jpg" alt="Letters to a Young Investor - The Generalist" />
                <div className="photo-headline">Letters to a Young Investor</div>
              </a>
              <a href="https://techcrunch.com/video/ai-has-opened-a-new-era-in-venture-capital-according-to-forerunner-founder-kirsten-green/" target="_blank" rel="noopener noreferrer" className="photo-block" style={{cursor: 'pointer'}}>
                <img src="/images/techcrunch-kg.jpg" alt="TechCrunch interview on AI and venture capital" />
                <div className="photo-headline">TechCrunch: AI & Venture Capital</div>
              </a>
            </div>
          </FadeUp>

          {/* FOOTER DIVIDER */}
          <FadeUp>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '4rem', marginBottom: '2rem'}}>
              <div className="divider-line" />
              <span className="divider-mark">{"✦"}</span>
              <div className="divider-line" />
            </div>
          </FadeUp>

        </div>
      </div>
    </>
  );
}
