<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\School;
use App\Models\SchoolClass;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Classes', [
            'schools' => School::all(),
            'classes' => SchoolClass::with('school')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['nama' => 'required', 'school_id' => 'required']);
        SchoolClass::create($request->all());
        return back()->with('success', 'Kelas ditambahkan!');
    }

    public function destroy(SchoolClass $class)
    {
        $class->delete();
        return back()->with('success', 'Kelas dihapus!');
    }
}
