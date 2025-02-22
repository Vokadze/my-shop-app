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
        console.log({ _id });
        console.log(content);
        const { data } = await httpService.put(basketEndpoint + _id, {
            _id,
            ...content
        });
        console.log(data);
        return data;
    },

    incCount: async (_id, counter, count, payload) => {
        console.log("basketService incCount _id", _id);
        console.log("basketService incCount counter", counter);
        console.log("basketService incCount count", count);
        // console.log("basketService incCount countPay", countPay);
        console.log("basketService incCount payload", payload);
        const { data } = await httpService.patch(basketEndpoint + _id, {
            _id,
            ...payload,
            count: `${count - 1}` - `${counter}`,
            countPay: counter
            // counter
        });
        console.log(data);
        return data;
    },

    decCount: async (_id, counter, count, payload) => {
        console.log("basketService decCount _id", _id);
        console.log("basketService decCount counter", counter);
        console.log("basketService decCount count", count);
        console.log("basketService decCount payload", payload);
        const { data } = await httpService.patch(basketEndpoint + _id, {
            _id,
            ...payload,
            count: `${count}` - `${counter - 1}`,
            countPay: counter
        });
        console.log(data);
        return data;
    },

    deleteBasket: async (id) => {
        const { data } = await httpService.delete(basketEndpoint + id);
        return data;
    }
};

export default basketService;
