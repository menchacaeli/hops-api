module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      image: String,
      address: String,
      phone: String,
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

  const Brewery = mongoose.model("brewery", schema);
  return Brewery;
};
