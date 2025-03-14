import { create } from "zustand";
import * as math from "mathjs";
import { v4 as uuidv4 } from "uuid";

export type TTag = {
  id: string;
  name: string;
  category: string;
  value: string | number;
};

interface FormulaState {
  tags: TTag[];
  result: number | null;
  addTag: (tag: TTag) => void;
  addOperator: (operator: string) => void;
  removeTag: (index: number) => void;
  updateTagValue: (index: number, value: string | number) => void;
  calculateResult: () => void;
}

export const useFormulaStore = create<FormulaState>((set, get) => ({
  tags: [],
  result: null,
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  addOperator: (operator) =>
    set((state) => ({
      tags: [
        ...state.tags,
        {
          id: uuidv4(),
          name: operator,
          category: operator,
          value: operator,
        },
      ],
    })),
  removeTag: (index) =>
    set((state) => ({ tags: state.tags.filter((_, i) => i !== index) })),
  updateTagValue: (index, value) =>
    set((state) => ({
      tags: state.tags.map((tag, i) =>
        i === index && typeof tag !== "string" ? { ...tag, value } : tag
      ),
    })),
  calculateResult: () => {
    const { tags } = get();
    try {
      const formula = tags
        .map((tag) => (typeof tag === "string" ? tag : tag.value))
        .join(" ");
      const result = math.evaluate(formula);
      set({ result });
    } catch (error) {
      console.error("Calculation error:", error);
      set({ result: null });
    }
  },
}));
