import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useGlobalContext } from "../Contexts/GlobalContext";
import sortBy from "../functions/sortBy";
import AddToCartButton from "../Components/AddToCartButton";

export default function Vinyls() {
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

        // Always show results, fetch based on current query
        setShowResults(true);
        fetchVinyls(searchQuery || "", filter || "all");
    }, [location.search]);

    const fetchVinyls = (searchQuery, filterValue) => {
        // If searchQuery is empty, fetch all vinyls
        const endpoint = searchQuery.trim()
            ? `http://localhost:3000/api/vinyls/search?filter=${filterValue}&search=${searchQuery}`
            : `http://localhost:3000/api/vinyls`;

        fetch(endpoint)
            .then((res) => res.json())
            .then((data) => {
                setSearchResults(data);
                setShowResults(true); // Always show results
            })
            .catch((err) => console.error("Error fetching vinyls:", err));
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setShowResults(true); // Always show results, even when empty

        updateURL(value, sortByValue, filterValue);

        // Fetch all vinyls when empty or fetch filtered results
        fetchVinyls(value, filterValue);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortByValue(value);
        updateURL(query, value, filterValue);
    };

    const handleFilterChange = (value) => {
        setFilterValue(value);
        updateURL(query, sortByValue, value);
        fetchVinyls(query, value);
    };

    const updateURL = (search, sort, filter) => {
        const params = new URLSearchParams(location.search);
        if (search) params.set("search", search);
        if (sort) params.set("sort", sort);
        if (filter) params.set("filter", filter);
        navigate(`${location.pathname}?${params.toString()}`);
    };

    const sortedVinyls = sortBy(sortByValue, searchResults);

    return (
        <div className="vinyls-page container-fluid py-4">
            <h1 className="mb-5">Vinyl Collection</h1>

            <div className="row align-items-center mb-5">
                <div className="col-lg-5 col-md-6 mb-3 mb-md-0">
                    <div className="input-group h-100 d-flex align-items-center">
                        <input
                            id="search-bar"
                            type="search"
                            className="form-control"
                            placeholder="Search vinyls..."
                            value={query}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <div className="col-lg-7 col-md-6">
                    <div className="d-flex flex-wrap align-items-center justify-content-md-end gap-3">
                        <div className="d-flex flex-wrap gap-2 align-items-center me-md-3">
                            <span>Filter: </span>
                            {["all", "title", "author"].map((value) => (
                                <label key={value} className="form-check-label ms-2 mb-0">
                                    <input
                                        type="radio"
                                        className="form-check-input me-1"
                                        checked={filterValue === value}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            document.getElementById("search-bar").blur();
                                            handleFilterChange(value);
                                        }}
                                    />
                                    {value.charAt(0).toUpperCase() + value.slice(1)}
                                </label>
                            ))}
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <label htmlFor="sort" className="mb-0">Sort by:</label>
                            <select
                                id="sort"
                                className="form-select me-3"
                                value={sortByValue}
                                onChange={handleSortChange}
                                style={{ width: "auto" }}
                            >
                                <option value="none">-</option>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                                <option value="recent">Recent</option>
                                <option value="priceAsc">Price asc</option>
                                <option value="priceDesc">Price desc</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {query && (
                <div className="mb-4">
                    <h5>Search results for: "{query}"</h5>
                    <p>{sortedVinyls.length} vinyls found</p>
                </div>
            )}

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {vinyls.state === "loading" ? (
                    <div className="col-12 text-center py-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : vinyls.state === "error" ? (
                    <div className="col-12">
                        <div className="alert alert-danger">
                            Error fetching vinyls. Please try again later.
                        </div>
                    </div>
                ) : sortedVinyls.length > 0 ? (
                    sortedVinyls.map((vinyl) => (
                        <div key={vinyl.slug} className="col mb-3">
                            <div className="vinyl-card card h-100 text-center d-flex flex-column">
                                <Link
                                    to={`/products/${vinyl.slug}`}
                                    className="text-decoration-none flex-grow-1 d-flex flex-column"
                                >
                                    <img
                                        src={vinyl.vinylImg || `https://picsum.photos/300/200?random=${vinyl.slug}`}
                                        className="card-img-top img-fluid"
                                        alt={vinyl.title}
                                        style={{ height: "200px", objectFit: "contain" }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://picsum.photos/300/200?random=${vinyl.slug}`;
                                        }}
                                    />
                                    <div className="card-body d-flex flex-column flex-grow-1 align-items-center px-5 text-center">
                                        <h5 className="card-title text-center">{vinyl.title}</h5>
                                        <h4 className="card-text">€{vinyl.price}</h4>
                                        <p className="card-text">{vinyl.releaseDate}</p>
                                        <p className="card-text">{vinyl.genreName}, {vinyl.formatName}</p>
                                        <p className="card-text">{vinyl.authorName}</p>
                                    </div>
                                </Link>
                                <div className="p-2 d-flex justify-content-center px-5">
                                    <AddToCartButton vinyl={vinyl} />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-100">
                        <div className="alert alert-info">
                            No vinyls found matching your search criteria.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
