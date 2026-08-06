<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function create(Quiz $quiz)
    {
        return Inertia::render('Teacher/Quiz/AddQuestions', ['quiz' => $quiz]);
    }

    public function store(Request $request, Quiz $quiz)
    {
        $request->validate([
            'pertanyaan' => 'required',
            'tipe' => 'required|in:pg,bs',
            'pembahasan' => 'nullable',
            'pilihan_a' => 'required_if:tipe,pg',
            'pilihan_b' => 'required_if:tipe,pg',
            'pilihan_c' => 'required_if:tipe,pg',
            'pilihan_d' => 'required_if:tipe,pg',
            'jawaban_benar' => 'required|in:A,B',
        ]);

        $question = Question::create([
            'quiz_id' => $quiz->id,
            'pertanyaan' => $request->pertanyaan,
            'pembahasan' => $request->pembahasan,
        ]);

        if ($request->tipe === 'bs') {
            Answer::create(['question_id' => $question->id, 'pilihan' => 'Benar', 'is_benar' => $request->jawaban_benar === 'A']);
            Answer::create(['question_id' => $question->id, 'pilihan' => 'Salah', 'is_benar' => $request->jawaban_benar === 'B']);
        } else {
            foreach (['A', 'B', 'C', 'D'] as $p) {
                Answer::create([
                    'question_id' => $question->id,
                    'pilihan' => $request->{'pilihan_' . strtolower($p)},
                    'is_benar' => $request->jawaban_benar === $p,
                ]);
            }
        }

        return $request->tambah_lagi
            ? back()->with('success', 'Soal ditambahkan!')
            : redirect()->route('quizzes.index');
    }
}
