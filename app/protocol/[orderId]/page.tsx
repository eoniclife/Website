import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { isValidUUID } from "@/lib/validation";
import { Nav } from "@/components/shared/Nav";
import { Footer } from "@/components/shared/Footer";
import { ModuleSection } from "@/components/recommendation/ModuleSection";
import { baseIngredients } from "@/lib/recommendation/ingredients";
import { archetypes } from "@/lib/recommendation/archetypes";
import { modules } from "@/lib/recommendation/modules";
import type { RecommendationResult, DimensionScores } from "@/lib/quiz/types";

interface ProtocolPageProps {
  params: Promise<{ orderId: string }>;
}

interface OrderRecord {
  id: string;
  archetype: string | null;
  protocol_config: Record<string, unknown> | null;
  quiz_session_id: string | null;
  user_id: string | null;
}

interface QuizSessionRecord {
  scores: DimensionScores | null;
  is_vegetarian: boolean | null;
  primary_module: string | null;
  secondary_module: string | null;
}

const emptyScores: DimensionScores = {
  energy: 0,
  focus: 0,
  stress: 0,
  sleep: 0,
  metabolic: 0,
  gut: 0,
  recovery: 0,
};

const dimensionLabels: Record<keyof DimensionScores, string> = {
  energy: "Energy",
  focus: "Focus",
  stress: "Stress",
  sleep: "Sleep",
  metabolic: "Metabolic",
  gut: "Gut",
  recovery: "Recovery",
};

function normalizeProtocolConfig(raw: unknown): {
  archetype?: string;
  primaryModule?: string | null;
  secondaryModule?: string | null;
  isVegetarian?: boolean;
} {
  if (!raw || typeof raw !== "object") {
    return {};
  }

  const record = raw as Record<string, unknown>;

  return {
    archetype: typeof record.archetype === "string" ? record.archetype : undefined,
    primaryModule: typeof record.primaryModule === "string" ? record.primaryModule : null,
    secondaryModule:
      typeof record.secondaryModule === "string"
        ? record.secondaryModule
        : typeof record.secondary_module === "string"
          ? record.secondary_module
          : null,
    isVegetarian: typeof record.isVegetarian === "boolean" ? record.isVegetarian : undefined,
  };
}

function normalizeScores(raw: unknown): DimensionScores {
  if (!raw || typeof raw !== "object") {
    return emptyScores;
  }

  const input = raw as Record<string, unknown>;

  return {
    energy: typeof input.energy === "number" ? input.energy : 0,
    focus: typeof input.focus === "number" ? input.focus : 0,
    stress: typeof input.stress === "number" ? input.stress : 0,
    sleep: typeof input.sleep === "number" ? input.sleep : 0,
    metabolic: typeof input.metabolic === "number" ? input.metabolic : 0,
    gut: typeof input.gut === "number" ? input.gut : 0,
    recovery: typeof input.recovery === "number" ? input.recovery : 0,
  };
}

function hasNonZeroScore(score: DimensionScores): boolean {
  return Object.values(score).some((value) => value > 0);
}

function ErrorState() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-eonic-bg px-5 py-10">
      <section className="surface-panel max-w-2xl rounded-[28px] px-8 py-12 text-center">
        <p className="font-display text-4xl italic text-eonic-text">This protocol could not be loaded.</p>
        <p className="mt-4 text-lg leading-8 text-eonic-text-2">
          The order link may be invalid, or this protocol was not fully generated yet. Start from the quiz to create a new one.
        </p>
        <Link href="/quiz" className="mt-8 inline-block text-eonic-teal">
          Return to the quiz
        </Link>
      </section>
    </main>
  );
}

function buildFallbackRecommendation({ order, config, quizSession }: { order: OrderRecord; config: ReturnType<typeof normalizeProtocolConfig>; quizSession: QuizSessionRecord | null }): RecommendationResult {
  return {
    scores: normalizeScores(quizSession?.scores ?? null),
    archetype: config.archetype ?? order.archetype ?? "FOUNDATION_BUILDER",
    primaryModule:
      config.primaryModule ??
      (quizSession?.primary_module ? String(quizSession.primary_module) : null),
    secondaryModule:
      config.secondaryModule ??
      (quizSession?.secondary_module ? String(quizSession.secondary_module) : null),
    isVegetarian: config.isVegetarian ?? !!(quizSession?.is_vegetarian ?? false),
  };
}

