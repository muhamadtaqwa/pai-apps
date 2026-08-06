<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $leaderboard = User::where('role', 'siswa')
            ->when(in_array($user->role, ['siswa', 'guru']), fn($q) => $q->where('school_id', $user->school_id))
            ->orderBy('total_poin', 'desc')->take(50)->get(['id', 'name', 'total_poin']);

        $rankSaya = $user->role === 'siswa' ? User::where('role', 'siswa')->where('school_id', $user->school_id)->where('total_poin', '>', $user->total_poin)->count() + 1 : null;

        return Inertia::render('Shared/Leaderboard', ['leaderboard' => $leaderboard, 'rankSaya' => $rankSaya, 'user' => $user]);
    }
}
