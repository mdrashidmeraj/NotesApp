import fs from 'fs';
import chalk from 'chalk';

export const getAllNotes = () => {
    const notes = loadNotes();
    if(notes.length>0) {
        console.log(chalk.green.inverse.bold("Your Notes"));
        notes.forEach((note)=> {
            console.log(note.title);
        })
    }else{
        console.log(chalk.red.inverse.bold("No Notes Available"))
    }
}

export const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicatesNote = notes.find((note) => note.title === title)

    if(!duplicatesNote){
        notes.push({
            title: title,
            body: body
        })
    }else{
        console.log("Title taken")
    }
    
    saveNotes(notes);
}
export const removeNote = (title) => {
    const notes = loadNotes();
    const remainingNotes = notes.filter((note) => note.title !== title)
    if(notes.length !== remainingNotes.length){
        saveNotes(remainingNotes);
    }else{
        console.log("Title Not found");
    }
}

export const getDescription = (title) => {
    const notes = loadNotes();
    const note = notes.find((note)=> note.title === title)
    if(note){
        console.log(chalk.bold.blue("Your note is"))
        console.log(note.body);
    }else{
        console.log(chalk.bold.red("No note with this title available"))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () =>  {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const notesJSON = dataBuffer.toString()
        return JSON.parse(notesJSON)
    } catch(err){
        return []
    }
}
