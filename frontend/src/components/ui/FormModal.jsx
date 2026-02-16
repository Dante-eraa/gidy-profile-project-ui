export default function FormModal({
  title,
  children,
  onClose,
  isSubmitting,
  submitLabel = "ADD",
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        <div
          className="
            w-full
            max-w-lg
            bg-white
            rounded-xl
            shadow-xl
            px-5 sm:px-8
            py-6 sm:py-8
            max-h-[90vh]
            overflow-y-auto
            animate-fadeIn
          "
        >
          {/* TITLE */}
          <h2 className="text-[16px] font-semibold text-gray-400 mb-6">
            {title}
          </h2>

          {/* BODY */}
          <div className="space-y-5">{children}</div>

          {/* FOOTER */}
          <div className="flex  justify-end gap-4  mt-8">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="
                text-[13px]
                font-medium
                text-[#5F6B7A]
                hover:text-[#2F3A4C]
               
              "
            >
              CANCEL
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                min-w-[88px]
                h-[36px]
                px-5
                text-[13px]
                font-normal
                rounded-md
               bg-sky-100
                    text-sky-400
                    hover:bg-sky-200
                    disabled:bg-sky-300
                flex items-center justify-center gap-2
                transition-colors
               
              "
            >
              {isSubmitting && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
