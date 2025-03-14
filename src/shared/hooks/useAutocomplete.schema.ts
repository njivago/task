import { object, string, union, number, null as znull, array } from "zod";

export const AutocompleteItemSchema = object({
  name: string(),
  category: string(),
  value: union([string(), number(), znull()]).optional(),
  id: string(),
});

export const AutocompleteResponseSchema = array(AutocompleteItemSchema);
