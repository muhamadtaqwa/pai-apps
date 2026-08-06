<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\QuizResult;
use App\Models\QuizResultAnswer;
use App\Models\PointLog;
use App\Models\Badge;
use App\Models\UserBadge;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $quizzes = Quiz::with('user')
            ->when($user->role === 'siswa', function ($query) use ($user) {
                $query->where(function ($q) use ($user) {
                    $q->where('school_id', $user->school_id)->where('school_class_id', $user->school_class_id);
                })->orWhere(function ($q) {
                    $q->whereNull('school_id')->whereNull('school_class_id');
                });
            })
            ->when($user->role === 'guru', function ($query) use ($user) {
                if ($user->school_id) {
                    $query->where(function ($q) use ($user) {
                        $q->where('school_id', $user->school_id)->orWhereNull('school_id');
                    });
                }
            })
            ->latest()->get();

        return Inertia::render('Student/Quiz/Index', ['quizzes' => $quizzes]);
    }

    public function show(Quiz $quiz)
    {
        $quiz->load('questions.answers');
        $sudahDikerjakan = QuizResult::where('user_id', auth()->id())->where('quiz_id', $quiz->id)->exists();

        return Inertia::render('Student/Quiz/Take', ['quiz' => $quiz, 'sudahDikerjakan' => $sudahDikerjakan]);
    }

    public function submit(Request $request, Quiz $quiz)
    {
        $request->validate(['answers' => 'required|array']);
        $questions = $quiz->questions()->with('answers')->get();
        $skor = 0;
        $totalSoal = $questions->count();
        $jawabanDetail = [];

        foreach ($questions as $question) {
            $jawabanSiswa = $request->answers[$question->id] ?? null;
            $jawabanBenar = $question->answers->where('is_benar', true)->first();
            $isBenar = $jawabanSiswa == $jawabanBenar->id;
            if ($isBenar) $skor++;
            $jawabanDetail[] = ['question_id' => $question->id, 'pertanyaan' => $question->pertanyaan, 'jawaban_siswa_id' => $jawabanSiswa, 'jawaban_benar_id' => $jawabanBenar->id, 'is_benar' => $isBenar, 'pembahasan' => $question->pembahasan];
        }

        $quizResult = QuizResult::create(['user_id' => auth()->id(), 'quiz_id' => $quiz->id, 'skor' => $skor, 'total_soal' => $totalSoal, 'jawaban_detail' => $jawabanDetail, 'selesai_pada' => now()]);

        // Simpan jawaban per soal
        foreach ($jawabanDetail as $detail) {
            QuizResultAnswer::create([
                'quiz_result_id' => $quizResult->id,
                'question_id' => $detail['question_id'],
                'answer_id' => $detail['jawaban_siswa_id'],
                'is_correct' => $detail['is_benar'],
            ]);
        }

        $poin = $skor * 10;
        $user = auth()->user();
        $user->total_poin += $poin;
        $user->save();

        // Log poin
        PointLog::create([
            'user_id' => $user->id,
            'quiz_result_id' => $quizResult->id,
            'points' => $poin,
            'type' => 'quiz',
            'description' => 'Kuis: ' . $quiz->judul,
        ]);

        $allBadges = Badge::all();
        $newBadges = [];
        foreach ($allBadges as $badge) {
            $sudahPunya = UserBadge::where('user_id', $user->id)->where('badge_id', $badge->id)->exists();
            if ($sudahPunya) continue;
            $dapat = false;
            switch ($badge->nama) {
                case 'Pemula':
                    $dapat = QuizResult::where('user_id', $user->id)->count() >= 1;
                    break;
                case 'Rajin':
                    $dapat = QuizResult::where('user_id', $user->id)->count() >= 5;
                    break;
                case 'Sempurna':
                    $dapat = $skor === $totalSoal;
                    break;
                case 'Master':
                    $dapat = $user->total_poin >= 1000;
                    break;
                case 'Hafiz':
                    $dapat = QuizResult::where('user_id', $user->id)->count() >= 10;
                    break;
            }
            if ($dapat) {
                UserBadge::create(['user_id' => $user->id, 'badge_id' => $badge->id]);
                $newBadges[] = $badge->nama;
            }
        }

        $ranking = QuizResult::where('quiz_id', $quiz->id)->where('skor', '>', $skor)->count() + 1;

        return Inertia::render('Student/Quiz/Result', [
            'quiz' => $quiz,
            'skor' => $skor,
            'totalSoal' => $totalSoal,
            'jawabanDetail' => $jawabanDetail,
            'ranking' => $ranking,
            'poin' => $poin,
            'newBadges' => $newBadges,
        ]);
    }
}
