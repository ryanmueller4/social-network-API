module.exports = { 
    formatDate: (timestamp) => {
        const formatter = new Intl.DateTimeFormat("en-us", {
            dateStyle: "full",
            timeStyle: "full",
        });

        const date = new Date(timestamp);
        return formatter.format(date);
    }
};