package com.pth.jobapp.util;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.dropbox.core.DbxException;
import com.dropbox.core.DbxRequestConfig;
import com.dropbox.core.v2.DbxClientV2;
import com.dropbox.core.v2.files.FileMetadata;
import com.dropbox.core.v2.files.WriteMode;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;
import java.util.UUID;

@Component
public class FileUploader {

    private Cloudinary cloudinary;
    private final DbxClientV2 dropboxClient;

    public FileUploader() {
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dzitm0sot",
                "api_key", "965528647757955",
                "api_secret", "iGqHN-8tTsL393sNEhWvcfWs6IQ",
                "overwrite", true));

        // Khởi tạo Dropbox Client
        DbxRequestConfig config = DbxRequestConfig.newBuilder("jobappPDF").build();
        dropboxClient = new DbxClientV2(config, "sl.BnuREmX1ksIQGEkX_uKbwiayy_VTkeadskSq5JAcgdELt2O9IYOCfRu4abQ78X76LyPeVZDcMhwPFlY2TbFHkOL2oCqzJqh2A4OYvJRxPORFggja0YNhC4kN7aCVlx7sy7BlmsG6u73rWeu9un-Z5nI");
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

    public String uploadPdfToDropbox(byte[] pdfData) throws IOException, DbxException {
        try (ByteArrayInputStream inputStream = new ByteArrayInputStream(pdfData)) {
            UUID uuid = UUID.randomUUID();
            String randomPath = uuid.toString();
            String fullPath = "/" + randomPath + ".pdf"; // Thêm phần mở rộng tệp PDF
            FileMetadata metadata = dropboxClient.files().uploadBuilder(fullPath)
                    .withMode(WriteMode.ADD)
                    .uploadAndFinish(inputStream);
            return metadata.getPathDisplay();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    public byte[] downloadPdfFromDropbox(String dropboxFilePath) throws IOException, DbxException {
        try (OutputStream outputStream = new ByteArrayOutputStream()) {
            System.out.println("đang cố gắng download file");
            dropboxClient.files().downloadBuilder(dropboxFilePath).download(outputStream);
            return ((ByteArrayOutputStream) outputStream).toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
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
