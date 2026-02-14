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

  const baseInput =
    "w-full h-[40px] px-[12px] border border-[#D6DBE1] rounded-[6px] text-[13px] bg-white focus:outline-none focus:ring-1 focus:ring-[#0059D6] focus:border-[#0059D6]";

  if (type === "select") {
    return (
      <div>
        <label className="block text-[13px] font-medium text-[#5F6B7A] mb-[6px]">
          {label}
          {required && <span className="text-[#E5484D]"> *</span>}
        </label>

        <select {...field} disabled={disabled} className={baseInput}>
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className="flex items-center gap-[8px]">
        <input
          {...field}
          type="checkbox"
          checked={field.value}
          className="w-[16px] h-[16px] accent-[#0059D6]"
        />
        <label className="text-[13px] text-[#5F6B7A]">{label}</label>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-[13px] font-medium text-[#5F6B7A] mb-[6px]">
        {label}
        {required && <span className="text-[#E5484D]"> *</span>}
      </label>

      <input {...field} type={type} disabled={disabled} className={baseInput} />
    </div>
  );
}
