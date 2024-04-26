<template>
    <div class="bg-info">
        <div class="container">
            <div class="row py-3">
                <div class="col-sm-2">
                    <a href="/" class="" style="color: white;"><h3>Gia Thư</h3></a>
                </div>
                <!-- <div class="col-sm-6">
                    <div class="mr-auto">
                        <div class="input-group rounded">
                        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <span class="input-group-text border-0" id="search-addon">
                            <i class="fas fa-search"></i>
                        </span>
                        </div>
                    </div>
                </div> -->
                <div class="col-sm-2 mt-1">
                    <i class="fa-solid fa-user fa-lg" style="color: white;"></i>
                    <router-link v-if="user === null" :to="{name: 'login'}" class="ml-2" href="#" style="color: white;">
                        Đăng nhập
                    </router-link>
                    <span v-if="user !== null" class="ml-2" style="color: white;">
                        {{ user.ten }} 
                    </span>
                    <p v-if="user !== null" class="ml-2" style="color: white;" @click="logOut">
                        Đăng xuất
                    </p>
                    <!-- <p v-if="user !== null">{{ user.data.ten }}</p> -->
                </div>
                <div class="col-sm-2 mt-1">
                    <router-link :to="{name: 'listBorrow'}" style="color: white;">
                        <i class="fa-solid fa-clipboard-list fa-lg" style="color: white;"></i>
                        Lịch sử mượn sách
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import jwt from 'jsonwebtoken';

export default {
    data() {
        return {
            user: null
        }
    },
    methods: {
        logOut() {
            localStorage.removeItem("user");
            this.user = null
            this.$router.push({ name: "home" });
        }
    },

    mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
    }
}
</script>

<style>
.bg {
    background-color: rgb(144, 144, 144);
}
</style>