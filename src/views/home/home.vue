<template>
    <div>
        <img :src="img1" alt="" class="mx-auto" />
        <div class="container">
            <div class="row mt-3">
                <div class="form-inline col d-flex">
                    <label class="mt-2" for="sel1">Hiện trang:</label>
                    <select class="form-control ml-2 form-control-sm" style="width: 60px;" id="sel1" @change="handlePage($event)">
                        <option v-for="i in length" :key="i" :value="i">{{ i }}</option>
                    </select>
                </div>
                <div class="col">
                    <form class="form-inline mt-2 float-right" @submit.prevent="handleSearch">
                        <input class="my-3 form-control form-control-sm" type="text" placeholder="Tìm kiếm..." v-model="search">
                        <button class="ml-2 btn btn-info btn-sm" type="submit">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
            </div>
            <div class="row my-4">
                <div v-for="(book, index) in books" :key="index" class="col-sm-3">
                    <Book :book="book"></Book>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import img1 from "@/assets/images/book1.png"
import Book from "@/components/book.vue"
import BookService from "@/services/book.service.js"
export default {
    components: {
        Book
    },
    data () {
        return {
            img1: img1,
            books: [],
            search: '',
            length: 1,
        }
    },
    methods: {
        async getAllBooks(number) {
            try {
                const data = await BookService.getAll(number, this.search)
                this.books = data.data
                this.length = data.totalPages
            } catch (error) {
                console.log(error);
            }
        },

        async handleSearch() {
            try {
                const data = await BookService.getAll(1, this.search)
                this.books = data.data
                this.length = data.totalPages
            } catch (error) {
                console.log(error);
            }
        },

        handlePage(e) {
            this.getAllBooks(e.target.value)
        },
    },
    mounted() {
        this.getAllBooks(1)
    }

}
</script>