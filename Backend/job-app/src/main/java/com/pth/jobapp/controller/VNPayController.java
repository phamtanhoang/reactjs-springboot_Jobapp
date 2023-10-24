package com.pth.jobapp.controller;

import com.pth.jobapp.entity.Employer;
import com.pth.jobapp.entity.EmployerVip;
import com.pth.jobapp.entity.Vip;
import com.pth.jobapp.service.EmployerService;
import com.pth.jobapp.service.EmployerVipService;
import com.pth.jobapp.service.JwtService;
import com.pth.jobapp.service.VipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FilterOutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.pth.jobapp.config.Config;
@RestController
@CrossOrigin("*")
@RequestMapping("/api/VNPay")
public class VNPayController {

    @Autowired
    VipService vipService;
    @Autowired
    EmployerVipService employerVipService;
    @Autowired
    JwtService jwtService;
    @Autowired
    EmployerService employerService;
    @GetMapping("/pay")
    public ResponseEntity<?> getPay(@RequestParam String vipId,@RequestHeader("Authorization") String token) throws UnsupportedEncodingException {
        try {

            String employerName = jwtService.extractUsername(token.substring(7));
            Employer employer = employerService.findByAccountUsername(employerName);

            if (employer != null) {


                Vip vip = vipService.findById(vipId).get();

                String vnp_Version = "2.1.0";
                String vnp_Command = "pay";
                String orderType = "other";

                String bankCode = "NCB";
                long price = (long) vip.getPrice() * 100;
                String vnp_TxnRef = Config.getRandomNumber(8);
                String vnp_IpAddr = "127.0.0.1";

                String vnp_TmnCode = Config.vnp_TmnCode;

                Map<String, String> vnp_Params = new HashMap<>();
                vnp_Params.put("vnp_Version", vnp_Version);
                vnp_Params.put("vnp_Command", vnp_Command);
                vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
                vnp_Params.put("vnp_Amount", String.valueOf(price));
                vnp_Params.put("vnp_CurrCode", "VND");

//                vnp_Params.put("vnp_BankCode", bankCode);
                vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
                vnp_Params.put("vnp_OrderInfo", "VIP" + vipId + "EMPLOYER" + employer.getId());
                vnp_Params.put("vnp_OrderType", orderType);

                vnp_Params.put("vnp_Locale", "vn");
                vnp_Params.put("vnp_ReturnUrl", Config.vnp_ReturnUrl);
                vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

                Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
                SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
                String vnp_CreateDate = formatter.format(cld.getTime());
                vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

                cld.add(Calendar.MINUTE, 15);
                String vnp_ExpireDate = formatter.format(cld.getTime());
                vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

                List fieldNames = new ArrayList(vnp_Params.keySet());
                Collections.sort(fieldNames);
                StringBuilder hashData = new StringBuilder();
                StringBuilder query = new StringBuilder();
                Iterator itr = fieldNames.iterator();
                while (itr.hasNext()) {
                    String fieldName = (String) itr.next();
                    String fieldValue = (String) vnp_Params.get(fieldName);
                    if ((fieldValue != null) && (fieldValue.length() > 0)) {
                        hashData.append(fieldName);
                        hashData.append('=');
                        hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                        query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                        query.append('=');
                        query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                        if (itr.hasNext()) {
                            query.append('&');
                            hashData.append('&');
                        }
                    }
                }
                String queryUrl = query.toString();
                String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString());
                queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
                String paymentUrl = Config.vnp_PayUrl + "?" + queryUrl;

                return ResponseEntity.ok().body(paymentUrl);
            } else {
                return ResponseEntity.badRequest().body("Token không hợp lệ");
            }
        }catch (Exception e){
            return  ResponseEntity.badRequest().body("ERROR!");
        }
    }

    @GetMapping("/paymentResult")
    public ResponseEntity<String> paymentResult(@RequestParam("vnp_TransactionNo") String vnpTransactionNo,
                                                @RequestParam("vnp_ResponseCode") String vnpResponseCode,
                                                @RequestParam("vnp_OrderInfo") String vnpOrderInfo) {
        try {
            if (vnpResponseCode.equals("00")) {
                String[] parts = vnpOrderInfo.split("EMPLOYER");
                if (parts.length == 2) {
                    String vipId = parts[0].substring(parts[0].lastIndexOf("VIP") + 3);
                    String employerId = parts[1];

                    Vip vip = vipService.findById(vipId).orElseThrow(() -> new Exception("Không tìm thấy VIP"));
                    Optional<EmployerVip> optionalEmployerVip = employerVipService.findByEmployerIdAndAvailable(employerId);

                    if (optionalEmployerVip.isPresent()) {
                        EmployerVip existsEmployerVip = optionalEmployerVip.get();
                        EmployerVip employerVip = new EmployerVip();
                        employerVip.setEmployerId(employerId);
                        employerVip.setVipId(vipId);
                        employerVip.setId(vnpTransactionNo);
                        employerVip.setPrice(vip.getPrice());
                        employerVip.setFromDate(Date.from(existsEmployerVip.getToDate().toInstant().plus(1, ChronoUnit.DAYS)));
                        Calendar calendar = Calendar.getInstance();
                        calendar.setTime(existsEmployerVip.getToDate());
                        calendar.add(Calendar.MONTH, vip.getAmount());
                        calendar.add(Calendar.DATE,1);


                        Date toDate = calendar.getTime();
                        employerVip.setToDate(toDate);
                        employerVipService.save(employerVip);
                        return ResponseEntity.ok("Thanh toán thành công");
                    } else {

                        EmployerVip employerVip = new EmployerVip();
                        employerVip.setId(vnpTransactionNo);
                        employerVip.setEmployerId(employerId);
                        employerVip.setVipId(vipId);
                        employerVip.setFromDate(new Date());
                        Calendar calendar = Calendar.getInstance();
                        calendar.setTime(new Date());
                        calendar.add(Calendar.MONTH, vip.getAmount());
                        Date toDate = calendar.getTime();
                        employerVip.setToDate(toDate);
                        employerVip.setPrice(vip.getPrice());
                        employerVipService.save(employerVip);
                        return ResponseEntity.ok("Thanh toán thành công");
                    }


                } else {
                    return ResponseEntity.badRequest().body("Dữ liệu không hợp lệ");
                }
            } else {
                return ResponseEntity.badRequest().body("Thanh toán thất bại");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi xảy ra trong quá trình xử lý thanh toán");
        }
    }


}
