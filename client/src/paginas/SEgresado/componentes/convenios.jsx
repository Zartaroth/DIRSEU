import { Globe } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function ConveniosDashboard() {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/Home/Egresado/convenios');
  };

  return (
    <div className="items-center px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ConvenioCard
          icon={<Globe className="w-24 h-24 text-blue-500" />}
          title="Internacionales"
          count={34}
        />
        <ConvenioCard
          icon={
            <img
              src="https://th.bing.com/th/id/OIP.rQldFV0ksGaZ3lWWMXfRFgAAAA?pid=ImgDet&w=184&h=241&c=7&dpr=1,3"
              className="w-24 h-24"
              alt="Mapa de Perú"
              style={{ width: "96px", height: "96px", margin: "0 auto" }}
            />
          }
          title="Nacionales"
          count={13}
        />
        <ConvenioCard
          icon={
            <img
              src="https://media.istockphoto.com/id/1322661954/es/vector/mapa-de-cusco.jpg?s=612x612&w=0&k=20&c=QY51uqYJA_k3gOoOvHXP2zoh8r7MNj_iikAU_yc5TAo="
              alt="Regionales"
              className="w-24 h-24"
            />
          }
          title="Regionales"
          count={4}
        />
        <ConvenioCard
          icon={
            <svg
              className="w-24 h-24"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="10" y="10" width="80" height="80" fill="#0EA5E9" />
              <rect x="110" y="10" width="80" height="80" fill="#0EA5E9" />
              <rect x="10" y="110" width="80" height="80" fill="#0EA5E9" />
              <rect x="110" y="110" width="80" height="80" fill="#7DD3FC" />
            </svg>
          }
          title="Locales"
          count={13}
        />
      </div>
      
    </div>
  );
}

function ConvenioCard({ icon, title, count }) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">{icon}</div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-lg text-blue-500 font-medium">{count} Convenios</p>
    </div>
  );
}
