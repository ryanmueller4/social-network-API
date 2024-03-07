module.exports = { 
    formatDate: () => {
        const formatter = new Intl.DateTimeFormat("en-us", {
            dateStyle: "full",
            timeStyle: "full",
        });

        const date = new Date();
        return formatter.format(date);
    }
};