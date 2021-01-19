module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      image: String,
      description: String,
      brewery: String,
      ibu: String,
      abv: String,
      rating: Number,
      isFavorite: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Beer = mongoose.model("beer", schema);
  return Beer;
};
