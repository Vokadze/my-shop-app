import httpService from "./http.service";
import localStorageService from "./localStorage.service";
// import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndpoint + payload.id,
            payload
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getUserId()
        );
        return data;
    }
};

export default userService;
