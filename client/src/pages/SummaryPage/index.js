import React, { useState } from "react";

const SummaryPage = ({ setStep }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <form>
        <input
          type="checkbox"
          defaultChecked={checked}
          id="confirm-checkbox"
          onClick={(e) => setChecked(e.target.checked)}
        />{" "}
        <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
        <br />
        <button disabled={!checked} type="submit"
          onClick={() => setStep(2)}
        >
          주문확인
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
