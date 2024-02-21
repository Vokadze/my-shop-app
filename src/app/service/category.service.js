import httpService from "./http.service";

const categoryEndpoint = "category/";

const categoryService = {
    get: async () => {
        const data = await httpService.get(categoryEndpoint);
        console.log("req.data", data);

        return data;
    }
};

export default categoryService;
