<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Family;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FamilyController extends Controller
{
    public function index(Request $request)
    {
        $query = Family::withCount('members');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $families = $query->latest()->paginate(15);

        return view('admin.families.index', compact('families'));
    }

    public function create()
    {
        return view('admin.families.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $family = new Family($validated);
        $family->created_by = Auth::id();
        $family->save();

        return redirect()->route('admin.families.index')
            ->with('success', 'Keluarga berhasil ditambahkan!');
    }

    public function show(Family $family)
    {
        $family->load('members');
        return view('admin.families.show', compact('family'));
    }

    public function edit(Family $family)
    {
        return view('admin.families.edit', compact('family'));
    }

    public function update(Request $request, Family $family)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $family->fill($validated);
        $family->updated_by = Auth::id();
        $family->save();

        return redirect()->route('admin.families.index')
            ->with('success', 'Data keluarga berhasil diperbarui!');
    }

    public function destroy(Family $family)
    {
        // Check if family has members
        if ($family->members()->count() > 0) {
            return redirect()->route('admin.families.index')
                ->with('error', 'Tidak dapat menghapus keluarga yang masih memiliki anggota!');
        }

        $family->delete();

        return redirect()->route('admin.families.index')
            ->with('success', 'Keluarga berhasil dihapus!');
    }
}
