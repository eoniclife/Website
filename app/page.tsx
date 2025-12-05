"use client";

const scrollToId = (id: string) => {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top: y, behavior: "smooth" });
};

export default function HomePage() {
  return (
    <main className="page-shell">
      <Header />

      <section className="hero" id="top">
        <div>
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-pill" />
            <span>Eonic Baseline • 90-day health autopilot</span>
          </div>
          <h1 className="hero-title">
            Health autopilot{" "}
            <span className="hero-highlight">for high-agency people.</span>
          </h1>
          <p className="hero-subtitle">
            Eonic Baseline is a pill-first protocol for busy, ambitious people
            who want better energy, sleep, and focus—without turning health into
            a full-time job.
          </p>

          <div className="hero-ctas">
            <button
              className="btn btn-primary"
              onClick={() => scrollToId("waitlist")}
            >
              Join the Baseline waitlist
            </button>
            <button
              className="btn btn-outline"
              onClick={() => scrollToId("how-it-works")}
            >
              See how it works
            </button>
          </div>

          <p className="hero-footnote">
            We take over the 5–10% of your health that supplements can actually
            influence, and do it properly—so you can focus on everything else.
          </p>
        </div>

        <div className="hero-layout-right" aria-hidden="true">
          <div className="hero-grid">
            <div className="hero-card">
              <div className="hero-card-label">Daily micro-stack</div>
              <div className="hero-card-value">
                2–4 capsules, sequenced for energy, focus, sleep and recovery.
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-card-label">Mindspace cost</div>
              <div className="hero-card-value">
                Near-zero. We design and orchestrate the stack. You just take it.
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-card-label">Built for</div>
              <div className="hero-card-value">
                Urban operators, founders and knowledge workers (25–45).
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-card-label">Calibrated for India</div>
              <div className="hero-card-value">
                Formulations respect Indian diets, labs and constraints.
              </div>
            </div>
          </div>

          <div className="hero-timeline">
            <div className="hero-timeline-row">
              <span>Week 1–2</span>
              <span>Stabilise sleep / crashes</span>
            </div>
            <div className="hero-timeline-row">
              <span>Week 3–6</span>
              <span>Energy & focus feel less random</span>
            </div>
            <div className="hero-timeline-row">
              <span>Week 7–12</span>
              <span>Baseline becomes your new default</span>
            </div>
          </div>
        </div>
      </section>

      <SectionProblem />
      <SectionBaseline />
      <SectionHowItWorks />
      <SectionBenefits />
      <SectionWhyDifferent />
      <SectionFounder />
      <SectionRoadmap />
      <SectionFAQ />
      <SectionWaitlist />

      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <div className="logo-mark" />
        <div className="logo-text">Eonic</div>
      </div>
      <nav className="nav">
        <a onClick={() => scrollToId("baseline")}>Baseline</a>
        <a onClick={() => scrollToId("how-it-works")}>How it works</a>
        <a onClick={() => scrollToId("why-eonic")}>Why Eonic</a>
        <a onClick={() => scrollToId("roadmap")}>Roadmap</a>
        <a onClick={() => scrollToId("faq")}>FAQ</a>
      </nav>
      <button
        className="btn btn-primary nav-cta"
        onClick={() => scrollToId("waitlist")}
      >
        Join waitlist
      </button>
    </header>
  );
}

