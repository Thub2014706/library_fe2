<template>
    <div class="row">
        <div class="form-inline col d-flex">
            <label class="mt-2" for="sel1">Hiện trang:</label>
            <select class="form-control ml-2 form-control-sm" style="width: 60px;" id="sel1" @change="handlePage($event)">
                <option v-for="i in length" :key="i" :value="i">{{ i }}</option>
            </select>
        </div>
    </div>
    <table class="table table-striped text-center mt-2">
        <thead>
            <tr>
                <!-- <th>ID</th> -->
                <th>Hình ảnh</th>
                <th>Tên sách</th>
                <th>Ngày mượn</th>
                <th>Ngày hẹn trả</th>
                <th>Ngày được duyệt</th>
                <th>Ngày gửi trả</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(borrow, index) in allBorrow" :key="index" >
                <!-- <td>{{ read._id }}</td> -->
                <td>
                    <img :src="borrow.book_details[0].image" style="height: 100px;" alt="">
                </td>
                <td class="align-middle">{{ borrow.book_details[0].name }}</td>
                <td class="align-middle">{{ borrow.borrowDate.toString().slice(0, 10) }}</td>
                <td class="align-middle">{{ borrow.durationDate.toString().slice(0, 10) }}</td>
                <td class="align-middle">{{ borrow.xacnhanmuon.toString().slice(0, 10) }}</td>
                <td class="align-middle">{{ borrow.ngaytra.toString().slice(0, 10) }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import BorrowService from "@/services/borrow.service"

export default {
    data() {
        return {
            allBorrow: [],
            length: 1,
            user: null
        }
    },

    methods: {
        async getAll(number) {
            try {
                const data = await BorrowService.getByUser(this.user._id, number, 'ngaytra', 'xacnhantra')
                this.allBorrow = data.data
                this.length = data.totalPages
                console.log(data)
            } catch (error) {
                console.log(error);
            }
        },

        handlePage(e) {
            this.getAll(e.target.value)
        },

    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.getAll(1)
    }
}
</script>