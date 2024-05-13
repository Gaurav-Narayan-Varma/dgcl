"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import Image from "next/image";

export default function NavBar() {
  return (
    <main
      id="navbar"
      className="flex flex-row justify-between items-center"
      style={{
        paddingTop: "9px",
        paddingBottom: "9px",
        height: "55.03px",
      }}
    >
      <section id="logo" className="flex flex-col">
        <div className="flex flex-row justify-between space-x-1">
          <div className="flex">
            <Image
              src="/logo.png"
              className="self-center"
              width={37}
              height={30}
              alt="DGCL logo"
            />
          </div>
          <div>
            <div
              className="font-bold text-3xl tracking-widest"
              style={{ height: "30px" }}
            >
              DGCL
            </div>
            <div
              className="italic"
              style={{ width: "109px", fontSize: ".6rem" }}
            >
              Fractional excellence
            </div>
          </div>
        </div>
      </section>
      <Sheet>
        <SheetTrigger>
          {" "}
          <section id="hamburger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              style={{ color: "#4c40f7" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </section>
        </SheetTrigger>
        <SheetContent>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink
                    href="/demand-generation"
                    className="text-nowrap"
                  >
                    Demand Generation
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </SheetContent>
      </Sheet>
    </main>
  );
}
