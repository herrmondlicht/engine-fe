import { useContext } from "react";

import { CombinedFormContext } from "context";

export const useCombinedForms = () => {
  const { changeForm, clear, combinedForms } = useContext(CombinedFormContext);
  return { changeForm, clear, combinedForms };
};
