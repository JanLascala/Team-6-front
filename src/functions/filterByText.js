export default function filterByText(vinyls, query, filterField = "all") {

    const lowerQuery = query.toLowerCase();

    const scoredVinyls = vinyls.vinyl_data
        .map(vinyl => {
            const title = vinyl.title?.toLowerCase() || "";
            const author = vinyl.authorName?.toLowerCase() || "";
            const genre = vinyl.genreName?.toLowerCase() || "";
            const format = vinyl.formatName?.toLowerCase() || "";

            let score = 0;

            if (filterField === "all" || filterField === "title") {
                const titleWords = title.split(/\s+/);
                if (title.startsWith(lowerQuery)) score += 5;
                else if (titleWords.some(word => word.startsWith(lowerQuery))) score += 3;
                else if (title.includes(lowerQuery)) score += 1;
            }

            if (filterField === "all" || filterField === "author") {
                if (author.includes(lowerQuery)) score += 2;
            }

            if (filterField === "all" || filterField === "genre") {
                if (genre.includes(lowerQuery)) score += 1;
            }

            if (filterField === "format") {
                if (format.includes(lowerQuery)) score += 1;
            }

            return { vinyl, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.vinyl);

    return scoredVinyls;
}