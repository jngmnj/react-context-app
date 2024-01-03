import { createContext, useEffect, useMemo, useState } from "react";

export const OrderContext = createContext();

export function OrderContextProvider(props) {
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  const pricePerItem = {
    products: 1000,
    options: 500,
  };

  const calculateSubtotal = (orderType, orderCounts) => {
    let optionCount = 0;
    for (const count of orderCounts[orderType].values()) {
      optionCount += count;
    }
    return optionCount * pricePerItem[orderType];
  };

  useEffect(() => {
    const productTotal = calculateSubtotal("products", orderCounts);
    const optionTotal = calculateSubtotal("options", orderCounts);
    const total = productTotal + optionTotal;
    setTotals({
      products: productTotal,
      options: optionTotal,
      total,
    });
  }, [orderCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, orderType) {
      const newOrderCounts = { ...orderCounts }; // 원래있던것 복사
      const orderCountsMap = orderCounts[orderType]; // product인지 option인지
      orderCountsMap.set(itemName, parseInt(newItemCount));

      setOrderCounts(newOrderCounts);
    }

    return [{ ...orderCounts, totals }, updateItemCount];
  }, [orderCounts, totals]);
  // totals와 orderCounts가 바뀔때마다 렌더링

  return <OrderContext.Provider value={value} {...props} />;
}
