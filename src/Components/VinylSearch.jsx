import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useGlobalContext } from "../Contexts/GlobalContext";
import sortBy from "../functions/sortBy";

export default function VinylSearch() {
    const { vinyls } = useGlobalContext();
    const [query, setQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [sortByValue, setSortByValue] = useState("title");
    const [filterValue, setFilterValue] = useState("all");
    const [searchResults, setSearchResults] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get("search");
        const sortValue = params.get("sort");
        const filter = params.get("filter");

        if (searchQuery) setQuery(searchQuery);
        if (sortValue) setSortByValue(sortValue);
        if (filter) setFilterValue(filter);

        if (searchQuery && searchQuery.trim()) {
            setShowResults(true);
            fetchVinyls(searchQuery, filter || "all");
        } else {
            setShowResults(false);
        }
    }, [location.search]);

    const fetchVinyls = (searchQuery, filterValue) => {
        fetch(
            `http://localhost:3000/api/vinyls/search?filter=${filterValue}&search=${searchQuery}`
        )
            .then((res) => res.json())
            .then((data) => {
                setSearchResults(data);
            })
            .catch((err) => console.error("Error fetching vinyls:", err));
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setShowResults(value.trim() !== "");

        if (value.trim()) {
            fetchVinyls(value, filterValue);
        } else {
            setSearchResults([]);
        }
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortByValue(value);
    };

    const handleFilterChange = (value) => {
        setFilterValue(value);
        fetchVinyls(query, value);
    };

    const handleLoadMore = () => {
        const params = new URLSearchParams();
        params.set("search", query);
        params.set("sort", sortByValue);
        params.set("filter", filterValue);
        navigate(`/vinyls?${params.toString()}`);
        setShowResults(false);
    };

    const sortedVinyls = sortBy(sortByValue, searchResults);

    const limitedResults = sortedVinyls.slice(0, 5);

    const hasMoreResults = sortedVinyls.length > 5;

    return (
        <>
            <div className="position-relative text-dark" style={{ width: "400px" }}>
                <input
                    id="search-bar"
                    type="search"
                    className="form-control form-control-sm w-100"
                    placeholder="Search vinyls..."
                    value={query}
                    onChange={handleSearchChange}
                />

                {showResults && (
                    <div
                        className="position-absolute bg-white p-3 shadow rounded mt-1"
                        style={{
                            zIndex: 1000,
                            maxHeight: "500px",
                            overflowY: "auto",
                            width: "100%"
                        }}
                    >
                        <h5 className="mb-2 text-start">Search Results</h5>

                        <div className="d-flex gap-2 mb-2">
                            {["all", "title", "author"].map((value) => (
                                <label key={value} className="form-check-label">
                                    <input
                                        type="radio"
                                        className="form-check-input me-1"
                                        checked={filterValue === value}
                                        onChange={() => handleFilterChange(value)}
                                    />
                                    {value.charAt(0).toUpperCase() + value.slice(1)}
                                </label>
                            ))}
                        </div>

                        <div className="mb-2">
                            <label htmlFor="sort" className="form-label">
                                Sort by:
                            </label>
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

                        {vinyls.state === "loading" ? (
                            <p>Loading...</p>
                        ) : vinyls.state === "error" ? (
                            <p className="text-danger">Error fetching vinyls</p>
                        ) : limitedResults.length > 0 ? (
                            <>
                                <div className="list-group">
                                    {limitedResults.map((vinyl) => (
                                        <Link
                                            key={vinyl.slug}
                                            to={`/products/${vinyl.slug}`}
                                            className="list-group-item list-group-item-action"
                                            onClick={() => setShowResults(false)}
                                        >
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={"https://picsum.photos/300/200"}
                                                    alt={vinyl.title}
                                                    className="me-3"
                                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                />
                                                <div>
                                                    <h6 className="mb-0">{vinyl.title}</h6>
                                                    <small className="text-muted">
                                                        {vinyl.authorName} • {vinyl.genreName}
                                                    </small>
                                                    <div className="text-primary">
                                                        €{vinyl.price} {vinyl.releaseDate}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {hasMoreResults && (
                                    <button
                                        onClick={handleLoadMore}
                                        className="btn btn-outline-primary w-100 mt-2"
                                    >
                                        Load More Results ({sortedVinyls.length - 5} more)
                                    </button>
                                )}
                            </>
                        ) : (
                            <p className="text-muted mb-0">No results found</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
