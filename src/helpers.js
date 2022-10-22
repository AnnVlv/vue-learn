export const delay = (ms = 1000) => new Promise(res => {
    setTimeout(() => {
        res();
    }, ms);
});

export const getPageCount = (totalItemsCount, perPageItemsCount) => {
    return Math.ceil(totalItemsCount / perPageItemsCount);
};

export const toUppercaseCaseFirstLetter = (str = '') => {
    return str ? `${str[0].toUpperCase()}${str.slice(1)}` : str;
};
