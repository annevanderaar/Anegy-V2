<?php

namespace App\Http\Requests\Favorite;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class FavoriteDeleteRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'user_id'   => 'required|numeric',
            'ms_id'     => 'required|numeric',
        ];
    }
}
