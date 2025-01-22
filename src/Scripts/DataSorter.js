function dateConverter(date) {
    if (!date) return null; 
    const parts = date.split("-");
    const year = parseInt(parts[0], 10); 
    const month = parseInt(parts[1], 10); 
    const day = parseInt(parts[2].substring(0, 2), 10); 
    return (month < 10 ? "0" : "") + month + 
           (day < 10 ? "0" : "") + day + 
           year;
}

function DataSorter(data) {
    const dataMap = data.map((item) => {
        return [dateConverter(item.Date || ""), item];
    });

    // Sort the data by the converted date
    dataMap.sort((a, b) => a[0] - b[0]);

    // Extract the sorted items
    return dataMap.map((entry) => entry[1]);
}

export default DataSorter