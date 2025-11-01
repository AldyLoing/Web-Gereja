@extends('layouts.frontend')

@section('title', 'Warta Jemaat Gereja')

@section('content')
<!-- Hero Section -->
<div class="relative bg-gradient-to-r from-church-green to-church-green-dark text-white overflow-hidden">
    <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMTBjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTEwIDBjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
    </div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 0v8h12V6H4zm2 2h8v4H6V8z"/>
            </svg>
            <span class="text-sm font-medium">Portal Berita Gereja</span>
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Warta Jemaat Gereja
        </h1>
        <p class="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Tetap terhubung dengan informasi terkini, kegiatan, dan pengumuman jemaat
        </p>
        
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto">
            <form action="{{ route('posts.index') }}" method="GET" class="relative">
                <input 
                    type="text" 
                    name="search" 
                    value="{{ request('search') }}"
                    placeholder="Cari warta atau pengumuman..." 
                    class="w-full px-6 py-4 pr-12 rounded-full text-gray-900 placeholder-gray-500 shadow-lg focus:outline-none focus:ring-4 focus:ring-church-gold transition-all duration-300"
                >
                <button type="submit" class="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-church-green to-church-green-dark text-white rounded-full hover:scale-110 transition-transform duration-300">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </button>
            </form>
        </div>
    </div>
</div>

<!-- Main Content -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Categories -->
        <aside class="lg:w-64 flex-shrink-0">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-church-green" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                    Kategori
                </h3>
                <ul class="space-y-2">
                    <li>
                        <a href="{{ route('posts.index') }}" 
                           class="flex items-center justify-between px-4 py-2 rounded-lg transition-colors duration-200 {{ !request('category') ? 'bg-gradient-to-r from-church-green to-church-green-dark text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700' }}">
                            <span>Semua Warta</span>
                            <span class="text-xs px-2 py-1 rounded-full {{ !request('category') ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-600' }}">
                                {{ $posts->total() }}
                            </span>
                        </a>
                    </li>
                    @foreach(\App\Models\Category::withCount('posts')->get() as $cat)
                    <li>
                        <a href="{{ route('posts.index', ['category' => $cat->slug]) }}" 
                           class="flex items-center justify-between px-4 py-2 rounded-lg transition-colors duration-200 {{ request('category') == $cat->slug ? 'bg-gradient-to-r from-church-green to-church-green-dark text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700' }}">
                            <span>{{ $cat->title }}</span>
                            <span class="text-xs px-2 py-1 rounded-full {{ request('category') == $cat->slug ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-600' }}">
                                {{ $cat->posts_count }}
                            </span>
                        </a>
                    </li>
                    @endforeach
                </ul>
            </div>
        </aside>

        <!-- Posts Grid -->
        <main class="flex-1">
            @if(request('search'))
            <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p class="text-blue-900 dark:text-blue-200">
                    Menampilkan hasil pencarian untuk: <span class="font-semibold">"{{ request('search') }}"</span>
                    <a href="{{ route('posts.index') }}" class="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                        Hapus filter
                    </a>
                </p>
            </div>
            @endif

            @if($posts->count() > 0)
            <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                @foreach($posts as $post)
                    <x-post-card :post="$post" />
                @endforeach
            </div>

            <!-- Pagination -->
            <div class="flex justify-center">
                {{ $posts->links() }}
            </div>
            @else
            <div class="text-center py-16">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Tidak ada warta ditemukan</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                    @if(request('search'))
                        Coba gunakan kata kunci lain atau hapus filter pencarian.
                    @else
                        Belum ada warta yang dipublikasikan saat ini.
                    @endif
                </p>
                @if(request('search') || request('category'))
                <a href="{{ route('posts.index') }}" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-church-green to-church-green-dark text-white rounded-full hover:scale-105 transition-transform duration-300 shadow-lg">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                    Kembali ke Semua Warta
                </a>
                @endif
            </div>
            @endif
        </main>
    </div>
</div>

<!-- Stats Section -->
<div class="bg-gradient-to-r from-church-green-dark to-church-green text-white py-12 mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
                <div class="text-4xl font-bold mb-2">{{ \App\Models\Post::where('is_active', true)->count() }}</div>
                <div class="text-white/80">Total Warta</div>
            </div>
            <div>
                <div class="text-4xl font-bold mb-2">{{ \App\Models\Category::count() }}</div>
                <div class="text-white/80">Kategori</div>
            </div>
            <div>
                <div class="text-4xl font-bold mb-2">{{ \App\Models\Member::count() }}</div>
                <div class="text-white/80">Jemaat</div>
            </div>
            <div>
                <div class="text-4xl font-bold mb-2">{{ \App\Models\ChurchGroup::count() }}</div>
                <div class="text-white/80">Kelompok</div>
            </div>
        </div>
    </div>
</div>
@endsection
