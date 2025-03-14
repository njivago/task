import { useAutocomplete } from "@/hooks/useAutocomplete";
import { TTag, useFormulaStore } from "@/store/formula";
import { Tag } from "@/ui/tag";
import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const OPERATORS = ["+", "-", "*", "/", "^", "(", ")"];

export const FormulaInput: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { tags, result, addTag, addOperator, removeTag, calculateResult } =
    useFormulaStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: suggestions = [] } = useAutocomplete(inputValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d+$/.test(value)) {
      setInputValue(value);
      setShowSuggestions(true);
    } else {
      setInputValue(value);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && /^\d+$/.test(inputValue)) {
      addTag({
        id: Date.now().toString(),
        name: inputValue,
        category: "number",
        value: parseFloat(inputValue),
      });
      setInputValue("");
      calculateResult();
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      e.preventDefault();
      removeTag(tags.length - 1);
      calculateResult();
    } else if (OPERATORS.includes(e.key)) {
      e.preventDefault();
      addOperator(e.key);
      setInputValue("");
      setErrorMessage(null);
      calculateResult();
    }
  };

  const handleSuggestionClick = (suggestion: TTag) => {
    if (tags.length !== 0 && !OPERATORS.includes(tags[tags.length - 1].name)) {
      setErrorMessage(
        "You must add an operator before selecting a suggestion. Enter any operator to continue."
      );
      return;
    }

    addTag(suggestion);
    setInputValue("");
    setShowSuggestions(false);
    setErrorMessage(null);
    inputRef.current?.focus();
    calculateResult();
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="border rounded-lg p-2 flex flex-wrap gap-2 min-h-[48px] bg-white">
        {tags.map((tag, index) => (
          <Tag
            key={`${index}-${tag.category}`}
            tag={tag as TTag}
            index={index}
          />
        ))}
        <input
          ref={inputRef}
          type="text"
          className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-purple-600 placeholder-gray-400"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter formula..."
        />
      </div>

      {showSuggestions && inputValue && (
        <div className="mt-1 border border-gray-200 rounded-md shadow-sm max-h-60 overflow-y-auto bg-white">
          {suggestions.map((suggestion) => (
            <div
              key={uuidv4()}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion as TTag)}
            >
              {suggestion.name} ({suggestion.category})
            </div>
          ))}
        </div>
      )}

      {result !== null && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
          <span className="font-semibold">Result: </span>
          <span>{result}</span>
        </div>
      )}

      {errorMessage && (
        <div className="mt-2 error-message text-red-600">{errorMessage}</div>
      )}
    </div>
  );
};
