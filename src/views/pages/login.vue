<template>
    <div class="container mt-5">
    <h2 class="text-center mb-4">Đăng nhập</h2>
    <Form @submit="addReader" :validation-schema="readerFormSchema" class="w-50 mx-auto">

        <div class="form-group row">
            <label for="phone" class="col-sm-3 col-form-label">Số điện thoại</label>
            <div class="col-sm-9">
                <Field type="text" name="phone" class="form-control" v-model="formData.phone" />
                <ErrorMessage name="phone" class="error-feedback" />
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
            <div class="col-sm-9 offset-sm-3">
                <button class="btn btn-info btn-block" type="submit">Đăng nhập</button>
            </div>
        </div>
        <div class="col-sm-9 offset-sm-3 d-flex">
            <p>Bạn chưa có tài khoản? </p>
            <router-link :to="{name: 'register'}">Đăng ký ngay</router-link>
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
        })
        return {
            formData: {},
            readerFormSchema
        }
    },
    methods: {

        async addReader(data) {
            const formData = new FormData();
            formData.append("dienthoai", data.phone);
            formData.append("matkhau", data.password);

            try {
                const dataLogin = await UserService.login(formData);
                this.$toast.open({
                    message: "Đăng nhập thành công",
                    type: "success",
                    duration: 4000,
                    dismissible: true,
                    position: "top"
                })
                // console.log(dataLogin)
                localStorage.setItem("user", JSON.stringify(dataLogin));
                this.$router.push({ name: "home" }); 
            } catch (error) {
                console.log(error);
                this.$toast.open({
                    message: "Đăng nhập không thành công",
                    type: "error",
                    duration: 4000,
                    dismissible: true,
                    position: "top"
                })
            }
        },
    },
}
</script>