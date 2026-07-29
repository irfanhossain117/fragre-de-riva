export type Coupon = {
  code: string;
  type: "percent" | "fixed";
  value: number;
};

export const coupons: Coupon[] = [
  {
    code: "WELCOME10",
    type: "percent",
    value: 10,
  },
  {
    code: "RIVA15",
    type: "percent",
    value: 15,
  },
  {
    code: "SAVE200",
    type: "fixed",
    value: 200,
  },
  {
    code: "LUXURY500",
    type: "fixed",
    value: 500,
  },
];