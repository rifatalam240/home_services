import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { FaTools, FaStar, FaUsers, FaUserTie } from "react-icons/fa";

const stats = [
  {
    icon: <FaTools className="text-blue-500 text-6xl" />,
    value: 150,
    label: "Total Services",
  },
  {
    icon: <FaStar className="text-yellow-400 text-6xl" />,
    value: 520,
    label: "Total Reviews",
  },
  {
    icon: <FaUsers className="text-green-500 text-6xl" />,
    value: 2400,
    label: "Happy Customers",
  },
  {
    icon: <FaUserTie className="text-purple-500 text-6xl" />,
    value: 120,
    label: "Skilled Staffs",
  },
];

export default function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true, // একবারই animation হবে
    threshold: 0.2,
  });

  return (
    <div className=" py-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl text-[#e3006e] font-bold">We Provide Best Home Repair Services</h2>
        <p className="text-gray-400">
          Our platform connects you with experienced repair professionals for all your home service needs — at your convenience.
        </p>
      </div>
      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center"
          >
            {stat.icon}
            <h3 className="text-3xl text-black font-bold mt-4">
              {inView ? <CountUp start={0} end={stat.value} duration={2} /> : 0} +
            </h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
