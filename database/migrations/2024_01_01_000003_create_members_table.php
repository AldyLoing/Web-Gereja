<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('family_id')->nullable();
            $table->string('nik')->nullable();
            $table->string('kk_number')->nullable();
            $table->string('name');
            $table->char('gender', 1); // L/P
            $table->date('birth_date')->nullable();
            $table->string('birth_place')->nullable();
            $table->string('blood_group', 3)->nullable(); // A, B, AB, O
            $table->string('address')->nullable();
            $table->string('telp')->nullable();
            $table->string('email')->nullable();
            $table->char('marital_status', 1)->nullable(); // S=Single, M=Married, D=Divorced, W=Widowed
            $table->boolean('is_baptized')->nullable();
            $table->string('activity_status')->nullable(); // Aktif, Tidak Aktif, Pindah, dll
            $table->tinyInteger('status'); // 1=Active, 0=Inactive
            $table->timestamps();
            $table->softDeletes();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->unsignedBigInteger('deleted_by')->nullable();
            
            $table->index('family_id');
            $table->index('created_by');
            $table->index('updated_by');
            $table->index('deleted_by');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
