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
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ServiceMetaData } from "@/lib/definitions";

export default function AdminNavBar() {
  const [serviceData, setServiceData] = useState<ServiceMetaData | null>(null);

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
      {/* LOGO */}
      <Link href="/admin" id="logo" className="flex flex-col">
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
          <div className="flex items-center">
            <div className="font-semibold text-2xl">DGCL Admin</div>
          </div>
        </div>
      </Link>
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
                  {serviceData?.map((serviceObject) => {
                    return (
                      <NavigationMenuLink
                        key={`${serviceObject.name}`}
                        href={`/admin/edit/${serviceObject.name}`}
                      >
                        {serviceObject.name}
                      </NavigationMenuLink>
                    );
                  })}
                  <NavigationMenuLink
                    href="/admin/create-page"
                    className="flex justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
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
