import cloudinary from "cloudinary";

// Cấu hình Cloudinary
cloudinary.v2.config({
  cloud_name: "dcpatkvcu", // Thay thế bằng cloud_name của bạn
  api_key: "287832351522537", // Thay thế bằng api_key của bạn
  api_secret: "lLcx9SJ-DyXdItfY-hX13OrWEx8", // Thay thế bằng api_secret của bạn
});

export default cloudinary;
