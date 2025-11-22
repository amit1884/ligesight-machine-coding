import { useState, useRef, useEffect } from "react";
import "./dropdown.css";

export interface DropdownOption {
  label: string;
  value: string | number;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string | number;                      
  placeholder?: string;
  onChange: (value: string | number) => void;   
  width?: number | string;
}

export default function CustomDropdown({
  options,
  value,
  placeholder = "Select...",
  onChange,
  width = 180,
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // 🔥 FIX: Compare values safely
  const selected = options.find(
    (o) => String(o.value) === String(value)
  );

  return (
    <div className="dropdown-container" style={{ width }} ref={ref}>
      <div
        className={`dropdown-header ${open ? "open" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <span className={`arrow ${open ? "rotate" : ""}`}>▼</span>
      </div>

      {open && (
        <div className="dropdown-list">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`dropdown-item ${
                String(opt.value) === String(value) ? "selected" : ""
              }`}
              onClick={() => {
                onChange(opt.value);   
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
