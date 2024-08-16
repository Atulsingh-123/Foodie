import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface AddFoodModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log('Selected file:', e.target.files[0]); // Debugging line
            const file = e.target.files[0]
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Set image preview
        } else {
            console.log('No file selected');
        }
    };

    const uploadImage = async (): Promise<string | null> => {
        if (!image) return null;

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                return data.imageUrl; // Assuming the server responds with the image URL
            } else {
                console.error('Image upload failed:', data.message);
                return null;
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const handleSubmit = async () => {
        if (!name || !price || !description || !category || !image) {
            alert("All fields are required!");
            return;
        }

        setIsUploading(true);
        const imageUrl = await uploadImage();

        if (!imageUrl) {
            alert("Image upload failed");
            setIsUploading(false);
            return;
        }

        const foodData = {
            name,
            price,
            description,
            category,
            imageUrl,
        };

        try {
            const response = await fetch('http://localhost:5000/api/food-dishes/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(foodData),
            });

            const data = await response.json();
            toast.success(data.message);
            onClose(); // Close the modal after successful submission
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 w-full max-w-md mx-4 sm:mx-0 max-h-[80vh] overflow-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Food</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter food name"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter food price"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter food description"
                        rows={4}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter food category"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {imagePreview && (
                    <div className="mt-4">
                        <img
                            src={imagePreview}
                            alt="Selected"
                            className="w-full h-48 object-cover rounded-lg shadow-sm"
                        />
                    </div>
                )}

                <div className="flex justify-end space-x-3 mt-4">
                    <button
                        onClick={onClose}
                        className="bg-red-600 text-white px-4 py-2 mr-[11.9rem] rounded-lg hover:bg-red-700 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : 'Add Food'}
                    </button>
                </div>
            </div>
        </div>

    );
};

export default AddFoodModal;
