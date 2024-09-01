// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axiosInstance from '../../../utils/axiosInstance';
// import { OWNER_API } from '../../../constants';
// import uploadImagesToCloudinary from '../../../API/uploadImages';
// import showToast from '../../../utils/toaster';

// const VenueDetailsPage: React.FC = () => {
//     const { venueId } = useParams<{ venueId: string }>();
//     const [venueDetails, setVenueDetails] = useState({
//         name: '',
//         sportsitem: '',
//         place: '',
//         primaryImage: '',
//         secondaryImages: [] as string[]
//     });
//     const [primaryImageFile, setPrimaryImageFile] = useState<File | null>(null);
//     const [primaryImagePreview, setPrimaryImagePreview] = useState<string | null>(null);
//     const [secondaryImageFiles, setSecondaryImageFiles] = useState<File[]>([]);
//     const [secondaryImagePreviews, setSecondaryImagePreviews] = useState<string[]>([]);
//     const [errors, setErrors] = useState({
//         name: '',
//         sportsitem: '',
//         place: '',
//         primaryImage: '',
//         secondaryImages: ''
//     });

//     useEffect(() => {
//         const fetchVenueDetails = async () => {
//             try {
//                 const response = await axiosInstance.get(`${OWNER_API}/venue-details/${venueId}`);
//                 setVenueDetails(response.data.venueDetails);
//                 // Preload primary image preview
//                 if (response.data.venueDetails.primaryImage) {
//                     setPrimaryImagePreview(response.data.venueDetails.primaryImage);
//                 }
//                 // Preload secondary image previews
//                 if (response.data.venueDetails.secondaryImages.length > 0) {
//                     setSecondaryImagePreviews(response.data.venueDetails.secondaryImages);
//                 }
//             } catch (error) {
//                 console.error('Error fetching venue details:', error);
//             }
//         };

//         if (venueId) {
//             fetchVenueDetails();
//         }
//     }, [venueId]);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setVenueDetails(prevState => ({ ...prevState, [name]: value }));
//         // Clear previous errors
//         setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
//     };

//     const handlePrimaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             const file = e.target.files[0];
//             setPrimaryImageFile(file);
//             setPrimaryImagePreview(URL.createObjectURL(file));
//             // Clear previous errors
//             setErrors(prevErrors => ({ ...prevErrors, primaryImage: '' }));
//         }
//     };

//     const handleSecondaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) {
//             const files = Array.from(e.target.files);
//             // Limit to 4 images
//             const newSecondaryImages = files.slice(0, 4);
//             setSecondaryImageFiles(newSecondaryImages);
//             setSecondaryImagePreviews(newSecondaryImages.map(file => URL.createObjectURL(file)));
//             // Clear previous errors
//             setErrors(prevErrors => ({ ...prevErrors, secondaryImages: '' }));
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         // Validation
//         const { name, sportsitem, place } = venueDetails;
//         let valid = true;
//         const newErrors = {
//             name: '',
//             sportsitem: '',
//             place: '',
//             primaryImage: '',
//             secondaryImages: ''
//         };

//         if (!name.trim()) {
//             newErrors.name = 'Venue name cannot be empty';
//             valid = false;
//         } else if (!/^[a-zA-Z\s]*$/.test(name.trim())) {
//             newErrors.name = 'Venue name should not contain numbers';
//             valid = false;
//         }

//         if (!sportsitem.trim()) {
//             newErrors.sportsitem = 'Sports item cannot be empty';
//             valid = false;
//         } else if (!/^[a-zA-Z\s]*$/.test(sportsitem.trim())) {
//             newErrors.sportsitem = 'Sports item should not contain numbers';
//             valid = false;
//         }

//         if (!place.trim()) {
//             newErrors.place = 'Location cannot be empty';
//             valid = false;
//         }

//         if (!valid) {
//             setErrors(newErrors);
//             return;
//         }

//         let primaryImageUrl = venueDetails.primaryImage;
//         if (primaryImageFile) {
//             const uploadedPrimaryImage = await uploadImagesToCloudinary([primaryImageFile]);
//             //@ts-ignore
//             if (uploadedPrimaryImage.length > 0) {
//                 //@ts-ignore
//                 primaryImageUrl = uploadedPrimaryImage[0];
//             }
//         }

//         let updatedSecondaryImages = [...venueDetails.secondaryImages];
//         if (secondaryImageFiles.length > 0) {
//             const uploadedSecondaryImages = await uploadImagesToCloudinary(secondaryImageFiles);
//             //@ts-ignore
//             updatedSecondaryImages = [...uploadedSecondaryImages];
//         }

//         const updatedVenueDetails = {
//             ...venueDetails,
//             primaryImage: primaryImageUrl,
//             secondaryImages: updatedSecondaryImages
//         };

//         try {
//             await axiosInstance.patch(`${OWNER_API}/update-venue/${venueId}`, updatedVenueDetails);
//             setVenueDetails(updatedVenueDetails);
//             showToast('Venue updated successfully', 'success');
//             console.log('Venue updated successfully');
//         } catch (error) {
//             showToast('Failed to update the venue', 'error');
//             console.error('Error updating venue details:', error);
//             // Handle error state or show error message
//         }
//     };

