package com.example.sbtimetableprj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.sbtimetableprj.model.Admin;
import com.example.sbtimetableprj.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Register Admin
    @PostMapping("/register")
    public Admin registerAdmin(@RequestBody Admin admin) {
        return adminService.saveAdmin(admin);
    }

    // Admin Login
    @PostMapping("/login")
    public Admin loginAdmin(@RequestParam String email,
                            @RequestParam String password) {
        return adminService.loginAdmin(email, password);
    }

    // Get Admin by ID
    @GetMapping("/{id}")
    public Admin getAdminById(@PathVariable("id") Long adminId) {
        return adminService.getAdminById(adminId);
    }

    // Get All Admins
    @GetMapping("/all")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    // Update Admin
    @PutMapping("/update/{id}")
    public Admin updateAdmin(@PathVariable("id") Long adminId,
                             @RequestBody Admin admin) {
        return adminService.updateAdmin(adminId, admin);
    }

    // Delete Admin
    @DeleteMapping("/delete/{id}")
    public String deleteAdmin(@PathVariable("id") Long adminId) {

        adminService.deleteAdmin(adminId);

        return "Admin deleted successfully.";
    }
}