

<?php $__env->startSection('title', 'Ulang Tahun Jemaat'); ?>
<?php $__env->startSection('page-title', 'Ulang Tahun Jemaat'); ?>

<?php $__env->startSection('content'); ?>
<div class="space-y-6">
    <!-- Filter Month -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <form action="<?php echo e(route('admin.birthdays.index')); ?>" method="GET" class="flex space-x-4">
            <div class="flex-1">
                <select name="month" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
                    <?php $__currentLoopData = $monthNames; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $key => $monthName): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <option value="<?php echo e($key); ?>" <?php echo e($month == $key ? 'selected' : ''); ?>><?php echo e($monthName); ?></option>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </select>
            </div>
            <div>
                <input type="number" name="year" value="<?php echo e($year); ?>" min="1900" max="2100" 
                    class="w-32 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-200">
            </div>
            <button type="submit" class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">Lihat</button>
        </form>
    </div>

    <!-- Birthday Card -->
    <div class="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow-lg p-6 text-white">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-2xl font-bold"><?php echo e($members->count()); ?> Jemaat</h3>
                <p class="text-yellow-100">Berulang tahun di bulan <?php echo e($monthNames[$month]); ?></p>
            </div>
            <svg class="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"/>
            </svg>
        </div>
    </div>

    <!-- Birthday List -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Daftar Ulang Tahun</h3>
        </div>

        <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <?php $__empty_1 = true; $__currentLoopData = $members; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $member): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
            <div class="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            <?php echo e($member->birthday_this_year->format('d')); ?>

                        </div>
                        <div>
                            <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100"><?php echo e($member->name); ?></h4>
                            <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                <span><?php echo e($member->birthday_this_year->locale('id')->isoFormat('dddd, D MMMM YYYY')); ?></span>
                                <span>•</span>
                                <span><?php echo e($member->age); ?> tahun</span>
                                <?php if($member->family): ?>
                                <span>•</span>
                                <span><?php echo e($member->family->name); ?></span>
                                <?php endif; ?>
                            </div>
                            <?php if($member->churchGroups->count() > 0): ?>
                            <div class="flex flex-wrap gap-1 mt-2">
                                <?php $__currentLoopData = $member->churchGroups; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $group): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <span class="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded"><?php echo e($group->name); ?></span>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </div>
                            <?php endif; ?>
                        </div>
                    </div>
                    <div class="text-right">
                        <?php if($member->telp): ?>
                        <a href="tel:<?php echo e($member->telp); ?>" class="text-green-600 hover:text-green-700 text-sm">
                            <?php echo e($member->telp); ?>

                        </a>
                        <?php endif; ?>
                        <?php if($member->email): ?>
                        <div>
                            <a href="mailto:<?php echo e($member->email); ?>" class="text-blue-600 hover:text-blue-700 text-sm">
                                <?php echo e($member->email); ?>

                            </a>
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
            <div class="p-6 text-center text-gray-500 dark:text-gray-400">
                Tidak ada jemaat yang berulang tahun di bulan ini
            </div>
            <?php endif; ?>
        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.admin', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH E:\Orders\Project\Web Gereja\resources\views/admin/birthdays/index.blade.php ENDPATH**/ ?>