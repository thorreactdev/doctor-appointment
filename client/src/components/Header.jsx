import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import Registration from "@/Pages/Registration";
import LoginPage from "@/Pages/LoginPage";
import { useSelector } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useToast } from "@/components/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useDispatch } from "react-redux";
import { signOutSucess } from "@/app/service/userSlice";
import UserControllerModel from "@/model/UserControllerModel";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setSignUpOpen(false);
    }
  };

  const handleSwitchToLogin = () => {
    setSignUpOpen(false);
    setLoginOpen(true);
  };

  const handleSwitchToRegister = () => {
    setLoginOpen(false);
    setSignUpOpen(true);
  };

  const handleSignOut = async()=>{
    try{
      const res = await fetch("/api/signout" , {
        method : "POST"
      });
      const data = await res.json();
      if(res.ok){
        dispatch(signOutSucess());
        toast({
          title : data?.message,
        });
      }else{
        toast({
          title : "Something Wernt Wrong",
        });
      }

    }catch(error){
      console.log(error);
    }
  }

  return (
    <header className="bg-white shadow-lg">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            {/* <span className="sr-only">Your Company</span> */}
            <figure>
              <img alt="" src="/logo.svg" className="h-8 w-auto" />
            </figure>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            {/* <span className="sr-only">Open main menu</span> */}
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Home
          </Link>
          <Link
            to="/alldoctor"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            All Doctors
          </Link>
          <Link
            to="/about"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            About
          </Link>
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Contact
          </Link>
        </div>

        <div className="hidden lg:flex items-center lg:flex-1 lg:justify-end cursor-pointer">
          {currentUser && currentUser?.user ? (
            <>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="flex items-center gap-2">
                    <figure className="flex gap-2 items-center">
                      <img
                        src={currentUser?.user?.avatar}
                        alt="user_profile"
                        title={currentUser?.user?.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <figcaption className="text-sm font-semibold">
                        Welcome, {currentUser?.user?.name}
                      </figcaption>
                    </figure>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 h-5 w-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-3">
                    <MenuItem>
                      <Link
                        to="/"
                        className="flex gap-2 items-center px-4 py-2 text-sm font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                        Account settings
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/"
                        className="flex gap-2 items-center font-semibold px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="size-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        My Appointment
                      </Link>
                    </MenuItem>

                    <MenuItem>
                      <button
                        // onClick={handleSignOut}
                        onClick={() => setShowSignOutModal(true)}
                        type="button"
                        className="flex gap-2 items-center font-semibold w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                          />
                        </svg>
                        Sign out
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </>
          ) : (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => setSignUpOpen(true)}
              >
                <Button variant="purple" size="lg">
                  Log in
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-40 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link className="-m-1.5 p-1.5">
              <figure>
                <img
                  alt="Company Logo"
                  src="/logo.svg"
                  className="h-8 w-auto"
                />
              </figure>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  All Doctors
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Contact
                </Link>
              </div>

              <div className="py-6 cursor-pointer">
                {currentUser && currentUser?.user ? (
                  <>
                    <figure className="flex gap-2 items-center">
                      <img
                        src={currentUser?.user?.avatar}
                        alt="user_profile"
                        title={currentUser?.user?.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <figcaption className="text-sm font-semibold">
                        Welcome, {currentUser?.user?.name}
                      </figcaption>
                    </figure>
                    <div className="flex flex-col gap-3 my-3">
                      <Link
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Account Setting
                      </Link>
                      <Link
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        My Appointment
                      </Link>

                      <Link
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Sign Out
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="py-6">
                    <Link
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setSignUpOpen(true);
                      }}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      {signUpOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-55"
          onClick={handleOverlayClick}
        >
          <Registration
            onClose={() => setSignUpOpen(false)}
            onSwitchToLogin={handleSwitchToLogin}
          />
        </div>
      )}
      {loginOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-55"
          onClick={handleOverlayClick}
        >
          <LoginPage
            onClose={() => setLoginOpen(false)}
            onSwitchToRegister={handleSwitchToRegister}
          />
        </div>
      )}
      {showSignOutModal && (
        <UserControllerModel
          onClose={() => setShowSignOutModal(false)}
          title={"Sign Out from Account"}
          description={
            "By Writing user name in the text box and click on Signout button,you will be signout from your account"
          }
          confirmationText={"Sign out"}
          onConfirm={handleSignOut}
        />
      )}
    </header>
  );
}
