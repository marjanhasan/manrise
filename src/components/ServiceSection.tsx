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
    title: "EASY RETURN POLICY!",
  },
  {
    id: 3,
    icon: <MdOutlineWorkspacePremium />,
    title: "PREMIUM QUALITY PRODUCT!",
  },
  {
    id: 4,
    icon: <RiCustomerService2Line />,
    title: "ONLINE SUPPORT 24/7!",
  },
];

export default function ServiceSection() {
  return (
    <section className="mb-[1px] grid grid-cols-2 gap-[1px] lg:grid-cols-4">
      {serviceData.map((service) => (
        <div
          key={service.id}
          className="flex flex-col items-center bg-[#282828] px-4 py-12 text-center"
        >
          {service.icon}
          <h2 className="text-lg text-white uppercase md:text-xl">
            {service.title}
          </h2>
        </div>
      ))}
    </section>
  );
}
