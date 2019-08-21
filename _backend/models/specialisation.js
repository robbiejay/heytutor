const SpecialisationSchema = new Schema({
  title: string
});

const Specialisation = mongoose.model('Specialisation', SpecialisationSchema)
