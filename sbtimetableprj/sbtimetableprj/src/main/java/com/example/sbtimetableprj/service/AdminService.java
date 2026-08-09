package com.example.sbtimetableprj.service;

import java.util.List;

import com.example.sbtimetableprj.model.Admin;

public interface AdminService {

    // Register Admin
    Admin saveAdmin(Admin admin);

    // Get Admin by Id
    Admin getAdminById(Long adminId);

    // Get All Admins
    List<Admin> getAllAdmins();

    // Update Admin
    Admin updateAdmin(Long adminId, Admin admin);

    // Delete Admin
    void deleteAdmin(Long adminId);

    // Login Admin
    Admin loginAdmin(String email, String password);

}