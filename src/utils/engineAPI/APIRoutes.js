const APIRoutes = {
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
  service_orders_pdf: {
    url: "/service_orders_pdf",
    isLocked: true,
  },
  service_order_images: {
    url: "/service_order_images",
    isLocked: true,
  },
  reports: {
    url: "/service_orders/reports",
    isLocked: true,
  },
};

export { APIRoutes };
