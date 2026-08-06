<?php

namespace App\Http\Controllers;

use App\Models\QuizResult;
use Inertia\Inertia;

class ProgressController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $results = QuizResult::with('quiz')->where('user_id', $user->id)->orderBy('selesai_pada', 'asc')->get()
            ->map(function ($r) {
                return ['id' => $r->id, 'quiz' => $r->quiz->judul, 'skor' => $r->skor, 'total' => $r->total_soal, 'nilai' => round(($r->skor / $r->total_soal) * 100), 'tanggal' => $r->selesai_pada->format('d/m/Y')];
            });

        return Inertia::render('Shared/Progress', [
            'results' => $results,
            'totalPoin' => $user->total_poin,
            'totalQuiz' => $results->count(),
            'rataRata' => $results->avg('nilai'),
        ]);
    }
}
