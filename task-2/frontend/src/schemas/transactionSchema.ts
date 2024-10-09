import { object, string, number, date } from "yup";

export const transactionSchema = object({
  time: date()
    .required("Please fill in the transaction time")
    .typeError("Please enter a valid date"),
  quantity: number()
    .required("Please fill in the number of liters in the transaction")
    .typeError("Please enter a valid number for quantity")
    .moreThan(0, "The liters must be greater than 0"),
  pillar: string()
    .required("Please fill in the transaction number of the column")
    .typeError("Please enter a valid string for pillar"),
  revenue: number()
    .required("Please fill in the transaction amount")
    .typeError("Please enter a valid number for revenue")
    .moreThan(0, "The revenue must be greater than 0"),
  price: number()
    .required("Please fill in the transaction price")
    .typeError("Please enter a valid number for price")
    .moreThan(0, "The price must be greater than 0"),
});
