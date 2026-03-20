"use client";

import { useEffect, useRef } from "react";

const ink = "#111111"; // Deep ink - primary text
const lightGray = "#FAFAFA"; // Very light gray - main background
const warmGray = "#EFEFEF"; // Warm gray - secondary backgrounds
const accent = "#9F7AEA"; // Purple accent for headers
const stone = "#E0E0E0"; // Light stone - borders, dividers
const charcoal = "#1A1A1A"; // Dark charcoal - secondary text

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${lightGray}; }

  ::selection { background: ${accent}; color: white; }

  .page { background: ${lightGray}; min-height: 100vh; position: relative; }

  .grain {
    position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }

  .content { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; padding: 0 2rem 8rem; }

  /* MASTHEAD */
  .masthead {
    padding: 2.5rem 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .masthead-logo {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
  }
  .masthead-date {
    font-family: 'Inter', sans-serif;
    font-size: 0.68rem;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${accent};
  }

  /* HERO */
  .hero {
    padding: 2rem 0 0;
    margin-bottom: 0;
    position: relative;
  }

  .hero-issue {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 400;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${accent};
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .hero-issue::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${stone};
  }

  .hero-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(4rem, 12vw, 7rem);
    font-weight: 300;
    color: ${ink};
    line-height: 0.9;
    margin-bottom: 4rem;
    letter-spacing: -0.03em;
  }

  .hero-role {
    font-family: 'Inter', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${accent};
    margin-bottom: 2rem;
    padding-left: 0.1em;
  }

  .hero-thesis {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    line-height: 1.75;
    color: ${ink};
    font-weight: 400;
  }
  .hero-thesis em {
    font-style: italic;
    font-weight: 300;
  }

  /* PULL QUOTE */
  .pull-quote {
    margin: 2.5rem 0;
    padding: 2rem 0;
    border-top: 1px solid ${stone};
    border-bottom: 1px solid ${stone};
    text-align: center;
  }
  .pull-quote-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    font-weight: 300;
    font-style: italic;
    color: ${ink};
    line-height: 1.4;
    max-width: 540px;
    margin: 0 auto;
  }
  .pull-quote-attr {
    font-family: 'Inter', sans-serif;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${accent};
    margin-top: 1rem;
  }

  /* SECTION HEADER */
  .section-header {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 2rem;
    margin-top: 5rem;
  }
  .section-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem;
    font-weight: 600;
    color: ${accent};
    width: 2rem;
    flex-shrink: 0;
  }
  .section-title {
    font-family: 'Inter', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${ink};
  }
  .section-line {
    flex: 1;
    height: 1px;
    background: ${stone};
  }

  /* CREDENTIALS */
  .credentials-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .credential-item {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 2rem;
  }
  .credential-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${accent};
    padding-top: 0.25rem;
  }
  .credential-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem;
    line-height: 1.7;
    color: ${ink};
    font-weight: 400;
  }
  .credential-value strong {
    font-weight: 500;
  }

  /* CONNECT */
  .connect {
    display: flex;
    gap: 3rem;
    margin-top: 2rem;
  }
  .connect a {
    font-family: 'Inter', sans-serif;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${accent};
    text-decoration: none;
    position: relative;
    transition: color 0.2s;
  }
  .connect a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${accent};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  .connect a:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
  .connect a:hover { color: ${ink}; }

  /* COMMITMENT */
  .commitment {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    line-height: 1.75;
    color: ${ink};
    font-weight: 400;
  }
  .commitment p + p { margin-top: 1.75rem; }

  /* PROMPTS */
  .prompts-wrapper {
    background: ${warmGray};
    padding: 2.5rem 2.5rem 2rem;
    margin: 2rem -2.5rem 0;
  }

  .prompt-row {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 2rem;
    padding: 0.9rem 0;
    border-bottom: 1px solid ${stone};
    align-items: baseline;
  }
  .prompt-row:last-child { border-bottom: none; }

  .prompt-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${accent};
  }
  .prompt-answer {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    color: ${ink};
    line-height: 1.75;
    font-weight: 400;
  }

  /* PERSONAL */
  .personal {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    color: ${ink};
    line-height: 1.75;
  }
  .personal p { margin-bottom: 0.5rem; }

  /* PHOTO GRID */
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    background: white;
    margin: 4rem -2rem 2rem;
    padding: 4px;
  }
  .photo-block {
    aspect-ratio: 1/1;
    background: ${warmGray};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .photo-block img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }
  .photo-block:hover img {
    transform: scale(1.02);
  }
  .photo-block .photo-headline {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.25rem;
    background: linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0) 100%);
    font-family: 'Inter', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: white;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .photo-block:hover .photo-headline {
    opacity: 1;
    transform: translateY(0);
  }

  /* COLOPHON */
  .colophon {
    margin-top: 6rem;
    padding-top: 3rem;
    border-top: 1px solid ${stone};
    text-align: center;
  }
  .colophon-mark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 300;
    color: ${charcoal};
    margin-bottom: 1.5rem;
  }
  .colophon-text {
    font-family: 'Inter', sans-serif;
    font-size: 0.65rem;
    font-weight: 400;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${accent};
  }

  /* ANIMATIONS */
  .fade-up {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* RESPONSIVE */
  @media (max-width: 640px) {
    .content { padding: 0 1.5rem 6rem; }
    .credential-item { grid-template-columns: 1fr; gap: 0.5rem; }
    .prompt-row { grid-template-columns: 1fr; gap: 0.5rem; }
    .prompts-wrapper { margin: 2rem -1.5rem 0; padding: 2rem 1.5rem 1.5rem; }
    .photo-grid { margin: 2rem -1.5rem 0; grid-template-columns: repeat(2, 1fr); }
    .connect { gap: 2rem; flex-wrap: wrap; }
  }
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

export default function Bio() {
  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <div className="grain" />
        <div className="content">

          {/* MASTHEAD */}
          <div className="masthead">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KG%20favicon-GcLh4RDcGMtTd2rkWeIugN8M4t83KN.jpg" alt="KG" className="masthead-logo" />
            <div className="masthead-date">2026</div>
          </div>

          {/* HERO */}
          <div className="hero">
            <FadeUp delay={100}>
              <div className="hero-issue">Profile</div>
              <h1 className="hero-name">Kirsten<br />Green</h1>
              <div className="hero-role">Founder & General Partner, Forerunner</div>
            </FadeUp>
            <FadeUp delay={250}>
              <p className="hero-thesis">
                Right now, we are living through the greatest technological transformation in a century — one that is reshaping the very foundations of how the world works. The technology, the applications, the behaviors being formed today will not just shape but <em>fundamentally redefine</em> how we learn, how we create, how we connect, how we work, how we heal, how we move through a day and through a life. Building today is a generational opportunity to play a role in creation and I am here for it.
              </p>
              <p className="hero-thesis" style={{marginTop: '1.75rem'}}>
                I've spent my career reading where technology and behavior intersect before the market does — identifying where new capabilities meet real human needs. In this fast-moving AI moment, the questions of who it serves and why it matters are more important than ever. Technology itself is raw. Its impact is determined by how it's shaped, received, and used. I stand in the space between technology and the human.
              </p>
            </FadeUp>
          </div>

          {/* CREDENTIALS */}
          <FadeUp>
            <div className="section-header">
              <span className="section-number">01</span>
              <span className="section-title">Track Record</span>
              <div className="section-line" />
            </div>
            <div className="credentials-grid">
              <div className="credential-item">
                <span className="credential-label">Forerunner</span>
                <span className="credential-value">
                  <strong>10+ years.</strong> $3B raised. 3 seed investments to public companies, and counting.
                </span>
              </div>
              <div className="credential-item">
                <span className="credential-label">Recognition</span>
                <span className="credential-value">
                  Midas List — 9 consecutive. Time 100. Forbes' Most Powerful Women. Vanity Fair's New Establishment. Barron's Most Influential Women in Finance. NYT Top 20 Venture Capitalists.
                </span>
              </div>
              <div className="credential-item">
                <span className="credential-label">Portfolio</span>
                <span className="credential-value">
                  <strong>Category leaders:</strong> Chime, Warby Parker, Hims & Hers, Glossier, Dollar Shave Club, Faire, Jet.<br />
                  <strong>AI native:</strong> Daydream, Natural, SuperMe, Mindtrip, humans&, Wabi, Bluelabs, Zeroclick.
                </span>
              </div>
            </div>
          </FadeUp>

          {/* HOW I SHOW UP */}
          <FadeUp>
            <div className="section-header">
              <span className="section-number">02</span>
              <span className="section-title">How I Show Up</span>
              <div className="section-line" />
            </div>
            <div className="commitment">
              <p>
                I know what's worth talking about and what's noise — and I bring a big vision for how things map together in ways that unlock greater potential. I am in it for the long arc: consistent, constructive, a true believer.
              </p>
              <p>
                Under pressure I am confident and calm. I push — but always in service of what's possible, never what's comfortable. Founders know I am kind and optimistic. What they sometimes don't expect: I am also a fierce competitor. I am here to win alongside the people I back.
              </p>
              <p>
                That combination — belief and edge, warmth and ambition — is what I bring to every partnership.
              </p>
            </div>
            <div className="connect">
              {links.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
              ))}
            </div>
          </FadeUp>

          {/* PROMPTS */}
          <FadeUp>
            <div className="section-header">
              <span className="section-number">03</span>
              <span className="section-title">The Short Story</span>
              <div className="section-line" />
            </div>
            <div className="prompts-wrapper">
              {prompts.map(({ label, answer }) => (
                <div key={label} className="prompt-row">
                  <span className="prompt-label">{label}</span>
                  <span className="prompt-answer">{answer}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* PERSONAL */}
          <FadeUp>
            <div className="section-header">
              <span className="section-number">04</span>
              <span className="section-title">Also</span>
              <div className="section-line" />
            </div>
            <div className="personal">
              <p>Married to my long-time forever love. Two seriously awesome kids — lucky me.</p>
              <p>Art, drawing, journaling, fashion. Someday, more of this.</p>
              <p>Ideal day: outside, moving, a long unfolding conversation.</p>
              <p>My heart lives in San Francisco.</p>
            </div>
          </FadeUp>

          {/* PHOTOS */}
          <FadeUp>
            <div className="photo-grid">
              <a href="https://www.youtube.com/watch?v=xFQ5mIJdxhA" target="_blank" rel="noopener noreferrer" className="photo-block" style={{cursor: 'pointer'}}>
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Y%20Combinator%20interview%20with%20Gary%20Tan-VlHkarDHJPMEzTESejGP0qZth3EQxg.png" alt="Y Combinator Interview" />
                <div className="photo-headline">YC: conversation with Gary Tan</div>
              </a>
              <a href="https://fortune.com/videos/watch/brainstorm-tech-2024%3A-winning-with-consumers-in-ai/89fcd760-16f0-4edb-ad91-bcba8124b552" target="_blank" rel="noopener noreferrer" className="photo-block" style={{cursor: 'pointer'}}>
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fortune%20brainstorm%20tech%20-uFkeHpD0pBcOcDVWJmnxPArz6iTCk2.png" alt="Fortune Brainstorm Tech" />
                <div className="photo-headline">Fortune Brainstorm Tech</div>
              </a>
              <div className="photo-block">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/money%202020-DHPcqcXarRZjq7PBpeQwHm5rFAMwdj.png" alt="Money 20/20" />
                <div className="photo-headline">Money 20/20</div>
              </div>
              <div className="photo-block">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Humans%20in%20the%20Loop%202025-avOOfjSVztVphsirzLoguASIgAlKvr.png" alt="Humans in the Loop 2025" />
                <div className="photo-headline">Humans in the Loop 2025</div>
              </div>
              <a href="https://www.generalist.com/p/kirsten-green-3" target="_blank" rel="noopener noreferrer" className="photo-block" style={{cursor: 'pointer'}}>
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Generalist-GOHx0syUkOCgjr2CtqdEzGCIHCgjIK.png" alt="Letters to a Young Investor" />
                <div className="photo-headline">Letters to a Young Investor</div>
              </a>
              <a href="https://techcrunch.com/video/ai-has-opened-a-new-era-in-venture-capital-according-to-forerunner-founder-kirsten-green/" target="_blank" rel="noopener noreferrer" className="photo-block" style={{cursor: 'pointer'}}>
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tech%20Crunch%20AI%20%26%20Venture%20Capital-Ff7Gc6Po7kVSkYwqjD3uLKRtLvvSzA.png" alt="TechCrunch: AI & Venture Capital" />
                <div className="photo-headline">TechCrunch: AI & Venture</div>
              </a>
            </div>
          </FadeUp>

          {/* COLOPHON */}
          <FadeUp>
            <div className="colophon">
              <div className="colophon-mark">KG</div>
              <div className="colophon-text">San Francisco, California</div>
            </div>
          </FadeUp>

        </div>
      </div>
    </>
  );
}
