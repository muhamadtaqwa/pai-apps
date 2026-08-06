<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchoolController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Schools', [
            'schools' => School::withCount('users', 'classes')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['nama' => 'required', 'kode' => 'required|unique:schools']);
        School::create($request->all());
        return back()->with('success', 'Sekolah ditambahkan!');
    }

    public function destroy(School $school)
    {
        $school->delete();
        return back()->with('success', 'Sekolah dihapus!');
    }
}
