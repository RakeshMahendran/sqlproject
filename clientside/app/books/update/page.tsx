"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { updatebooks } from "../../store/features/booksSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";

export interface FormData {
  title: string;
  description: string;
  cover: string;
  id: any;
}

const page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const booksState: any = useSelector((state: RootState) => state.books.books);

  console.log("bookState", booksState);
  const { register, handleSubmit } = useForm<FormData>();

  const handleUpdate: SubmitHandler<FormData> = (formData) => {
    console.log("clicked handleUpdate");
    console.log("data", formData);
    formData.id = parseInt(formData.id, 10);
    dispatch(updatebooks(formData));
  };

  return (
    <div className="h-screen flex gap-3 font-semibold  flex-col items-center justify-center">
      <div className="text-xl sm:text-2xl">Hi!👋 Wanna update a book?</div>
      <div className="bg-white text-black py-10 px-5 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <form
          action=""
          className="flex flex-col gap-4 sm:gap-6"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <div className="flex gap-3 items-center justify-center">
            <div className="flex flex-col gap-14 sm:gap-16 font-extralight text-sm sm:text-md">
              <label htmlFor="id">Unique ID</label>
              <label htmlFor="title">Title</label>
              <label htmlFor="desc">descriptionription</label>
              <label htmlFor="cover">Cover Image</label>
            </div>
            <div className="flex flex-col gap-10 sm:gap-12 font-extralight text-sm">
              <input
                id="title"
                type="number"
                className="pl-4 outline-primary-100 h-10 w-full placeholder:pl-10 placeholder:text-primary-1000 border-gray-300 border border-solid"
                placeholder="Enter unique ID"
                {...register("id")}
                required
              />
              <input
                id="title"
                type="text"
                className="pl-4 outline-primary-100 h-10 w-full placeholder:pl-10 placeholder:text-primary-1000 border-gray-300 border border-solid"
                placeholder="Enter book title"
                {...register("title")}
              />
              <input
                id="description"
                type="text"
                className="pl-4 outline-primary-100 h-10 w-full placeholder:pl-8 placeholder:text-primary-1000 border-gray-300 border border-solid"
                placeholder="Enter descriptionription"
                {...register("description")}
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
          <div className="items-center flex justify-center">
            {booksState.length > 0 &&
              booksState.map((item: any, index: any) => {
                console.log("item:", item);
                return (
                  <p
                    key={index}
                    className={
                      item?.message
                        ? `text-green-600 text-lg font-light`
                        : `text-red-500 text-lg font-light`
                    }
                  >
                    {`${item?.message ? item.message : item.error}!`}
                  </p>
                );
              })}
          </div>
          <div className="text-lg sm:text-xl px-8 sm:px-10 bg-primary-100 text-white flex justify-center items-center py-2 font-semibold">
            <button type="submit">Update Book</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
