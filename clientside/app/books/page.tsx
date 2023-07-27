"use client";

import React, { useEffect } from "react";
import { FiBookOpen } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchbooks, bookProps } from "../store/features/booksSlice";
import BookCard from "../../components/BookCard";
import Link from "next/link";

const Page = () => {
  const booksState:any = useSelector((state: RootState) => state.books.books);
  
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(fetchbooks());
  }, [dispatch]);


  console.log("bookState",booksState.books);
  return (
    <div className="text-white">
      <div className="shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] flex justify-between items-center p-4">
        <div className="text-2xl capitalize font-mono font-thin text-white flex justify-start items-center gap-2">
          <FiBookOpen className="text-white mt-1" />
          <p>Bookit</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/books/update"
            className="px-6 py-1 text-white rounded-md border border-white border-solid"
          >
            Update Book
          </Link>
          <Link
            href="/books/create"
            className="px-6 py-1 text-white rounded-md border border-white border-solid"
          >
            Post Book
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-10 md:gap-20 mt-5 justify-center items-center">
        {booksState &&
          booksState?.books?.map((book: bookProps) => (
            <div className="shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-60">
              <BookCard key={book.id} book={book} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
