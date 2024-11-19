import React from "react";
import DocumentComponent from "../components/DoucumentComponent";
import { CiSearch } from "react-icons/ci";

export default function DocumentPage() {
  return (
    <div>
      <h1 className="text-lg font-bold mb-4 mt-4">سند واریز / سند برداشت</h1>
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="flex flex-col gap-1 items-start w-full">
          <span className="text-sm font-semibold pl-2">جستجوی سند :</span>
          <div className="flex items-center border border-gray-300 rounded-md w-full md:w-[250px]">
            <input
              type="text"
              placeholder="جستجو کنید"
              className=" w-full p-2 rounded-md focus:outline-none   pl-8" // فاصله از آیکون
            />
            <i className="text-gray-500 pl-2">
              <CiSearch /> {/* آیکون ذره‌بین */}
            </i>
          </div>
        </div>

        <div className="flex flex-col gap-1 items-start w-full">
          <span className="text-sm font-semibold pl-2">جستجوی txId :</span>
          <div className="flex items-center border border-gray-300 rounded-md w-full md:w-[250px]">
            <input
              type="text"
              placeholder="جستجو کنید"
              className=" w-full p-2 rounded-md focus:outline-none  pl-8" // فاصله از آیکون
            />
            <i className="text-gray-500 pl-2">
              <CiSearch /> {/* آیکون ذره‌بین */}
            </i>
          </div>
        </div>
      </div>

      <DocumentComponent />
    </div>
  );
}
