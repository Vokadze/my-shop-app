import httpService from "./http.service";

const basketEndpoint = "basket/";

const basketService = {
    fetchAll: async (content) => {
        console.log(content);
        const { data } = await httpService.get(basketEndpoint);
        console.log(data);
        return data;
    },

    getBasket: async (_id, content) => {
        console.log(_id);
        console.log(content);
        const { data } = await httpService.put(basketEndpoint + _id, {
            _id,
            ...content
        });
        console.log(data);
        return data;
    }
};

export default basketService;
