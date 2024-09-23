import React from "react";
import top_doctors_data from "../utils/top_doctors_list.json";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dot } from 'lucide-react';

const TopDoctors = () => {
  return (
    <div className="mt-24 p-3 xl:p-0 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 items-center  text-center">
        <h2 className="h2">Top Doctors to Book</h2>
        <span className="text-sm pb-3 text-gray-500 md:text-lg">
          Connect with top specialists and book your appointment in seconds.
          Choose from the best doctors <br className="hidden md:block" /> and
          schedule your visit effortlessly
        </span>
      </div>
      <section className="grid md:grid-cols-2  xl:grid-cols-5 gap-4 py-10 grid-cols-1">
        {top_doctors_data?.slice(0, 10)?.map((item) => (
          <Link key={item?.id} to={`/doctor/${item?.id}`}>
         
          <Card className="cursor-pointer">
            
            <img
              src={item?.image}
              alt="Doctor Image"
              title={item?.name}
              className="bg-zinc-200 w-full"
            />
            <CardHeader className="flex flex-col items-start">
            {item?.isAvailable === true ? <div className="flex items-center "><Dot strokeWidth={8} color="#3edb06" size={28}/> <span className="text-sm font-medium">Available</span></div> :  <div className="flex items-center"><Dot strokeWidth={8} color="red" size={28}/> <span className="text-sm font-medium">Not Available</span></div>}
              <CardTitle>{item?.name}</CardTitle>
              <CardDescription>{item?.category}</CardDescription>
            </CardHeader>
          </Card>
          </Link>
        ))}
      </section>
      <div className="flex items-center justify-center py-6">
        <Link to="/alldoctor">
        <Button variant="purple" className="text-center" size="lg">
          See All Doctors &rarr;
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default TopDoctors;
