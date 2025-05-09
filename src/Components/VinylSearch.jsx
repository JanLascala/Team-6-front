import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../Contexts/GlobalContext";
import filterByText from "../functions/filterByText";
import sortBy from '../functions/sortBy';

export default function VinylSearch() {
    const { vinyls } = useGlobalContext();
    const [query, setQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [sortByValue, setSortByValue] = useState("title");
    const [filterValue, setFilterValue] = useState("all");

    switch (vinyls.state) {

        case 'loading':
            return <h1>Loading...</h1>

        case 'success':

            const sortedVinyls = sortBy(sortByValue, filterByText(vinyls, query, filterValue))

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

            const handleFilterChange = (value) => {
                setFilterValue(prev => (prev === value ? "all" : value));
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

                        {showResults &&
                            (
                                <div
                                    className="position-absolute bg-white p-3 shadow rounded mt-1"
                                    style={{ width: '300px', zIndex: 1000, maxHeight: '500px', overflowY: 'auto' }}
                                >
                                    <h5 className="mb-2">Search Results</h5>

                                    <div className="d-flex gap-2 mb-2">
                                        {['all', 'title', 'author'].map(value => (
                                            <label key={value} className="form-check-label">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input me-1"
                                                    checked={filterValue === value}
                                                    onChange={() => handleFilterChange(value)}
                                                />
                                                {value.charAt(0).toUpperCase() + value.slice(1)}
                                            </label>
                                        ))}
                                    </div>


                                    <div className="mb-2">
                                        <label htmlFor="sort" className="form-label">Sort by:</label>
                                        <select
                                            id="sort"
                                            className="form-select form-select-sm"
                                            value={sortByValue}
                                            onChange={handleSortChange}
                                        >
                                            <option value="none">-</option>
                                            <option value="A-Z">A-Z</option>
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