import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SidebarButton from "./ui/sidebar-button";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div
      className="hidden h-screen w-full flex-col shadow-lg md:flex md:w-[440px]"
      style={{
        background:
          "linear-gradient(-45deg, #bc91e4, #ebd8df, #f2ebfc, #D5F0E8)",
      }}
    >
      <div className="mb-6 flex items-center gap-4 px-6 pt-6 md:px-8 md:pt-8">
        <div className="relative h-24 w-24 md:h-28 md:w-28">
          <div className="animate-rotate_border absolute inset-0 rounded-full bg-gradient-to-r from-purple-300 to-gray-300"></div>
          <div className="absolute inset-2 flex items-center justify-center overflow-hidden rounded-full bg-white">
            <Image
              src="/img.png"
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
        </div>
        <h1 className="text-sm text-slate-600 md:text-[15px]">
          Carol <strong className="font-bold"> correia </strong>
        </h1>
      </div>

      <nav className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 pb-6 md:px-4">
        <SidebarButton href="/">
          <LayoutGridIcon size={18} /> Inicio
        </SidebarButton>

        <SidebarButton href="/products">
          <PackageIcon size={18} /> Clientes
        </SidebarButton>

        <SidebarButton href="/sales">
          <ShoppingBasketIcon size={18} /> Serviços
        </SidebarButton>
      </nav>
    </div>
  );
};

export default Sidebar;
