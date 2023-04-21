import * as yup from "yup";

export const AddressValidationSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập họ và tên"),
  phone_number: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Sai định dạng số điện thoại"),
  street: yup.string().required("Vui lòng nhập địa chỉ"),
  city: yup.string().required("Vui lòng nhập địa chỉ")
});
