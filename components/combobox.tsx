import React from "react";

type ComboboxProps<T> = {
  name?: string;
  options: T[];
  displayValue: (item: T) => string;
  defaultValue?: T | null;
  children?: (item: T) => React.ReactNode;
};

export function Combobox<T extends { [key: string]: any }>({
  name,
  options,
  displayValue,
  defaultValue,
  children,
}: ComboboxProps<T>) {
  const [value, setValue] = React.useState<string>(
    defaultValue ? displayValue(defaultValue) : displayValue(options[0])
  );

  return (
    <div className="w-full">
      <select
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded border px-3 py-2"
      >
        {options.map((opt, i) => (
          <option key={i} value={displayValue(opt)}>
            {displayValue(opt)}
          </option>
        ))}
      </select>
      {/* render children for accessibility/templating, but not interactive */}
      <div className="sr-only" aria-hidden>
        {options.map((opt, i) => children?.(opt))}
      </div>
    </div>
  );
}

export const ComboboxLabel = ({ children }: { children?: React.ReactNode }) => (
  <span className="font-medium">{children}</span>
);

export const ComboboxOption = ({ children }: { children?: React.ReactNode; value?: any }) => (
  <span>{children}</span>
);

export default Combobox;
