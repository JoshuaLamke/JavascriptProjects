'use strict'

//read existing notes from local storage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try{
        return notesJSON ? JSON.parse(notesJSON) : []
    }catch(e){
        return []
    } 
}
// remove a note from the list
const removeNote = (noteId) => {
    const noteIndex = notes.findIndex(function(note){
        return note.id === noteId
    })
    if(noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}
//Generate the DOM structure for a note
const generateNoteDOM = (note) => {

    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')
    
    //Set up the note title text 
    if(note.title.length > 0){
        textEl.textContent = note.title 
    }
    else{
        textEl.textContent = 'Unnamed note'
    } 
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)
    //setup the link
    noteEl.setAttribute('href', `/edit.html#'${note.id}`)
    noteEl.classList.add('list-item')
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
    return noteEl
}
//Sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if(sortBy === 'byEdited'){
        return notes.sort((a, b) => {
            if(a.updatedAt > b.updatedAt){
                return -1
            }
            else if(a.updatedAt < b.updatedAt){
                return 1
            }
            return 0
        })
    }
    else if(sortBy === 'byCreated'){
        return notes.sort((a, b) => {
            if(a.createdAt > b.createdAt){
                return -1
            }
            else if(a.createdAt < b.createdAt){
                return 1
            }
            return 0
        })
    }
    else if(sortBy === 'alphabetical'){
        return notes.sort((a, b) => {
            if(a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }
            else if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }
            return 0
        })
    }

}
// Render the  application notes
const renderNotes = (notes, filters) => {
    const notesEl =  document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''

    if(filteredNotes.length > 0){
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    }
    else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = "No notes to show"
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
}
//Save the notes to local storage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}