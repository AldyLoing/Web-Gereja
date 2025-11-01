<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;

class BirthdayController extends Controller
{
    public function index(Request $request)
    {
        $month = (int) $request->get('month', now()->month);
        $year = (int) $request->get('year', now()->year);

        $members = Member::with(['family', 'churchGroups'])
            ->whereMonth('birth_date', $month)
            ->whereNotNull('birth_date')
            ->orderByRaw('DAY(birth_date)')
            ->get()
            ->map(function ($member) use ($year) {
                $member->age = now()->year - $member->birth_date->year;
                $member->birthday_this_year = $member->birth_date->copy()->setYear($year);
                return $member;
            });

        $monthNames = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];

        return view('admin.birthdays.index', compact('members', 'month', 'year', 'monthNames'));
    }
}
