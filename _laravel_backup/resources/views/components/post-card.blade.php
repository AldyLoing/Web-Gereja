<article class="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
    <!-- Image -->
    <a href="{{ route('posts.show', $post->slug) }}" class="block relative overflow-hidden aspect-[16/10]">
        @if($post->cover)
            <img 
                src="{{ asset('storage/' . $post->cover) }}" 
                alt="{{ $post->title }}" 
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            >
        @else
            <div class="w-full h-full bg-gradient-to-br from-church-green via-church-green-dark to-gray-800 flex items-center justify-center">
                <svg class="w-20 h-20 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
        @endif
        
        <!-- Overlay on hover -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </a>

    <!-- Content -->
    <div class="p-6">
        <!-- Categories -->
        @if($post->categories->isNotEmpty())
        <div class="flex flex-wrap gap-2 mb-3">
            @foreach($post->categories->take(2) as $category)
            <span class="px-3 py-1 text-xs font-medium bg-gradient-to-r from-church-gold-light to-church-gold text-gray-900 rounded-full">
                {{ $category->title }}
            </span>
            @endforeach
        </div>
        @endif

        <!-- Title -->
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-church-green transition-colors">
            <a href="{{ route('posts.show', $post->slug) }}">
                {{ $post->title }}
            </a>
        </h3>

        <!-- Excerpt -->
        @if($post->excerpt)
        <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed">
            {{ $post->excerpt }}
        </p>
        @elseif($post->content)
        <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed">
            {{ Str::limit(strip_tags($post->content), 120) }}
        </p>
        @endif

        <!-- Meta -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time datetime="{{ ($post->published_at ?? $post->created_at)->toDateString() }}">
                    {{ ($post->published_at ?? $post->created_at)->format('d M Y') }}
                </time>
            </div>

            <a href="{{ route('posts.show', $post->slug) }}" class="inline-flex items-center text-sm font-medium text-church-green hover:text-church-green-dark transition-colors">
                Baca
                <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </a>
        </div>
    </div>
</article>
