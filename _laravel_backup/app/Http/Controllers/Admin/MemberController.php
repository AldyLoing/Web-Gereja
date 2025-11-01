<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChurchGroup;
use App\Models\Family;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        $query = Member::with(['family', 'churchGroups']);

        // Filter by family
        if ($request->filled('family_id')) {
            $query->where('family_id', $request->family_id);
        }

        // Filter by church group
        if ($request->filled('church_group_id')) {
            $query->whereHas('churchGroups', function ($q) use ($request) {
                $q->where('church_group_id', $request->church_group_id);
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Search by name
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $members = $query->latest()->paginate(15);
        $families = Family::all();
        $churchGroups = ChurchGroup::all();

        return view('admin.members.index', compact('members', 'families', 'churchGroups'));
    }

    public function create()
    {
        $families = Family::all();
        $churchGroups = ChurchGroup::all();
        return view('admin.members.create', compact('families', 'churchGroups'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'family_id' => 'nullable|exists:families,id',
            'nik' => 'nullable|string|max:255',
            'kk_number' => 'nullable|string|max:255',
            'name' => 'required|string|max:255',
            'gender' => 'required|in:L,P',
            'birth_date' => 'nullable|date',
            'birth_place' => 'nullable|string|max:255',
            'blood_group' => 'nullable|in:A,B,AB,O',
            'address' => 'nullable|string|max:255',
            'telp' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'marital_status' => 'nullable|in:S,M,D,W',
            'is_baptized' => 'nullable|boolean',
            'activity_status' => 'nullable|string|max:255',
            'status' => 'required|boolean',
            'church_groups' => 'nullable|array',
            'church_groups.*' => 'exists:church_groups,id',
        ]);

        $member = new Member($validated);
        $member->created_by = Auth::id();
        $member->save();

        if (!empty($validated['church_groups'])) {
            $member->churchGroups()->sync($validated['church_groups']);
            
            // Update church group member counts
            foreach ($validated['church_groups'] as $groupId) {
                ChurchGroup::find($groupId)->updateTotalMember();
            }
        }

        // Update family member count
        if ($member->family_id) {
            $member->family->updateTotalMember();
        }

        return redirect()->route('admin.members.index')
            ->with('success', 'Jemaat berhasil ditambahkan!');
    }

    public function show(Member $member)
    {
        $member->load(['family', 'churchGroups', 'baptisms']);
        return view('admin.members.show', compact('member'));
    }

    public function edit(Member $member)
    {
        $families = Family::all();
        $churchGroups = ChurchGroup::all();
        $member->load('churchGroups');
        return view('admin.members.edit', compact('member', 'families', 'churchGroups'));
    }

    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'family_id' => 'nullable|exists:families,id',
            'nik' => 'nullable|string|max:255',
            'kk_number' => 'nullable|string|max:255',
            'name' => 'required|string|max:255',
            'gender' => 'required|in:L,P',
            'birth_date' => 'nullable|date',
            'birth_place' => 'nullable|string|max:255',
            'blood_group' => 'nullable|in:A,B,AB,O',
            'address' => 'nullable|string|max:255',
            'telp' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'marital_status' => 'nullable|in:S,M,D,W',
            'is_baptized' => 'nullable|boolean',
            'activity_status' => 'nullable|string|max:255',
            'status' => 'required|boolean',
            'church_groups' => 'nullable|array',
            'church_groups.*' => 'exists:church_groups,id',
        ]);

        $oldFamilyId = $member->family_id;
        $oldGroupIds = $member->churchGroups->pluck('id')->toArray();

        $member->fill($validated);
        $member->updated_by = Auth::id();
        $member->save();

        if (!empty($validated['church_groups'])) {
            $member->churchGroups()->sync($validated['church_groups']);
            
            // Update affected church groups
            $affectedGroupIds = array_unique(array_merge($oldGroupIds, $validated['church_groups']));
            foreach ($affectedGroupIds as $groupId) {
                ChurchGroup::find($groupId)->updateTotalMember();
            }
        } else {
            $member->churchGroups()->detach();
            foreach ($oldGroupIds as $groupId) {
                ChurchGroup::find($groupId)->updateTotalMember();
            }
        }

        // Update family member counts
        if ($oldFamilyId && $oldFamilyId !== $member->family_id) {
            Family::find($oldFamilyId)->updateTotalMember();
        }
        if ($member->family_id) {
            $member->family->updateTotalMember();
        }

        return redirect()->route('admin.members.index')
            ->with('success', 'Data jemaat berhasil diperbarui!');
    }

    public function destroy(Member $member)
    {
        $familyId = $member->family_id;
        $groupIds = $member->churchGroups->pluck('id')->toArray();

        $member->delete();

        // Update counts
        if ($familyId) {
            Family::find($familyId)->updateTotalMember();
        }
        foreach ($groupIds as $groupId) {
            ChurchGroup::find($groupId)->updateTotalMember();
        }

        return redirect()->route('admin.members.index')
            ->with('success', 'Jemaat berhasil dihapus!');
    }
}
