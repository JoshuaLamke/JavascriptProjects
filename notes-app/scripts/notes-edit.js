'use strict'

const title = document.querySelector('#note-title')
const lastEdited = document.querySelector('#last-edited')
const body = document.querySelector('#note-body')
const removeButton = document.querySelector('#remove-note')
const noteId = location.hash.substring(2)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)
if(!note){
    location.assign('/index.html')
}
lastEdited.textContent = generateLastEdited(note.updatedAt)
//Show user what was stored in their note
title.value = note.title
body.value = note.body
//Allow user to edit note title
title.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    lastEdited.textContent = generateLastEdited(note.updtaedAt)
    saveNotes(notes)
})
//Allow user to edit note body
body.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    lastEdited.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})
//Allow user to remove note
removeButton.addEventListener('click', () => {
    removeNote(noteId)
    saveNotes(notes)
    location.assign('/index.html')
})
window.addEventListener('storage', (e) => {
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        notes = getSavedNotes()
        note = notes.find((note) => note.id === noteId)
        if(!note){
            location.assign('/index.html')
        }
        //Show user what was stored in their note
        title.value = note.title
        body.value = note.body
        lastEdited.textContent = generateLastEdited(note.updatedAt)
    }
})

