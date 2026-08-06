<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\MaterialProgress;
use App\Models\School;
use App\Models\SchoolClass;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaterialController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();

        $materials = Material::with('user')
            ->when($user->role === 'siswa', function ($q) use ($user) {
                $q->where(function ($q) use ($user) {
                    $q->where('school_id', $user->school_id)
                        ->where('school_class_id', $user->school_class_id);
                })->orWhereNull('school_id');
            })
            ->when($user->role === 'guru', function ($q) use ($user) {
                if ($user->school_id) {
                    $q->where('school_id', $user->school_id)->orWhereNull('school_id');
                }
            })
            ->latest()
            ->get();

        return Inertia::render('Student/Material/Index', [
            'materials' => $materials,
        ]);
    }

    public function create()
    {
        return Inertia::render('Teacher/Material/Create', [
            'schools' => School::all(),
            'classes' => SchoolClass::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'konten' => 'required|string',
            'tipe' => 'required|in:ringkasan,video,pdf',
        ]);

        Material::create([
            'judul' => $request->judul,
            'konten' => $request->konten,
            'tipe' => $request->tipe,
            'user_id' => auth()->id(),
            'school_id' => $request->school_id,
            'school_class_id' => $request->school_class_id,
        ]);

        return redirect()->route('materials.index');
    }

    public function show(Material $material)
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();

        if ($user->role === 'siswa') {
            MaterialProgress::firstOrCreate(
                ['user_id' => $user->id, 'material_id' => $material->id],
                ['completed' => true, 'completed_at' => now()]
            );
        }

        return Inertia::render('Student/Material/Show', [
            'material' => $material,
        ]);
    }
}
