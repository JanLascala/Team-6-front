import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function VinylSearch() {
    const [query, setQuery] = useState("");
    const [vinyls, setVinyls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        if (query.trim() === "") {
            setShowResults(false);
            return;
        }

        setIsLoading(true);
        fetch("http://localhost:3000/api/vinyls")
            .then(res => res.json())
            .then(data => {
                const queryLower = query.toLowerCase();
                const filtered = data.filter(v =>
                    v.title?.toLowerCase().startsWith(queryLower) ||
                    v.genre?.toLowerCase().startsWith(queryLower) ||
                    v.artist?.toLowerCase().startsWith(queryLower)
                );
                setVinyls(filtered);
                setShowResults(true);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Errore nel fetch:", err);
                setIsLoading(false);
            });
    }, [query]);

    return (
        <div className="position-relative">
            <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Search vinyls..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ minWidth: "200px" }}
            />

            {showResults && (
                <div className="position-absolute bg-white p-3 shadow rounded mt-1" style={{ width: '400px', zIndex: 1000, maxHeight: '500px', overflowY: 'auto' }}>
                    <h5 className="mb-2">Search Results:</h5>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : vinyls.length > 0 ? (
                        <div className="list-group">
                            {vinyls.map(v => (
                                <Link
                                    key={v.id}
                                    to={`/vinyls/${v.id}`}
                                    className="list-group-item list-group-item-action"
                                    onClick={() => setShowResults(false)}
                                >
                                    <div className="d-flex align-items-center">
                                        {v.img_url && (
                                            <img
                                                src={v.img_url}
                                                alt={v.title}
                                                className="me-3"
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            />
                                        )}
                                        <div>
                                            <h6 className="mb-0">{v.title}</h6>
                                            <small className="text-muted">{v.artist} • {v.genre}</small>
                                            <div className="text-primary">€{v.price}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted mb-0">No results found.</p>
                    )}
                </div>
            )}
        </div>
    );
}



