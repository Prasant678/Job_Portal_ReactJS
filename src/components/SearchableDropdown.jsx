import React, { useState, useEffect, useRef } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const SearchableDropdown = ({ options, placeholder, onSelect, value }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (opt) => {
    onSelect(opt.value);
    setOpen(false);
    setSearch("");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-3/4">
      <div
        className="flex items-center justify-between h-10 w-full px-3 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setOpen(!open)}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : <span className="opacity-70">{placeholder}</span>}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 opacity-50" />
        ) : (
          <ChevronDown className="h-4 w-4 opacity-50" />
        )}
      </div>

      {open && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md">
          <input
            type="text"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none border-b border-border"
          />

          <ul className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => handleSelect(opt)}
                  className={`flex justify-between items-center cursor-pointer select-none px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${selectedOption?.value === opt.value ? "font-semibold" : "" }`}
                >
                  {opt.label}
                  {selectedOption?.value === opt.value && (
                    <Check strokeWidth={3.0} className="h-4 w-4 text-accent-foreground" />
                  )}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-muted-foreground">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;