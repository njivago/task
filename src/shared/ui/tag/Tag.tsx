import { useState, useRef, useEffect, useCallback, memo } from "react";
import { TTag, useFormulaStore } from "@/store/formula";
import { TagDropdown } from "./TagDropdown";

type TagProps = {
  tag: TTag;
  index: number;
};

export const Tag = memo(({ tag, index }: TagProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { updateTagValue, calculateResult, removeTag } = useFormulaStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonId = `tag-button-${index}`;
  const dropdownId = `tag-dropdown-${index}`;

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleValueChange = useCallback(
    (value: string) => {
      updateTagValue(index, value);
      calculateResult();
    },
    [index, updateTagValue, calculateResult]
  );

  const toggleDropdown = useCallback(() => {
    setShowDropdown((prev) => !prev);
  }, []);

  const handleRemoveTag = () => {
    removeTag(index);
    calculateResult();
  };

  return (
    <div
      className="relative inline-flex items-center"
      ref={dropdownRef}
      role="group"
      aria-labelledby={buttonId}
    >
      <div className="bg-blue-100 rounded flex items-center justify-between gap-2">
        <span className="font-medium px-2" role="text">
          {tag.value}
        </span>
        <div>
          <button
            id={buttonId}
            onClick={toggleDropdown}
            className="p-1 text-gray-600 hover:bg-blue-400 focus:outline-none transition duration-200 ease-in-out "
            aria-expanded={showDropdown}
            aria-controls={dropdownId}
            aria-label={`Edit ${tag.name} value`}
          >
            <span className="text-xs" aria-hidden="true">
              ▼
            </span>
          </button>
          <button
            onClick={handleRemoveTag}
            className="text-red-600 hover:bg-red-200 p-1 transition duration-200 ease-in-out focus:outline-none"
            aria-label={`Remove ${tag.name}`}
          >
            <b>&times;</b>
          </button>
        </div>
      </div>

      {showDropdown && (
        <TagDropdown
          value={tag.value}
          category={tag.category}
          onValueChange={handleValueChange}
          isOpen={showDropdown}
        />
      )}
    </div>
  );
});

Tag.displayName = "Tag";
