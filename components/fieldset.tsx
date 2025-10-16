import React from "react";

export const Field = ({ children }: { children?: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

export const Label = ({ children }: { children?: React.ReactNode }) => (
  <label className="mb-2 block text-sm font-medium text-gray-700">{children}</label>
);

export default Field;