//     return (
//         <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6 mt-12">
//             <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
//                 <h1 className="text-3xl font-bold mb-6">Venue Details</h1>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Venue Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             className={`w-full px-4 py-2 border rounded-lg ${errors.name && 'border-red-500'}`}
//                             value={venueDetails.name}
//                             onChange={handleInputChange}
//                         />
//                         {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Sports Item</label>
//                         <input
//                             type="text"
//                             name="sportsitem"
//                             className={`w-full px-4 py-2 border rounded-lg ${errors.sportsitem && 'border-red-500'}`}
//                             value={venueDetails.sportsitem}
//                             onChange={handleInputChange}
//                         />
//                         {errors.sportsitem && <div className="text-red-500 text-sm mt-1">{errors.sportsitem}</div>}
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Location</label>
//                         <input
//                             type="text"
//                             name="place"
//                             className={`w-full px-4 py-2 border rounded-lg ${errors.place && 'border-red-500'}`}
//                             value={venueDetails.place}
//                             onChange={handleInputChange}
//                         />
//                         {errors.place && <div className="text-red-500 text-sm mt-1">{errors.place}</div>}
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Primary Image</label>
//                         <input
//                             type="file"
//                             accept="image/*"
//                             className={`w-full px-4 py-2 border rounded-lg ${errors.primaryImage && 'border-red-500'}`}
//                             onChange={handlePrimaryImageChange}
//                         />
//                         {primaryImagePreview && (
//                             <div
//                                 className="w-48 h-36 object-cover bg-gray-200 rounded-lg mt-4"
//                                 style={{
//                                     backgroundImage: `url(${primaryImagePreview})`,
//                                     backgroundSize: 'cover',
//                                     backgroundPosition: 'center'
//                                 }}
//                             ></div>
//                         )}
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 mb-2">Secondary Images</label>
//                         <input
//                             type="file"
//                             accept="image/*"
//                             multiple
//                             className={`w-full px-4 py-2 border rounded-lg ${errors.secondaryImages && 'border-red-500'}`}
//                             onChange={handleSecondaryImageChange}
//                         />
//                         {secondaryImagePreviews.length > 0 && (
//                             <div className="grid grid-cols-2 gap-4 mt-4">
//                                 {secondaryImagePreviews.map((image, index) => (
//                                     <div
//                                         key={index}
//                                         className="w-48 h-36 object-cover bg-gray-200 rounded-lg"
//                                         style={{
//                                             backgroundImage: `url(${image})`,
//                                             backgroundSize: 'cover',
//                                             backgroundPosition: 'center'
//                                         }}
//                                     ></div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                     <button
//                         type="submit"
//                         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                     >
//                         Update Venue
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default VenueDetailsPage;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';
import { OWNER_API } from '../../../constants';
import uploadImagesToCloudinary from '../../../API/uploadImages';
import showToast from '../../../utils/toaster';

