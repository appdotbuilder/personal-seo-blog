<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBlogPostRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blog_posts,slug,' . $this->route('post')->id,
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'meta_title' => 'nullable|string|max:60',
            'meta_description' => 'nullable|string|max:160',
            'featured_image' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published,archived',
            'published_at' => 'nullable|date',
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
            'title.required' => 'Post title is required.',
            'excerpt.required' => 'Post excerpt is required for SEO.',
            'content.required' => 'Post content is required.',
            'meta_title.max' => 'SEO title should not exceed 60 characters for optimal search results.',
            'meta_description.max' => 'SEO description should not exceed 160 characters for optimal search results.',
            'status.in' => 'Post status must be draft, published, or archived.',
        ];
    }
}