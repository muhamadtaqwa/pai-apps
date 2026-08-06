<?php

use App\Http\Controllers\Teacher\QuizController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\MaterialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    // Hanya guru & admin
    Route::get('/materials/create', function () {
        if (!in_array(auth()->user()->role, ['guru', 'admin'])) return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(MaterialController::class)->create();
    })->name('materials.create');

    Route::post('/materials', function () {
        if (!in_array(auth()->user()->role, ['guru', 'admin'])) return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(MaterialController::class)->store(request());
    })->name('materials.store');

    Route::get('/quizzes/create', function () {
        if (!in_array(auth()->user()->role, ['guru', 'admin'])) return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(QuizController::class)->create();
    })->name('quizzes.create');

    Route::post('/quizzes', function () {
        if (!in_array(auth()->user()->role, ['guru', 'admin'])) return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(QuizController::class)->store(request());
    })->name('quizzes.store');

    Route::get('/quizzes/{quiz}/questions/create', function ($quiz) {
        if (!in_array(auth()->user()->role, ['guru', 'admin'])) return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(QuestionController::class)->create($quiz);
    })->name('questions.create');

    Route::post('/quizzes/{quiz}/questions', function ($quiz) {
        if (!in_array(auth()->user()->role, ['guru', 'admin'])) return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(QuestionController::class)->store(request(), $quiz);
    })->name('questions.store');

    Route::get('/quizzes/{quiz}/results', function ($quiz) {
        if (!in_array(auth()->user()->role, ['guru', 'admin'])) return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(QuizController::class)->results($quiz);
    })->name('quizzes.results');

    Route::get('/quizzes/{quiz}/export-excel', function ($quiz) {
        if (!in_array(auth()->user()->role, ['guru', 'admin'])) return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(QuizController::class)->exportExcel($quiz);
    })->name('quizzes.export.excel');

    Route::get('/quizzes/{quiz}/export-pdf', function ($quiz) {
        if (!in_array(auth()->user()->role, ['guru', 'admin'])) return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(QuizController::class)->exportPdf($quiz);
    })->name('quizzes.export.pdf');

    // Semua role bisa akses
    Route::get('/materials', [MaterialController::class, 'index'])->name('materials.index');
    Route::get('/materials/{material}', [MaterialController::class, 'show'])->name('materials.show');
});