const VenueDetailsPage: React.FC = () => {
    const { venueId } = useParams<{ venueId: string }>();
    const [venueDetails, setVenueDetails] = useState({
        name: '',
        sportsitem: '',
        place: '',
        primaryImage: '',
        secondaryImages: [] as string[]
    });
    const [primaryImageFile, setPrimaryImageFile] = useState<File | null>(null);
    const [primaryImagePreview, setPrimaryImagePreview] = useState<string | null>(null);
    const [secondaryImageFiles, setSecondaryImageFiles] = useState<File[]>([]);
    const [secondaryImagePreviews, setSecondaryImagePreviews] = useState<string[]>([]);
    const [errors, setErrors] = useState({
        name: '',
        sportsitem: '',
        place: '',
        primaryImage: '',
        secondaryImages: ''
    });

    useEffect(() => {
        const fetchVenueDetails = async () => {
            try {
                const response = await axiosInstance.get(`${OWNER_API}/venue-details/${venueId}`);
                setVenueDetails(response.data.venueDetails);
                if (response.data.venueDetails.primaryImage) {
                    setPrimaryImagePreview(response.data.venueDetails.primaryImage);
                }
                if (response.data.venueDetails.secondaryImages.length > 0) {
                    setSecondaryImagePreviews(response.data.venueDetails.secondaryImages);
                }
            } catch (error) {
                console.error('Error fetching venue details:', error);
            }
        };

        if (venueId) {
            fetchVenueDetails();
        }
    }, [venueId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVenueDetails(prevState => ({ ...prevState, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const handlePrimaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPrimaryImageFile(file);
            setPrimaryImagePreview(URL.createObjectURL(file));
            setErrors(prevErrors => ({ ...prevErrors, primaryImage: '' }));
        }
    };

    const handleSecondaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newSecondaryImages = files.slice(0, 4);
            setSecondaryImageFiles(newSecondaryImages);
            setSecondaryImagePreviews(newSecondaryImages.map(file => URL.createObjectURL(file)));
            setErrors(prevErrors => ({ ...prevErrors, secondaryImages: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, sportsitem, place } = venueDetails;
        let valid = true;
        const newErrors = {
            name: '',
            sportsitem: '',
            place: '',
            primaryImage: '',
            secondaryImages: ''
        };

        if (!name.trim()) {
            newErrors.name = 'Venue name cannot be empty';
            valid = false;
        } else if (!/^[a-zA-Z\s]*$/.test(name.trim())) {
            newErrors.name = 'Venue name should not contain numbers';
            valid = false;
        }

        if (!sportsitem.trim()) {
            newErrors.sportsitem = 'Sports item cannot be empty';
            valid = false;
        } else if (!/^[a-zA-Z\s]*$/.test(sportsitem.trim())) {
            newErrors.sportsitem = 'Sports item should not contain numbers';
            valid = false;
        }

        if (!place.trim()) {
            newErrors.place = 'Location cannot be empty';
            valid = false;
        }

        if (!valid) {
            setErrors(newErrors);
            return;
        }

        let primaryImageUrl = venueDetails.primaryImage;
        if (primaryImageFile) {
            const uploadedPrimaryImage = await uploadImagesToCloudinary([primaryImageFile]);
            //@ts-ignore
            if (uploadedPrimaryImage.length > 0) {
                //@ts-ignore
                primaryImageUrl = uploadedPrimaryImage[0];
            }
        }

        let updatedSecondaryImages = [...venueDetails.secondaryImages];
        if (secondaryImageFiles.length > 0) {
            const uploadedSecondaryImages = await uploadImagesToCloudinary(secondaryImageFiles);
            //@ts-ignore
            updatedSecondaryImages = [...uploadedSecondaryImages];
        }

        const updatedVenueDetails = {
            ...venueDetails,
            primaryImage: primaryImageUrl,
            secondaryImages: updatedSecondaryImages
        };

        try {
            await axiosInstance.patch(`${OWNER_API}/update-venue/${venueId}`, updatedVenueDetails);
            setVenueDetails(updatedVenueDetails);
            showToast('Venue updated successfully', 'success');
            console.log('Venue updated successfully');
        } catch (error) {
            showToast('Failed to update the venue', 'error');
            console.error('Error updating venue details:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-6 mt-12">
            <div className="w-full max-w-lg sm:max-w-2xl bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Venue Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 sm:mb-4">
                        <label className="block text-gray-700 mb-1 sm:mb-2">Venue Name</label>
                        <input
                            type="text"
                            name="name"
                            className={`w-full px-3 sm:px-4 py-2 border rounded-lg ${errors.name && 'border-red-500'}`}
                            value={venueDetails.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>
                    <div className="mb-3 sm:mb-4">
                        <label className="block text-gray-700 mb-1 sm:mb-2">Sports Item</label>
                        <input
                            type="text"
                            name="sportsitem"
                            className={`w-full px-3 sm:px-4 py-2 border rounded-lg ${errors.sportsitem && 'border-red-500'}`}
                            value={venueDetails.sportsitem}
                            onChange={handleInputChange}
                        />
                        {errors.sportsitem && <div className="text-red-500 text-sm mt-1">{errors.sportsitem}</div>}
                    </div>
                    <div className="mb-3 sm:mb-4">
                        <label className="block text-gray-700 mb-1 sm:mb-2">Location</label>
                        <input
                            type="text"
                            name="place"
                            className={`w-full px-3 sm:px-4 py-2 border rounded-lg ${errors.place && 'border-red-500'}`}
                            value={venueDetails.place}
                            onChange={handleInputChange}
                        />
                        {errors.place && <div className="text-red-500 text-sm mt-1">{errors.place}</div>}
                    </div>
                    <div className="mb-3 sm:mb-4">
                        <label className="block text-gray-700 mb-1 sm:mb-2">Primary Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className={`w-full px-3 sm:px-4 py-2 border rounded-lg ${errors.primaryImage && 'border-red-500'}`}
                            onChange={handlePrimaryImageChange}
                        />
                        {primaryImagePreview && (
                            <div
                                className="w-full sm:w-48 h-36 object-cover bg-gray-200 rounded-lg mt-3 sm:mt-4 mx-auto sm:mx-0"
                                style={{
                                    backgroundImage: `url(${primaryImagePreview})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            ></div>
                        )}
                    </div>
                    <div className="mb-3 sm:mb-4">
                        <label className="block text-gray-700 mb-1 sm:mb-2">Secondary Images</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className={`w-full px-3 sm:px-4 py-2 border rounded-lg ${errors.secondaryImages && 'border-red-500'}`}
                            onChange={handleSecondaryImageChange}
                        />
                        {secondaryImagePreviews.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-3 sm:mt-4">
                                {secondaryImagePreviews.map((image, index) => (
                                    <div
                                        key={index}
                                        className="w-full sm:w-48 h-36 object-cover bg-gray-200 rounded-lg"
                                        style={{
                                            backgroundImage: `url(${image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    ></div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center sm:justify-end mt-4 sm:mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                        >
                            Update Venue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VenueDetailsPage;
