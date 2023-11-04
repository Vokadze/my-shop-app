export const categoriesObject = {
    electronics: { id: 1, name: "Электроника" },
    jewelery: { id: 2, name: "Ювилирные изделия" },
    men_clothing: { id: 3, name: "Мужская одежда" },
    women_clothing: { id: 4, name: "Женская одежда" },
    foldsack: { id: 5, name: "Рюкзак" }
};
export const categories = [
    { id: 1, name: "Электроника" },
    { id: 2, name: "Ювилирные изделия" },
    { id: 3, name: "Мужская одежда" },
    { id: 4, name: "Женская одежда" },
    { id: 5, name: "Рюкзак" }
];
const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(categoriesObject);
        }, 2000);
    });

export default {
    fetchAll
};
