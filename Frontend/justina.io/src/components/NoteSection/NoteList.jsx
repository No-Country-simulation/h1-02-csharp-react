import NoteComponent from "../NoteComponent/NoteComponent";

export default function NoteList({ notes }) {
  return notes.map((note, i) => {
    return (
      <NoteComponent
        key={note.id}
        title={note.title}
        desc={note.description}
        id={note.id}
        i={i}
      />
    );
  });
}
