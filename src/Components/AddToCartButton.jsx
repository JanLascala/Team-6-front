import { useGlobalContext } from "../Contexts/GlobalContext";
import { useState } from "react";


export default function AddToCartButton({ vinyl }) {
    const { addToCart, cart, setIsCartOpen } = useGlobalContext();
    const [isAdded, setIsAdded] = useState(false);
    const isInCart = cart.some(item => item.slug === vinyl.slug);
    const currentItem = cart.find(item => item.slug === vinyl.slug)
    const maxQuantity = currentItem?.quantity >= vinyl.nAvailable

    const handleAddToCart = () => {
        if (vinyl.nAvailable === 0 || maxQuantity) {
            return;
        }


        addToCart(vinyl);
        setIsCartOpen(true);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
    }


    return (
        <button
            className={`btn ${vinyl.nAvailable === 0 ? 'btn-secondary' : maxQuantity ? 'btn-warning' : isInCart ? 'btn-success' : 'btn-dark'} btn-sm w-auto`}
            onClick={handleAddToCart}
            disabled={vinyl.nAvailable === 0 || maxQuantity || isInCart}
        >
            {vinyl.nAvailable === 0 ? 'worn out' : maxQuantity ? 'maximum quantity' : isInCart ? 'In the Cart' : isAdded ? 'Added!' : 'Add to cart'}
        </button>


    );
}