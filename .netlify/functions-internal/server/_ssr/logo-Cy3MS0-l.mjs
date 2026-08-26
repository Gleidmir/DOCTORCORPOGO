import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function BarberGoLogo({ className = "w-12 h-12", animate = true }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative flex items-center justify-center ${animate ? "animate-pulse" : ""} ${className}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: "/logo.png",
      className: "w-full h-full object-cover rounded-full border border-zinc-800/80 shadow-md",
      alt: "DoctorCorpo GO"
    }
  ) });
}
export {
  BarberGoLogo as B
};
