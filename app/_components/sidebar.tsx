import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SidebarButton from "./ui/sidebar-button";

const Sidebar = () => {
  return (
    <div
      className="h-screen w-[440px] shadow-lg"
      style={{
        background:
          "linear-gradient(-45deg, #bc91e4, #ebd8df,  #f2ebfc, #D5F0E8)",
      }}
    >
      <div className="mb-6 flex items-center gap-4 px-8 pt-8">
        <div className="relative h-28 w-28">
          <div className="absolute inset-0 animate-rotate_border rounded-full bg-gradient-to-r from-purple-300 to-gray-300"></div>
          <div className="absolute inset-2 flex items-center justify-center overflow-hidden rounded-full bg-white">
            <img
              src="/img.png"
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
        </div>
        <h1 className="text-[15px] text-slate-600">
          Carol <strong className="font-bold"> correia </strong>
        </h1>
      </div>
      <div className="flex flex-col gap-3 p-3">
        <SidebarButton href="/">
          <LayoutGridIcon size={18} /> Inicio
        </SidebarButton>

        <SidebarButton href="/products">
          <PackageIcon size={18} /> Clientes
        </SidebarButton>

        <SidebarButton href="/sales">
          <ShoppingBasketIcon size={18} /> Serviços
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
