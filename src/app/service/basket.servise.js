import httpService from "./http.service";

const basketEndpoint = "basket/";

const basketService = {
    fetchAll: async () => {
        const { data } = await httpService.get(basketEndpoint);
        console.log(data);
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
        console.log("basketService incCount _id", _id);
        console.log("basketService incCount counter", counter);
        console.log("basketService incCount count", count);
        // console.log("basketService incCount countPay", countPay);
        console.log("basketService incCount payload", payload);
        const { data } = await httpService.patch(basketEndpoint + _id, {
            _id,
            ...payload,
            count: `${Number(count) - Number((counter - (counter - 1)))}`,
            countPay: counter
            // counter
        });
        console.log(`${Number(count) - Number((counter - (counter - 1)))}`);
        console.log(counter);
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
            count: `${Number(count) + Number(((counter + 1) - counter))}`,
            countPay: counter
        });
        console.log(`${Number(count) + Number(((counter + 1) - counter))}`);
        console.log(data);
        return data;
    },

    deleteBasket: async (id) => {
        const { data } = await httpService.delete(basketEndpoint + id);
        return data;
    },

    updateBasket: async (payload) => {
        const { data } = await httpService.patch(basketEndpoint + payload._id, payload);
        console.log(data);
        return data;
    }
};

export default basketService;
