import httpService from "./http.service";
// import localStorageService from "./localStorage.service";

const productEndpoint = "product/";

const productService = {
    get: async (id) => {
        const { data } = await httpService.get(productEndpoint + id);
        console.log("get.data", data);
        return data;
    },
    // get: async () => {
    //     const { data } = await httpService.get(productEndpoint);
    //     // console.log("req.data", data);
    //     return data;
    // },
    update: async (id, content) => {
        const { data } = await httpService.patch(productEndpoint + id, content);
        console.log("patch.data", data.content);
        return data;
    },

    // update: async (id, content) => {
    //     const { data } = await httpService.put(productEndpoint + id, content);
    //     // console.log("data", data);
    //     return data;
    // },

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
    removeProduct: async (prodId) => {
        const { data } = await httpService.delete(productEndpoint + prodId);
        return data;
    }
    // delete: async (id) => {
    //     const { data } = await httpService.delete(
    //         productEndpoint + id + "asdfg"
    //     );
    //     // console.log("data", data);
    //     return data;
    // }
};

export default productService;
