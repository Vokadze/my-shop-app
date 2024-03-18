export const categoriesObject = {
    electronics: { id: "65ce80c2eeeac84ae1ae5fdf", name: "Электроника" },
    jewelery: { id: "65ce80c2eeeac84ae1ae5fe0", name: "Ювилирные изделия" },
    men_clothing: { id: "65ce80c2eeeac84ae1ae5fe1", name: "Мужская одежда" },
    women_clothing: { id: "65ce80c2eeeac84ae1ae5fe2", name: "Женская одежда" },
    foldsack: { id: "65ce80c2eeeac84ae1ae5fe3", name: "Рюкзак" }
};
export const categories = [
    { id: "65ce80c2eeeac84ae1ae5fdf", name: "Электроника" },
    { id: "65ce80c2eeeac84ae1ae5fe0", name: "Ювилирные изделия" },
    { id: "65ce80c2eeeac84ae1ae5fe1", name: "Мужская одежда" },
    { id: "65ce80c2eeeac84ae1ae5fe2", name: "Женская одежда" },
    { id: "65ce80c2eeeac84ae1ae5fe3", name: "Рюкзак" }
];
const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(categories);
        }, 2000);
    });

export default {
    fetchAll
};
