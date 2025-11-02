# Formulir Tambah Jemaat - Dokumentasi

## ✅ Fitur yang Sudah Dibuat

### 1. **Halaman Create Member** (`/admin/members/create`)

Halaman formulir lengkap untuk menambah data jemaat baru dengan fitur:

#### **Informasi Pribadi**
- ✅ NIK (wajib, 16 digit)
- ✅ Nomor KK (opsional, 16 digit)
- ✅ Nama Lengkap (wajib)
- ✅ Jenis Kelamin (Laki-laki/Perempuan)
- ✅ Status Pernikahan (Belum Menikah/Menikah/Cerai/Janda-Duda)
- ✅ Tempat Lahir
- ✅ Tanggal Lahir (date picker)

#### **Informasi Kontak**
- ✅ Nomor Telepon
- ✅ Email
- ✅ Alamat (textarea)

#### **Informasi Gereja**
- ✅ Pilihan Keluarga (dropdown dari database)
- ✅ Pilihan Kelompok Sel (checkbox multiple selection)
  - PELNAP
  - PELRAP
  - PELWAP
  - PELPRIP
  - PELPAP

### 2. **API Endpoint Enhancement**

API `/api/members` (POST) sudah diperbaiki untuk mendukung:
- ✅ Relasi dengan tabel `families`
- ✅ Relasi many-to-many dengan `church_groups` melalui tabel pivot `member_church_group`
- ✅ Validasi autentikasi (hanya ADMIN)
- ✅ Auto-create relasi kelompok sel saat member dibuat

### 3. **UI/UX Features**

- ✅ **Responsive Design** - Mobile-friendly
- ✅ **Dark Mode Support** - Otomatis mengikuti tema
- ✅ **Loading States** - Spinner saat menyimpan
- ✅ **Form Validation** - HTML5 validation dengan required fields
- ✅ **User Feedback** - Alert sukses/error
- ✅ **Navigation** - Tombol kembali dan cancel
- ✅ **Church Theme** - Menggunakan church-green color scheme

## 🎯 Cara Menggunakan

### **Akses Halaman**

1. Login sebagai ADMIN
2. Buka `/admin/members`
3. Klik tombol **"Tambah Data"** (hijau, ada icon Plus)
4. Isi formulir
5. Klik **"Simpan Data"**

### **Field Wajib vs Opsional**

**Wajib (Required):**
- NIK
- Nama Lengkap
- Jenis Kelamin

**Opsional:**
- Semua field lainnya

### **Tombol Aksi**

- **Simpan Data** (Hijau) - Submit form dan simpan ke database
- **Batal** (Abu-abu) - Kembali ke halaman list tanpa menyimpan

## 🔧 Technical Details

### **File Structure**
```
app/admin/members/
├── page.tsx              # List page (sudah ada)
└── create/
    └── page.tsx          # Create form (baru)

app/api/members/
├── route.ts              # POST endpoint (diperbaiki)
└── [id]/
    └── route.ts          # GET/PUT/DELETE by ID
```

### **Database Relations**

```typescript
Member {
  id: string
  nik: string (unique)
  fullName: string
  gender: Gender (MALE/FEMALE)
  // ... fields lain
  
  // Relations
  family: Family?
  churchGroups: MemberChurchGroup[]
  baptism: Baptism?
}

MemberChurchGroup {
  id: string
  memberId: string
  churchGroupId: string
  joinedAt: DateTime
  
  member: Member
  churchGroup: ChurchGroup
}
```

### **API Request Body**

```json
{
  "nik": "3201234567890123",
  "kk": "3201234567890123",
  "fullName": "John Doe",
  "gender": "MALE",
  "birthPlace": "Jakarta",
  "birthDate": "1990-01-01T00:00:00.000Z",
  "phone": "08123456789",
  "email": "john@example.com",
  "address": "Jl. Contoh No. 123",
  "maritalStatus": "SINGLE",
  "familyId": "clxxx123456",
  "churchGroupIds": ["clxxx111", "clxxx222"]
}
```

### **API Response**

```json
{
  "id": "clxxx999",
  "nik": "3201234567890123",
  "fullName": "John Doe",
  "gender": "MALE",
  "family": {
    "id": "clxxx123456",
    "headOfFamily": "Keluarga Doe"
  },
  "churchGroups": [
    {
      "id": "clxxx777",
      "memberId": "clxxx999",
      "churchGroupId": "clxxx111",
      "churchGroup": {
        "id": "clxxx111",
        "name": "PELNAP"
      }
    }
  ],
  "createdAt": "2025-11-02T...",
  "updatedAt": "2025-11-02T..."
}
```

## 🚀 Next Steps (Belum Dibuat)

### **Halaman Edit** (`/admin/members/[id]/edit`)
- Copy struktur dari create page
- Pre-fill form dengan data existing
- API PUT ke `/api/members/[id]`

### **Halaman Detail** (`/admin/members/[id]`)
- View-only page
- Tampilkan semua informasi member
- Tombol Edit dan Delete

### **Validasi Tambahan**
- Validasi NIK unik (client-side check)
- Format NIK 16 digit numerik
- Format email valid
- Format phone number Indonesia

### **Features Lanjutan**
- Upload foto profil (Supabase Storage)
- Riwayat baptisan
- Riwayat kelompok sel
- Export data ke Excel/PDF

## 📝 Testing Checklist

- [ ] Login sebagai ADMIN
- [ ] Buka halaman `/admin/members`
- [ ] Klik tombol "Tambah Data"
- [ ] Isi semua field required
- [ ] Pilih 1-2 kelompok sel
- [ ] Submit form
- [ ] Verifikasi data muncul di list
- [ ] Verifikasi relasi kelompok sel tersimpan
- [ ] Test validation (kosongkan NIK)
- [ ] Test loading state
- [ ] Test button Cancel

## 🐛 Known Issues

- ⚠️ **Belum ada validasi NIK duplicate** di client-side (hanya error dari database)
- ⚠️ **Belum ada preview data** sebelum submit
- ⚠️ **Belum ada autosave** (data hilang jika refresh)

## 🔐 Security

- ✅ Route protected by middleware (hanya ADMIN)
- ✅ API endpoint check session dan role
- ✅ Input sanitization by Prisma
- ✅ CSRF protection by Next.js

## 📚 Related Documentation

- [Prisma Schema](../../../prisma/schema.prisma)
- [API Members](../../../app/api/members/route.ts)
- [Authentication](../../../lib/auth.ts)
- [Supabase Setup](../../../SUPABASE_SETUP.md)
