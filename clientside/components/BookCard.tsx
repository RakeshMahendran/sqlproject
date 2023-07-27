"use client";

import React from "react";
import { bookProps } from "@/app/store/features/booksSlice";

export interface BookCardProps {
  book: bookProps;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
   
  return (
    <div className="flex justify-center items-center bg-white rounded-lg">
      <div className="flex flex-col w-full px-4 py-4 gap-3">
        <div className="h-60">
          <img src={book.cover} alt={book.title} className="w-60 h-80" />
        </div>
        <div className="w-52 flex flex-col gap-2 mt-20">
          <h2 className="text-2xl font-bold text-primary-100">{book.title}</h2>
          <p className="text-gray-600 pl-1">{book.desc}</p>
        </div>
        <div className="flex gap-3 justify-between px-3 items-center">
          <p className="text-xl font-bold font-sans text-green-600">$20</p>
          <button className="px-6 py-1 text-white rounded-md bg-primary-500">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
