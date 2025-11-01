<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChurchGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChurchGroupController extends Controller
{
    public function index()
    {
        $churchGroups = ChurchGroup::withCount('members')->get();
        return view('admin.church-groups.index', compact('churchGroups'));
    }

    public function create()
    {
        return view('admin.church-groups.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $group = new ChurchGroup($validated);
        $group->created_by = Auth::id();
        $group->save();

        return redirect()->route('admin.church-groups.index')
            ->with('success', 'Kelompok gereja berhasil ditambahkan!');
    }

    public function show(ChurchGroup $churchGroup)
    {
        $churchGroup->load('members');
        return view('admin.church-groups.show', compact('churchGroup'));
    }

    public function edit(ChurchGroup $churchGroup)
    {
        return view('admin.church-groups.edit', compact('churchGroup'));
    }

    public function update(Request $request, ChurchGroup $churchGroup)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $churchGroup->fill($validated);
        $churchGroup->updated_by = Auth::id();
        $churchGroup->save();

        return redirect()->route('admin.church-groups.index')
            ->with('success', 'Kelompok gereja berhasil diperbarui!');
    }

    public function destroy(ChurchGroup $churchGroup)
    {
        // Detach all members first
        $churchGroup->members()->detach();
        $churchGroup->delete();

        return redirect()->route('admin.church-groups.index')
            ->with('success', 'Kelompok gereja berhasil dihapus!');
    }
}
