"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ServiceMetaData } from "@/lib/definitions";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [serviceData, setServiceData] = useState<ServiceMetaData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/service-metadata`, {
        method: "GET",
        headers: {},
      });
      if (response.ok) {
        const result = await response.json();
        setServiceData(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Close drawer on route change
    setIsDrawerOpen(false);
  }, [pathname]);

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
      {/* DGCL Logo */}
      <section id="logo" className="flex flex-col">
        <Link href="/" className="flex flex-row justify-between space-x-1">
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
        </Link>
      </section>

      {/* Side Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        {/* Hamburger */}
        <SheetTrigger asChild>
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="focus:outline-none"
          >
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
          </button>
        </SheetTrigger>
        {/* Drawer Content */}
        <SheetContent>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {serviceData?.map((serviceObject) => (
                    <NavigationMenuLink key={serviceObject.slug}>
                      <Link href={`/service/${serviceObject.slug}`}>
                        {serviceObject.name}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </SheetContent>
      </Sheet>
    </main>
  );
}
