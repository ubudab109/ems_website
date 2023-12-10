/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const usePoolingUpdate = (callback, interval) => {
  const [subscription, setSubscription] = useState(null);
  useEffect(() => {
    const id = setInterval(callback, interval);
    setSubscription(id);
    return () => {
      if (subscription) {
        clearInterval(subscription);
      }
    }
  }, []);
};

export default usePoolingUpdate;
