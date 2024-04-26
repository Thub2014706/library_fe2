import createApiClient from "./api.service";

class BorrowService {
    constructor(baseUrl = "/api/borrow") {
        this.api = createApiClient(baseUrl);
    }

    async create(data) {
        const response = (await this.api.post("/", data))
        return response.data
    }

    async getByUser(id, number, column1, column2) {
        console.log(id, number, column1, column2)
        const response = await this.api.get(`/find-by-user/${id}?number=${number}&column1=${column1}&column2=${column2}`)
        return response.data
    }

    async update(id) {
        console.log(id)
        const response = await this.api.put(`/${id}`)
        return response.data
    }
    // async deleteReader(id) {
    //     const response = await this.api.delete(`/${id}`)
    //     return response.data
    // }
}

export default new BorrowService();