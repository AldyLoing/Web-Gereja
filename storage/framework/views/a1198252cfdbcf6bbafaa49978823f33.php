

<?php $__env->startSection('title', 'Tambah Jemaat'); ?>
<?php $__env->startSection('page-title', 'Tambah Jemaat'); ?>

<?php $__env->startSection('content'); ?>
<div class="max-w-4xl">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <form action="<?php echo e(route('admin.members.store')); ?>" method="POST">
            <?php echo csrf_field(); ?>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Nama -->
                <div class="md:col-span-2">
                    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama Lengkap <span class="text-red-500">*</span></label>
                    <input type="text" name="name" id="name" value="<?php echo e(old('name')); ?>" required
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                    <?php $__errorArgs = ['name'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
                        <p class="mt-1 text-sm text-red-600 dark:text-red-400"><?php echo e($message); ?></p>
                    <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
                </div>

                <!-- NIK -->
                <div>
                    <label for="nik" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">NIK</label>
                    <input type="text" name="nik" id="nik" value="<?php echo e(old('nik')); ?>"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                </div>

                <!-- No KK -->
                <div>
                    <label for="kk_number" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">No. KK</label>
                    <input type="text" name="kk_number" id="kk_number" value="<?php echo e(old('kk_number')); ?>"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                </div>

                <!-- Gender -->
                <div>
                    <label for="gender" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Jenis Kelamin <span class="text-red-500">*</span></label>
                    <select name="gender" id="gender" required
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                        <option value="">Pilih...</option>
                        <option value="L" <?php echo e(old('gender') === 'L' ? 'selected' : ''); ?>>Laki-laki</option>
                        <option value="P" <?php echo e(old('gender') === 'P' ? 'selected' : ''); ?>>Perempuan</option>
                    </select>
                </div>

                <!-- Birth Place -->
                <div>
                    <label for="birth_place" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tempat Lahir</label>
                    <input type="text" name="birth_place" id="birth_place" value="<?php echo e(old('birth_place')); ?>"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                </div>

                <!-- Birth Date -->
                <div>
                    <label for="birth_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tanggal Lahir</label>
                    <input type="date" name="birth_date" id="birth_date" value="<?php echo e(old('birth_date')); ?>"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                </div>

                <!-- Blood Group -->
                <div>
                    <label for="blood_group" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Golongan Darah</label>
                    <select name="blood_group" id="blood_group"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                        <option value="">Pilih...</option>
                        <option value="A" <?php echo e(old('blood_group') === 'A' ? 'selected' : ''); ?>>A</option>
                        <option value="B" <?php echo e(old('blood_group') === 'B' ? 'selected' : ''); ?>>B</option>
                        <option value="AB" <?php echo e(old('blood_group') === 'AB' ? 'selected' : ''); ?>>AB</option>
                        <option value="O" <?php echo e(old('blood_group') === 'O' ? 'selected' : ''); ?>>O</option>
                    </select>
                </div>

                <!-- Marital Status -->
                <div>
                    <label for="marital_status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Pernikahan</label>
                    <select name="marital_status" id="marital_status"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                        <option value="">Pilih...</option>
                        <option value="S" <?php echo e(old('marital_status') === 'S' ? 'selected' : ''); ?>>Belum Menikah</option>
                        <option value="M" <?php echo e(old('marital_status') === 'M' ? 'selected' : ''); ?>>Menikah</option>
                        <option value="D" <?php echo e(old('marital_status') === 'D' ? 'selected' : ''); ?>>Cerai</option>
                        <option value="W" <?php echo e(old('marital_status') === 'W' ? 'selected' : ''); ?>>Duda/Janda</option>
                    </select>
                </div>

                <!-- Address -->
                <div class="md:col-span-2">
                    <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alamat</label>
                    <textarea name="address" id="address" rows="3"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200"><?php echo e(old('address')); ?></textarea>
                </div>

                <!-- Telp -->
                <div>
                    <label for="telp" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">No. Telepon</label>
                    <input type="text" name="telp" id="telp" value="<?php echo e(old('telp')); ?>"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                </div>

                <!-- Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input type="email" name="email" id="email" value="<?php echo e(old('email')); ?>"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                </div>

                <!-- Family -->
                <div>
                    <label for="family_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Keluarga</label>
                    <select name="family_id" id="family_id"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                        <option value="">Pilih Keluarga...</option>
                        <?php $__currentLoopData = $families; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $family): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <option value="<?php echo e($family->id); ?>" <?php echo e(old('family_id') == $family->id ? 'selected' : ''); ?>><?php echo e($family->name); ?></option>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    </select>
                </div>

                <!-- Church Groups -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kelompok Gereja</label>
                    <div class="space-y-2">
                        <?php $__currentLoopData = $churchGroups; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $group): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <label class="flex items-center">
                            <input type="checkbox" name="church_groups[]" value="<?php echo e($group->id); ?>" 
                                <?php echo e(in_array($group->id, old('church_groups', [])) ? 'checked' : ''); ?>

                                class="rounded border-gray-300 text-green-600 focus:ring-green-500">
                            <span class="ml-2 text-sm text-gray-700 dark:text-gray-300"><?php echo e($group->name); ?></span>
                        </label>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    </div>
                </div>

                <!-- Baptized -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Baptis</label>
                    <label class="flex items-center">
                        <input type="checkbox" name="is_baptized" value="1" <?php echo e(old('is_baptized') ? 'checked' : ''); ?>

                            class="rounded border-gray-300 text-green-600 focus:ring-green-500">
                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Sudah Dibaptis</span>
                    </label>
                </div>

                <!-- Status -->
                <div>
                    <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Jemaat <span class="text-red-500">*</span></label>
                    <select name="status" id="status" required
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                        <option value="1" <?php echo e(old('status', 1) == 1 ? 'selected' : ''); ?>>Aktif</option>
                        <option value="0" <?php echo e(old('status') === '0' ? 'selected' : ''); ?>>Tidak Aktif</option>
                    </select>
                </div>

                <!-- Activity Status -->
                <div>
                    <label for="activity_status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Keterangan Status</label>
                    <input type="text" name="activity_status" id="activity_status" value="<?php echo e(old('activity_status')); ?>" placeholder="Contoh: Pindah, Meninggal, dll"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                </div>
            </div>

            <!-- Buttons -->
            <div class="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <a href="<?php echo e(route('admin.members.index')); ?>" class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    Batal
                </a>
                <button type="submit" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium">
                    Simpan
                </button>
            </div>
        </form>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH E:\Orders\Project\Web Gereja\resources\views/admin/members/create.blade.php ENDPATH**/ ?>