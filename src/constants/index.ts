export const nameRegex = /^[A-Z][a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
export const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
export const phoneRegex = /^\d{10}$/;
// export const BASE_URL = "https://hometrends.site/api/"
export const BASE_URL = "http://localhost:3000/api/"
export const SERVER_URL = "http://localhost:3000"
// export const SERVER_URL = "https://hometrends.site"
export const USER_API = BASE_URL + "user"
export const OWNER_API = BASE_URL + "owner"
export const ADMIN_API = BASE_URL + "admin";
export const CHAT_API = BASE_URL + "chat";
export const CLOUDINARY_UPLOAD_API = "https://api.cloudinary.com/v1_1/dwytsuspa/upload";
export const cloudinaryUploadPreset = "doso3zuz"