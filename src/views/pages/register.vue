<template>
    <div class="container mt-5">
    <h2 class="text-center mb-4">Đăng ký</h2>
    <Form @submit="addReader" :validation-schema="readerFormSchema" class="w-50 mx-auto">
        <div class="form-group row">
            <label for="name" class="col-sm-3 col-form-label">Tên độc giả</label>
            <div class="col-sm-9">
                <Field type="text" name="name" class="form-control" v-model="formData.name" />
                <ErrorMessage name="name" class="error-feedback" />
            </div>
        </div>

        <div class="form-group row">
            <label for="gender" class="col-sm-3 col-form-label">Giới tính</label>
            <div class="col-sm-9">
                <select name="gender" class="custom-select" v-model="formData.gender">
                    <option value="Nam" selected>Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>
                <ErrorMessage name="gender" class="error-feedback" />
            </div>
        </div>

        <div class="form-group row">
            <label for="birth" class="col-sm-3 col-form-label">Ngày sinh</label>
            <div class="col-sm-9">
                <Field type="date" name="birth" class="form-control" v-model="formData.birth" />
                <ErrorMessage name="birth" class="error-feedback" />
            </div>
        </div>

        <div class="form-group row">
            <label for="phone" class="col-sm-3 col-form-label">Số điện thoại</label>
            <div class="col-sm-9">
                <Field type="text" name="phone" class="form-control" v-model="formData.phone" />
                <ErrorMessage name="phone" class="error-feedback" />
            </div>
        </div>

        <div class="form-group row">
            <label for="address" class="col-sm-3 col-form-label">Địa chỉ</label>
            <div class="col-sm-9">
                <Field type="text" name="address" class="form-control" v-model="formData.address" />
                <ErrorMessage name="address" class="error-feedback" />
            </div>
        </div>

        <div class="form-group row">
            <label for="password" class="col-sm-3 col-form-label">Mật khẩu</label>
            <div class="col-sm-9">
                <Field type="password" name="password" class="form-control" v-model="formData.password" />
                <ErrorMessage name="password" class="error-feedback" />
            </div>
        </div>

        <div class="form-group row">
            <label for="confirm" class="col-sm-3 col-form-label">Nhập lại mật khẩu</label>
            <div class="col-sm-9">
                <Field type="password" name="confirm" class="form-control"  />
                <ErrorMessage name="confirm" class="error-feedback" />
            </div>
        </div>

        <div class="form-group row">
            <div class="col-sm-9 offset-sm-3">
                <button class="btn btn-info btn-block" type="submit">Đăng ký</button>
            </div>
        </div>
        <div class="col-sm-9 offset-sm-3 d-flex">
            <p>Bạn đã có tài khoản? </p>
            <router-link :to="{name: 'login'}">Đăng nhập ngay</router-link>
        </div>
    </Form>
</div>

</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import UserService from "@/services/user.service.js"
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    // emits: ["add:reader"],
    data() {
        const readerFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            // gender: yup
            //     .string()
            //     .required("Chọn giới tính."),
            birth: yup
                .date()
                .required("Hãy chọn ngày sinh.")
                .max(new Date(), 'Ngày sinh không được lớn hơn ngày hiện tại.'),
            address: yup
                .string()
                .required("Hãy nhập địa chỉ.")
                .max(100, "Địa chỉ tối đa 100 ký tự."),
            phone: yup
                .string()
                .required("Hãy nhập số điện thoại.")
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
            password: yup
                .string()
                .required("Hãy nhập mật khẩu.")
                .min(6, "Mật khẩu ít nhất phải có 6 ký tự.")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                    "Mật khẩu phải chứa ít nhất một chữ cái hoa, một chữ cái thường, một số và một ký tự đặc biệt."
                ),
            confirm: yup
                .string()
                .required("Hãy nhập nhập lại mật khẩu.")
                .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp.') 
                
        })
        return {
            formData: {},
            readerFormSchema
        }
    },
    methods: {

        async addReader(data) {
            const formData = new FormData();
            formData.append("ten", data.name);
            formData.append("gioitinh", data.gender);
            formData.append("ngaysinh", data.birth);
            formData.append("dienthoai", data.phone);
            formData.append("diachi", data.address);
            formData.append("matkhau", data.password);
            console.log(data.gender)

            try {
                await UserService.register(formData);
                this.$toast.open({
                    message: "Thêm thành công",
                    type: "success",
                    duration: 4000,
                    dismissible: true,
                    position: "top"
                })
            } catch (error) {
                console.log(error);
                this.$toast.open({
                    message: "Thêm không thành công",
                    type: "error",
                    duration: 4000,
                    dismissible: true,
                    position: "top"
                })
            }
        },

        // addReader() {
        //     this.$emit('add:reader', this.formData);
        // },

    },
}
</script>