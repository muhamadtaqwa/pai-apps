<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PointLog extends Model
{
    protected $fillable = ['user_id', 'quiz_result_id', 'points', 'type', 'description'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function quizResult()
    {
        return $this->belongsTo(QuizResult::class);
    }
}
