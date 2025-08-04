import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <Link to={"/"}>
        <img 
          src="/logo.svg"
          className="cursor-pointer"
          width={100}
          height={100}
        />
      </Link>
      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to={"/dashboard"}>
            <Button className="bg-purple-600 text-white hover:bg-purple-700">
              Dashboard
            </Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button className="bg-green-600 text-white hover:bg-green-700">
            Get Started
          </Button>
        </Link>
      )}
    </div>
  );
}

export default header;
