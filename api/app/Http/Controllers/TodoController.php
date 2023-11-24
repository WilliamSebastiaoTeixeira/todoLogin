<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $todos = Todo::where('user_id','=', auth()->user()->id)->get();

        return response()->json([
            'status' => 'success',
            'todos' => $todos,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        $todo = Todo::create([
            'user_id' => auth()->user()->id,
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Criado com sucesso',
            'todo' => $todo,
        ]);
    }

    public function show($id)
    {
        $todo = Todo::find($id);

        if(auth()->user()->id !== $todo->user_id)
        {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao atualizar',
            ]);
        }

        return response()->json([
            'status' => 'success',
            'todo' => $todo,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        $todo = Todo::find($id);

        if(auth()->user()->id !== $todo->user_id)
        {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao atualizar',
            ]);
        }

        $todo->title = $request->title;
        $todo->description = $request->description;
        $todo->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Atualizado com sucesso',
            'todo' => $todo,
        ]);
    }

    public function destroy($id)
    {
        $todo = Todo::find($id);


        if(auth()->user()->id !== $todo->user_id)
        {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao deletar',
            ]);
        }

        $todo->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Excluído com sucesso',
            'todo' => $todo,
        ]);
    }
}
