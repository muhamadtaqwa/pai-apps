<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $fillable = [
        'judul',
        'konten',
        'tipe',
        'file_url',
        'user_id',
        'school_id',
        'school_class_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class);
    }
    public function progress()
    {
        return $this->hasMany(MaterialProgress::class);
    }
}
