import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = "/api/user") {
        this.api = createApiClient(baseUrl);
    }

    async login(data) {
        const response = (await this.api.post("/login", data))
        return response.data
    }

    async register(data) {
        const response = (await this.api.post("/register", data))
        return response.data
    }

}

export default new UserService();