export enum OrderStatusEnums {
  INCART = "INCART",
  ORDERING = "ORDERING",
  PICKING = "PICKING",
  ORDERED = "ORDERED",
  DELIVERING = "DELIVERING",
  DONE = "DONE",
  CANCEL = "CANCEL",
  REFUND = "REFUND"
}

export const menuTabs = [
  {
    status: OrderStatusEnums.ORDERING,
    title: "Chờ xác nhận"
  },
  {
    status: OrderStatusEnums.ORDERED,
    title: "Chờ lấy hàng"
  },
  {
    status: OrderStatusEnums.DELIVERING,
    title: "Đang giao"
  },
  {
    status: OrderStatusEnums.DONE,
    title: "Đã giao"
  },
  {
    status: OrderStatusEnums.CANCEL,
    title: "Đã hủy"
  },
  {
    status: OrderStatusEnums.REFUND,
    title: "Trả hàng"
  }
];
