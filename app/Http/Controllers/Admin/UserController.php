<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\School;
use App\Models\SchoolClass;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Users', [
            'users' => User::with(['school', 'schoolClass'])->latest()->get(),
            'schools' => School::all(),
            'classes' => SchoolClass::all(),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $user->update($request->only(['name', 'email', 'role', 'school_id', 'school_class_id']));
        return back()->with('success', 'User diupdate!');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return back()->with('success', 'User dihapus!');
    }
}
