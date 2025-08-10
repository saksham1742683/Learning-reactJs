// TechStackBox.jsx
import { FaReact } from "react-icons/fa";
import { SiRedux, SiFirebase, SiRazorpay  } from "react-icons/si";
import { MdRoute } from "react-icons/md";
import { FaBell } from "react-icons/fa"; // bell for notifications


export default function TechStackBox() {
  const items = [
    { icon: <MdRoute size={24} />, text: "Routing with React Router" },
    { icon: <SiRedux size={24} />, text: "Redux for state management" },
    { icon: <SiFirebase size={24} />, text: "Firebase Authentication" },
    { icon: <FaBell size={24} />, text: "Toastify for visual alerts" },
    { icon: <SiRazorpay size={24} />, text: "Razorpay live integration" },
  ];

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl shadow-lg text-white max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        🚀 What I Practiced in This Project
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white/20 p-3 rounded-lg hover:bg-white/30 transition"
          >
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