export default async function ProtocolSharePage({ params }: ProtocolPageProps) {
  const { orderId } = await params;
  if (!isValidUUID(orderId)) {
    return <ErrorState />;
  }

  const client = createServerClient();
  const { data: rawOrder, error: orderError } = await client
    .from("orders")
    .select("id, archetype, protocol_config, quiz_session_id, user_id")
    .eq("id", orderId)
    .maybeSingle();

  if (orderError || !rawOrder) {
    return <ErrorState />;
  }

  const order: OrderRecord = {
    id: String(rawOrder.id),
    archetype: typeof rawOrder.archetype === "string" ? rawOrder.archetype : null,
    protocol_config: rawOrder.protocol_config as Record<string, unknown> | null,
    quiz_session_id: rawOrder.quiz_session_id ? String(rawOrder.quiz_session_id) : null,
    user_id: rawOrder.user_id ? String(rawOrder.user_id) : null,
  };

  const config = normalizeProtocolConfig(order.protocol_config);

  let quizSession: QuizSessionRecord | null = null;

  if (order.quiz_session_id) {
    const { data: rowById } = await client
      .from("quiz_sessions")
      .select("scores, is_vegetarian, primary_module, secondary_module")
      .eq("id", order.quiz_session_id)
      .maybeSingle();

    if (rowById) {
      quizSession = {
        scores: rowById.scores as DimensionScores | null,
        is_vegetarian:
          typeof rowById.is_vegetarian === "boolean" ? rowById.is_vegetarian : false,
        primary_module:
          typeof rowById.primary_module === "string" ? rowById.primary_module : null,
        secondary_module:
          typeof rowById.secondary_module === "string" ? rowById.secondary_module : null,
      };
    }
  }

  if (!quizSession && order.user_id) {
    const { data: rowsByUser } = await client
      .from("quiz_sessions")
      .select("scores, is_vegetarian, primary_module, secondary_module")
      .eq("user_id", order.user_id)
      .not("completed_at", "is", null)
      .order("completed_at", { ascending: false })
      .limit(1);

    if (Array.isArray(rowsByUser) && rowsByUser.length > 0) {
      const latest = rowsByUser[0];
      quizSession = {
        scores: latest.scores as DimensionScores | null,
        is_vegetarian:
          typeof latest.is_vegetarian === "boolean" ? latest.is_vegetarian : false,
        primary_module:
          typeof latest.primary_module === "string" ? latest.primary_module : null,
        secondary_module:
          typeof latest.secondary_module === "string" ? latest.secondary_module : null,
      };
    }
  }

  const recommendation = buildFallbackRecommendation({ order, config, quizSession });
  const archetypeRecord = archetypes[recommendation.archetype] ?? archetypes.FOUNDATION_BUILDER;
  const moduleIngredients = [recommendation.primaryModule, recommendation.secondaryModule]
    .filter((moduleId): moduleId is string => Boolean(moduleId))
    .map((moduleId) => modules[moduleId])
    .filter((module): module is NonNullable<typeof module> => Boolean(module));
  const dimensionScores = normalizeScores(quizSession?.scores ?? null);

  return (
    <main className="min-h-screen bg-eonic-bg px-5 py-10 md:px-8">
      <Nav />
      <div className="mx-auto max-w-5xl space-y-10 pt-8">
        <header className="space-y-5">
          <p className="font-display text-sm uppercase tracking-[0.28em] text-eonic-gold">Your Eonic protocol</p>
          <h1 className="font-display text-5xl text-eonic-text">{archetypeRecord.name}</h1>
          <p className="max-w-3xl text-lg leading-8 text-eonic-text-2">{archetypeRecord.description}</p>
        </header>

        {hasNonZeroScore(dimensionScores) ? (
          <section className="rounded-[24px] border border-eonic-border bg-eonic-bg-2 px-7 py-7">
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-eonic-gold">Hidden dimensions</p>
            <h2 className="mt-2 font-display text-3xl text-eonic-text">Your quiz signal profile</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-eonic-text-2">
              This is a calm, internal read of the dimensions that shaped this protocol.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {(Object.entries(dimensionScores) as [keyof DimensionScores, number][]).map(([key, value]) => (
                <div key={key} className="rounded-[14px] border border-eonic-border px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-eonic-text-2">{dimensionLabels[key]}</p>
                  <p className="mt-2 text-lg font-semibold text-eonic-text">{value}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <ModuleSection
          title="Your Eonic Baseline"
          subhead="Everyone starts here. This is what your biology needs regardless of everything else."
          ingredients={baseIngredients}
        />

        {moduleIngredients.map((module) => (
          <ModuleSection
            key={module.id}
            title={module.name}
            subhead={`Based on your answers, we've added ${module.name} to your protocol.`}
            ingredients={module.ingredients}
          />
        ))}

        <section className="rounded-[28px] border border-eonic-border bg-eonic-bg-2 px-7 py-8">
          <h2 className="font-display text-3xl text-eonic-text">Want your own protocol?</h2>
          <p className="mt-3 text-base leading-8 text-eonic-text-2">
            This is a share-only view. To generate your active quiz protocol,{" "}
            <Link href="/quiz" className="text-eonic-teal">
              take the quiz →
            </Link>
          </p>
        </section>
      </div>
      <Footer />
    </main>
  );
}
