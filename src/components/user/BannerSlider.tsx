// import React, { useEffect, useState } from 'react';
// // import '../../assets/images/b1.avif'
// // import '../../assets/images/b2.avif'
// // import '../../assets/images/b3.avif'
// // import '../../assets/images/b4.jpg'

// const BannerSlider = () => {
//     const banners = [
//         '/src/assets/images/b1.avif',
//         '/src/assets/images/b2.avif',
//         '/src/assets/images/b3.avif',
//         '/src/assets/images/b4.jpg'
//     ];

//     const [currentBanner, setCurrentBanner] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//           setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
//         }, 2000); 
    
//         return () => clearInterval(interval);
//       }, [banners.length]);

//     return (
//             <div className=' flex'>
//             <div className="relative w-1/2 h-[500px] overflow-hidden rounded-xl" style={{ marginTop: '7rem', marginLeft:'2rem'}}> 
//                 {banners.map((banner, index) => (
//                     <img
//                         key={index}
//                         src={banner}
//                         alt={`Banner ${index + 1}`}
//                         className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${currentBanner === index ? 'opacity-100' : 'opacity-0'}`}
//                     />
//                 ))}
//                 {/* <img src="src/assets/images/collage.avif" alt="" /> */}
//             </div>  
//             <div className="flex flex-col justify-center items-start w-1/2 h-[500px] bg-white rounded-xl m-4 p-4 text-left bg-slate-100" style={{ marginTop: '6rem', marginLeft: '2rem' }}>
//                 <h2 className="text-2xl font-bold text-4xl text-gray-700 mb-4">FIND PLAYERS & VENUES NEARBY</h2>
//                 <p className="text-lg mt-4 text-gray-500">Seamlessly explore sports venues </p>
//                    <p className="text-lg  text-gray-500">and play with sports enthusiasts just like you!</p> 
//             </div> 
//             </div>

//     );
// };

// export default BannerSlider;


import React, { useEffect, useState } from 'react';

const BannerSlider = () => {
    const [currentBanner, setCurrentBanner] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner((prevBanner) => (prevBanner + 1));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            <div className="relative w-full max-w-4xl h-[500px] flex flex-col justify-center items-center text-center bg-white bg-opacity-70 rounded-xl p-8 shadow-lg">
                <h2 className="text-5xl font-bold text-gray-700 mb-6">FIND PLAYERS & VENUES NEARBY</h2>
                <p className="text-xl text-gray-600 mb-6">Seamlessly explore sports venues and play with sports enthusiasts just like you!</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default BannerSlider;
