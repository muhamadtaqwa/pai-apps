<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\QuizResult;
use App\Models\School;
use App\Models\SchoolClass;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function create()
    {
        return Inertia::render('Teacher/Quiz/Create', [
            'schools' => School::all(),
            'classes' => SchoolClass::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'waktu_per_soal' => 'required|integer|min:10|max:120',
            'school_id' => 'nullable|exists:schools,id',
            'school_class_id' => 'nullable|exists:school_classes,id',
        ]);

        $quiz = Quiz::create([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'waktu_per_soal' => $request->waktu_per_soal,
            'user_id' => auth()->id(),
            'school_id' => $request->school_id,
            'school_class_id' => $request->school_class_id,
        ]);

        return redirect()->route('questions.create', $quiz->id);
    }

    public function results(Quiz $quiz)
    {
        if (!in_array(auth()->user()->role, ['guru', 'admin'])) abort(403);

        return Inertia::render('Teacher/Quiz/Results', [
            'quiz' => $quiz,
            'results' => QuizResult::with('user')
                ->where('quiz_id', $quiz->id)
                ->orderBy('skor', 'desc')->get(),
        ]);
    }

    public function exportExcel(Quiz $quiz)
    {
        $results = QuizResult::with('user.school', 'user.schoolClass')
            ->where('quiz_id', $quiz->id)->orderBy('skor', 'desc')->get();

        $filename = 'hasil-kuis-' . $quiz->judul . '.csv';
        $headers = ['Content-Type' => 'text/csv; charset=utf-8', 'Content-Disposition' => 'attachment; filename="' . $filename . '"'];

        $callback = function () use ($results) {
            $file = fopen('php://output', 'w');
            fwrite($file, "\xEF\xBB\xBF");
            fputcsv($file, ['Nama', 'Email', 'Sekolah', 'Kelas', 'Skor', 'Total', 'Nilai', 'Tanggal']);
            foreach ($results as $r) {
                fputcsv($file, [$r->user->name, $r->user->email, $r->user->school->nama ?? '-', $r->user->schoolClass->nama ?? '-', $r->skor, $r->total_soal, round(($r->skor / $r->total_soal) * 100), $r->selesai_pada]);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function exportPdf(Quiz $quiz)
    {
        $results = QuizResult::with('user.school', 'user.schoolClass')
            ->where('quiz_id', $quiz->id)->orderBy('skor', 'desc')->get();

        $html = '<h1>Hasil Kuis: ' . $quiz->judul . '</h1>';
        $html .= '<table border="1" cellpadding="5" cellspacing="0"><tr><th>No</th><th>Nama</th><th>Sekolah</th><th>Kelas</th><th>Skor</th><th>Nilai</th></tr>';
        foreach ($results as $i => $r) {
            $html .= '<tr><td>' . ($i + 1) . '</td><td>' . $r->user->name . '</td><td>' . ($r->user->school->nama ?? '-') . '</td><td>' . ($r->user->schoolClass->nama ?? '-') . '</td><td>' . $r->skor . '/' . $r->total_soal . '</td><td>' . round(($r->skor / $r->total_soal) * 100) . '</td></tr>';
        }
        $html .= '</table>';

        return response($html)->header('Content-Type', 'text/html');
    }
}
