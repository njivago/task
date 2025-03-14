import { memo } from "react";

type TagDropdownProps = {
  value: string | number;
  category: string;
  onValueChange: (value: string) => void;
  isOpen: boolean;
};

export const TagDropdown = memo(
  ({ value, category, onValueChange, isOpen }: TagDropdownProps) => (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      className="absolute top-full mt-1 right-0 w-48 bg-white border rounded-lg shadow-lg z-10"
    >
      <form className="p-3" onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend className="sr-only">Tag Value Editor</legend>
          <div className="mb-2">
            <label
              htmlFor="tag-value"
              className="text-sm text-gray-600 block mb-1"
            >
              Value:
            </label>
            <input
              id="tag-value"
              type="text"
              value={value}
              onChange={(e) => onValueChange(e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
              aria-label="Tag value"
            />
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Category:</span>
            <span role="status" aria-live="polite">
              {" "}
              {category}
            </span>
          </div>
        </fieldset>
      </form>
    </div>
  )
);

TagDropdown.displayName = "TagDropdown";
