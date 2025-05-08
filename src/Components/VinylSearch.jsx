import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../Contexts/GlobalContext";
import sortBy from '../functions/sortBy';

export default function VinylSearch() {
    const { vinyls } = useGlobalContext();
    const [query, setQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [sortByValue, setSortByValue] = useState("title");

    switch (vinyls.state) {

        case 'loading':
            return <h1>Loading...</h1>

        case 'success':

            const sortedVinyls = sortBy(vinyls, query, sortByValue)

            // Sort the filtered vinyls based on the selected sort option
            /* const sortedVinyls = [...filterByText(vinyls, query)].sort((a, b) => {
                if (sortBy === "title") {
                    return (a.title || "").localeCompare(b.title || "");
                } else if (sortBy === "priceAsc") {
                    return (a.price || 0) - (b.price || 0);
                } else if (sortBy === "priceDesc") {
                    return (b.price || 0) - (a.price || 0);
                } else if (sortBy === "recent") {
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
            }); */

            const handleSearchChange = (e) => {
                const value = e.target.value;
                setQuery(value);
                setShowResults(value.trim() !== "");
            };

            const handleSortChange = (e) => {
                setSortByValue(e.target.value);
            };

            const handleSearchClick = (e) => {
                setShowResults(false)
                setQuery('')
            };

            return (
                <>
                    <div className="position-relative">
                        <input
                            type="search"
                            className="form-control form-control-sm"
                            placeholder="Search vinyls..."
                            value={query}
                            onChange={handleSearchChange}
                            style={{ minWidth: "300px" }}
                        />

                        {showResults && (
                            <div
                                className="position-absolute bg-white p-3 shadow rounded mt-1"
                                style={{ width: '300px', zIndex: 1000, maxHeight: '500px', overflowY: 'auto' }}
                            >
                                <h5 className="mb-2">Search Results</h5>

                                <div className="mb-2">
                                    <label htmlFor="sort" className="form-label">Sort by:</label>
                                    <select
                                        id="sort"
                                        className="form-select form-select-sm"
                                        value={sortByValue}
                                        onChange={handleSortChange}
                                    >
                                        <option value="title">Title</option>
                                        <option value="recent">Recent</option>
                                        <option value="priceAsc">Price asc</option>
                                        <option value="priceDesc">Price desc</option>
                                    </select>
                                </div>

                                {vinyls.state === 'loading' ? (
                                    <p>Loading...</p>
                                ) : vinyls.state === 'error' ? (
                                    <p className="text-danger">Error fetching vinyls</p>
                                ) : sortedVinyls.length > 0 ? (
                                    <div className="list-group">
                                        {sortedVinyls.map(vinyl => (
                                            <Link
                                                key={vinyl.productId}
                                                to={`/products/${vinyl.slug}`}
                                                className="list-group-item list-group-item-action"
                                                onClick={() => handleSearchClick()}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={'http://localhost:3000/vinyl_placeholder.png'}
                                                        alt={vinyl.title}
                                                        className="me-3"
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                    />
                                                    <div>
                                                        <h6 className="mb-0">{vinyl.title}</h6>
                                                        <small className="text-muted">{vinyl.authorName} • {vinyl.genreName}</small>
                                                        <div className="text-primary">€{vinyl.price} {vinyl.releaseDate}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted mb-0">No results found</p>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )

        case 'error':
            return <h1>{vinyls.message}</h1>

        default:
            return <p>Unknown status</p>

    }


}