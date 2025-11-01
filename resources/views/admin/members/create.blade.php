@extends('layouts.admin')

@section('title', 'Tambah Jemaat')
@section('page-title', 'Tambah Jemaat')

@section('content')
<div class="max-w-4xl">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <form action="{{ route('admin.members.store') }}" method="POST">
            @csrf

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Nama -->
                <div class="md:col-span-2">
                    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Lengkap <span class="text-red-500">*</span></label>
                    <input type="text" name="name" id="name" value="{{ old('name') }}" required
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                    @error('name')
                        <p class="mt-1 text-sm text-red-600 dark:text-red-400">{{ $message }}</p>
                    @enderror
                </div>

                <!-- NIK -->
                <div>
                    <label for="nik" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">NIK</label>
                    <input type="text" name="nik" id="nik" value="{{ old('nik') }}"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                </div>

                <!-- No KK -->
                <div>
                    <label for="kk_number" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">No. KK</label>
                    <input type="text" name="kk_number" id="kk_number" value="{{ old('kk_number') }}"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                </div>

                <!-- Gender -->
                <div>
                    <label for="gender" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jenis Kelamin <span class="text-red-500">*</span></label>
                    <select name="gender" id="gender" required
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                        <option value="">Pilih...</option>
                        <option value="L" {{ old('gender') === 'L' ? 'selected' : '' }}>Laki-laki</option>
                        <option value="P" {{ old('gender') === 'P' ? 'selected' : '' }}>Perempuan</option>
                    </select>
                </div>

                <!-- Birth Place -->
                <div>
                    <label for="birth_place" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tempat Lahir</label>
                    <input type="text" name="birth_place" id="birth_place" value="{{ old('birth_place') }}"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                </div>

                <!-- Birth Date -->
                <div>
                    <label for="birth_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tanggal Lahir</label>
                    <input type="date" name="birth_date" id="birth_date" value="{{ old('birth_date') }}"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                </div>

                <!-- Blood Group -->
                <div>
                    <label for="blood_group" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Golongan Darah</label>
                    <select name="blood_group" id="blood_group"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                        <option value="">Pilih...</option>
                        <option value="A" {{ old('blood_group') === 'A' ? 'selected' : '' }}>A</option>
                        <option value="B" {{ old('blood_group') === 'B' ? 'selected' : '' }}>B</option>
                        <option value="AB" {{ old('blood_group') === 'AB' ? 'selected' : '' }}>AB</option>
                        <option value="O" {{ old('blood_group') === 'O' ? 'selected' : '' }}>O</option>
                    </select>
                </div>

                <!-- Marital Status -->
                <div>
                    <label for="marital_status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Pernikahan</label>
                    <select name="marital_status" id="marital_status"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                        <option value="">Pilih...</option>
                        <option value="S" {{ old('marital_status') === 'S' ? 'selected' : '' }}>Belum Menikah</option>
                        <option value="M" {{ old('marital_status') === 'M' ? 'selected' : '' }}>Menikah</option>
                        <option value="D" {{ old('marital_status') === 'D' ? 'selected' : '' }}>Cerai</option>
                        <option value="W" {{ old('marital_status') === 'W' ? 'selected' : '' }}>Duda/Janda</option>
                    </select>
                </div>

                <!-- Address -->
                <div class="md:col-span-2">
                    <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alamat</label>
                    <textarea name="address" id="address" rows="3"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">{{ old('address') }}</textarea>
                </div>

                <!-- Telp -->
                <div>
                    <label for="telp" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">No. Telepon</label>
                    <input type="text" name="telp" id="telp" value="{{ old('telp') }}"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                </div>

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input type="email" name="email" id="email" value="{{ old('email') }}"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                </div>

                <!-- Family -->
                <div>
                    <label for="family_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Keluarga</label>
                    <select name="family_id" id="family_id"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                        <option value="">Pilih Keluarga...</option>
                        @foreach($families as $family)
                        <option value="{{ $family->id }}" {{ old('family_id') == $family->id ? 'selected' : '' }}>{{ $family->name }}</option>
                        @endforeach
                    </select>
                </div>

                <!-- Church Groups -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kelompok Gereja</label>
                    <div class="space-y-2">
                        @foreach($churchGroups as $group)
                        <label class="flex items-center">
                            <input type="checkbox" name="church_groups[]" value="{{ $group->id }}" 
                                {{ in_array($group->id, old('church_groups', [])) ? 'checked' : '' }}
                                class="rounded border-gray-300 text-green-600 focus:ring-green-500">
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">{{ $group->name }}</span>
                        </label>
                        @endforeach
                    </div>
                </div>

                <!-- Baptized -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Baptis</label>
                    <label class="flex items-center">
                        <input type="checkbox" name="is_baptized" value="1" {{ old('is_baptized') ? 'checked' : '' }}
                            class="rounded border-gray-300 text-green-600 focus:ring-green-500">
                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Sudah Dibaptis</span>
                    </label>
                </div>

                <!-- Status -->
                <div>
                    <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Jemaat <span class="text-red-500">*</span></label>
                    <select name="status" id="status" required
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                        <option value="1" {{ old('status', 1) == 1 ? 'selected' : '' }}>Aktif</option>
                        <option value="0" {{ old('status') === '0' ? 'selected' : '' }}>Tidak Aktif</option>
                    </select>
                </div>

                <!-- Activity Status -->
                <div>
                    <label for="activity_status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Keterangan Status</label>
                    <input type="text" name="activity_status" id="activity_status" value="{{ old('activity_status') }}" placeholder="Contoh: Pindah, Meninggal, dll"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                </div>
            </div>

            <!-- Buttons -->
            <div class="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <a href="{{ route('admin.members.index') }}" class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    Batal
                </a>
                <button type="submit" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium">
                    Simpan
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
