export default function filterByText(vinyls, query) {
    if (vinyls.state !== 'success' || !query) return [];

    const lowerQuery = query.toLowerCase();

    const scoredVinyls = vinyls.vinyl_data
        .map(vinyl => {
            const title = vinyl.title?.toLowerCase() || "";
            const titleWords = title.split(/\s+/);

            let score = 0;

            if (title.startsWith(lowerQuery)) {
                score += 5;
            } else if (titleWords.some(word => word.startsWith(lowerQuery))) {
                score += 3;
            } else if (title.includes(lowerQuery)) {
                score += 1;
            }

            const authorMatch = vinyl.authorName?.toLowerCase().includes(lowerQuery);
            const genreMatch = vinyl.genreName?.toLowerCase().includes(lowerQuery);

            if (authorMatch) score += 2;
            if (genreMatch) score += 1;

            return { vinyl, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.vinyl);

    return scoredVinyls;
}