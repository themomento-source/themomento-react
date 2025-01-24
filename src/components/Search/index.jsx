import React from "react";
import "../Search/style.css";
import Button from "@mui/material/Button";
import { BsSearch } from "react-icons/bs";

function Search() {
  return (
    <div className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2">
      <input
        type="text"
        placeholder="Search for photo..."
        className="w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]"
      />
      <Button className="!absolute top-[5px] right-[5px] z-50 !w-[40px] 
      !min-w-[40px] h-[40px] !rounded-full !text-black">
        <BsSearch className="text-[#4e4e4e] text-[20px]" />
      </Button>
    </div>
  );
}

export default Search;
