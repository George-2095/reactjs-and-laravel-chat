<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function authuser()
    {
        return User::where('id', Auth::user()->id)->get();
    }

    public function users()
    {
        return User::orderBy('id', 'desc')->get();
    }

    public function sendmessage(Request $req)
    {
        $req->validate([
            'receivebyid' => 'required',
            'message' => 'required'
        ]);

        $messagedata = array("sendbyid" => Auth::user()->id, 'receivebyid' => $req->receivebyid, 'message' => nl2br(htmlspecialchars($req->message)));
        Message::insert($messagedata);
    }

    public function chat($sendbyid, $receivebyid)
    {
        return Message::where(function ($query) use ($sendbyid, $receivebyid) {
            $query->where('sendbyid', $sendbyid)->where('receivebyid', $receivebyid);
        })->orWhere(function ($query) use ($sendbyid, $receivebyid) {
            $query->where('sendbyid', $receivebyid)->where('receivebyid', $sendbyid);
        })->orderBy('id', 'asc')->get();
    }
}
