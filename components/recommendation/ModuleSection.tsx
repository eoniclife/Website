import { IngredientCard } from "@/components/recommendation/IngredientCard";
import type { Ingredient } from "@/lib/recommendation/types";

export function ModuleSection({
  title,
  subhead,
  ingredients,
}: {
  title: string;
  subhead: string;
  ingredients: Ingredient[];
}) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="font-display text-3xl text-eonic-text">{title}</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-eonic-text-2">{subhead}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {ingredients.map((ingredient) => (
          <IngredientCard key={ingredient.name} ingredient={ingredient} />
        ))}
      </div>
    </section>
  );
}
