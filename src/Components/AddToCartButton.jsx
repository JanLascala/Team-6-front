import { useGlobalContext } from "../Contexts/GlobalContext";
import { useState } from "react";

export default function AddToCartButton({ vinyl }) {
    const { addToCart, cart } = useGlobalContext();
    const [isAdded, setIsAdded] = useState(false);
    const isInCart = cart.some(item => item.slug === vinyl.slug);

    const handleAddToCart = () => {
        if (vinyl.nAvailable === 0) {
            alert("Prodotto esaurito!");
            return;
        }

        addToCart(vinyl);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
    };

    return (
        <button
            className={`btn ${vinyl.nAvailable === 0 ? 'btn-secondary' : isInCart ? 'btn-success' : 'btn-dark'} btn-sm w-auto`}
            onClick={handleAddToCart}
            disabled={vinyl.nAvailable === 0 || isInCart}
        >
            {vinyl.nAvailable === 0 ? 'worn out' : isInCart ? 'In the Cart' : isAdded ? 'Added!' : 'Add to cart'}
        </button>
    );
}