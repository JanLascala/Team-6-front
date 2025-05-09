import { useNavigate } from "react-router-dom"

export default function ServerErrorPage({ error }) {
    const navigate = useNavigate()

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg">
                        <div className="card-body text-center">
                            <div className="display-1 text-danger mb-3">⚠️</div>
                            <h1 className="card-title h3 mb-3">Oops! Something went wrong.</h1>
                            <p className="card-text text-muted">
                                {error || "An unexpected error occurred. Please try again later."}
                            </p>
                            <button
                                className="btn btn-danger mt-3"
                                onClick={() => navigate("/")}
                            >
                                Go to Homepage
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}