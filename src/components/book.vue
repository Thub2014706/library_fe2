<template>
    <div class="card" style="width:250px; height:470px;">
        <img class="card-img-top" :src="book.image" alt="Card image" style="width:100%; height:250px; object-fit: contain;">
        <div class="card-body">
            <h5 class="card-title">{{ book.name }}</h5>
            <p class="card-text">Tác giả: {{ book.author }}</p>
            <p>Số lượng còn lại: {{ book.number - book.borrowed }}</p>
        </div>
        <div class="card-footer d-flex justify-content-center align-items-center">
            <button class="btn btn-warning mx-auto" data-toggle="modal" data-target="#myModal" @click.prevent="showIdBook(book._id)">Mượn sách</button>
        </div>
    </div>

    <div v-if="id !== ''" class="modal fade" id="myModal">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-body">
                    <form action="">
                        <div class="form-group col">
                            <label for="durationDate">Hẹn ngày trả</label>
                            <input type="date" name="durationDate" class="form-control" v-model="data.durationDate"/>
                        </div>
                        <div class="form-group row">
                            <button class="btn btn-info ml-3" type="submit" @click.prevent="addBorrow(id)">Mượn</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
import BorrowService from "@/services/borrow.service.js"

export default {
    props: {
        book: { type: Object, required: true }
    },
    data() {
        return {
            detail: {},
            show: false,
            data: {
                durationDate: '' 
            },
            id: '',
            user: null
        }
    },
    methods: {

        handleCancel() {
            $('#myModal').modal('hide');
        },
        
        showIdBook(id) {
            this.id = id
        },
        
        async addBorrow(id) {
            console.log('tt',this.id)
            const formData = new FormData();
            formData.append("reader", this.user._id);
            formData.append("book", id);
            formData.append("durationDate", this.data.durationDate);

            try {
                await BorrowService.create(formData);
                $('#myModal').modal('hide');
                // this.getAll(1);
                this.$toast.open({
                    message: "Mượn thành công",
                    type: "success",
                    duration: 4000,
                    dismissible: true,
                    position: "top"
                })
            } catch (error) {
                console.log(error);
                this.$toast.open({
                    message: error.response.data.message,
                    type: "error",
                    duration: 4000,
                    dismissible: true,
                    position: "top"
                })
            }
        },
    },
    created() {
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
    }

}
</script>