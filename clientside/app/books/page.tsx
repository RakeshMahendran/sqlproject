"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export interface BookProps {
  title: string;
  desc: string;
  cover: string;
}

const page = () => {
  const [booksData, setBooksData] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:7000/books")
      .then((response) => console.log(response.data, "response"))
      .catch((err) => console.error("err", err));
  }, []);

  console.log("booksData",booksData);

  return <div>Hi</div>;
};

export default page;
