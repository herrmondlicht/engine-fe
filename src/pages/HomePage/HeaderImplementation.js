import React, { useEffect, useMemo, useState } from "react";
import ArrowLeft from "@heroicons/react/solid/ArrowLeftIcon";
import Home from "@heroicons/react/solid/HomeIcon";
import { useHistory, useLocation } from "react-router";

import { Header, HeaderButton } from "components";

const HeaderButtonImplementation = () => {
  const history = useHistory();
  const location = useLocation();
  const [localHistoryStack, setLocalHistoryStack] = useState([]);

  useEffect(() => {
    if (location.pathname === "/") {
      setLocalHistoryStack([]);
    }
    setLocalHistoryStack(prevStack => [
      ...prevStack.filter(stackItem => stackItem !== location.pathname),
      location.pathname,
    ]);
  }, [location.pathname]);

  const routeAction = useMemo(() => {
    if (localHistoryStack.length > 2) {
      return {
        icon: ArrowLeft,
        action: () => {
          const previousScreen = localHistoryStack.slice(-2)?.[0];
          const historyStack = localHistoryStack.slice(0, -2);
          setLocalHistoryStack(historyStack);
          history.push(previousScreen);
        },
      };
    }

    return { icon: Home, action: () => history.push("/") };
  }, [history, localHistoryStack]);

  return (
    <HeaderButton
      IconComponent={routeAction.icon}
      onClick={routeAction.action}
    />
  );
};

export default () => {
  return <Header leftButton={<HeaderButtonImplementation />} />;
};
