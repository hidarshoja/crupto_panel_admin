import React from 'react';

export default function TableRegistration() {

 const strategies = [
  {
   id: 1,
   amount: "30005400",
   price: "100900000",
   type: "فروش",
   name: "باران",
  },
  {
    id: 2,
    amount: "305950",
    price: "10000000000",
    type: "خرید",
    name: "نیوبیکس",
  },
];
let transactionProgress = [45]

return (
 <>
<div className='flex flex-col gap-3'>
<span>درصد ثبت</span>
<div>
{
  transactionProgress.length > 0 ? (
    <div className="w-full bg-gray-200 rounded-full h-8 relative">
      <div
        className="bg-green-500 h-8 rounded-full"
        style={{ width: `${transactionProgress[0]}%` }}
      />
      <span className="absolute top-[-18px] left-1/2 transform -translate-x-1/2 text-xs text-green-500">
        {transactionProgress[0]}%
      </span>
    </div>
  ) : (
    <span className="text-gray-500">تمام شده</span>
  )
}
</div>
</div>
 <div className="overflow-x-auto shadow ring-1 mt-10 ring-black ring-opacity-5 sm:rounded-lg">
       <table className="min-w-full divide-y divide-gray-300">
         <thead className="bg-gray-50">
           <tr>
             {[
               "ردیف",
               "سود",
               "قیمت",
               "نوع معامله",
               "نام صرافی",
             ].map((header, index) => (
               <th
                 key={index}
                 scope="col"
                 className="px-3 py-4 text-center text-sm font-semibold text-gray-900"
               >
                 {header}
               </th>
             ))}
           </tr>
         </thead>
         <tbody className="divide-y divide-gray-200 bg-white">
           {strategies.map((strategy, index) => (
             <tr key={strategy.id}>
               <td className="px-3 py-4 text-sm text-gray-500 text-center">{index + 1}</td>
               <td className="px-3 py-4 text-sm text-gray-500 text-center">
               {new Intl.NumberFormat('fa-IR').format(strategy.amount)}
               </td>
               <td className="px-3 py-4 text-sm text-gray-500 text-center">
               {new Intl.NumberFormat('fa-IR').format(strategy.price)}
                </td>
               <td className="px-3 py-4 text-sm text-gray-500 text-center">{strategy.type}</td>
               <td className="px-3 py-4 text-sm text-gray-500 text-center">{strategy.name}</td>
              
             </tr>
           ))}
         </tbody>
       </table>
     </div>
 </>
)
}
