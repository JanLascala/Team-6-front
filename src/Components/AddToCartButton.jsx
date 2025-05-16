import { useGlobalContext } from "../Contexts/GlobalContext";
import { useState } from "react";

export default function AddToCartButton({ vinyl }) {
    const { addToCart, cart, setIsCartOpen, vinyls } = useGlobalContext();
    const [isAdded, setIsAdded] = useState(false);


    const getUpdatedVinyl = () => {
        if (vinyls.state === "success") {
            return vinyls.vinyl_data.find(v => v.slug === vinyl.slug) || vinyl;
        }
        return vinyl;
    };

    const updatedVinyl = getUpdatedVinyl();
    const isInCart = cart.some(item => item.slug === updatedVinyl.slug);
    const currentItem = cart.find(item => item.slug === updatedVinyl.slug);
    const maxQuantity = currentItem?.quantity >= updatedVinyl.nAvailable;

    const handleAddToCart = (e) => {
        e.preventDefault();

        console.log('AddToCart clicked', { updatedVinyl, maxQuantity });


        if (updatedVinyl.nAvailable === 0 || maxQuantity) {
            return;
        }

        addToCart(updatedVinyl);
        setIsCartOpen(true);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
    };

    return (
        <button
            type="button"
            className={`btn add-to-cart-btn ${updatedVinyl.nAvailable === 0 ? 'btn-secondary' : maxQuantity ? 'btn-warning' : isInCart ? 'btn-success' : 'btn-dark'} btn-sm w-auto`}
            onClick={handleAddToCart}
            disabled={updatedVinyl.nAvailable === 0 || maxQuantity || isInCart}
        >
            {updatedVinyl.nAvailable === 0 ? 'worn out' : maxQuantity ? 'maximum quantity' : isInCart ? 'In the Cart' : isAdded ? 'Added!' : 'Add to cart'}
        </button>
    );
}