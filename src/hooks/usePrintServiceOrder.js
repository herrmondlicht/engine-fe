import { useCallback, useState } from "react";
import { engineAPI } from "utils";

const usePrintServiceOrder = serviceOrderId => {
  const [isValidating, setIsValidating] = useState(false);
  const [err, setErr] = useState();
  const getPDFFile = useCallback(async () => {
    setIsValidating(true);
    try {
      const response = await engineAPI.service_orders_pdf.get({
        urlExtension: serviceOrderId,
        options: {
          responseType: "blob",
        },
      });

      if (response) {
        const url = window.URL.createObjectURL(
          new Blob([response], { type: "application/pdf" })
        );
        window.open(url);
      }
    } catch (e) {
      setErr(e);
    } finally {
      setIsValidating(false);
    }
  }, [serviceOrderId]);

  const print = useCallback(() => {
    setErr();
    getPDFFile();
  }, [getPDFFile]);

  return { print, isValidating, err };
};

export { usePrintServiceOrder };
