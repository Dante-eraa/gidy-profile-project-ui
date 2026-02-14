import { useField } from "formik";

export default function InputField({
  label,
  name,
  type = "text",
  required = false,
  disabled = false,
  options = [],
}) {
  const [field, meta] = useField(name);

  const showError = meta.touched && meta.error;

  const baseInput = `
    w-full h-[40px] px-[12px]
    border rounded-[6px]
    text-[13px]
    focus:outline-none
    focus:ring-1
    focus:ring-[#0059D6]
    focus:border-[#0059D6]
    transition
  `;

  const normalBorder = "border-[#D6DBE1]";
  const errorBorder = "border-[#E5484D]";
  const disabledStyle = "bg-gray-100 text-gray-400 cursor-not-allowed";

  // ------------------------
  // CHECKBOX
  // ------------------------
  if (type === "checkbox") {
    return (
      <div>
        <div className="flex items-center gap-2">
          <input
            {...field}
            type="checkbox"
            checked={field.value}
            className="w-[16px] h-[16px] accent-[#0059D6]"
          />
          <label className="text-[13px] text-[#5F6B7A]">{label}</label>
        </div>
      </div>
    );
  }

  // ------------------------
  // SELECT
  // ------------------------
  if (type === "select") {
    return (
      <div>
        <label className="block text-[13px] font-medium text-[#5F6B7A] mb-[6px]">
          {label}
          {required && <span className="text-[#E5484D]"> *</span>}
        </label>

        <select
          {...field}
          disabled={disabled}
          className={`${baseInput}
            ${showError ? errorBorder : normalBorder}
            ${disabled ? disabledStyle : "bg-white"}
          `}
        >
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {showError && (
          <p className="text-[12px] text-[#E5484D] mt-1">{meta.error}</p>
        )}
      </div>
    );
  }

  // ------------------------
  // INPUT (default)
  // ------------------------
  return (
    <div>
      <label className="block text-[13px] font-medium text-[#5F6B7A] mb-[6px]">
        {label}
        {required && <span className="text-[#E5484D]"> *</span>}
      </label>

      <input
        {...field}
        type={type}
        disabled={disabled}
        className={`${baseInput}
          ${showError ? errorBorder : normalBorder}
          ${disabled ? disabledStyle : "bg-white"}
        `}
      />

      {showError && (
        <p className="text-[12px] text-[#E5484D] mt-1">{meta.error}</p>
      )}
    </div>
  );
}
