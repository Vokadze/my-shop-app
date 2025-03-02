import httpService from "./http.service";

const basketEndpoint = "basket/";

const basketService = {
    fetchAll: async () => {
        const { data } = await httpService.get(basketEndpoint);
        return data;
    },

    getBasket: async (_id, content) => {
        const { data } = await httpService.put(basketEndpoint + _id, {
            _id,
            countPay: 0,
            ...content
        });
        return data;
    },

    incCount: async (_id, counter, count, payload) => {
        const { data } = await httpService.patch(basketEndpoint + _id, {
            _id,
            count: count - (counter - (counter - 1)),
            countPay: counter
        });
        return data;
    },

    decCount: async (_id, counter, count, payload) => {
        const { data } = await httpService.patch(basketEndpoint + _id, {
            _id,
            count: count + (counter + 1 - counter),
            countPay: counter
        });
        return data;
    },

    updateCount: async (payload) => {
        const { data } = await httpService.patch(
            basketEndpoint + payload._id,
            payload
        );
        return data;
    },

    deleteBasket: async (id) => {
        const { data } = await httpService.delete(basketEndpoint + id);
        return data;
    }
};

export default basketService;
