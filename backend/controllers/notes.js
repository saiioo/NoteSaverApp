const Notes = require('../models/notes')




const addnotes = async (req, res) => {
  console.log(req.body)
  try {
    const {
      title,
      description,
      id
    } = req.body
    const newNotes = new Notes({
      id,
      title,
      description
    })
    const savedData = await newNotes.save();
    res.status(200).json({ savedData })

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const allnotes = async (req, res) => {
  console.log(req.params)
  try {
    const id = req.params.id
    const notes =await Notes.find({id : id})
    res.status(200).json({ notes })

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const getnotes = async (req, res) => {
  console.log(req.params)
  try {
    const id = req.params.id
    const notes =await Notes.find({_id : id})
    res.status(200).json({ notes })

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deletenote = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(req.params.id)
    const deletedNote = await Notes.findByIdAndDelete(_id);
    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatenote = async (req, res) => {
  console.log("yeah updating")
  try {
    const _id = req.params.id;
    const updates = req.body;
    const updatedNote = await Notes.findByIdAndUpdate(_id, updates, { new: true });
    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json({ note: updatedNote });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteallnote = async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedNote = await Notes.deleteMany({id:_id});
    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json({ note: deletedNote });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};











module.exports = {addnotes, allnotes, getnotes, deletenote , updatenote, deleteallnote}



