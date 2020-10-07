let _data = {};
let _selectedNoteId = "";

const NoteSpaceTagId = "noteSpace";
const NotesListTagId = "notes-list";
const NoteClassName = "notes";
const NoteIdPrefix = "note-";

function CreateGuid() {  
    function _p8(s) {  
       var p = (Math.random().toString(16)+"000000000").substr(2,8);  
       return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
    }  
    return _p8() + _p8(true) + _p8(true) + _p8();  
 };

function SaveCurrNote(){  
    const noteToSaveId = _selectedNoteId ? _selectedNoteId : (NoteIdPrefix + CreateGuid());
    const noteToSaveData = document.getElementById(NoteSpaceTagId).value.split("\n"); 
    const noteToSave = {
        id: noteToSaveId,
        title: noteToSaveData[0],
        date: new Date().toDateString(),
        text: noteToSaveData
    }; 
    
    // save to storage
    _data[noteToSaveId] = noteToSave;
    
    // update on ui
    UpsertNoteToListOnUi(noteToSave);

    // set selected note
    _selectedNoteId = noteToSaveId;
    HighlightSelectedNoteOnUi(_selectedNoteId);
}

function UpsertNoteToListOnUi(newNote) {
    // remove from list if it already exists
    const oldNote = document.getElementById(newNote.id); 
    oldNote?.parentNode.removeChild(oldNote);

    // create new note on the top of the list
    const div = document.createElement("div");
    div.id = newNote.id;
    div.className = NoteClassName;
    div.onclick = (event) => {
        // re-write if note btn container contains > 1 element
        const noteId = event.target.id || event.target.parentNode.id;
        _selectedNoteId = noteId;
        HighlightSelectedNoteOnUi(noteId);
        document.getElementById(NoteSpaceTagId).value = _data[noteId].text;
        window.history.pushState({noteId}, "", `/${newNote.id}`);
    };
    const noteTitle = document.createElement("h3");
    noteTitle.innerHTML = newNote.title;
    const noteDate = document.createElement("span");
    noteDate.innerHTML = newNote.date;
    div.prepend(noteTitle, noteDate);
    document.getElementById(NotesListTagId).prepend(div);
}

function DeleteCurrNote() {
    // remove from storage
    delete _data[_selectedNoteId];

    //remove from ui
    const noteToRemove = document.getElementById(_selectedNoteId);
    noteToRemove?.parentNode.removeChild(noteToRemove);

    // reset selected note
    _selectedNoteId = null;
    AddNewNote();
}

function HighlightSelectedNoteOnUi(noteId) {
    document.querySelectorAll(".notes").forEach(item => item.classList.remove('selected'));
    // select clicked element (visually)
    document.querySelector("#" + noteId).classList.add('selected');
}

function AddNewNote() {
    document.getElementById(NoteSpaceTagId).value = "";
    _selectedNoteId = "";
}

window.onbeforeunload = function () {
    localStorage.setItem("notes", JSON.stringify(_data))
}

window.onload = event => {
    const localStorageData = localStorage.getItem("notes");
    _data = JSON.parse(localStorageData) || {};
    for (const noteId in _data) {
        UpsertNoteToListOnUi(_data[noteId]);
    }
}