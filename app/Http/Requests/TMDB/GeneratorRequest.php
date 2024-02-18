<?php

namespace App\Http\Requests\TMDB;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class GeneratorRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'url' => 'string',
            'page' => 'string',
            'language' => 'string',
            'genre' => 'number'
        ];
    }
}
