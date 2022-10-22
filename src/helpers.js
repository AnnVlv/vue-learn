export const delay = (ms = 1000) => new Promise(res => {
    setTimeout(() => {
        res();
    }, ms);
});

export const getPageCount = (totalItemsCount, perPageItemsCount) => {
    return Math.ceil(totalItemsCount / perPageItemsCount);
};
