import { useGlobalContext } from "../Contexts/GlobalContext";
import { useState } from "react";

export default function AddToCartButton({ vinyl }) {
    const { addToCart, cart } = useGlobalContext();
    const [isAdded, setIsAdded] = useState(false);

    const isInCart = cart.some(item => item.slug === vinyl.slug);

    const handleAddToCart = () => {
        if (!isInCart) {
            addToCart(vinyl);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 1500);
        }
    };

    return (
        <button
            className={`btn btn-dark btn-sm w-auto position-relative`}
            onClick={handleAddToCart}
            disabled={isInCart}
        >
            {isInCart ? 'In the cart' : isAdded ? 'Added!!' : 'Add to cart'}

            {isAdded && (
                <span className="position-absolute">
                    <span className="visually-hidden">Added</span>
                </span>
            )}
        </button>
    );
}
