"use client";

import Link from "next/link";
import { useCallback } from "react";
import clsx from "classnames";
import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "@/components/logo";

export type NavbarProps = JSX.IntrinsicElements["nav"] & {
  variant?: "hero" | "primary";
};

type NavbarItem = {
  name: string;
  href: string;
  current?: boolean;
};

const DisclosurePanel: React.FC<{ navigation: NavbarItem[] }> = ({
  navigation,
}) => (
  <Disclosure.Panel className="sm:hidden">
    <div className="space-y-1 px-2 pt-2 pb-3">
      {navigation.map((item) => (
        <Link href={item.href} key={item.name}>
          <Disclosure.Button
            className={clsx(
              item.current
                ? "bg-zinc-900 text-white"
                : "font-semibold text-zinc-300 hover:bg-gray-700 hover:text-white",
              "block rounded-md px-3 py-2 text-base font-medium"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </Disclosure.Button>
        </Link>
      ))}
    </div>
  </Disclosure.Panel>
);

type NavbarLinkProps = {
  item: NavbarItem;
};

const NavbarLink: React.FC<NavbarLinkProps> = ({ item }) => (
  <Link
    className={clsx(
      "transition-colors duration-200",
      item.current
        ? "bg-zinc-900 text-white"
        : "font-semibold text-zinc-300 hover:text-white hover:shadow-lg",
      "rounded-md px-3 py-2 text-sm font-medium"
    )}
    href={item.href}
    aria-current={item.current ? "page" : undefined}
  >
    {item.name}
  </Link>
);

const Navbar: React.FC<NavbarProps> = ({ variant = "primary", className }) => {
  const pathname = usePathname();

  const isCurrentPath = useCallback(
    (path: string) => path === pathname,
    [pathname]
  );

  const navigation = [
    {
      name: "Gateways",
      href: "/gateways",
      current: isCurrentPath("/gateways"),
    },
    {
      name: "Add Gateway",
      href: "/gateways/new",
      current: isCurrentPath("/gateways/new"),
    },
    {
      name: "About",
      href: "/about",
      current: isCurrentPath("/about"),
    },
  ] as NavbarItem[];

  return (
    <Disclosure
      as="nav"
      className={clsx(
        "relative z-50",
        variant === "primary" ? "bg-zinc-800" : "bg-transparent",
        className
      )}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-12 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link className="inline-flex items-center" href="/">
                  <Logo />
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavbarLink key={item.name} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DisclosurePanel navigation={navigation} />
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
