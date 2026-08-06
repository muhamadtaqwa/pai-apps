<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $fillable = ['question_id', 'pilihan', 'is_benar'];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
