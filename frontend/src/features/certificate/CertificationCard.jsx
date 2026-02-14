import { useState } from "react";
import { MoreVertical, CirclePlus } from "lucide-react";
import toast from "react-hot-toast";
import {
  useGetCertificationsQuery,
  useGetPublicCertificationsQuery,
  useDeleteCertificationMutation,
} from "../../services/certificationApi";
import CertificationModal from "./CertificationModal";

function formatDate(date) {
  if (!date) return "No Expiry";
  return new Date(date).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

export default function CertificationCard({ profileId, isOwner }) {
  const { data, isLoading } = isOwner
    ? useGetCertificationsQuery()
    : useGetPublicCertificationsQuery(profileId);

  const certifications = data?.data || [];

  const [deleteCertification] = useDeleteCertificationMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-sm font-semibold text-gray-900">
            Certifications
          </h4>

          {isOwner && (
            <CirclePlus
              size={18}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => {
                setSelectedCert(null);
                setIsOpen(true);
              }}
            />
          )}
        </div>

        {certifications.map((cert) => (
          <div key={cert.id} className="flex justify-between items-start mb-5">
            <div>
              <h5 className="text-[14px] font-medium text-[#2F3A4C]">
                {cert.title}
              </h5>

              <p className="text-[13px] text-[#5F6B7A]">{cert.issuer}</p>

              <p className="text-[12px] text-[#9CA3AF] mt-1">
                {formatDate(cert.issueDate)} —{" "}
                {cert.expiryDate ? formatDate(cert.expiryDate) : "Present"}
              </p>

              {cert.certificateUrl && (
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-[#0059D6] mt-1 inline-block"
                >
                  View Certificate
                </a>
              )}
            </div>

            {isOwner && (
              <div className="relative">
                <MoreVertical
                  size={18}
                  className="text-gray-400 cursor-pointer"
                  onClick={() =>
                    setOpenMenuId(openMenuId === cert.id ? null : cert.id)
                  }
                />

                {openMenuId === cert.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-md z-10">
                    <button
                      onClick={() => {
                        setSelectedCert(cert);
                        setIsOpen(true);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setDeleteTarget(cert);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isOwner && isOpen && (
        <CertificationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          certification={selectedCert}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
          <div className="w-[420px] bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Delete Certification
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">{deleteTarget.title}</span>{" "}
              certification?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  try {
                    await deleteCertification(deleteTarget.id).unwrap();
                    toast.success("Certification deleted successfully");
                    setDeleteTarget(null);
                  } catch (error) {
                    toast.error(
                      error?.data?.message || "Failed to delete certification",
                    );
                  }
                }}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
