<nav class="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
            <!-- Logo & Brand -->
            <a href="<?php echo e(route('home')); ?>" class="flex items-center space-x-3 group">
                <div class="w-12 h-12 bg-gradient-to-br from-church-green to-church-green-dark rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 3.5L2 9.5v7.5h5v-5h6v5h5V9.5L10 3.5z"/>
                        <path d="M10 0l2 2h-4l2-2z"/>
                    </svg>
                </div>
                <div class="hidden sm:block">
                    <h1 class="text-xl font-bold bg-gradient-to-r from-church-green to-church-green-dark bg-clip-text text-transparent">
                        Warta Jemaat
                    </h1>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Gereja Kristen</p>
                </div>
            </a>

            <!-- Navigation Menu -->
            <div class="hidden md:flex items-center space-x-1">
                <a href="<?php echo e(route('home')); ?>" class="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-all duration-200 <?php echo e(request()->routeIs('home') || request()->routeIs('posts.index') ? 'bg-church-green text-white' : ''); ?>">
                    Beranda
                </a>
                <a href="<?php echo e(route('posts.index')); ?>" class="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-all duration-200">
                    Warta
                </a>
                <?php if(auth()->guard()->check()): ?>
                    <a href="<?php echo e(route('admin.dashboard')); ?>" class="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-all duration-200">
                        Dashboard
                    </a>
                <?php else: ?>
                    <a href="<?php echo e(route('login')); ?>" class="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-all duration-200">
                        Login
                    </a>
                <?php endif; ?>
            </div>

            <!-- Dark Mode Toggle -->
            <button @click="darkMode = !darkMode" class="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <svg x-show="!darkMode" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <svg x-show="darkMode" class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </button>

            <!-- Mobile Menu Button -->
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path x-show="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    <path x-show="mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>

    <!-- Mobile Menu -->
    <div x-show="mobileMenuOpen" x-transition class="md:hidden border-t border-gray-100 dark:border-gray-800">
        <div class="px-4 py-3 space-y-1">
            <a href="<?php echo e(route('home')); ?>" class="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-colors">
                Beranda
            </a>
            <a href="<?php echo e(route('posts.index')); ?>" class="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-colors">
                Warta
            </a>
            <?php if(auth()->guard()->check()): ?>
                <a href="<?php echo e(route('admin.dashboard')); ?>" class="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-colors">
                    Dashboard
                </a>
            <?php else: ?>
                <a href="<?php echo e(route('login')); ?>" class="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-church-green hover:text-white transition-colors">
                    Login
                </a>
            <?php endif; ?>
        </div>
    </div>
</nav>
<?php /**PATH E:\Orders\Project\Web Gereja\resources\views/components/navbar.blade.php ENDPATH**/ ?>