import createApiClient from "./api.service";

class BookService {
    constructor(baseUrl = "/api/book") {
        this.api = createApiClient(baseUrl);
    }

    async getAll(number, name) {
        const response = await this.api.get(`/?name=${name}&number=${number}&show=8`)
        console.log(response.data)
        return response.data
    }

    async getDetail(id) {
        console.log(id)
        const response = await this.api.get(`/${id}`)
        return response.data
    }

}

export default new BookService();