module.exports = {
    getValueFlash: (arrFlash, fieldName, position = 0) => {
        if (arrFlash.length) {
            flash = arrFlash[position];
            return flash[fieldName];
        }
    },
};
