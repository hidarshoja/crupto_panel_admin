const ModalStrategy = ({ isOpen, exchanges, onClose, toggleSelection, type }) => {
 if (!isOpen) return null;

 return (
   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
     <div className="bg-white rounded-lg p-6 w-96">
       <h2 className="text-lg font-bold mb-4">
         {type === "supplier" ? "لیست تامین‌کنندگان" : "لیست خریداران"}
       </h2>
       <div className="flex flex-wrap">
         {exchanges?.map((exchange, index) => (
           <label key={index} className="flex items-center w-1/2 px-3 py-1">
             <input
               type="checkbox"
               checked={exchange.selected}
               onChange={() => toggleSelection(index, type)}
             />
             <span className="px-1">{exchange.name}</span>
           </label>
         ))}
       </div>
       <div className="flex justify-end gap-3">
         <button
           className="bg-red-500 text-white px-4 py-2 rounded mt-4"
           onClick={onClose}
         >
           بستن
         </button>
         <button
           className="bg-green-500 text-white px-4 py-2 rounded mt-4"
           onClick={onClose}
         >
           ذخیره 
         </button>
       </div>
     </div>
   </div>
 );
};
export default ModalStrategy;