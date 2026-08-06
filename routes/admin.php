<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\SchoolController;
use App\Http\Controllers\Admin\ClassController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/', function () {
        if (auth()->user()->role !== 'admin') return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(DashboardController::class)->index();
    })->name('admin.dashboard');

    Route::get('/users', function () {
        if (auth()->user()->role !== 'admin') return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(UserController::class)->index();
    })->name('admin.users');

    Route::patch('/users/{user}', function ($user) {
        if (auth()->user()->role !== 'admin') return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(UserController::class)->update(request(), $user);
    })->name('admin.users.update');

    Route::delete('/users/{user}', function ($user) {
        if (auth()->user()->role !== 'admin') return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(UserController::class)->destroy($user);
    })->name('admin.users.delete');

    Route::get('/schools', function () {
        if (auth()->user()->role !== 'admin') return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(SchoolController::class)->index();
    })->name('admin.schools');

    Route::post('/schools', function () {
        if (auth()->user()->role !== 'admin') return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(SchoolController::class)->store(request());
    })->name('admin.schools.store');

    Route::delete('/schools/{school}', function ($school) {
        if (auth()->user()->role !== 'admin') return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(SchoolController::class)->destroy($school);
    })->name('admin.schools.delete');

    Route::get('/classes', function () {
        if (auth()->user()->role !== 'admin') return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(ClassController::class)->index();
    })->name('admin.classes');

    Route::post('/classes', function () {
        if (auth()->user()->role !== 'admin') return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(ClassController::class)->store(request());
    })->name('admin.classes.store');

    Route::delete('/classes/{class}', function ($class) {
        if (auth()->user()->role !== 'admin') return Inertia::render('Shared/Forbidden')->toResponse(request())->setStatusCode(403);
        return app(ClassController::class)->destroy($class);
    })->name('admin.classes.delete');
});
