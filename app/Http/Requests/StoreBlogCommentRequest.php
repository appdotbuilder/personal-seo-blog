<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBlogCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'author_name' => 'required|string|max:100',
            'author_email' => 'required|email|max:255',
            'author_website' => 'nullable|url|max:255',
            'content' => 'required|string|max:1000',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'author_name.required' => 'Your name is required.',
            'author_email.required' => 'Your email is required.',
            'author_email.email' => 'Please provide a valid email address.',
            'author_website.url' => 'Please provide a valid website URL.',
            'content.required' => 'Comment content is required.',
            'content.max' => 'Comment cannot exceed 1000 characters.',
        ];
    }
}