<?php

use App\Http\Controllers\Admin\BaptismController;
use App\Http\Controllers\Admin\BirthdayController;
use App\Http\Controllers\Admin\ChurchGroupController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FamilyController;
use App\Http\Controllers\Admin\MemberController;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::get('/', [PostController::class, 'index'])->name('home');
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/{post:slug}', [PostController::class, 'show'])->name('posts.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Routes
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Posts / Warta Jemaat
    Route::resource('posts', AdminPostController::class);

    // Member Management
    Route::resource('members', MemberController::class);
    Route::resource('families', FamilyController::class);
    Route::resource('church-groups', ChurchGroupController::class);
    
    // Baptisms
    Route::resource('baptisms', BaptismController::class);
    
    // Birthdays
    Route::get('/birthdays', [BirthdayController::class, 'index'])->name('birthdays.index');
});

require __DIR__.'/auth.php';