function SectionProblem() {
  return (
    <section className="section" id="problem">
      <div className="section-header">
        <div className="section-kicker">The gap</div>
        <h2 className="section-title">
          Most ambitious people run on coffee, chaos and guesswork.
        </h2>
        <p className="section-subtitle">
          You already know supplements matter. But the stack is random, the
          advice is fragmented, and managing it all quietly becomes its own
          job.
        </p>
      </div>

      <div className="problem-grid">
        <div className="card">
          <div className="card-title">DIY stacks that never stick</div>
          <p className="card-body">
            Half-used bottles, changing routines, no idea what is actually
            working. You&apos;re experimenting, not running a protocol.
          </p>
        </div>
        <div className="card">
          <div className="card-title">Wellness marketing, under-dosed reality</div>
          <p className="card-body">
            Most products are built for margins or aesthetics, not outcomes.
            Fairy-dust ingredients, confusing claims, no clear rationale.
          </p>
        </div>
        <div className="card">
          <div className="card-title">No one owns the 5–10% biochemical edge</div>
          <p className="card-body">
            Lifestyle is 90% of health. But the 5–10% biochemical edge from a
            smart stack is real—and almost no one is running it properly.
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionBaseline() {
  return (
    <section className="section" id="baseline">
      <div className="section-header">
        <div className="section-kicker">The Eonic Baseline</div>
        <h2 className="section-title">
          A 90-day, pill-first health autopilot for operators.
        </h2>
        <p className="section-subtitle">
          The Baseline is a done-for-you daily micro-stack. Minimal capsules,
          maximal signal. Designed for urban knowledge workers who want to take
          their biology seriously without becoming biohackers.
        </p>
      </div>

      <div className="split">
        <div>
          <h3 style={{ fontSize: "1rem", marginBottom: 8 }}>
            What you actually get
          </h3>
          <ul className="bullet-list">
            <li>
              <span className="bullet-dot" />
              <span>
                A sequenced AM / PM stack of essential, evidence-backed
                compounds calibrated for India and your context.
              </span>
            </li>
            <li>
              <span className="bullet-dot" />
              <span>
                A 90-day protocol designed to stabilise energy, clean up sleep
                inputs and support cognitive output.
              </span>
            </li>
            <li>
              <span className="bullet-dot" />
              <span>
                Clear instructions on what to take, when, and how to fit it into
                your existing day with near-zero extra friction.
              </span>
            </li>
          </ul>

          <h3 style={{ fontSize: "1rem", margin: "16px 0 8px" }}>
            What you don&apos;t have to do
          </h3>
          <ul className="bullet-list">
            <li>
              <span className="bullet-dot" />
              <span>
                No late-night rabbit holes on Reddit or YouTube about stacks and
                "one weird tricks".
              </span>
            </li>
            <li>
              <span className="bullet-dot" />
              <span>
                No spreadsheet of 14 supplements you&apos;ll stop taking by week
                three.
              </span>
            </li>
            <li>
              <span className="bullet-dot" />
              <span>
                No pretending pills can replace doctors, therapy or lifestyle.
                We don&apos;t sell that story.
              </span>
            </li>
          </ul>
        </div>

        <div className="card">
          <div className="card-title">Design constraints we hold for you</div>
          <p className="card-body">
            Every decision in the Baseline is constrained by a few rules:
          </p>
          <ul className="bullet-list">
            <li>
              <span className="bullet-dot" />
              <span>Minimum capsules, maximum effect per capsule.</span>
            </li>
            <li>
              <span className="bullet-dot" />
              <span>
                Evidence-backed doses, no fairy-dusting. Either it&apos;s there
                to move the needle, or it&apos;s not there.
              </span>
            </li>
            <li>
              <span className="bullet-dot" />
              <span>
                Designed to sit alongside a real life—late calls, travel,
                family, imperfect sleep—instead of assuming a lab.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function SectionHowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="section-header">
        <div className="section-kicker">How it works</div>
        <h2 className="section-title">
          From chaos to protocol in four simple moves.
        </h2>
        <p className="section-subtitle">
          The Baseline is designed as a closed loop: we take in your context,
          translate it into a micro-stack, and then refine it as we learn.
        </p>
      </div>

      <div className="steps-grid">
        <div className="card">
          <div className="step-index">Step 1</div>
          <div className="card-title">Onboard in minutes</div>
          <p className="card-body">
            Share goals, constraints, meds and any recent labs you already
            have. No over-sharing, no interrogations.
          </p>
        </div>
        <div className="card">
          <div className="step-index">Step 2</div>
          <div className="card-title">We design your Baseline</div>
          <p className="card-body">
            We map your inputs to a small, targeted stack and dosing schedule,
            tuned for your work and recovery patterns.
          </p>
        </div>
        <div className="card">
          <div className="step-index">Step 3</div>
          <div className="card-title">We ship and orchestrate</div>
          <p className="card-body">
            Your stack arrives with clear instructions and low-noise nudges via
            the channels you already use.
          </p>
        </div>
        <div className="card">
          <div className="step-index">Step 4</div>
          <div className="card-title">Review and refine</div>
          <p className="card-body">
            At weeks 4–6 and 12, we review how you&apos;re feeling and, where
            relevant, labs and wearables—then tighten the protocol.
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionBenefits() {
  return (
    <section className="section" id="benefits">
      <div className="section-header">
        <div className="section-kicker">What to expect</div>
        <h2 className="section-title">
          Not miracles. A cleaner, more reliable baseline.
        </h2>
        <p className="section-subtitle">
          We don&apos;t promise to cure disease or reverse aging. We aim for a
          noticeable upgrade in how your days feel and how your input stack
          looks.
        </p>
      </div>

      <div className="benefits-grid">
        <div className="card">
          <div className="card-title">More stable energy</div>
          <p className="card-body">
            Fewer brutal crashes, less wired-but-tired. Your days feel less
            random, more steady.
          </p>
        </div>
        <div className="card">
          <div className="card-title">Better sleep inputs</div>
          <p className="card-body">
            Easier wind-down, fewer 2 am wide-awake episodes, more mornings
            where you actually feel restored.
          </p>
        </div>
        <div className="card">
          <div className="card-title">Clearer headspace</div>
          <p className="card-body">
            Less fog and low-grade inflammation, more days where your brain does
            what you know it can do.
          </p>
        </div>
        <div className="card">
          <div className="card-title">Biology taken seriously</div>
          <p className="card-body">
            You go from "I&apos;ll figure this out later" to running a
            real protocol for the 5–10% biochemical edge that compounds.
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionWhyDifferent() {
  return (
    <section className="section" id="why-eonic">
      <div className="section-header">
        <div className="section-kicker">Why Eonic</div>
        <h2 className="section-title">
          Built as a system, not a shelf of products.
        </h2>
        <p className="section-subtitle">
          The world doesn&apos;t need another random supplement brand. It needs
          an intelligent protocol that owns the biochemical 5–10%—and respects
          your time.
        </p>
      </div>

      <div className="split">
        <div>
          <h3 style={{ fontSize: "1rem", marginBottom: 8 }}>
            What we optimise for
          </h3>
          <ul className="bullet-list">
            <li>
              <span className="bullet-dot" />
              <span>Frictionless compliance: easy to take every single day.</span>
            </li>
            <li>
              <span className="bullet-dot" />
              <span>
                Evidence-based, India-calibrated formulations—not US copy-paste.
              </span>
            </li>
            <li>
              <span className="bullet-dot" />
              <span>
                Protocol first, product second. The pills are actuators inside a
                system that learns.
              </span>
            </li>
            <li>
              <span className="bullet-dot" />
              <span>
                Honesty as a feature: supplements are 5–10% of health. We&apos;ll
                handle that slice properly and never pretend otherwise.
              </span>
            </li>
          </ul>
        </div>

        <div className="card">
          <div className="card-title">How we&apos;re different</div>
          <p className="card-body">
            Compared to:
          </p>
          <ul className="bullet-list">
            <li>
              <span className="bullet-dot" />
              <span>
                <strong>Random D2C brands:</strong> built for campaigns and
                discounts. We&apos;re built for long-term protocols.
              </span>
            </li>
            <li>
              <span className="bullet-dot" />
              <span>
                <strong>DIY stacks:</strong> high effort, low signal. We
                collapse the decision space into a clear Baseline.
              </span>
            </li>
            <li>
              <span className="bullet-dot" />
              <span>
                <strong>One-size-fits-all wellness advice:</strong> generic
                checklists. We respect your context—work, family, risk, labs.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function SectionFounder() {
  return (
    <section className="section" id="founder">
      <div className="section-header">
        <div className="section-kicker">Founder & ethos</div>
        <h2 className="section-title">
          Built by someone who lives this, not someone who discovered a niche.
        </h2>
        <p className="section-subtitle">
          Eonic started as a private protocol for one family—then close friends,
          then a quiet circle of operators. The public version is simply the
          same care, packaged and scaled.
        </p>
      </div>

      <div className="split">
        <div className="founder-card">
          <div className="founder-name">Aditya</div>
          <div className="founder-role">
            Founder, Eonic • Builder & investor, India-based
          </div>
          <p className="card-body">
            I&apos;ve spent years helping companies grow and founders raise
            capital, while running my own stack in the background—first for
            myself, then for my partner Anu, and now for our son.
          </p>
          <p className="card-body">
            Eonic exists because high-agency people keep asking the same
            question: "I know I should do something about my biology, but I
            don&apos;t have the cognition or time to manage a full protocol. Can
            someone just do it properly for me?"
          </p>
          <p className="card-body">
            This is that "someone". No hype, no shortcuts, no pretending
            pills can save you. Just a system that respects your reality and the
            science.
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: "1rem", marginBottom: 8 }}>Ethos</h3>
          <ul className="bullet-list">
            <li>
              <span className="bullet-dot" />
              <span>Truth-first. If something doesn&apos;t work, we say so.</span>
            </li>
            <li>
              <span className="bullet-dot" />
              <span>
                Anti-BS. No magical thinking, no borrowed lab coats, no
                influencer-led formulations.
              </span>
            </li>
            <li>
              <span className="bullet-dot" />
              <span>
                Built for people who are already taking their lives seriously
                and want their biology to match.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function SectionRoadmap() {
  return (
    <section className="section" id="roadmap">
      <div className="section-header">
        <div className="section-kicker">Where this is going</div>
        <h2 className="section-title">
          The Baseline is the first layer of a much larger OS.
        </h2>
        <p className="section-subtitle">
          The public product starts with a pill-first protocol. The internal map
          goes a lot further: Eonic as the interface between your body,
          interventions and intelligent orchestration.
        </p>
      </div>

      <ul className="roadmap-list">
        <li className="roadmap-item">
          <span className="text-accent">Now ·</span> Eonic Baseline: stable,
          pill-first protocol for high-agency people.
        </li>
        <li className="roadmap-item">
          <span className="text-accent">Next ·</span> Deeper personalisation
          using labs you already do and wearables you already wear.
        </li>
        <li className="roadmap-item">
          <span className="text-accent">Later ·</span> An AI health agent that
          sits between your data, your protocols and your real life—and quietly
          keeps you on the best available path.
        </li>
      </ul>

      <p className="section-subtitle">
        We won&apos;t over-promise timelines. The Baseline is step one: a
        tangible, near-term upgrade you can feel within weeks, that sets the
        foundation for everything beyond.
      </p>
    </section>
  );
}

function SectionFAQ() {
  return (
    <section className="section" id="faq">
      <div className="section-header">
        <div className="section-kicker">FAQ</div>
        <h2 className="section-title">A few things you might be wondering.</h2>
      </div>

      <div className="faq-grid">
        <div>
          <div className="faq-question">Is this a replacement for my doctor?</div>
          <div className="faq-answer">
            No. Eonic is not a medical service and does not diagnose, treat or
            cure disease. We operate in the 5–10% biochemical space that
            supplements can influence and expect you to continue working with
            your own clinicians.
          </div>
        </div>
        <div>
          <div className="faq-question">
            Do you use exotic or experimental compounds?
          </div>
          <div className="faq-answer">
            No. We start with well-studied, legal, evidence-backed nutrients and
            compounds. No grey-market research chemicals or performance drugs.
          </div>
        </div>
        <div>
          <div className="faq-question">Is this vegetarian / vegan friendly?</div>
          <div className="faq-answer">
            The Baseline is designed with Indian dietary patterns in mind and
            defaults to vegetarian-friendly formulations where possible. Specific
            details will be shared before you confirm your cohort.
          </div>
        </div>
        <div>
          <div className="faq-question">Who is this not for?</div>
          <div className="faq-answer">
            If you&apos;re pregnant, dealing with serious illness, or on complex
            medication regimens, this is not the right starting point. Eonic is
            built first for otherwise-healthy adults who want to upgrade
            performance and long-run healthspan.
          </div>
        </div>
        <div>
          <div className="faq-question">Will you guarantee specific results?</div>
          <div className="faq-answer">
            Biology is individual, so guarantees would be dishonest. We design
            for high expected value: better energy stability, sleep inputs,
            cognitive output and lab trends over time. We&apos;ll be explicit
            about what we can and can&apos;t influence.
          </div>
        </div>
        <div>
          <div className="faq-question">When is the first public cohort?</div>
          <div className="faq-answer">
            We&apos;re assembling a small early cohort to run the first full
            Baseline protocols. Join the waitlist and we&apos;ll share details
            as soon as the next cohort opens.
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionWaitlist() {
  return (
    <section className="section" id="waitlist">
      <div className="section-header">
        <div className="section-kicker">Early access</div>
        <h2 className="section-title">
          If you&apos;ve been meaning to take your biology seriously, start
          here.
        </h2>
        <p className="section-subtitle">
          Share a few details and we&apos;ll reach out as we put together the
          first cohorts for Eonic Baseline. No spam, no daily emails—just
          concrete next steps when we&apos;re ready.
        </p>
      </div>

      <div className="form-card">
        <form
          className="form-row"
          method="POST"
          action="https://formspree.io/f/your-form-id"
        >
          {/* Replace the action URL with your chosen form backend or API */}
          <div className="form-row form-row-inline">
            <div style={{ flex: 1 }}>
              <label className="label" htmlFor="name">
                Name
              </label>
              <input
                className="input"
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                className="input"
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="label" htmlFor="context">
              What best describes you? (optional)
            </label>
            <input
              className="input"
              id="context"
              name="context"
              type="text"
              placeholder="e.g. Founder, operator, consultant, senior IC..."
            />
          </div>

          <div>
            <label className="label" htmlFor="notes">
              Anything else you&apos;d like us to know? (optional)
            </label>
            <textarea
              className="textarea"
              id="notes"
              name="notes"
              placeholder="Current challenges, goals, constraints..."
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              marginTop: 8
            }}
          >
            <button className="btn btn-primary" type="submit">
              Join the Baseline waitlist
            </button>
            <p className="form-note">
              By submitting, you agree to us emailing you about Eonic. No third-party
              sharing, ever.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} Eonic. All rights reserved.</div>
      <div className="footer-links">
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
      </div>
    </footer>
  );
}
