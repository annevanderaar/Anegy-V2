<?php

namespace App\Http\Requests\TMDB;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
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
            'query' => 'string',
            'page' => 'string',
        ];
    }
}
