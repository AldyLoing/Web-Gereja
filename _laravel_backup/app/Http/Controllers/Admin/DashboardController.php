<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Baptism;
use App\Models\ChurchGroup;
use App\Models\Family;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Total statistics
        $totalMembers = Member::active()->count();
        $totalFamilies = Family::count();
        $birthdayThisMonth = Member::birthdayThisMonth()->count();
        $baptismsThisMonth = Baptism::thisMonth()->count();

        // Church groups with member counts
        $churchGroups = ChurchGroup::withCount('members')
            ->get()
            ->map(function ($group) {
                return [
                    'name' => $group->name,
                    'total' => $group->members_count,
                ];
            });

        // Monthly baptism statistics for current year
        $baptismStats = Baptism::whereYear('baptism_date', now()->year)
            ->select(
                DB::raw('MONTH(baptism_date) as month'),
                DB::raw('COUNT(*) as total')
            )
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->month => $item->total];
            });

        // Fill missing months with 0
        $monthlyBaptisms = [];
        for ($i = 1; $i <= 12; $i++) {
            $monthlyBaptisms[] = $baptismStats->get($i, 0);
        }

        // Gender distribution
        $genderStats = Member::active()
            ->select('gender', DB::raw('COUNT(*) as total'))
            ->groupBy('gender')
            ->get()
            ->mapWithKeys(function ($item) {
                $gender = $item->gender === 'L' ? 'Laki-laki' : 'Perempuan';
                return [$gender => $item->total];
            });

        // Age group distribution
        $ageGroups = [
            '0-12' => 0,
            '13-17' => 0,
            '18-30' => 0,
            '31-50' => 0,
            '51+' => 0,
        ];

        Member::active()
            ->whereNotNull('birth_date')
            ->get()
            ->each(function ($member) use (&$ageGroups) {
                $age = $member->birth_date->age;
                if ($age <= 12) {
                    $ageGroups['0-12']++;
                } elseif ($age <= 17) {
                    $ageGroups['13-17']++;
                } elseif ($age <= 30) {
                    $ageGroups['18-30']++;
                } elseif ($age <= 50) {
                    $ageGroups['31-50']++;
                } else {
                    $ageGroups['51+']++;
                }
            });

        return view('admin.dashboard', compact(
            'totalMembers',
            'totalFamilies',
            'birthdayThisMonth',
            'baptismsThisMonth',
            'churchGroups',
            'monthlyBaptisms',
            'genderStats',
            'ageGroups'
        ));
    }
}
