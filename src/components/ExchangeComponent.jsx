
import UserBox from "./UserBox3";

export default function ExchangeComponent({
  formData,
  handleSubmit,
  handleChange,
  handleCancel,
  navigate,
  people,
  setUserId,
  assets,
}) {
  return (
    <div className="p-4 bg-green-50 border w-full flex flex-wrap gap-6 border-green-300 rounded-lg">
      <div className="w-full">
        <UserBox people={people} setUserId={setUserId} />
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
          <span className="text-sm font-semibold pl-2">نوع:</span>
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
          <span className="text-sm font-semibold pl-2">شماره سند :</span>
          <input
            type="text"
            name="bank_txid"
            value={formData.documentNumber}
            onChange={handleChange}
            placeholder="شماره سند را وارد کنید"
            className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
            <span className="text-sm font-semibold pl-2">از محل:</span>
            <select
              name="coefficient"
              value={formData.source}
              onChange={handleChange}
              className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">انتخاب کنید</option>
              <option value="1">درگاه بیت</option>
              <option value="2">درگاه تومان</option>
              <option value="3">حساب بانکی</option>
              <option value="4">حساب مشتری</option>
              <option value="5">شخصی</option>
            </select>
          </div>
    
          <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
           
          </div>
        </div> */}

      <div className="flex flex-col gap-1 items-start w-full">
        <span className="text-sm font-semibold pl-2">توضیحات:</span>
        <textarea
          name="des"
          value={formData.des}
          onChange={handleChange}
          placeholder="توضیحات را وارد کنید"
          rows="4"
          className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
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
