const routes = {
  login: {
    url: "/session/login",
    isLocked: false,
  },
  cars: {
    url: "/cars",
    isLocked: true,
  },
  customers: {
    url: "/customers",
    isLocked: true,
  },
};

export default routes;
