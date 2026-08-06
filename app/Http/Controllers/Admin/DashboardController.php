<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\School;
use App\Models\SchoolClass;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'totalUsers' => User::count(),
            'totalSchools' => School::count(),
            'totalClasses' => SchoolClass::count(),
            'totalQuizzes' => \App\Models\Quiz::count(),
        ]);
    }
}
