import React from "react";
import top_doctors_list from "../utils/top_doctors_list.json";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SingleDoctorPage = () => {
  return (
    <div className="max-w-7xl mx-auto mt-6 p-3">
      {top_doctors_list?.slice(0, 1)?.map((item) => (
        <div key={item?.id} className="flex flex-col lg:flex-row gap-4">
          <div className="">
            <img
              src={item.image}
              alt={item.name}
              title={item?.name}
              className="bg-[#4f46e5] object-contain rounded-xl lg:w-72 w-full "
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-4">
            <Card className="">
              <CardHeader>
                <CardTitle className="text-xl">{item.name}</CardTitle>
                <CardDescription className="flex gap-3 cursor-pointer text-base">
                  {item?.degree}
                  <span>- {item?.category}</span>
                  <Badge variant="outline">{item?.experience}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 cursor-pointer">
                <span className="font-medium">About</span>
                <p className="text-xs md:text-sm text-gray-500">{item?.description}</p>
              </CardContent>
              <CardFooter className="font-medium">
                Appointment Fee : ${item?.appointmentFee}
              </CardFooter>
            </Card>

            <p>Booking Slots</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleDoctorPage;
