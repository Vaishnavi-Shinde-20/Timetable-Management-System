package com.example.sbtimetableprj.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.sbtimetableprj.exception.ResourceNotFoundException;
import com.example.sbtimetableprj.model.Admin;
import com.example.sbtimetableprj.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
  
    public Admin saveAdmin(Admin admin) {

        System.out.println("Before Encoding : " + admin.getPassword());

        admin.setPassword(passwordEncoder.encode(admin.getPassword()));

        System.out.println("After Encoding : " + admin.getPassword());

        return adminRepository.save(admin);
    }

    @Override
    public Admin getAdminById(Long adminId) {

        return adminRepository.findById(adminId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admin not found with ID : " + adminId));
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public Admin updateAdmin(Long adminId, Admin admin) {

        Admin existingAdmin = getAdminById(adminId);

        existingAdmin.setName(admin.getName());
        existingAdmin.setEmail(admin.getEmail());

        // Encrypt updated password
        existingAdmin.setPassword(passwordEncoder.encode(admin.getPassword()));

        return adminRepository.save(existingAdmin);
    }

    @Override
    public void deleteAdmin(Long adminId) {

        Admin admin = getAdminById(adminId);
        adminRepository.delete(admin);
    }

    @Override
    public Admin loginAdmin(String email, String password) {

        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invalid Email"));

        if (!passwordEncoder.matches(password, admin.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        return admin;
    }
}