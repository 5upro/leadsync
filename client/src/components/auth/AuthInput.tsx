import type { FC } from "react";
import type { AuthInputProps } from "@/types/authComponents";

const AuthInput: FC<AuthInputProps> = ({
  label, id, type = "text", placeholder = "", value, error, onChange,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`
        w-full px-4 py-2.5 rounded-xl text-sm
        bg-gray-50 dark:bg-gray-800
        border ${error ? "border-red-400" : "border-gray-200 dark:border-gray-700"}
        text-gray-900 dark:text-white
        focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition
      `}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

export default AuthInput;
