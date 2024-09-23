import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OAuth from "@/components/OAuth";
import { X } from "lucide-react";
import { useToast } from "@/components/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "@/app/service/userSlice";

function LoginPage({ onClose, onSwitchToRegister }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, currentUser } = useSelector((state) => state.user);

  console.log(currentUser , error);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // Check if all fields are filled
  const isFormValid = userData?.email && userData?.password;

  // when user changes the data
  const handelChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [e.target.id]: e.target.value,
    }));
  };

  // sending data to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUserThunk(userData));
    console.log("thunk data", res);
    try {
      if(res?.payload?.success === true){
        toast({
          title: res?.payload?.message,
          description: "You Logged in sucessfully",
        });
        onClose();
        navigate("/about");
      }else{
        toast({
          variant: "destructive",
          title: res?.payload,
          description: "There was a problem with your request.",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full md:w-[450px] p-4 md:p-0">
      <Card className="w-full md:p-3">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>Book your doctor Easily.</CardDescription>
            </div>
            <div
              onClick={() => onClose()}
              title="Close"
              className="text-2xl cursor-pointer rounded-full bg-[#4f46e5] text-white h-10 w-10 text-center inline-flex items-center justify-center"
            >
              <X />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* <form onSubmit={handleSubmit}> */}
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Your Email.."
                onChange={handelChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Your Password.."
                onChange={handelChange}
              />
            </div>
            <span className="text-sm">
              Don't Have an account{" "}
              <Link
                onClick={onSwitchToRegister}
                className="text-[#4f46e5] font-medium hover:underline"
              >
                Register
              </Link>
            </span>
          </div>
          {/* </form> */}
        </CardContent>
        <CardFooter className="w-full flex flex-col">
          <Button
            className="w-full"
            variant={!isFormValid ? "outline" : "purple"}
            disabled={!isFormValid || loading}
            onClick={handleSubmit}
          >
            {loading ? <Spinner loadingText={"Logging in..."} /> : "Login"}
          </Button>

          <p className="text-gray-500 my-4">OR</p>
          <OAuth onClose={onClose}  />
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
