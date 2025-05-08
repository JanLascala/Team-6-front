export default function filterByText(vinyls, query) {
    
    const filteredVinyls = vinyls.state === 'success'
            ? vinyls.vinyl_data.filter(vinyl =>
                vinyl.title?.toLowerCase().includes(query.toLowerCase()) ||
                vinyl.authorName?.toLowerCase().includes(query.toLowerCase()) ||
                vinyl.genreName?.toLowerCase().includes(query.toLowerCase())
            )
            : [];

        return filteredVinyls
}
