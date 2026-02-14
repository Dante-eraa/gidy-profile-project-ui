export default function FormModal({
  title,
  children,
  onClose,
  isSubmitting,
  submitLabel = "ADD",
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[1px]">
      <div
        className="
          h-full
          w-full
          flex
          items-center
          justify-center
          p-4
        "
      >
        <div
          className="
            w-full
            max-w-130
            bg-white
            rounded-lg
            shadow-[0_10px_35px_rgba(0,0,0,0.15)]
            px-5 sm:px-[32px]
            py-[24px] sm:py-[28px]
            max-h-[90vh]
            overflow-y-auto
          "
        >
          {/* TITLE */}
          <h2 className="text-[16px] font-semibold text-[#2F3A4C] mb-[24px]">
            {title}
          </h2>

          {/* BODY */}
          <div className="space-y-[20px]">{children}</div>

          {/* FOOTER */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-[12px] sm:gap-[16px] mt-[32px]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="
                text-[13px]
                font-medium
                text-[#5F6B7A]
                hover:text-[#2F3A4C]
                text-center
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
                px-[18px]
                text-[13px]
                font-medium
                rounded-[6px]
                bg-[#0059D6]
                text-white
                hover:bg-[#0047AB]
                disabled:bg-[#BFD4F6]
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
