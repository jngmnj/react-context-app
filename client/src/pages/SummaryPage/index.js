import React, { useContext, useState } from "react";
import { OrderContext } from "../../context/OrderContext"

const SummaryPage = ({ setStep }) => {
  const [checked, setChecked] = useState(false);
  const [orderDetails] = useContext(OrderContext)

  const productArray = Array.from(orderDetails.products);
  const productList = productArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ))

  // option
  const hasOptions = orderDetails.options.size > 0;
  let optionList = null;
  if(hasOptions) {
    const optionArray = Array.from(orderDetails.options.keys()); // key만 빼기
    optionList = optionArray.map((key) => <li key={key}>{key}</li>);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  }
  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품: {orderDetails.totals.products}</h2>
      
      <ul>
        {productList}
      </ul>
      {hasOptions && (
        <>
          <h2>옵션: {orderDetails.totals.options}</h2>
          <ul>
            {optionList}
          </ul>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          defaultChecked={checked}
          id="confirm-checkbox"
          onClick={(e) => setChecked(e.target.checked)}
        />{" "}
        <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
        <br />
        <button disabled={!checked} type="submit">
          주문확인
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
