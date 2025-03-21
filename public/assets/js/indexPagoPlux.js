function initData(dataPago) {
    console.log('entro aka');
    if (Data) {
        console.log('entro aka');
        Data.init(dataPago);
    }

}

function reload(data) {
    if (Data) {
        Data.reload(data);
    }
}