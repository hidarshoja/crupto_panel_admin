import { Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Link , useLocation } from "react-router-dom";
import { navigation } from "../constant/Menu";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DesktopSidebar({
  desktopSidebarOpen,
  setDesktopSidebarOpen,
}) {
  const location = useLocation();
  return (
    <Transition.Root show={desktopSidebarOpen} as={Fragment}>
      <Transition.Child
        as={Fragment}
        enter="transition ease-in-out duration-500 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-500 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="hidden lg:w-1/5 lg:flex lg:flex-col lg:bg-[#090580] lg:overflow-y-auto lg:px-6 lg:pb-4 lg:h-screen border-l-2 border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex h-16  items-center my-8">
             <img src="/img/logoT2.png" alt=""   className="w-[80%] h-[100px]" />
            </div>
            <div className="flex w-16 justify-center">
              <button
                type="button"
                className="mr-14"
                onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon
                  className="h-6 w-6 text-gray-100"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-2">
                {navigation.map((item) => (
                                <li
                                  key={item.name}
                                  className="flex items-start gap-3  w-full border-b-2 border-gray-400"
                                >
                                 
                                  {!item.children ? (
                                    <Link
                                      to={item.href}
                                      className={classNames(
                                        location.pathname === item.href
                                          ? "bg-green-500 text-black w-full"
                                          : "hover:bg-gray-50 hover:text-gray-700 w-full",
                                        "block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-100"
                                      )}
                                    
                                    >
                                      {item.name}
                                    </Link>
                                  ) : (
                                    <Disclosure as="div" dir="ltr" className="w-full">
                                      {({ open }) => (
                                        <>
                                          <Disclosure.Button
                                            className={classNames(
                                              item.current
                                                ? "bg-gray-50"
                                                : "hover:bg-gray-50 hover:text-gray-700 w-full",
                                              " w-full  rounded-t-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-100 flex items-center justify-between"
                                            )}
                                          >
                                            <ChevronRightIcon
                                              className={classNames(
                                                open
                                                  ? "rotate-90 "
                                                  : " rotate-180",
                                                "h-5 w-5 shrink-0"
                                              )}
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </Disclosure.Button>
                                          <Disclosure.Panel
                                            as="ul"
                                            className="mt-1 px-2"
                                          >
                                            {item.children.map((subItem) => (
                                              <li key={subItem.name}>
                                                <Disclosure.Button
                                                  as={Link}
                                                  to={subItem.href}
                                                  className={classNames(
                                                    location.pathname === subItem.href
                                                      ? "bg-green-500 text-black"
                                                      : "hover:bg-gray-50 hover:text-gray-700",
                                                    "block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-100"
                                                  )}
                                                >
                                                  {subItem.name}
                                                </Disclosure.Button>
                                              </li>
                                            ))}
                                          </Disclosure.Panel>
                                        </>
                                      )}
                                    </Disclosure>
                                  )}
                                </li>
                              ))}
                </ul>
              </li>
              <li></li>
            </ul>
          </nav>
        </div>
      </Transition.Child>
    </Transition.Root>
  );
}