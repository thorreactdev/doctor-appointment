import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { useToast } from "@/components/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const UserControllerModel = ({ onClose , title , description , confirmationText , onConfirm }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [userName, setUserName] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!userName) {
        return toast({
            title : "Please Write User name in text box to sign out",
            description : "something went wrong",
            variant : "destructive"
        })
      }
      if (currentUser?.user?.name === userName) {
        await onConfirm();
        onClose();
        navigate("/");
      } else {
        toast({
          title: "User name not matched",
          description: "Please write the correct username",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader className="flex flex-col gap-2 items-start">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="capitalize">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid items-center gap-4">
            <Label htmlFor="name" className="">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="off"
            />
          </div>
          <span className="text-sm text-gray-500">
            Type the "{currentUser?.user?.name}" to Confirm
          </span>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} variant="destructive">
            {confirmationText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserControllerModel;
