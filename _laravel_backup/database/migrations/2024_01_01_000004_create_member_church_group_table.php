<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('member_church_group', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('member_id');
            $table->unsignedBigInteger('church_group_id');
            $table->timestamps();
            
            $table->index('member_id');
            $table->index('church_group_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('member_church_group');
    }
};
