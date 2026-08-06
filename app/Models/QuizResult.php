<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizResult extends Model
{
    protected $fillable = ['user_id', 'quiz_id', 'skor', 'total_soal', 'jawaban_detail', 'selesai_pada'];

    protected $casts = [
        'jawaban_detail' => 'array',
        'selesai_pada' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
    public function answers()
    {
        return $this->hasMany(QuizResultAnswer::class);
    }
}
