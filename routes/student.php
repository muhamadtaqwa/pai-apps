<?php

use App\Http\Controllers\Student\QuizController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\ProgressController;
use App\Models\Badge;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('/quizzes', [QuizController::class, 'index'])->name('quizzes.index');
    Route::get('/quizzes/{quiz}', [QuizController::class, 'show'])->name('quizzes.show');
    Route::post('/quizzes/{quiz}/submit', [QuizController::class, 'submit'])->name('quizzes.submit');

    Route::get('/leaderboard', [LeaderboardController::class, 'index'])->name('leaderboard.index');
    Route::get('/progress', [ProgressController::class, 'index'])->name('progress.index');
    Route::get('/badges', function () {
        $user = auth()->user();
        return Inertia::render('Shared/Badges', [
            'badges' => $user->badges,
            'allBadges' => Badge::all(),
        ]);
    })->name('badges.index');
});
