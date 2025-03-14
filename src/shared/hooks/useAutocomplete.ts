import { useQuery } from "@tanstack/react-query";
import { AutocompleteResponseSchema } from "./useAutocomplete.schema";

export const useAutocomplete = (searchTerm: string) => {
  return useQuery({
    queryKey: ["autocomplete", searchTerm],
    queryFn: async () => {
      const response = await fetch(
        "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
      );

      const rawData = await response.json();
      const data = AutocompleteResponseSchema.parse(rawData);

      return data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    enabled: searchTerm.length > 0,
  });
};
