import { useState } from 'react';

export default function VinylSearch() {
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const vinyls = [
        { id: 1, title: "Abbey Road", artist: "The Beatles" },
        { id: 2, title: "The Dark Side of the Moon", artist: "Pink Floyd" },
        { id: 3, title: "Back to Black", artist: "Amy Winehouse" },
        { id: 4, title: "Thriller", artist: "Michael Jackson" },
        { id: 5, title: "Rumours", artist: "Fleetwood Mac" }
    ];

    const filtered = vinyls.filter(v =>
        v.title.toLowerCase().includes(query.toLowerCase()) ||
        v.artist.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="position-relative">
            <button
                className="btn btn-outline-secondary"
                onClick={() => setShowSearch(!showSearch)}
                title="Cerca vinili"
            >
                <i className="bi bi-search"></i>
            </button>

            {showSearch && (
                <div
                    className="position-absolute bg-white p-3 border shadow rounded"
                    style={{ top: '100%', right: 0, zIndex: 999, minWidth: '250px' }}
                >
                    <form
                        className="d-flex mb-2"
                        role="search"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            className="form-control form-control-sm me-2"
                            type="search"
                            placeholder="Search title or artist..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                    </form>

                    {query.trim() !== "" && (
                        <ul className="list-group list-group-flush">
                            {filtered.length > 0 ? (
                                filtered.map((v) => (
                                    <li key={v.id} className="list-group-item py-1 px-2">
                                        <strong>{v.title}</strong> – {v.artist}
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item text-muted py-1 px-2">
                                    No results found.
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

