package com.pth.jobapp.util;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Component
public class ImageUploader {

    private Cloudinary cloudinary;

    public ImageUploader() {
        // Khởi tạo Cloudinary với thông tin cấu hình
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dzitm0sot",
                "api_key", "965528647757955",
                "api_secret", "iGqHN-8tTsL393sNEhWvcfWs6IQ",
                "overwrite", true));
    }

    public String uploadImage(byte[] imageBytes) {
        try {
            System.out.println("đang thực hiện upload");
            Map<?, ?> uploadResult = cloudinary.uploader().upload(imageBytes, ObjectUtils.emptyMap());
            return (String) uploadResult.get("secure_url");
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    public String updateImage(String existingImageUrl, byte[] newImageBytes) {
        try {
            System.out.println("đã có ảnh thì update");
            Map<?, ?> uploadResult = cloudinary.uploader().upload(newImageBytes, ObjectUtils.asMap(
                    "public_id", getPublicIdFromUrl(existingImageUrl)
            ));
            return (String) uploadResult.get("secure_url");
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Phương thức để trích xuất public ID từ URL
    private String getPublicIdFromUrl(String imageUrl) {
        int lastIndex = imageUrl.lastIndexOf("/");
        if (lastIndex != -1) {
            return imageUrl.substring(lastIndex + 1, imageUrl.lastIndexOf("."));
        }
        return null;
    }
}
