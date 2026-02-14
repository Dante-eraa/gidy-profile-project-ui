import { useField } from "formik";

export default function SelectField({
  label,
  name,
  options,
  required = false,
}) {
  const [field, meta] = useField(name);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        {...field}
        className={`w-full h-12 px-4 border rounded-md text-sm
          focus:outline-none focus:ring-2 focus:ring-[#0059d6]
          ${meta.touched && meta.error ? "border-red-500" : "border-gray-300"}`}
      >
        <option value="">Select role</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs mt-1">{meta.error}</p>
      )}
    </div>
  );
}
