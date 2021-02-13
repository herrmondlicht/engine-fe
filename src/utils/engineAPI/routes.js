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
  customer_cars: {
    url: "/customer_cars",
    isLocked: true,
  },
  service_orders: {
    url: "/service_orders",
    isLocked: true,
  },
};
export default routes;
