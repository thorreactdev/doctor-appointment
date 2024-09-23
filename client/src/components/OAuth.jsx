import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '@/config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from '@/components/hooks/use-toast';
import { useDispatch , useSelector } from 'react-redux';
import { googleLoginFailure, googleLoginStart, googleLoginSuccess , googleCheckAlreadyUserStart, googleCheckAlreadyUserSuccess, googleCheckAlreadyUserFailure } from "@/app/service/userSlice";
import Spinner from "@/components/Spinner";

const OAuth = ( { onClose }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { loading } = useSelector((state)=> state.user);
  
  const auth = getAuth(app);
  const navigate = useNavigate();
  const[showModal , setShowModal] = useState(false);
  const[userInfo , setUserInfo] = useState(null);
  const [isOpen, setIsOpen] = React.useState(true);
  const [gender, setGender] = React.useState("");
  const [role, setRole] = React.useState("");


  console.log(userInfo , showModal);
  
  const googleLogin  = async() => {
    const provider = new GoogleAuthProvider(); 
    provider.setCustomParameters({ prompt : "select_account"});
    try{
      const result = await signInWithPopup(auth , provider);
      console.log(result);
      dispatch(googleCheckAlreadyUserStart());
      const res = await fetch("/api/auth/check-already-google-user",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({ email : result.user.email })
      });
      const data = await res.json();
      console.log(data);
      if(data?.hasProfileCompleted === true){
        dispatch(googleCheckAlreadyUserSuccess(data));
        toast({
          title : data?.message,
          description : "You have choosen the best website for booking appointments",
          status : "success",
          duration : 9000,
          isClosable : true,
          position : "top"
        });
        onClose();
        navigate("/about");
      }else{
        dispatch(googleCheckAlreadyUserFailure(data?.message));
        setUserInfo({ email : result.user.email , name : result.user.displayName , avatar : result.user.photoURL });
        setShowModal(true);
      }
    }catch(err){
      dispatch(googleCheckAlreadyUserFailure(err?.message));
      console.log(err);
    }
  }

  const handleSubmit = async()=>{
    try{
      dispatch(googleLoginStart());
      const userData = {
        email : userInfo?.email,
        name : userInfo?.name,
        gender : gender,
        role : role,
        avatar : userInfo?.avatar
      }

      const res = await fetch("/api/auth/new-google-user" , {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(userData)
      });

      const data = await res.json();
      if(res.ok){
        dispatch(googleLoginSuccess(data));
        setIsOpen(false);
        setShowModal(false);
        onClose();
        toast({
          title : data?.message,
          description : "You have choosen the best website for booking appointments",
        });
        navigate("/about");
      }else{
       dispatch(googleLoginFailure(data?.message));
        toast({
          title : "Something went wrong",
        });
      }
    }catch(error){
      dispatch(googleLoginFailure(error?.message));
      console.log(error);
    }
  }

 


  return (
    <>
    <Button variant="outline" size="lg" className="w-full flex gap-2 py-5" onClick={googleLogin}>
    <img src="/google.svg" alt="Google_Logo" className="w-8 h-8"/> Continue with google
  </Button>
  { showModal && (
     <Drawer open={isOpen} onOpenChange={setIsOpen}>
     <DrawerContent>
       <div className="mx-auto w-full max-w-sm">
         <DrawerHeader>
           <DrawerTitle>Profile Completion Required</DrawerTitle>
           <DrawerDescription className="text-center">
             Sorry for the interruption, but you need to fill in the following fields to complete your profile.
           </DrawerDescription>
         </DrawerHeader>
         <div className="p-4">
           <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700">Gender</label>
             <Select onValueChange={setGender} value={gender}>
               <SelectTrigger className="mt-1 w-full">
                 <SelectValue placeholder="Select your gender" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="Male">Male</SelectItem>
                 <SelectItem value="Female">Female</SelectItem>
                 <SelectItem value="Other">Other</SelectItem>
               </SelectContent>
             </Select>
           </div>
           <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700">Role</label>
             <Select onValueChange={setRole} value={role}>
               <SelectTrigger className="mt-1 w-full">
                 <SelectValue placeholder="Select your role" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="patient">Patient</SelectItem>
                 <SelectItem value="doctor">Doctor</SelectItem>
               </SelectContent>
             </Select>
           </div>
         </div>
         <DrawerFooter>
           <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner loadingText={"Wait ..."}/> : "Submit"}
           </Button>
         </DrawerFooter>
       </div>
     </DrawerContent>
   </Drawer>
  )}
  </>

  )
}

export default OAuth