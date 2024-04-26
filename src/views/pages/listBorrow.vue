<template>
    <div class="container">
        <div class="row shadow p-3 mt-3">
            <div class="col">
                <router-link :to="{name: 'borrow1'}">
                    <h5 class="text-center">Chờ xác nhận</h5>
                </router-link>
            </div>
            <div class="col">
                <router-link :to="{name: 'borrow2'}">
                    <h5 class="text-center">Đang mượn</h5>
                </router-link>
            </div>
            <div class="col">
                <router-link :to="{name: 'borrow4'}">
                    <h5 class="text-center">Đang gửi trả</h5>
                </router-link>
            </div>
            <div class="col">
                <router-link :to="{name: 'borrow3'}">
                    <h5 class="text-center">Đã gửi trả</h5>
                </router-link>
            </div>
        </div>
        <div class="row mt-4 p-2 shadow">
            <router-view v-slot="{ Component }">
                <transition name="zoom" >
                    <component :is="Component" />
                </transition>
            </router-view>  
        </div>
    </div>
</template>

<script>
// import Borrow1 from "@/component"
export default {

}
</script>