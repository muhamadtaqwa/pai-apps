<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = ['judul', 'deskripsi', 'user_id', 'school_id', 'waktu_per_soal'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function results()
    {
        return $this->hasMany(QuizResult::class);
    }
    public function school()
    {
        return $this->belongsTo(School::class);
    }
}
