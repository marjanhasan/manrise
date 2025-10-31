import { FaTruckFast } from "react-icons/fa6";
import { TbTruckReturn } from "react-icons/tb";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";

const serviceData = [
  {
    id: 1,
    icon: <FaTruckFast />,
    title: "Fastest Shipping Countrywide!",
  },
  {
    id: 2,
    icon: <TbTruckReturn />,
    title: "Easy Return Policy!",
  },
  {
    id: 3,
    icon: <MdOutlineWorkspacePremium />,
    title: "Premium Quality Product!",
  },
  {
    id: 4,
    icon: <RiCustomerService2Line />,
    title: "Online Support 24/7!",
  },
];

export default function ServiceSection() {
  return (
    <section className="grid grid-cols-2 gap-4 bg-[#f9f9f9] px-4 py-12 lg:grid-cols-4 lg:gap-6">
      {serviceData.map((service) => (
        <div
          key={service.id}
          className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 text-center shadow-sm transition-transform duration-300 hover:scale-[1.03]"
        >
          <div className="mb-3 text-3xl text-gray-500 sm:text-4xl lg:text-5xl">
            {service.icon}
          </div>
          <h2 className="text-sm font-medium text-gray-700 uppercase sm:text-base md:text-lg lg:text-xl">
            {service.title}
          </h2>
        </div>
      ))}
    </section>
  );
}
