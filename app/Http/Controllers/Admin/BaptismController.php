<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Baptism;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BaptismController extends Controller
{
    public function index(Request $request)
    {
        $query = Baptism::with('member');

        if ($request->filled('year')) {
            $query->whereYear('baptism_date', $request->year);
        }

        if ($request->filled('month')) {
            $query->whereMonth('baptism_date', $request->month);
        }

        $baptisms = $query->latest('baptism_date')->paginate(15);

        // Statistics
        $totalThisMonth = Baptism::thisMonth()->count();
        $totalThisYear = Baptism::thisYear()->count();

        // Monthly stats for chart
        $monthlyStats = Baptism::whereYear('baptism_date', now()->year)
            ->select(
                DB::raw('MONTH(baptism_date) as month'),
                DB::raw('COUNT(*) as total')
            )
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('total', 'month');

        return view('admin.baptisms.index', compact('baptisms', 'totalThisMonth', 'totalThisYear', 'monthlyStats'));
    }

    public function create()
    {
        $members = Member::whereNull('is_baptized')
            ->orWhere('is_baptized', false)
            ->get();
        
        return view('admin.baptisms.create', compact('members'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'member_id' => 'nullable|exists:members,id',
            'name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'baptism_date' => 'nullable|date',
            'baptism_place' => 'nullable|string|max:255',
            'baptised_by' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $baptism = new Baptism($validated);
        $baptism->created_by = Auth::id();
        $baptism->save();

        // Update member baptism status if member_id is provided
        if ($baptism->member_id) {
            $member = Member::find($baptism->member_id);
            $member->is_baptized = true;
            $member->save();
        }

        return redirect()->route('admin.baptisms.index')
            ->with('success', 'Data baptisan berhasil ditambahkan!');
    }

    public function show(Baptism $baptism)
    {
        $baptism->load('member');
        return view('admin.baptisms.show', compact('baptism'));
    }

    public function edit(Baptism $baptism)
    {
        $members = Member::all();
        return view('admin.baptisms.edit', compact('baptism', 'members'));
    }

    public function update(Request $request, Baptism $baptism)
    {
        $validated = $request->validate([
            'member_id' => 'nullable|exists:members,id',
            'name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'baptism_date' => 'nullable|date',
            'baptism_place' => 'nullable|string|max:255',
            'baptised_by' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $baptism->fill($validated);
        $baptism->updated_by = Auth::id();
        $baptism->save();

        // Update member baptism status
        if ($baptism->member_id) {
            $member = Member::find($baptism->member_id);
            $member->is_baptized = true;
            $member->save();
        }

        return redirect()->route('admin.baptisms.index')
            ->with('success', 'Data baptisan berhasil diperbarui!');
    }

    public function destroy(Baptism $baptism)
    {
        $baptism->delete();

        return redirect()->route('admin.baptisms.index')
            ->with('success', 'Data baptisan berhasil dihapus!');
    }
}
