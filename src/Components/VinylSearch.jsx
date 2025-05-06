import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../Contexts/GlobalContext";

export default function VinylSearch() {
    const { vinyls } = useGlobalContext();
    const [query, setQuery] = useState("");
    const [showResults, setShowResults] = useState(false);

    const filteredVinyls = vinyls.state === 'success'
        ? vinyls.vinyl_data.filter(vinyl =>
            vinyl.title?.toLowerCase().includes(query.toLowerCase()) ||
            vinyl.authorName?.toLowerCase().includes(query.toLowerCase()) ||
            vinyl.genre?.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setShowResults(value.trim() !== "");
    };

    return (
        <div className="position-relative">
            <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Search vinyls..."
                value={query}
                onChange={handleSearchChange}
                style={{ minWidth: "200px" }}
            />

            {showResults && (
                <div
                    className="position-absolute bg-white p-3 shadow rounded mt-1"
                    style={{ width: '400px', zIndex: 1000, maxHeight: '500px', overflowY: 'auto' }}
                >
                    <h5 className="mb-2">Search Results:</h5>
                    {vinyls.state === 'loading' ? (
                        <p>Loading...</p>
                    ) : vinyls.state === 'error' ? (
                        <p className="text-danger">Error fetching vinyls</p>
                    ) : filteredVinyls.length > 0 ? (
                        <div className="list-group">
                            {filteredVinyls.map(vinyl => (
                                <Link
                                    key={vinyl.id}
                                    to={`/products/${vinyl.slug}`}
                                    className="list-group-item list-group-item-action"
                                    onClick={() => setShowResults(false)}
                                >
                                    <div className="d-flex align-items-center">
                                        {vinyl.img_url && (
                                            <img
                                                src={vinyl.img_url}
                                                alt={vinyl.title}
                                                className="me-3"
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            />
                                        )}
                                        <div>
                                            <h6 className="mb-0">{vinyl.title}</h6>
                                            <small className="text-muted">{vinyl.authorName} • {vinyl.genre}</small>
                                            <div className="text-primary">€{vinyl.price}</div>
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
    );
}