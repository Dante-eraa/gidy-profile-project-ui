import { useState } from "react";
import { Pencil, CirclePlus } from "lucide-react";
import { useGetCertificationsQuery } from "../../services/certificationApi";
import CertificationModal from "./CertificationModal";

function formatDate(date) {
  if (!date) return "No Expiry";
  return new Date(date).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

export default function CertificationCard() {
  const { data, isLoading } = useGetCertificationsQuery();
  const certifications = data?.data || [];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-sm font-semibold text-gray-900">
            Certifications
          </h4>

          <CirclePlus
            size={18}
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            onClick={() => {
              setSelectedCert(null);
              setIsOpen(true);
            }}
          />
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

            <Pencil
              size={16}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => {
                setSelectedCert(cert);
                setIsOpen(true);
              }}
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <CertificationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          certification={selectedCert}
        />
      )}
    </>
  );
}
