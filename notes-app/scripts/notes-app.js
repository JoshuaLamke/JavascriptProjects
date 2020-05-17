'use strict'

// DOM - Document Object Model - Document is the html file - Object is javascript object
let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}
renderNotes(notes, filters)
document.querySelector('#create-notes').addEventListener('click',function(e){
    const id = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
        title: '',
        body: '',
        id: id,
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes(notes)
    location.assign(`/edit.html#'${id}`)
})
document.querySelector('#search-text').addEventListener('input',function(e){
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})
window.addEventListener('storage',function(e){
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes,filters)
    }
})
document.querySelector('#filter-by').addEventListener('change',function(e){
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})
