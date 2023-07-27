"use client";
import React, { useState } from "react";
import{ useForm } from 'react-hook-form'

const page = () => {

    const { register , handleSubmit } = useForm()
   const handleCreate = (data:any) => {
    console.log("data",data)
    
  };
  return (
    <div className="h-screen flex gap-3 font-semibold  flex-col items-center justify-center">
      <div className="text-2xl">Hi!👋 Wanna Create a book?</div>
      <div className="bg-white text-black p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <form
          action=""
          className="flex flex-col gap-10"
          onSubmit={handleSubmit(handleCreate)}
        >
          <div className="flex gap-3 items-center justify-center">
            <div className="flex flex-col gap-16 font-extralight text-md">
              <label htmlFor="title">Title</label>
              <label htmlFor="desc">Description</label>
              <label htmlFor="cover">Cover Image</label>
            </div>
            <div className="flex flex-col gap-12 font-extralight text-sm">
              <input
                id="title"
                type="text"
                className="pl-4 outline-primary-100 h-10 w-full placeholder:pl-10 placeholder:text-primary-1000 border-gray-300 border border-solid"
                placeholder="Enter book title"
                {...register("title")}
                required
              />
              <input
                id="desc"
                type="text"              
                className="pl-4 outline-primary-100 h-10 w-full placeholder:pl-8 placeholder:text-primary-1000 border-gray-300 border border-solid"
                placeholder="Enter description"
                {...register("desc")}
                required
              />
              <input
                id="cover"
                type="text"
                className="pl-4 outline-primary-100 h-10 w-full placeholder:pl-8 placeholder:text-primary-1000 border-gray-300 border border-solid"
                placeholder="Provide image url"
                {...register("cover")}

              />
            </div>
          </div>
          <div className="text-xl px-10 bg-primary-100 text-white flex justify-center items-center py-2 font-semibold">
            <button type="submit">Create Book</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
