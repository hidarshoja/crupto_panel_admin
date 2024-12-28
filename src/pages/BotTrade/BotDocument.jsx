import React from 'react'
import { CiSearch } from "react-icons/ci";
import DocumentComponentBot from '../../components/Bot/DoucumentComponentBot';

export default function BotDocument() {
  return (
     <div>
          <h1 className="text-md md:text-lg font-bold mb-4 mt-4">سند واریز / سند برداشت (بات ترید)</h1>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
              <span className="text-sm font-semibold pl-2">جستجوی سند :</span>
              <div className="flex items-center border border-gray-300 rounded-md w-full">
                <input
                  type="text"
                  placeholder="جستجو کنید"
                  className=" w-full p-2 rounded-md focus:outline-none   pl-8" 
                />
                <i className="text-gray-500 pl-2">
                  <CiSearch /> 
                </i>
              </div>
            </div>
    
            <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
              <span className="text-sm font-semibold pl-2">جستجوی txId :</span>
              <div className="flex items-center border border-gray-300 rounded-md w-full">
                <input
                  type="text"
                  placeholder="جستجو کنید"
                  className=" w-full p-2 rounded-md focus:outline-none  pl-8"
                />
                <i className="text-gray-500 pl-2">
                  <CiSearch /> 
                </i>
              </div>
            </div>
          </div>
    
         <DocumentComponentBot />
        </div>
  )
}
