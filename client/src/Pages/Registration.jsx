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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/hooks/use-toast";
import { Link } from "react-router-dom";
import Spinner from "@/components/Spinner";

function Registration({ onClose , onSwitchToLogin }) {
  const { toast } = useToast();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  // Check if all fields are filled
  const isFormValid =
    userData?.name &&
    userData?.email &&
    userData?.password &&
    userData?.gender &&
    userData?.role;

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
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setLoading(false);
        toast({
          title: data?.message,
          description: "You Register On Awesome Website",
        });
        onClose();
        onSwitchToLogin();
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: data?.message,
          description: "There was a problem with your request.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full md:w-[450px] p-4 md:p-0">
      <Card className="w-full md:p-3">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>Register to book your doctor.</CardDescription>
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
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter Your Name.."
                onChange={handelChange}
              />
            </div>
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="gender">Gender</Label>
              <Select
                onValueChange={(value) =>
                  setUserData({ ...userData, gender: value })
                }
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role">Select Role</Label>
              <Select
                onValueChange={(value) =>
                  setUserData({ ...userData, role: value })
                }
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-sm">
            Already Have an account <Link onClick={onSwitchToLogin} className="text-[#4f46e5] font-medium hover:underline">Login</Link>
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
            {loading ? <Spinner loadingText={"Creating Account..."}/> : "Register"}
          </Button>
          
          <p className="text-gray-500 my-4">OR</p>
          <OAuth onClose={onClose}/> 
        </CardFooter>
      </Card>
    </div>
  );
}

export default Registration;
