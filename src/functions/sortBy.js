import filterByText from "./filterByText";

export default function sortBy(vinyls, query, sortByValue) {

    const sortedVinyls = [...filterByText(vinyls, query)].sort((a, b) => {
        if (sortByValue === "title") {
            return (a.title || "").localeCompare(b.title || "");
        } else if (sortByValue === "priceAsc") {
            return (a.price || 0) - (b.price || 0);
        } else if (sortByValue === "priceDesc") {
            return (b.price || 0) - (a.price || 0);
        } else if (sortByValue === "recent") {
            const convertDate = (dateStr) => {
                if (!dateStr) return new Date(0);
    
                if (dateStr.includes('-')) {
                    const [day, month, year] = dateStr.split('-');
                    return new Date(`${year}-${month}-${day}`);
                }
    
                return new Date(dateStr);
            };
    
            const dateA = convertDate(a.releaseDate);
            const dateB = convertDate(b.releaseDate);
    
            return dateB - dateA;
        }
        return 0;
    });

    return sortedVinyls
}
