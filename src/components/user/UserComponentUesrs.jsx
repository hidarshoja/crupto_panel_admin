import UserBox from "../UserBox";

export default function UserComponentUsers({
  formData,
  handleSubmit,
  handleChange,
  handleCancel,
  navigate,
  people,
  setUserId,
  setPri,
  assets,
}) {
  return (
    <div className="p-4 bg-green-50 border w-full flex flex-wrap gap-6 border-green-300 rounded-lg">
      <div className="w-full">
        <UserBox people={people} setUserId={setUserId} setPri={setPri} />
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
          <span className="text-sm font-semibold pl-2">نوع سند:</span>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">انتخاب کنید</option>
            <option value="4">برداشت</option>
            <option value="3">واریز</option>
            <option value="5">اصلاحی</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
          <span className="text-sm font-semibold pl-2">نوع ارز:</span>
          <select
            name="asset_id"
            value={formData.asset_id}
            onChange={handleChange}
            className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">انتخاب کنید</option>
            {assets?.map((wallet) => (
              <option key={wallet.id} value={wallet.related_asset}>
                {wallet.name_fa} ({wallet.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
          <span className="text-sm font-semibold pl-2">
            مبلغ بر اساس ارز پایه:
          </span>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="مبلغ را وارد کنید"
            className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
          <span className="text-sm font-semibold pl-2">شماره سند بدل:</span>
          <input
            type="text"
            name="bank_txid"
            value={formData.bank_txid}
            onChange={handleChange}
            placeholder="شماره سند را وارد کنید"
            className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
          <span className="text-sm font-semibold pl-2">شماره سند بدل:</span>
          <input
            type="text"
            name="documentNumber"
            value={formData2.documentNumber}
            onChange={handleChange2}
            placeholder="شماره سند را وارد کنید"
            className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
          <span className="text-sm font-semibold pl-2">کلیت سند:</span>
          <select
            name="documentType"
            value={formData2.documentType}
            onChange={handleChange2}
            className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">انتخاب کنید</option>
            <option value="1">اصلاحی</option>
            <option value="2">قطعی</option>
          </select>
        </div>
      </div> */}

      <div className="flex flex-col gap-1 items-start w-full">
        <span className="text-sm font-semibold pl-2">بابت صرافی :</span>
        <select
          name="exchangeName"
          value={formData.exchangeName}
          onChange={handleChange}
          className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">انتخاب کنید</option>
          <option value="باران">باران</option>
          <option value="فد">فد</option>
          <option value="ارز">ارز</option>
          <option value="نیوبیکس">نیوبیکس</option>
        </select>
      </div>

      {/* دکمه‌ها */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
        >
          انصراف
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          بازگشت
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          ثبت
        </button>
      </div>
    </div>
  );
}
