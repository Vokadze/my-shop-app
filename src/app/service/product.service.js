import httpService from "./http.service";
// import localStorageService from "./localStorage.service";

const productEndpoint = "product/";

const productService = {
    get: async () => {
        const { data } = await httpService.get(productEndpoint);
        return data;
    },
    update: async (content) => {
        const { data } = await httpService.put(productEndpoint, content);
        return data;
    },

    getProduct: async (_id, content) => {
        const { data } = await httpService.put(productEndpoint + _id, {
            _id,
            ...content
        });
        return data;
    },

    fetchAll: async () => {
        const { data } = await httpService.get(productEndpoint);
        // console.log("data", data);
        return data;
    },
    // create: async (id, payload) => {
    //     const { data } = await httpService.post(productEndpoint + id, payload);
    //     // console.log("data", data);
    //     return data;
    // },

    delete: async (id) => {
        const { data } = await httpService.delete(productEndpoint + id);
        return data;
    }
};

export default productService;
