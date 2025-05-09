export default function sortBy(sortByValue, array) {
    console.log(array);

    const sortedVinyls = [...array].sort((a, b) => {

        switch (sortByValue) {
            case "none":
                return array;
            case "A-Z":
                return (a.title || "").localeCompare(b.title || "");
            case "priceAsc":
                return (a.price || 0) - (b.price || 0);
            case "priceDesc":
                return (b.price || 0) - (a.price || 0);
            case "recent": {
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
        }
    });

    return sortedVinyls
}
