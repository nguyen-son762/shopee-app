import * as yup from "yup";

export const initialValuesSignUpForm = {
  phone_number: "",
  password: "",
  confirmPassword: "",
  first_name:'',
  last_name:''
};

export const SignUpValidationSchema = yup.object().shape({
  phone_number: yup
    .string()
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Sai định dạng số điện thoại")
    .required("Số điện thoại không được để trống"),
  password: yup
    .string()
    .min(3, ({ min }) => `Mật khẩu phải có ít nhất ${min} kí tự`)
    .required("Mật khẩu không được để trống"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp")
    .required("Xác nhận mật khẩu không được để trống")
});
