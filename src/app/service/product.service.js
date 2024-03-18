import httpService from "./http.service";
// import localStorageService from "./localStorage.service";

const productEndpoint = "product/";

const productService = {
    get: async () => {
        const { data } = await httpService.get(productEndpoint);
        return data;
    },
    update: async (id, content) => {
        const { data } = await httpService.put(productEndpoint + id, content);
        return data;
    },

    fetchAll: async () => {
        const { data } = await httpService.get(productEndpoint);
        // console.log("data", data);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            productEndpoint + payload.id,
            payload
        );
        // console.log("data", data);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(productEndpoint + id);
        return data;
    }
    // delete: async (id) => {
    //     const { data } = await httpService.delete(productEndpoint + id);
    //     // console.log("data", data);
    //     return data;
    // }
};

export default productService;
